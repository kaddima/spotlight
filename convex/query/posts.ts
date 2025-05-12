import { query } from "../_generated/server";
import { getAuthUser } from "../mutation/users";

export const getFeedPosts = query({
	handler: async (ctx) => {
		const currentuser = await getAuthUser(ctx);
		const posts = await ctx.db.query("posts").order("desc").collect();

		const postsWithInfo = await Promise.all(
			posts.map(async (post) => {
				const postAuthor = await ctx.db.get(post.userId);

				const like = await ctx.db
					.query("likes")
					.withIndex("by_user_and_post", (q) =>
						q.eq("userId", currentuser._id).eq("postId", post._id),
					)
					.first();

				const bookmark = await ctx.db
					.query("bookmarks")
					.withIndex("by_user_and_post", (q) =>
						q.eq("userId", currentuser._id).eq("postId", post._id),
					)
					.first();

				return {
					...post,
					author: {
						_id: postAuthor?._id,
						username: postAuthor?.username,
						image: postAuthor?.image,
					},
					isLiked: !!like,
					isBookMarked: !!bookmark,
				};
			}),
		);

		return postsWithInfo;
	},
});
