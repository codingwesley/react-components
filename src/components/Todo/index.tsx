import { useCallback, useEffect, useMemo } from "react";
import useSWR from "swr";
import { Layout, Checkbox, Row, Space, Alert } from "antd";
import { useImmer } from "use-immer";

const fetcher = (url: string) => {
  return fetch(url).then((res) => {
    return res.json();
  });
};

interface Item {
  id: string;
  name: string;
  complete: boolean;
}

type Data = Item[];

interface TodoItemProps {
  id: string;
  name: string;
  value: boolean;
  onToggle: (id: string, newFlag: boolean) => void;
}

function TodoItem({ name, value }: TodoItemProps) {
  return (
    <Row>
      <Space size={8}>
        <Checkbox checked={value} />
        {name}
      </Space>
    </Row>
  );
}

interface Props {
  title: string;
}

export function Todo({ title }: Props) {
  const [data, setData] = useImmer<Data>([]);
  const { data: fetchedData } = useSWR<Data>("/api/user", fetcher);
  const onToggleItem = useCallback(
    (id: string, newFlag: boolean) => {
      setData((draft) => {
        const item = draft.find((ele) => ele.id);
        if (item) {
          item.complete = newFlag;
        } else {
          throw new Error("Cannot found item data, please check. id:" + id);
        }
      });
    },
    [setData]
  );
  const completedCount = useMemo(
    () => data.reduce((count, item) => count + (item.complete ? 1 : 0), 0),
    [data]
  );

  useEffect(() => {
    setData(fetchedData || []);
  }, [fetchedData, setData]);

  if (!fetchedData) return <div>loading...</div>;

  return (
    <Layout.Content style={{margin: "10px 12px"}}>
      <h2>TODO List</h2>
      <Alert type="success" message={`Completed count: ${completedCount}`} />
      {data.map((ele) => (
        <TodoItem
          key={ele.id}
          id={ele.id}
          value={ele.complete}
          name={ele.name}
          onToggle={onToggleItem}
        />
      ))}
    </Layout.Content>
  );
}
