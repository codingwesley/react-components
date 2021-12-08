import useSWR from "swr";

const fetcher = (url: string) => {
  return fetch(url).then((res) => {
    return res.json();
  });
};

interface Props {
  title: string;
}

export function Todo({ title }: Props) {
  const { data, error } = useSWR("/api/user", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <h2>{title}</h2>
      hello todo {data.name}!
    </div>
  );
}
