import { FilterGroup } from '../../styles';
import { SetStateAction, FC, Dispatch } from 'react';
import { useAppState } from '../../AppStateContext';
import { Filter } from '../../types';

interface ITodosFilter {
  filter: Filter,
  setFilter: Dispatch<SetStateAction<Filter>>,
}

const options: Filter[] = ['all', 'done', 'todo'];

const TodosFilter: FC<ITodosFilter> = ({ filter, setFilter }) => {
  const { state } = useAppState();

  const todosLeft = () => {
    const tasksLeft = state.todos.length - state.completed.length;
    return tasksLeft === 0 ? `no task left` : `${tasksLeft} ${tasksLeft === 1 ? 'task' : 'tasks'} left`;
  }

  return (
    <FilterGroup className="filter flex">
      <div className="options flex">
        {
          options.map((option, index) => (
            <span
              key={index}
              className={`text-sm option ${filter === option && 'selected'} `}
              onClick={() => setFilter(option)}>
              {option}
            </span>
          ))
        }
      </div>
      <span className="text-sm">{todosLeft()}</span>
    </FilterGroup>
  )
}

export default TodosFilter;