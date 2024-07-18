export function TodoList({ id, value, completed, toggleTodo, deleteTodo }) {
  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
          data-list-item-checkbox
        />
        <span data-list-item-text>{value}</span>
      </label>
      <button data-button-delete onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </li>
  )
}
