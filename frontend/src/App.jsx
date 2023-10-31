import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage isAuth={isAuth} />} />
        <Route
          path="/login"
          element={<LoginPage isAuth={isAuth} setIsAuth={setIsAuth} />}
        />
        <Route path="/register" element={<RegisterPage isAuth={isAuth} />} />
      </Routes>
    </div>
  );
}

export default App;
