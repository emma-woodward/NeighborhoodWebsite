import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

const setCookies =(sessionId)=>{
  let cookie = 'sessionId=';
  sessionId === null ? cookie += '' : cookie += sessionId;
  document.cookie = cookie;
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [count, setCount] = useState(0);

  useEffect(()=>{
    const name = 'sessionid=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const grabbedSessionId = decodedCookie.substring(name.length, decodedCookie.length);
    if(grabbedSessionId.length > 0){
      setCurrentUser({
        sessionId: grabbedSessionId,
      });
    }
    setCount(100);
  }, [count]);

  async function login(email, password) {
    try {
        await fetch("/login", {
         method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.error) {
                throw json.error;
            } else {
              setCurrentUser({
                sessionId: json.sessionId,
              });
              setCookies(json.sessionId);
            }
          })
          .catch((e) => {
              throw e;
          });
      } catch (e) {
        throw e;
      }
  }
  function logout() {
    if (currentUser) {
      try {
        fetch("/logout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: currentUser.sessionId,
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            setCurrentUser(null);
            setCookies(null);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
    }
  }

  async function resetPassword(oldPass, newPass) {
    if (currentUser) {
      try {
        await fetch("/reset_password", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: currentUser.sessionId,
            newPassword: newPass,
            oldPassword: oldPass
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.error) {
                throw json.error;
            } else {
              setCurrentUser({
                sessionId: json.sessionId,
              });
              setCookies(json.sessionId);
            }
          });
      } catch (e) {
        throw e;
      }
    }
  }

  const value = {
    currentUser,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
