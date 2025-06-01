export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type FetcherOptions = RequestInit & {
  params?: Record<string, string>;
};

interface FetcherSuccessResponse<T> {
  data?: T;
  status: number;
  ok: boolean;
}

export async function fetcher<T>(
  endpoint: string,
  options?: FetcherOptions
): Promise<FetcherSuccessResponse<T>> {
  let url = `${API_BASE_URL}${endpoint}`;

  if (options?.params) {
    const searchParams = new URLSearchParams(options.params);
    url += `?${searchParams.toString()}`;
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const contentType = res.headers.get("Content-Type") || "";

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message || "Erro na requisição");
  }

  if (contentType.includes("application/json")) {
    const data = await res.json();
    return { data, status: res.status, ok: res.ok };
  }

  // Para respostas sem conteúdo (ex: 204 No Content) ou outros tipos de conteúdo
  return { status: res.status, ok: res.ok };
}
