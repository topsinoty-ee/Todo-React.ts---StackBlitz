import React, { useState } from 'react';
import DynamicForm, { FormField } from './Form';


export enum Priority {
  'High',
  'Medium',
  'Low',
}

export enum Status {
  'Pending',
  'In Progress',
  'Completed',
}

export interface ITodo {
  id: string;
  title: string;
  content: string;
  deadline?: Date;
  priority?: Priority;
  status: Status;
  onDelete: (id: string) => void;
  onUpdate: (todo: ITodo) => void;
}
// Define your form validators
const isRequired = (value: any) => value && value.trim() !== '';

const Todo: React.FC<ITodo> = ({
  id,
  title,
  content,
  deadline,
  priority = Priority.Medium,
  status,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fields for DynamicForm
  const formFields: FormField[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      value: title,
      placeholder: 'Enter Todo title',
      required: true,
      validators: [isRequired],
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      value: content,
      placeholder: 'Enter Todo content',
      required: true,
      validators: [isRequired],
    },
    {
      name: 'deadline',
      label: 'Deadline',
      type: 'date',
      value: deadline ? deadline.toISOString().split('T')[0] : '',
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      value: priority.toString(),
      options: [
        { value: Priority[0] },
        { value: Priority[1] },
        { value: Priority[2] },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      value: status.toString(),
      options: [
        { value: Status[0]},
        { value: Status[1] },
        { value: Status[2] },
      ],
    },
  ];

  const handleFormSubmit = (formData: { [key: string]: any }) => {
    const updatedTodo: ITodo = {
      id,
      title: formData.title,
      content: formData.content,
      deadline: formData.deadline ? new Date(formData.deadline) : undefined,
      priority: Number(formData.priority),
      status: Number(formData.status),
      onDelete,
      onUpdate,
    };
    onUpdate(updatedTodo);
    setIsEditing(false); // Close the dialog after updating
  };

  const handleDelete = () => {
    onDelete(id);
    setIsDeleteDialogOpen(false); // Close delete confirmation dialog
  };

  return (
    <div id={id} className="card shadow-lg p-4 bg-base-200">
      <div className="card-body">
        {/* Title */}
        <h2 className="card-title text-lg font-bold">{title}</h2>

        {/* Content */}
        <p className="card-text mb-2">{content}</p>

        {/* Deadline */}
        {deadline && (
          <p className="text-sm text-gray-500">
            <strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}
          </p>
        )}

        {/* Priority */}
        <p
          className={`text-sm mb-2 ${priority === Priority.High
              ? 'text-red-500'
              : priority === Priority.Medium
                ? 'text-yellow-500'
                : 'text-green-500'
            }`}
        >
          <strong>Priority:</strong> {Priority[priority]}
        </p>

        {/* Status */}
        <p
          className={`badge ${status === Status.Pending
              ? 'badge-warning'
              : status === Status['In Progress']
                ? 'badge-info'
                : 'badge-success'
            }`}
        >
          {Status[status]}
        </p>

        {/* Edit and Delete buttons */}
        <div className="mt-4 flex gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Todo</h3>

            <DynamicForm
              fields={formFields}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteDialogOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure you want to delete this todo?</h3>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;