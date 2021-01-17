import React, { useContext, useState } from 'react'; 

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const[currentUser, setCurrentUser] = useState();
    
    function login(email, password){
        try{
            fetch("/login",{
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then((res)=> res.json()).then((json)=>{
                //TODO: Check if the reponse is an error and handle it
                setCurrentUser({
                    sessionId: json.sessionId
                })

                  if(currentUser){
                      console.log("FRONTEND: Logged in");
                  }
                  else{
                      console.log("FRONTEND: Did not log in...");
                  }

                  console.log(json.sessionId);
              });
        }
        catch(e){
            console.log(e);
        }
    }
    function logout(){
        if(currentUser){
            try{
                fetch("/logout",{
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({
                        sessionId: currentUser.sessionId
                    })
                  }).then((res)=> res.json()).then((json)=>{
                      setCurrentUser(null);
                      console.log(json);
                  });
            }
            catch(e){
                console.log(e);
            }
        }
        else{

        }
    }

    //TODO: 
    function resetPassword(){
        return null;
    }

    const value = {
        currentUser,
        login,
        logout
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}