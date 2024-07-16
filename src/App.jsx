// Remove text Hi.
// Add label with prop set to inputId and any text.
// Add an input with id inputId, type number and value of 3 as a number.
function App() {
  return (
    <div id="largeDiv" className="large">
      <label htmlFor="inputId">Number</label>
      <input type="number" id="inputId" value={3} />
    </div>
  )
}

export default App
