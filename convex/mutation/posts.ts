import { v } from "convex/values";
import {
	mutation,
	type MutationCtx,
	type QueryCtx,
} from "../_generated/server";

export async function getAuthUser(ctx: MutationCtx | QueryCtx) {
	const user = await ctx.auth.getUserIdentity();
	if (!user) {
		throw new Error("Unauthorized");
	}
	return user;
}

export const generateUploadUrl = mutation({
	handler: async (ctx) => {
		const currentUser = getAuthUser(ctx);
		return await ctx.storage.generateUploadUrl();
	},
});

export const createPosts = mutation({
	args: { caption: v.optional(v.string()), storageId: v.id("_storage") },
	handler: async (ctx, args) => {
		const currentUser = await getAuthUser(ctx);
		const userDetails = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", currentUser.subject))
			.first();

		if (!userDetails) throw new Error("User not found");

		const imageUrl = await ctx.storage.getUrl(args.storageId);
		if (!imageUrl) throw new Error("Image not found");

		//create the post
		const postId = await ctx.db.insert("posts", {
			userId: userDetails._id,
			imageUrl,
			comments: 0,
			likes: 0,
			storageId: args.storageId,
			caption: args.caption,
		});

		//increment users posts by 1
		await ctx.db.patch(userDetails._id, { posts: userDetails.posts + 1 });

		return postId;
	},
});
