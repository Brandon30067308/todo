import { useReducer, useContext, createContext } from "react";
import { v4 as uuidV4 } from "uuid";

const appData = { todos: [], completed: [] };

interface AppStateContextProps {
  state: AppState;
  dispatch: (action: Action) => void;
}

export type AppState = {
  todos: Todo[];
  completed: Completed[];
};

export type LocalState = {
  todos: {
    text: string;
    id: string;
  }[];
  completed: Completed[];
};

export type Completed = {
  text: string;
  id: string;
};

export type Todo = {
  text: string;
  id: string;
  editState: boolean;
};

const formatStateForStorage = (state: AppState): LocalState => {
  const todos = state.todos.map((t) => ({ text: t.text, id: t.id }));
  return { todos, completed: state.completed };
};

type Action =
  | {
      type: "SET-TODOS";
      payload: AppState;
    }
  | {
      type: "ADD-ITEM";
      payload: string;
    }
  | {
      type: "REMOVE-ITEM";
      payload: string;
    }
  | {
      type: "ADD-COMPLETED";
      payload: Completed;
    }
  | {
      type: "REMOVE-COMPLETED";
      payload: Completed;
    }
  | {
      type: "TOGGLE-EDIT-STATE";
      payload: string;
    }
  | {
      type: "UPDATE-TODO-TEXT";
      payload: {
        id: string;
        newText: string;
      };
    };

export const useAppState = () => {
  return useContext(AppStateContext);
};

const updateLocalStorage = (state: LocalState): void => {
  const todos = state.todos.map((t) => ({ text: t.text, id: t.id }));
  localStorage.setItem(
    "todos-state",
    JSON.stringify({ todos, completed: state.completed })
  );
};

const appStateReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "SET-TODOS": {
      return action.payload;
    }
    case "ADD-ITEM": {
      const id = uuidV4();

      const newState = {
        todos: [
          ...state.todos,
          {
            text: action.payload,
            id,
            editState: false,
          },
        ],
        completed: state.completed,
      };
      updateLocalStorage(formatStateForStorage(newState));
      return newState;
    }
    case "REMOVE-ITEM": {
      const newState = {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        completed: state.completed.filter((todo) => todo.id !== action.payload),
      };
      updateLocalStorage(formatStateForStorage(newState));
      return newState;
    }
    case "ADD-COMPLETED": {
      const newState = {
        todos: state.todos,
        completed: [...state.completed, action.payload],
      };
      updateLocalStorage(formatStateForStorage(newState));
      return newState;
    }
    case "REMOVE-COMPLETED": {
      const newState = {
        todos: state.todos,
        completed: state.completed.filter(
          (todo) => todo.id !== action.payload.id
        ),
      };
      updateLocalStorage(formatStateForStorage(newState));
      return newState;
    }
    case "TOGGLE-EDIT-STATE": {
      const newState = {
        todos: state.todos.map((t) => {
          return t.id === action.payload
            ? { ...t, editState: !t.editState }
            : { ...t, editState: false };
        }),
        completed: state.completed,
      };
      return newState;
    }
    case "UPDATE-TODO-TEXT": {
      const newState = {
        todos: state.todos.map((t) => {
          return t.id === action.payload.id
            ? { ...t, editState: !t.editState, text: action.payload.newText }
            : t;
        }),
        completed: state.completed,
      };
      updateLocalStorage(formatStateForStorage(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
