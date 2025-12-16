import Feed from "./components/Feed/Feed.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app-container">
        <LogIn />
      </div>
    </>
  );
}

export default App;
