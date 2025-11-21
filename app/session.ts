import { type MiddlewareFunction } from "react-router";
import { createCookieSessionStorage } from "react-router";

export const storage = createCookieSessionStorage({
  cookie: {
    secrets: ["iepiepieeep"],
    name: "_session",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
});

export const sessionMiddleware: MiddlewareFunction<Response> = async (
  { request },
  next
) => {
  let cookieHeader = request.headers.get("Cookie"); // read cookie header
  let session = await storage.getSession(cookieHeader); // parse cookie header
  if (!session.has("_id")) {
    session.set("_id", crypto.randomUUID()); // if no id found, create one
    const response = await next();
    response.headers.append("Set-Cookie", await storage.commitSession(session));
    return response;
  }
};
