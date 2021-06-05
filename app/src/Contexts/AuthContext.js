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
                console.log(json.error);
                console.log(json.success);
                console.log(json);
                if(json.success){
                    setCurrentUser({
                        sessionId: json.sessionId
                    })
                }
                else{
                    
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

    function resetPassword(newPassword){
        if(currentUser){
            try{
                fetch("/reset_password",{
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({
                        sessionId: currentUser.sessionId,
                        newPassword: newPassword
                    })
                  }).then((res)=> res.json()).then((json)=>{
                      console.log(json);
                  });
            }
            catch(e){
                console.log(e);
            }
        }
        else{
            //TODO: Handle this
        }
    }

    const value = {
        currentUser,
        login,
        logout,
        resetPassword
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}