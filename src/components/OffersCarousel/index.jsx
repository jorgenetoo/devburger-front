import React, { useEffect, useState } from "react"
import Carousel from 'react-elastic-carousel'

import Offers from '../../assets/offers.png'
import { Container, CategoryImg, ContainerItems, Image, Button } from './styles.js'
import api from '../../services/api';
import formatCurrency from '../../utils/formatCurrency.jsx'
import { useCart } from '../../hooks/CartContext'
import { useNavigate } from 'react-router-dom'



export function OffersCarousel() {
    const [offers, setOffers] = useState([])
    const { putProductInCart } = useCart()
    const navigate = useNavigate()

    useEffect(() => {
        async function loadOffers() {
            const { data } = await api.get("/products")

            const onlyOffers = data
                .filter(products => products.offer)
                .map(product => {
                    return { ...product, formatedPrice: formatCurrency(product.price) }
                })

            setOffers(onlyOffers)

        }

        loadOffers()
    }, [])

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 400, itemsToShow: 2 },
        { width: 600, itemsToShow: 3 },
        { width: 900, itemsToShow: 4 },
        { width: 1300, itemsToShow: 5 },
    ]

    return (
        <Container>
            <CategoryImg src={Offers} alt='logo da oferta' />

            <Carousel itemsToShow={5} style={{ width: '90%' }} breakPoints={breakPoints}>
                {
                    offers && offers.map(products => (
                        <ContainerItems key={products.id}>
                            <Image src={products.url} alt='foto do produto' />
                            <p>{products.name}</p>
                            <p>{products.formatedPrice}</p>
                            <Button onClick={() => {
                                putProductInCart(products)
                                navigate('/carrinho')
                            }
                            }>peça agora</Button>
                        </ContainerItems>

                    ))
                }
            </Carousel>
        </Container>
    )
}

