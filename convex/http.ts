import { httpRouter } from "convex/server";
import { handleWebhooks } from "./httpAction/Webhooks";

const http = httpRouter();

http.route({
	path: "/clerk-webhook",
	method: "POST",
	handler: handleWebhooks,
});

export default http;
