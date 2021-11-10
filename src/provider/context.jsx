import React, { createContext, useState } from 'react';


const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        id:undefined
    });


    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
    
};

export const UserContext = createContext();

export default UserProvider;