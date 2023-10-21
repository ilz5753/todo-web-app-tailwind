import {
  filter,
  includes,
  indexOf,
  isEmpty,
  isEqual,
  isNull,
  map,
} from "lodash";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { ICategory, ITodo, ITodoContext } from "./type";

const TodoContext = createContext<null | ITodoContext>(null);
export const useTodos = () => {
  let ctx = useContext(TodoContext);
  if (isNull(ctx)) throw new Error(`Wrap App inside of "TodoProvider".`);
  return ctx;
};
export function TodoProvider({ children }: PropsWithChildren) {
  let [todos, setTodos] = useState<ITodo[]>([
    // {
    //   id: "0",
    //   text: "Memorize the fifty states and their capitals",
    //   isCompleted: false,
    //   category: {
    //     id: "0",
    //     name: "Completed",
    //     bg: "#4CAF50",
    //     color: "#FFFFFF",
    //   },
    // },
    // {
    //   id: "0",
    //   text: "Memorize the fifty states and their capitals",
    //   isCompleted: true,
    //   category: {
    //     id: "0",
    //     name: "Urgent",
    //     bg: "#FF5252",
    //     color: "#FFFFFF",
    //   },
    // },
    // {
    //   id: "0",
    //   text: "Memorize the fifty states and their capitals",
    //   isCompleted: false,
    //   category: {
    //     id: "0",
    //     name: "Important",
    //     bg: "#FFC107",
    //     color: "#FFFFFF",
    //   },
    // },
    // {
    //   id: "0",
    //   text: "Memorize the fifty states and their capitals",
    //   isCompleted: true,
    //   category: {
    //     id: "0",
    //     name: "Later",
    //     bg: "#9C27B0",
    //     color: "#FFFFFF",
    //   },
    // },
    // {
    //   id: "0",
    //   text: "Memorize the fifty states and their capitals",
    //   isCompleted: true,
    //   category: {
    //     id: "0",
    //     name: "To study",
    //     bg: "#25A7B8",
    //     color: "#FFFFFF",
    //   },
    // },
  ]);
  let [categories, setCategories] = useState<ICategory[]>([
    {
      id: "0",
      name: "Completed",
      bg: "#4CAF50",
      color: "#FFFFFF",
    },
    {
      id: "1",
      name: "Urgent",
      bg: "#FF5252",
      color: "#FFFFFF",
    },
    {
      id: "2",
      name: "Important",
      bg: "#FFC107",
      color: "#FFFFFF",
    },
    {
      id: "3",
      name: "Later",
      bg: "#9C27B0",
      color: "#FFFFFF",
    },
    {
      id: "4",
      name: "To study",
      bg: "#25A7B8",
      color: "#FFFFFF",
    },
    // {
    //   id: "5",
    //   name: "1",
    //   bg: "#25A7B8",
    //   color: "#FFFFFF",
    // },
    // {
    //   id: "6",
    //   name: "2",
    //   bg: "#25A7B8",
    //   color: "#FFFFFF",
    // },
    // {
    //   id: "7",
    //   name: "3",
    //   bg: "#25A7B8",
    //   color: "#FFFFFF",
    // },
    // {
    //   id: "8",
    //   name: "4",
    //   bg: "#25A7B8",
    //   color: "#FFFFFF",
    // },
  ]);
  let add = useCallback(
    (todo: ITodo) => {
      let ids = map(todos, ({ id }) => id);
      if (!includes(ids, todo.id)) setTodos((t) => [...t, todo]);
    },
    [todos]
  );
  let update = useCallback(
    (id: string, todo: Partial<Omit<ITodo, "id">>) => {
      let ids = map(todos, ({ id }) => id);
      if (includes(ids, id)) {
        let index = indexOf(ids, id);
        let c = [...todos];
        c[index] = { ...c[index], ...todo };
        setTodos(c);
      }
    },
    [todos]
  );
  let remove = useCallback(
    (id: string) => {
      let ids = map(todos, ({ id }) => id);
      if (includes(ids, id)) {
        let index = indexOf(ids, id);
        let c = [...todos];
        c.splice(index, 1);
        setTodos(c);
      }
    },
    [todos]
  );
  let addCategory = useCallback(
    (category: ICategory) => {
      let ids = map(categories, ({ id }) => id);
      if (!includes(ids, category.id)) setCategories((c) => [...c, category]);
    },
    [categories]
  );
  let updateCategory = useCallback(
    (id: string, category: Partial<Omit<ICategory, "id">>) => {
      let ids = map(categories, ({ id }) => id);
      if (!includes(ids, id)) {
        let index = indexOf(ids, id);
        let c = [...categories];
        c[index] = { ...c[index], ...category };
        setCategories(c);
      }
    },
    [categories]
  );
  let removeCategory = useCallback(
    (id: string) => {
      let ids = map(categories, ({ id }) => id);
      if (!includes(ids, id))
        setCategories((c) => filter(c, (pc) => !isEqual(pc.id, id)));
    },
    [categories]
  );
  let filterCompletes = useCallback(() => {
    if (!isEmpty(todos))
      setTodos((t) => filter(t, ({ isCompleted }) => !isCompleted));
  }, [todos]);
  let toggleCompleted = useCallback(
    (id: string) => {
      let ids = map(todos, ({ id }) => id);
      if (includes(ids, id)) {
        let index = indexOf(ids, id);
        let c = [...todos];
        c[index].isCompleted = !c[index].isCompleted;
        setTodos(c);
      }
    },
    [todos]
  );
  return (
    <TodoContext.Provider
      {...{
        value: {
          todos,
          add,
          update,
          remove,
          addCategory,
          updateCategory,
          removeCategory,
          categories,
          filterCompletes,
          toggleCompleted,
        },
        children,
      }}
    />
  );
}
