import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const HomePage = ({ isAuth, setIsAuth }) => {
  const [cookies] = useCookies();
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    const userId = cookies["user"][0].id;
    console.log(userId);
    try {
      await axios
        .get(`http://localhost:3000/check-auth/${userId}`)
        .then((res) => {
          console.log(res.data.user);
          setUser(res.data.user);
        });
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  if (isAuth) {
    useEffect(() => {
      if (isAuth) {
        getUserData();
      } else {
        setUser(null);
        setIsAuth(false);
      }
    }, []);

    return (
      <>
        <div>
          {/* User: {user.name} {user.surname} */}
          {user &&
            user.map((user) => (
              <div key={user.id}>
                <div>
                  <span>{user.name}</span>
                  <span>{user.surname}</span>
                </div>
                <div>{user.email}</div>
              </div>
            ))}
        </div>
      </>
    );
  }
  return <Navigate to="/login" />;
};

export default HomePage;
