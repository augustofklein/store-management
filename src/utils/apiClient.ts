import Cookies from "js-cookie";
import { AUTH_COOKIE } from "@/utils/authConstant";

export class ApiError extends Error {
  status?: number;
  data?: any;
  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const baseUrl = (process.env.REACT_APP_BACKEND_API ?? "").replace(/\/$/, "");

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {},
  expectJson = true,
): Promise<T> {
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;
  const token = Cookies.get(AUTH_COOKIE);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(url, { ...options, headers });

  const text = await res.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : undefined;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message =
      data?.message || data?.error || text || res.statusText || "API error";
    throw new ApiError(message, res.status, data);
  }

  if (!expectJson) return data as T;
  return (data as T) ?? ({} as T);
}

export function returnErrorMessage(error: any): string {
  return error instanceof ApiError
    ? error.message
    : "An unexpected error occurred";
}
