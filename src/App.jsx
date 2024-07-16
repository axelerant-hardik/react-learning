// Create a TodoListItem component.
// Props: children = name; isComplete: boolean
// Checkbox: checked if complete
// Label (children value)

import { TodoListItem } from "./TodoListItem"

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        <TodoListItem isComplete={true}>Hardik Pandya</TodoListItem>
        <TodoListItem isComplete={false}>Virat Kohli</TodoListItem>
        <TodoListItem isComplete={true}>Rohit Sharma</TodoListItem>
      </ul>
    </div>
  )
}

export default App
