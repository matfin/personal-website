export const query = async <T>({
  url,
  method = 'GET',
  signal,
}: {
  url: string;
  method?: string;
  signal?: AbortSignal;
}): Promise<T | null> => {
  const response: Response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return (await response.json()) as T;
};
