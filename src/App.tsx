import { isEqual, isUndefined } from "lodash";
import randomColor from "randomcolor";
import { useCallback, useMemo, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Categories from "./components/Categories";
import CategoryModal from "./components/CategoryModal";
import Divider from "./components/Divider";
import FilterActions from "./components/FilterActions";
import NavBar from "./components/NavBar";
import TaskModal from "./components/TaskModal";
import TodoRow from "./components/TodoRow";
import { useTodos } from "./contexts/todo";
import { ITodo } from "./contexts/todo/type";
import useResponsive from "./hooks/useResponsive";
function Filter(
  todos: ITodo[],
  categoryId: string | undefined,
  isComplete: boolean | undefined
) {
  let r = [...todos];
  if (!isUndefined(isComplete))
    r = r.filter(({ isCompleted }) => isEqual(isCompleted, isComplete));
  if (!isUndefined(categoryId))
    r = r.filter(({ category: { id } }) => isEqual(id, categoryId));
  return r;
}
function App() {
  let { isSm } = useResponsive();
  let { todos, filterCompletes, toggleCompleted, add } = useTodos();
  let todosCount = todos.length;
  let [filterState, setFilterState] = useState<boolean>();
  let [activeCategoryId, setActiveCategoryId] = useState("0");
  let [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  let [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  let openCreateTaskModal = useCallback(() => setShowCreateTaskModal(true), []);
  let closeCreateTaskModal = useCallback(
    () => setShowCreateTaskModal(false),
    []
  );
  let openCreateCategoryModal = useCallback(
    () => setShowCreateCategoryModal(true),
    []
  );
  let closeCreateCategoryModal = useCallback(
    () => setShowCreateCategoryModal(false),
    []
  );
  let filteredTodos = useMemo(
    () => Filter(todos, isSm ? activeCategoryId : undefined, filterState),
    [todos, activeCategoryId, filterState, isSm]
  );
  return (
    <div className="bg-0 w-screen min-h-screen flex justify-center items-center">
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <div
          className="absolute top-[50%] left-[50%] flex flex-row gap-3 h-[447px] sm:h-[520px]"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Categories
            openCategoryModal={openCreateCategoryModal}
            setActiveCategoryId={setActiveCategoryId}
          />
          <div className="rounded-xl sm:w-[650px] w-[300px] gap-2 flex flex-col">
            <div className="bg-3 py-2 sm:px-5 rounded-xl shadow-lg w-full rnd-border flex flex-row sm:justify-between justify-center items-center">
              {isSm && (
                <p className="text-6">
                  {filteredTodos.length} of {todosCount} tasks
                </p>
              )}
              <Button
                text="Add New Task"
                onClick={openCreateTaskModal}
                active={!isSm}
              />
              {isSm && (
                <p>
                  <Button
                    text="Clear completed"
                    isJustText
                    onClick={filterCompletes}
                  />
                </p>
              )}
            </div>
            <div className="bg-3 rounded-xl shadow-lg flex-1 rnd-border pr-1 pt-2">
              <div
                className="custom-scroll sm:h-[374px] h-[350px]"
                id="scrollableDiv"
              >
                {filteredTodos.map((todo, index) => {
                  return (
                    <div key={todo.id}>
                      {!isEqual(index, 0) && <Divider />}
                      <TodoRow
                        {...todo}
                        toggleCompleted={() => {
                          toggleCompleted(todo.id);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <Divider />
              <FilterActions {...{ setFilterState }} />
            </div>
          </div>
        </div>
      </div>
      {showCreateTaskModal && (
        <TaskModal close={closeCreateTaskModal} handleSubmit={add} />
      )}
      {showCreateCategoryModal && (
        <CategoryModal
          close={closeCreateCategoryModal}
          ic={randomColor()}
          ib={randomColor()}
        />
      )}
    </div>
  );
}

export default App;
