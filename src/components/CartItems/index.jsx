import React from "react"

import { useCart } from "../../hooks/CartContext.jsx";
import { Container, Header, Body, EmptyCart } from './styles.js'
import formatCurrency from "../../utils/formatCurrency.jsx";


export function CartItems() {
    const { cartProducts , increaseProductQuantity, decreaseProductQuantity} = useCart()
    
    return (
        <Container>
            <Header>
                <p></p>
                <p>Itens</p>
                <p>Preço</p>
                <p style={{ paddingRight: 30 }}>Quantidade</p>
                <p>Total</p>
            </Header>

            {cartProducts && cartProducts.length > 0 ?
                cartProducts.map(product => (
                    <Body key={product.id}>
                        <img src={product.url} />
                        <p>{product.name}</p>
                        <p>{formatCurrency(product.price)}</p>
                        <div className="quantity-container">
                            <button onClick={()=> decreaseProductQuantity(product.id)}>-</button>
                            <p>{product.quantity}</p>
                            <button onClick={() => increaseProductQuantity(product.id)}>+</button>
                        </div>
                        <p>{formatCurrency(product.quantity * product.price)}</p>

                    </Body>
                ))
                : (
                    <EmptyCart>Carrinho Vazio</EmptyCart>
                )
            }
        </Container>
    );
}

