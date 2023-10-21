export interface ICategory {
  id: string;
  name: string;
  bg: string;
  color: string;
}
export interface ITodo {
  id: string;
  text: string;
  isCompleted: boolean;
  category: ICategory;
}
export interface ITodoContext {
  todos: ITodo[];
  add(todo: ITodo): void;
  update(id: string, todo: Partial<Omit<ITodo, "id">>): void;
  remove(id: string): void;
  addCategory: (category: ICategory) => void;
  updateCategory(id: string, category: Partial<Omit<ICategory, "id">>): void;
  removeCategory: (id: string) => void;
  filterCompletes: () => void;
  toggleCompleted: (id: string) => void;
  categories: ICategory[];
}
