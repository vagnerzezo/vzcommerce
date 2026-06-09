const DEFAULT_API_BASE_URL = "https://dummyjson.com";

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_API_BASE_URL;
}
