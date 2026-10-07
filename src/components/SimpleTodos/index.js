import {Component} from 'react'

import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    inputValue: '',
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  addTodo = () => {
    const {inputValue, todosList} = this.state
    const value = inputValue.trim()

    if (value === '') {
      return
    }

    const words = value.split(/\s+/)
    const lastWord = words[words.length - 1]
    const numberOfTodos = Number(lastWord)

    let title = value
    let count = 1

    if (
      Number.isInteger(numberOfTodos) &&
      numberOfTodos > 0 &&
      words.length > 1
    ) {
      count = numberOfTodos
      title = words.slice(0, -1).join(' ')
    }

    const highestId =
      todosList.length > 0
        ? Math.max(...todosList.map(eachTodo => eachTodo.id))
        : 0

    const newTodos = []

    for (let i = 0; i < count; i += 1) {
      newTodos.push({
        id: highestId + i + 1,
        title,
        isCompleted: false,
      })
    }

    this.setState({
      todosList: [...todosList, ...newTodos],
      inputValue: '',
    })
  }

  deleteItem = id => {
    const {todosList} = this.state

    const filteredItems = todosList.filter(each => each.id !== id)

    this.setState({
      todosList: filteredItems,
    })
  }

  updateTodo = (id, updatedTitle) => {
    const {todosList} = this.state

    const updatedTodos = todosList.map(eachTodo => {
      if (eachTodo.id === id) {
        return {
          ...eachTodo,
          title: updatedTitle,
        }
      }

      return eachTodo
    })

    this.setState({
      todosList: updatedTodos,
    })
  }

  toggleTodo = id => {
    const {todosList} = this.state

    const updatedTodos = todosList.map(eachTodo => {
      if (eachTodo.id === id) {
        return {
          ...eachTodo,
          isCompleted: !eachTodo.isCompleted,
        }
      }

      return eachTodo
    })

    this.setState({
      todosList: updatedTodos,
    })
  }

  render() {
    const {todosList, inputValue} = this.state

    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="heading">Simple Todos</h1>

          <div className="add-todo-container">
            <input
              type="text"
              value={inputValue}
              onChange={this.onChangeInput}
              placeholder="Enter todo"
              className="todo-input"
            />

            <button
              type="button"
              className="add-button"
              onClick={this.addTodo}
            >
              Add
            </button>
          </div>

          <ul>
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteItem={this.deleteItem}
                updateTodo={this.updateTodo}
                toggleTodo={this.toggleTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos