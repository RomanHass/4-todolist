import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
};

type PropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (taskId: string) => void
  addTask: (title: string) => void
  changeFilter: (newFilterValue: FilterValuesType) => void
  changeStatus: (taskId: string, isDone: boolean) => void
};

export function Todolist(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

   const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('')
    if (e.ctrlKey && e.key === 'Enter') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
   };

   const addTaskHandler = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Field is required')
    }
  };

  const onAllClickHandler = () => props.changeFilter('all');
  const onAactiveClickHandler = () => props.changeFilter('active');
  const onCompletedClickHandler = () => props.changeFilter('completed');

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input className={error ? 'error' : ''}
               value={newTaskTitle} 
               onChange={onChangeHandler}
               onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => {

            const onClickRemoveHandler = () => props.removeTask(t.id)
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked)

            return (
              <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox" 
                       checked={t.isDone} 
                       onChange={onChangeStatusHandler} />
                <span>{t.title}</span>
                <button onClick={onClickRemoveHandler}>x</button>
              </li>
            );
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter-btn' : ''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? 'active-filter-btn' : ''} onClick={onAactiveClickHandler}>Active</button>
        <button className={props.filter === 'completed' ? 'active-filter-btn' : ''} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}