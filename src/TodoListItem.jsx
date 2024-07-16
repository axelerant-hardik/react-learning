export function TodoListItem({ children, isComplete }) {
  const bgColor = isComplete ? "green" : "red"
  const width = "50%"
  return (
    <li style={{ backgroundColor: bgColor, width: width }}>
      <input type="checkbox" checked={isComplete} />
      <label for="list">{children}</label>
    </li>
  )
}
