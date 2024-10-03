import React, { useEffect, useState } from 'react';
import { capitalize } from '../utils/capitalize.string.util';

/**
 * Interface representing an option for a form field.
 */
interface Option {
  value: string;
}

/**
 * Interface representing a field in the dynamic form.
 */
export interface FormField {
  name: string; // Unique name for the field
  label?: string; // Optional label for the field
  type?: string; // Type of the field (text, email, password, etc.)
  value?: any; // Default value for the field
  options?: Option[]; // Options for select or radio fields
  placeholder?: string; // Placeholder text for the input
  required?: boolean; // Flag to indicate if the field is required
  validators?: ((value: any) => boolean)[]; // Array of validation functions
}

/**
 * Props for the DynamicForm component.
 */
interface Props {
  fields: FormField[]; // Array of form fields to render
  showCancel?: boolean; // Flag to show or hide the cancel button
  onSubmit: (formData: { [key: string]: any }) => void; // Function called on form submission
  onCancel?: () => void; // Function called on cancel button click
}

/**
 * DynamicForm component for rendering a customizable form based on provided fields.
 *
 * @param {Props} props - The props for the DynamicForm component.
 * @returns {JSX.Element} The rendered form component.
 */
const DynamicForm: React.FC<Props> = ({
  fields,
  showCancel = true,
  onSubmit,
  onCancel,
}) => {
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formInvalid, setFormInvalid] = useState<boolean>(false);

  useEffect(() => {
    const initialValues: { [key: string]: any } = {};
    fields.forEach((field) => {
      initialValues[field.name] = field.value || '';
    });
    setFormValues(initialValues);
  }, [fields]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: any) => {
    const field = fields.find((field) => field.name === name);
    if (field && field.validators) {
      for (const validator of field.validators) {
        if (!validator(value)) {
          setFormErrors((prev) => ({
            ...prev,
            [name]: capitalize(`${field.label || name} is invalid!`),
          }));
          return;
        }
      }
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    fields.forEach((field) => {
      validateField(field.name, formValues[field.name]);
      if (formErrors[field.name]) {
        errors[field.name] = formErrors[field.name];
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormInvalid(true);
      setFormErrors(errors);
    } else {
      setFormInvalid(false);
      onSubmit(formValues);
    }
  };

  return (
    <div className="card mt-3 bg-base-200">
      <div className="card-body">
        {formInvalid && (
          <div role="alert" className="alert alert-error">
            Please correct the errors in the form before submitting.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {fields.map((field) => (
              <div className="form-control" key={field.name}>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    className="textarea textarea-bordered w-full"
                    placeholder={field.placeholder || ''}
                    value={formValues[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                ) : (
                  <div className="input-group input-group-sm">
                    {field.options ? (
                      field.type === 'select' ? (
                        <select
                          id={field.name}
                          className="select w-full"
                          value={formValues[field.name]}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                        >
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                      ) : (
                        field.type === 'radio' &&
                        field.options.map((option) => (
                          <div className="form-check" key={option.value}>
                            <input
                              type="radio"
                              className="form-check-input"
                              id={option.value}
                              value={option.value}
                              checked={formValues[field.name] === option.value}
                              onChange={() =>
                                handleChange(field.name, option.value)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={option.value}
                            >
                              {option.value}
                            </label>
                          </div>
                        ))
                      )
                    ) : (
                      <label
                        className="input input-bordered flex items-center gap-2"
                        htmlFor={field.name}
                      >
                        {capitalize(field.label || field.name)}
                        {field.required && (
                          <span className="text-danger">*</span>
                        )}
                        <input
                          type={field.type}
                          id={field.name}
                          className="grow"
                          placeholder={field.placeholder || ''}
                          value={formValues[field.name]}
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                        />
                      </label>
                    )}
                  </div>
                )}

                {formErrors[field.name] && (
                  <div className="text-warning">
                    <small>{formErrors[field.name]}</small>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formInvalid}
            >
              Submit
            </button>
            {showCancel && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
