import React from "react"

import { userCart } from "../../hooks/CartContext.jsx";
import { Container, Header, Body } from './styles.js'
import formatCurrency from "../../utils/formatCurrency.jsx";


export function CartItems() {
const {cartProducts} = userCart()
    return (
        <Container>
            <Header>
                <p></p>
                <p>Itens</p>
                <p>Preço</p>
                <p>Quantidade</p>
                <p>Total</p>
            </Header>

{cartProducts && cartProducts.map( product => (            
            <Body key={product.id}>
              <img src={product.url}/>  
              <p>{product.name}</p>
              <p>{formatCurrency(product.price)}</p>
              <p>{product.quantity}</p>
              <p>{formatCurrency(product.quantity * product.price)}</p>

            </Body>
            ))}
        </Container>
    );
}

