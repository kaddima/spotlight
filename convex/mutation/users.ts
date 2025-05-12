import {
	mutation,
	type MutationCtx,
	type QueryCtx,
} from "../_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createUser = mutation({
	args: {
		username: v.string(),
		image: v.optional(v.string()),
		fullName: v.string(),
		email: v.string(),
		bio: v.optional(v.string()),
		clerkId: v.string(),
	},
	handler: async (ctx, args) => {
		const existingUser = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
			.first();

		if (existingUser) return;

		await ctx.db.insert("users", {
			...args,
			followers: 0,
			following: 0,
			posts: 0,
		});
	},
});

export async function getAuthUser(ctx: MutationCtx | QueryCtx) {
	const user = await ctx.auth.getUserIdentity();
	if (!user) {
		throw new Error("Unauthorized");
	}

	const currentUser = await ctx.db
		.query("users")
		.withIndex("by_clerk_id", (q) => q.eq("clerkId", user.subject))
		.first();

	if (!currentUser) throw new Error("User not found");
	return currentUser;
}
