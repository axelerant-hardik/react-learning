import { UserCard } from "./UserCard"
import { UserCardClass } from "./UserCardClass"
import "./assets/user.css"
import user from "./assets/user.json"

function App() {
  return (
    <div>
      <UserCard
        name={user.name}
        age={user.age}
        phoneNumber={user.phoneNumber}
        address={user.address}
      />
      <br />
      <UserCardClass
        name={user.name}
        age={user.age}
        phoneNumber={user.phoneNumber}
        address={user.address}
      />
    </div>
  )
}

export default App
