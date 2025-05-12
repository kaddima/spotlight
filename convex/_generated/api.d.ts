/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as http from "../http.js";
import type * as httpAction_Webhooks from "../httpAction/Webhooks.js";
import type * as mutation_posts from "../mutation/posts.js";
import type * as mutation_users from "../mutation/users.js";
import type * as query_posts from "../query/posts.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  http: typeof http;
  "httpAction/Webhooks": typeof httpAction_Webhooks;
  "mutation/posts": typeof mutation_posts;
  "mutation/users": typeof mutation_users;
  "query/posts": typeof query_posts;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
