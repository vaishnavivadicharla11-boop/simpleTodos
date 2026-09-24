// Write your code here
import './index.css'
const TodoItem = props => {
  const {todoDetails, deleteItem} = props
  const {title, id} = todoDetails
  const onDelete = () => {
    deleteItem(id)
  }
  return (
    <li>
      <div>
        <p>{title}</p>
        <button className="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  )
}
export default TodoItem
