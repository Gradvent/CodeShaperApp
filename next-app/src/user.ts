
import React from "react";

interface User {
    id: number,
    name: string,
    email: string,
    logged: boolean,
    logout: () => void
}

export type UserData = User | undefined

export const UserContext = React.createContext<UserData>(undefined)
