const fetcher = (url: string) => {
  return fetch(url).then((res) => {
    return res.json();
  });
};

export function fetchTodoList() {
  return fetcher("/api/todos");
}
