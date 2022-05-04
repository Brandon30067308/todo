import { MouseEvent, useRef, useState, FC, useEffect } from "react";
import "./App.css";
import {
  Input,
  ListGroupItem,
  Container,
  Button,
  InputGroup,
  ListGroup,
} from "./styles";
import { useAppState, Todo } from "./AppStateContext";
import TodosFilter from "./components/TodosFilter/TodosFilter";
import TodoEditForm from "./components/TodoEditForm/TodoEditForm";
import { Filter } from "./types";
import addImg from "./images/add.svg";
import { LocalState } from "./AppStateContext";

const App: FC = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch, state } = useAppState();

  useEffect(() => {
    let state: LocalState;
    if (!localStorage.getItem("todos-state")) {
      state = { todos: [], completed: [] } as LocalState;
    } else {
      state = JSON.parse(localStorage.getItem("todos-state")!);
    }

    const formattedTodos: Todo[] = state.todos.map((t) => {
      return {
        text: t.text,
        id: t.id,
        editState: false,
      };
    });

    dispatch({
      type: "SET-TODOS",
      payload: { todos: formattedTodos, completed: state.completed },
    });
  }, [dispatch]);

  const toggleEditState = (id: string) => {
    dispatch({ type: "TOGGLE-EDIT-STATE", payload: id });
  };

  const deleteItem = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    const current = e.currentTarget;
    const parent = current.parentElement;
    if (parent) {
      dispatch({ type: "REMOVE-ITEM", payload: id });
    }
  };

  const addItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      const item = inputRef.current.value.trim();
      dispatch({ type: "ADD-ITEM", payload: item });
      inputRef.current.value = "";
    } else {
      inputRef.current && inputRef.current.focus();
    }
  };

  const checkItem = (todo: Todo) => {
    if (state.completed.map((t) => t.id).includes(todo.id)) {
      dispatch({ type: "REMOVE-COMPLETED", payload: todo });
    } else {
      dispatch({ type: "ADD-COMPLETED", payload: todo });
    }
  };

  return (
    <div className="App">
      <Container>
        <InputGroup onSubmit={addItem}>
          <Input ref={inputRef} placeholder="add new todo..." />
          <div>
            <Button type="submit" className="flex">
              add item{" "}
              <img
                style={{ marginLeft: "10px" }}
                className="add-img"
                src={addImg}
                alt="add"
              />
            </Button>
          </div>
        </InputGroup>
        <ListGroup>
          <TodosFilter filter={filter} setFilter={setFilter} />
          {state.todos.length >= 1 &&
            state.todos.map((todo) => {
              const isCompleted = state.completed
                .map((t) => t.id)
                .includes(todo.id);
              return (
                <ListGroupItem
                  key={todo.id}
                  filter={filter}
                  isCompleted={isCompleted}
                  className={"flex"}
                >
                  <div className="sub-container flex">
                    {/* check todo button */}
                    <button
                      className="flex btn"
                      onClick={() => checkItem(todo)}
                    >
                      <svg
                        height="28"
                        width="28"
                        fill={isCompleted ? "#7BBF6A" : "#004a99ea"}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256,0C114.84,0,0,114.84,0,256S114.84,512,256,512,512,397.16,512,256,397.16,0,256,0ZM357.72,205.66l-106.67,128a21.33,21.33,0,0,1-28.22,4.09l-64-42.67a21.33,21.33,0,0,1,23.67-35.5l48.05,32,94.39-113.27a21.33,21.33,0,0,1,32.78,27.31Z" />
                      </svg>
                    </button>
                    {todo.editState ? (
                      // todo edit form
                      <TodoEditForm todo={todo} />
                    ) : (
                      // todo text container
                      <span
                        className="text"
                        style={{ opacity: ".735" }}
                        onClick={() => toggleEditState(todo.id)}
                      >
                        {todo.text}
                      </span>
                    )}
                  </div>
                  {/* delete todo button */}
                  <button
                    className="flex btn"
                    onClick={(e) => deleteItem(e, todo.id)}
                  >
                    <svg
                      className="svg dark"
                      fill="#004a99ea"
                      height="28"
                      width="28"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M437,75A256,256,0,1,0,75,437,256,256,0,1,0,437,75ZM335.08,304.92a21.33,21.33,0,1,1-30.17,30.17L256,286.17l-48.92,48.92a21.33,21.33,0,0,1-30.17-30.17L225.83,256l-48.92-48.92a21.33,21.33,0,0,1,30.17-30.17L256,225.83l48.92-48.92a21.33,21.33,0,0,1,30.17,30.17L286.17,256Z" />
                    </svg>
                  </button>
                </ListGroupItem>
              );
            })}
        </ListGroup>
      </Container>
    </div>
  );
};

export default App;
