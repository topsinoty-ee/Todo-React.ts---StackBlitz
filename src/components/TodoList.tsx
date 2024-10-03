import React from 'react';
import Todo, { ITodo, Priority, Status } from './Todo';

interface ITodoList{
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export const initialTodos: ITodo[] = [
  {
    id: '1',
    title: 'Finish project report',
    content: 'Complete the final report for the ongoing project by Friday.',
    deadline: new Date('2024-10-06'),
    priority: Priority.High,
    status: Status.Pending,
  },
  {
    id: '2',
    title: 'Update website design',
    content: 'Work on the homepage redesign based on new wireframes.',
    deadline: new Date('2024-10-10'),
    priority: Priority.Medium,
    status: Status['In Progress'],
  },
  {
    id: '3',
    title: 'Plan team meeting',
    content: 'Schedule a meeting to discuss Q4 goals and budget planning.',
    deadline: new Date('2024-10-15'),
    priority: Priority.Low,
    status: Status.Completed,
  },
];

const TodoList: React.FC<ITodoList> = ({todos, setTodos}) => {

  const handleUpdateTodo = (updatedTodo: ITodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="overflow-y-auto max-h-[80vh] space-y-4 gap-2 flex flex-col h-full">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
      {todos.length === 0 && (
        <p className="text-gray-500 text-center">No todos available. Add some!</p>
      )}
    </div>
  );
};

export default TodoList;
