import Feed from "./components/Feed/Feed.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";

function App() {
  return (
    <>
      <div className="app-container">
        <LogIn />
        <SignUp />
        <Feed />
      </div>
    </>
  );
}

export default App;
