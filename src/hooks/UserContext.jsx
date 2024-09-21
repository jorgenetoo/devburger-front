import React, { createContext, useContext, useEffect, useState } from "react";

import PropTypes from 'prop-types'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({})

    const putUserData = async userInfo => {
        setUserData(userInfo)

        await localStorage.setItem('codeburger:userData', JSON.stringify(userInfo))
    }
    const logout = async () => {
        await localStorage.removeItem('codeburger:userData')
    }

    useEffect(() => {
        const loadUserDate = async () => {
            const clientInfo = await localStorage.getItem('codeburger:userData')

            if (clientInfo) {
                setUserData(JSON.parse(clientInfo))
            }

            console.log(JSON.parse(clientInfo))

        }
        loadUserDate()

    }, [])

    return (
        <UserContext.Provider value={{ putUserData, userData, logout }}>
            {children}
        </UserContext.Provider>
    )

}

export const userUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('userUser must be used with UserContext')
    }

    return context
}

UserProvider.propTypes = {
    children: PropTypes.node
}