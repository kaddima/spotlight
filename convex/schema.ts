import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    username:v.string(),
    firstName: v.string(),
    lastName: v.string(),
    fullName:v.string(),
    email:v.string(),
    bio:v.optional(v.string()),
    image:v.optional(v.string()),
    followers:v.number(),
    following:v.number(),
    posts:v.number(),
    clerkId:v.string()
  }).index("by_clerk_id", ["clerkId"])
})