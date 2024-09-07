import React from 'react'

import PropTypes from 'prop-types'

import { userCart } from '../../hooks/CartContext'
import {Button} from '../Button'
import { Container, Image, ProductName, ProductPrice } from './styles'

export function CardProduct({ product }) {
    const { putProductInCart}= userCart()
    return (
        <Container>
            <Image src={product.url} alt= 'imagem do produto'/>
            <div>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.formatedPrice}</ProductPrice>
            <Button onClick={()=> putProductInCart(product)}>Adicionar</Button>
            </div>
        </Container>
    )
}


CardProduct.propTypes = {
    product: PropTypes.object
}