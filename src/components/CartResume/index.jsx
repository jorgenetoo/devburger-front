import React, { useState, useEffect } from "react"

import { Container } from './styles.js'
import { Button } from '../Button'
import formatCurrency from '../../utils/formatCurrency.jsx'
import { useCart } from "../../hooks/CartContext.jsx"
import api from '../../services/api.js'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { CartProvider } from "../../hooks/CartContext.jsx"

export function CartResume() {
    const [finalPrice, setFinalPrice] = useState(0)
    const [deliveryTax] = useState(5)

    const { cartProducts, clearCart } = useCart()

    const navigate = useNavigate()

  
    useEffect(() => {
        const sumAllItems = cartProducts.reduce((acc, current) => {
            return current.price * current.quantity + acc
        }, 0)
        setFinalPrice(sumAllItems)
    }, [cartProducts, deliveryTax])
    

    const submitOrder = async () => {
        const order = cartProducts.map(product => {
            return { id: product.id, quantity: product.quantity }
        })

        try {
            const { status } =
                await api.post('/orders', { products: order }, {

                    validateStatus: () => true,
                }
                )
            if (status === 200 || status === 201) {
                setTimeout(() => {
                    navigate('/')
                }, 2000)
                clearCart()
                toast.success('Pedido realizado com sucesso!')
            } else if (status === 409) {
                toast.error('Falha ao realizar seu pedido')
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error('😭 Falha no Sistema! Tente novamente')
        }


        // await toast.promise(api.post('ordes', { products: order}),{
        //     pending: 'Realizando o seu pedido...',
        //     success: 'Pedido realizado com sucesso',
        //     error: 'Falha ao realizar o seu pedido, tente novamente'
        // })


    }

    return (
        <div>
            <Container>
                <div className="container-top">
                    <h2 className="title">Resumo do pedido</h2>
                    <p className="items">Itens</p>
                    <p className="itens-price">{formatCurrency(finalPrice)}</p>
                    <p className="delivery-tax">Taxa de entrega</p>
                    <p className="delivery-tax-price">{formatCurrency(deliveryTax)}</p>
                </div>
                <div className="container-bottom">
                    <p>Total</p>
                    <p>{formatCurrency(finalPrice + deliveryTax)}</p>
                </div>

            </Container>
            <Button style={{ width: '100%', marginTop: 30 }} onClick={submitOrder}>
                Finalizar pedido
            </Button>
        </div>
    );
}

function App() {
    return (
      <CartProvider>
        <CartResume />
      </CartProvider>
    );
  }