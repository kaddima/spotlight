import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { getAuthUser } from "./users";

export const generateUploadUrl = mutation({
	handler: async (ctx) => {
		const currentUser = getAuthUser(ctx);
		return await ctx.storage.generateUploadUrl();
	},
});

export const createPosts = mutation({
	args: { caption: v.optional(v.string()), storageId: v.id("_storage") },
	handler: async (ctx, args) => {
		const userDetails = await getAuthUser(ctx);
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
