import { useState } from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
	const [tasks, setTasks] = useState<Array<TaskType>>([
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
		{ id: v1(), title: 'RTK query', isDone: false },
		{ id: v1(), title: 'GraphQL', isDone: false },
	]);

	const [filter, setFilter] = useState<FilterValuesType>('all');

	const removeTask = (taskId: string) => {
		setTasks(tasks.filter(task => task.id !== taskId));
	};

	const addTask = (title: string) => {
		let newTask = {id: v1(), title: title, isDone: false};
		let newTasks = [newTask, ...tasks];
		setTasks(newTasks);
	};

	const changeFilter = (newFilterValue: FilterValuesType) => {
		setFilter(newFilterValue)
	};

	const changeStatus = (taskId: string, isDone: boolean) => {
		let task = tasks.find(t => t.id === taskId)
		if (task) {
			task.isDone = isDone
		}
		setTasks([...tasks])
	};

	let filteredTasks = tasks;

	if (filter === 'completed') {
		filteredTasks = tasks.filter(task => task.isDone);
	}

	if (filter === 'active') {
		filteredTasks = tasks.filter(task => !task.isDone)
	}

	return (
		<div className="App">
			<Todolist title="What to learn" 
								tasks={filteredTasks}
								filter={filter}
								removeTask={removeTask}
								changeFilter={changeFilter} 
								addTask={addTask}
								changeStatus={changeStatus}
			/>
		</div>
	);
}

export default App;
