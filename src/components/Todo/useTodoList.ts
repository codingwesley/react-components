import { useCallback, useMemo, useEffect } from "react";
import { useImmer } from "use-immer";
import { fetchTodoList } from "./api";

interface TodoItem {
  id: string;
  name: string;
  complete: boolean;
}
type TodoList = TodoItem[];

export function useTodoList() {
  const [todoList, setTodoList] = useImmer<TodoList>([]);
  const onToggleItem = useCallback(
    (id: string, newFlag: boolean) => {
      setTodoList((draft) => {
        const item = draft.find((ele) => ele.id === id);
        if (item) {
          item.complete = newFlag;
        } else {
          throw new Error("Cannot found item data, please check. id:" + id);
        }
      });
    },
    [setTodoList]
  );
  const completedCount = useMemo(
    () => todoList.reduce((count, item) => count + (item.complete ? 1 : 0), 0),
    [todoList]
  );

  useEffect(() => {
    fetchTodoList().then((todos) => {
      setTodoList(todos || []);
    });
  }, [setTodoList]);

  return { todoList, onToggleItem, completedCount };
}
