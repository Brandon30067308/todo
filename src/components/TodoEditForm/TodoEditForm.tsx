import { FC, useCallback, useState, useRef, useEffect } from 'react';
import { Todo, useAppState } from '../../AppStateContext';

interface ITodoEditForm {
  todo: Todo;
}

const TodoEditForm: FC<ITodoEditForm> = ({ todo }) => {
  const { dispatch } = useAppState();
  const [text, setText] = useState<string>(todo.text);
  const todoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    todoInputRef.current && todoInputRef.current.focus();
  }, []);

  const blurEventHandler = useCallback(e => {
    dispatch({
      type: 'UPDATE-TODO-TEXT',
      payload: { id: todo.id, newText: e.target.value.trim() }
    });
  }, [dispatch, todo.id]);

  return (
    <form className="form-edit" onSubmit={e => {
      e.preventDefault();

      todoInputRef.current && todoInputRef.current.removeEventListener('blur', blurEventHandler);

      dispatch({
        type: 'UPDATE-TODO-TEXT',
        payload: { id: todo.id, newText: text.trim() }
      });
    }}>
      <input
        className="input-edit text"
        value={text}
        ref={todoInputRef}
        onBlur={blurEventHandler}
        onChange={e => {
          setText(e.target.value);
        }}
      />
    </form>
  )
}

export default TodoEditForm;