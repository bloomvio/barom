import { NextRequest } from "next/server";

export function isAdminAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer") return false;

  return token === process.env.ADMIN_PASSWORD;
}

export function checkAdminCookie(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  return cookieValue === process.env.ADMIN_PASSWORD;
}
