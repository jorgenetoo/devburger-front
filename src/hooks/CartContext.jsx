import React, { createContext, useContext, useEffect, useState } from "react";

import PropTypes from 'prop-types'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])

    const putProductIncCart = async product => {
        const cartIndex = cartProducts.findIndex(prd => prd.id === product.id)

        let newCartProducts = []
        if (cartIndex >= 0) {
            newCartProducts = cartProducts
            newCartProducts[cartIndex].quantity = newCartProducts[cartIndex].quantity + 1
            setCartProducts(newCartProducts)

        } else {
            product.quantity = 1
            newCartProducts = ([...cartProducts, product])
            setCartProducts(newCartProducts)
        }

        await localStorage.setItem('codeburger:cartInfo', JSON.stringify(newCartProducts))
    }

    useEffect(() => {
        const loadUserDate = async () => {
            const clienCartData = await localStorage.getItem('codeburger:cartInfo')

            if (clienCartData) {
                setCartProducts(JSON.parse(clienCartData))
            }

        }
        loadUserDate()

    }, [])

    return (
        <CartContext.Provider value={{ putProductIncCart, cartProducts }}>
            {children}
        </CartContext.Provider>
    )

}

export const userCart = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('userCart must be used with UserContext')
    }

    return context
}

CartProvider.propTypes = {
    children: PropTypes.node
}