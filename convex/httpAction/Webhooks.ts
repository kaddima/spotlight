import { httpAction } from "../_generated/server";
import { api } from "../_generated/api";
import { Webhook } from "svix";
import type { TCreatedUserEvent } from "../type/clerk.type";

export const handleWebhooks = httpAction(async (ctx, request) => {
	const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
	if (!webhookSecret) {
		throw new Error(
			"Missing CLERK_WEBHOOK_SECRET environment variable in convex",
		);
	}

	const svixId = request.headers.get("svix-id");
	const svixSignature = request.headers.get("svix-signature");
	const svixTimestamp = request.headers.get("svix-timestamp");

	if (!svixId || !svixSignature || !svixTimestamp) {
		return new Response("Error occurred, no svix headers", { status: 400 });
	}

	const payload = await request.json();
	const body = JSON.stringify(payload);

	const wh = new Webhook(webhookSecret);
	let event: TCreatedUserEvent;

	//verify webhook
	try {
		event = wh.verify(body, {
			"svix-id": svixId,
			"svix-signature": svixSignature,
			"svix-timestamp": svixTimestamp,
		}) as TCreatedUserEvent;
	} catch (error) {
		console.error("Error verifying webhook: ", error);
		return new Response("Error occurred", { status: 400 });
	}

	const eventType = event?.type;
	if (eventType === "user.created") {
		const { id, email_addresses, first_name, last_name, image_url } =
			event.data;

		const email = email_addresses[0].email_address;
		const fullName = `${first_name || ""} ${last_name || ""}`.trim();

		try {
			await ctx.runMutation(api.mutation.users.createUser, {
				email,
				fullName,
				clerkId: id,
				image: image_url,
				username: email.split("@")[0],
			});
		} catch (error) {
			console.error("Error creating user");
			return new Response("Error creating user", { status: 500 });
		}
	}

	return new Response("Webhook processed successfully", { status: 200 });
});
