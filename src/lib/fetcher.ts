export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type FetcherOptions = RequestInit & {
  params?: Record<string, string>;
};

export async function fetcher<T>(
  endpoint: string,
  options?: FetcherOptions
): Promise<T> {
  let url = `${API_BASE_URL}${endpoint}`;

  if (options?.params) {
    const searchParams = new URLSearchParams(options.params);
    url += `?${searchParams.toString()}`;
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message || "Erro na requisição");
  }

  return res.json();
}
