import React, { useState } from 'react';
import WithLayout from './withLayout';
import Form, { FormField } from './Form';
import { Priority, Status, ITodo } from './Todo';
import TodoList from './TodoList';

const Homepage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (formData: { [key: string]: any }) => {
    const newTodo: ITodo = {
      id: (todos.length + 1).toString(), // Generate a simple ID for the new todo
      title: formData.title,
      content: formData.content || '',
      deadline: formData.deadline ? new Date(formData.deadline) : undefined,
      priority: formData.priority
        ? (formData.priority as Priority)
        : Priority.Low,
      status: formData.status ? (formData.status as Status) : Status.Pending,
      onUpdate: (updatedTodo: ITodo) => handleUpdateTodo(updatedTodo),
      onDelete: (id: string) => handleDeleteTodo(id),
    };

    // Add the new todo to the existing list
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleUpdateTodo = (updatedTodo: ITodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Validators for the form can be added here
  const fields: FormField[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Title',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      placeholder: 'Write the details...',
    },
    {
      name: 'deadline',
      label: 'Deadline',
      type: 'date',
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      options: [{ value: 'High' }, { value: 'Medium' }, { value: 'Low' }],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Pending' },
        { value: 'In Progress' },
        { value: 'Completed' },
      ],
    },
  ];

  return (
    <div className="flex gap-4 h-full">
      <div className="w-full h-full">
        <div className="overflow-y-auto max-h-[80vh]">
          <Form fields={fields} onSubmit={handleSubmit} showCancel={false} />
        </div>
      </div>
      {/* TodoList */}
      <div className="w-full h-full overflow-hidden">
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};

export default WithLayout(Homepage);
