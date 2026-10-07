import {useState} from 'react'

import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteItem, updateTodo, toggleTodo} = props
  const {title, id, isCompleted} = todoDetails

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const onDelete = () => {
    deleteItem(id)
  }

  const onEdit = () => {
    setEditedTitle(title)
    setIsEditing(true)
  }

  const onSave = () => {
    const updatedTitle = editedTitle.trim()

    if (updatedTitle === '') {
      return
    }

    updateTodo(id, updatedTitle)
    setIsEditing(false)
  }

  const onChangeEditedTitle = event => {
    setEditedTitle(event.target.value)
  }

  const onChangeCheckbox = () => {
    toggleTodo(id)
  }

  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={isCompleted || false}
          onChange={onChangeCheckbox}
          className="todo-checkbox"
        />

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={onChangeEditedTitle}
            className="edit-input"
          />
        ) : (
          <p className={isCompleted ? 'todo-title completed' : 'todo-title'}>
            {title}
          </p>
        )}

        {isEditing ? (
          <button
            type="button"
            className="button"
            onClick={onSave}
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            className="button"
            onClick={onEdit}
          >
            Edit
          </button>
        )}

        <button
          type="button"
          className="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem