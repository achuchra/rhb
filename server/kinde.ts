import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
  }
);

export const sessionManager = (c: Context): SessionManager => ({
  getSessionItem: async (key: string) => {
    return getCookie(c, key);
  },
  setSessionItem: async (key: string, value: unknown) => {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    } as const;
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  removeSessionItem: async (key: string) => {
    deleteCookie(c, key);
  },
  destroySession: async () => {
    ["access_token", "refresh_token", "id_token", "user"].forEach((key) => {
      deleteCookie(c, key);
    });
  },
});

type Env = {
  Variables: {
    user: UserType;
  };
};

export const userMiddleware = createMiddleware<Env>(async (c, next) => {
  const manager = sessionManager(c);
  const isAuthenticated = await kindeClient.isAuthenticated(manager);
  if (!isAuthenticated) {
    return c.json({ error: "Not authenticated" }, 401);
  }

  const user = await kindeClient.getUserProfile(sessionManager(c));
  c.set("user", user);
  return await next();
});
