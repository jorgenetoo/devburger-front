import React from "react"

import CartLogo from '../../assets/cart-image.svg'
import {Container, CartImg} from './styles.js'
import {CartItems } from '../../components';


export function Cart() {

    return (
        <Container>
            <CartImg src={CartLogo} alt='logo do carrinho'/>
            <CartItems/>
        </Container>
    );
}

