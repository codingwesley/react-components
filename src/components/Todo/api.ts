export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export async function fetchTodoList() {
  return await fetcher("/api/todos");
}
