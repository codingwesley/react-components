import { useCallback } from "react";
import { Layout, Checkbox, Row, Space, Alert } from "antd";
import { useTodoList } from "./useTodoList";

interface TodoItemProps {
  id: string;
  name: string;
  value: boolean;
  onToggle: (id: string, newFlag: boolean) => void;
}

function TodoItem({ name, value, id, onToggle }: TodoItemProps) {
  const onClick = useCallback(() => {
    onToggle(id, !value);
  }, [id, onToggle, value]);
  const eleId = `todo-item-${id}`;

  return (
    <Row data-role="todo-item">
      <Space size={8}>
        <Checkbox id={eleId} checked={value} onClick={onClick}>
          <span>{name}</span>
        </Checkbox>
      </Space>
    </Row>
  );
}

interface Props {
  title: string;
}

export function Todo({ title }: Props) {
  const { todoList, fetchedData, onToggleItem, completedCount } = useTodoList();
  if (!fetchedData) return <div>loading...</div>;

  return (
    <Layout.Content style={{ margin: "10px 12px" }}>
      <h2>{title || "TODO List"}</h2>
      <Alert type="success" message={`Completed count: ${completedCount}`} />
      {todoList.map((ele) => (
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
