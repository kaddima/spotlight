import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		username: v.string(),
		firstName: v.string(),
		lastName: v.string(),
		fullName: v.string(),
		email: v.string(),
		bio: v.optional(v.string()),
		image: v.optional(v.string()),
		followers: v.number(),
		following: v.number(),
		posts: v.number(),
		clerkId: v.string(),
	}).index("by_clerk_id", ["clerkId"]),

	posts: defineTable({
		userId: v.id("users"),
		imageUrl: v.string(),
		storageId: v.id("_storage"),
		caption: v.optional(v.string()),
		likes: v.number(),
		comments: v.number(),
	}).index("by_user", ["userId"]),

	likes: defineTable({
		userId: v.id("users"),
		postId: v.id("posts"),
	})
		.index("by_post", ["postId"])
		.index("by_user_and_post", ["userId", "postId"]),

	comments: defineTable({
		userId: v.id("users"),
		postId: v.id("posts"),
		content: v.string(),
	}).index("by_post", ["postId"]),
});
