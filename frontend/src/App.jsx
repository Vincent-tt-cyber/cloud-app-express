import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AuthForm from "./Components/AuthForm/AuthForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthForm />
    </>
  );
}

export default App;
