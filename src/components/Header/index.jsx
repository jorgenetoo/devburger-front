import React from "react"

import Person from '../../assets/person.png'
import Cart from '../../assets/cart.png'
import { useNavigate, useLocation } from 'react-router-dom'

import {
    Line,
    Container,
    ContainerLeft,
    ContainerRight,
    ContainerText,
    PageLink,
    PageLinkExit
} from './styles.js'


export function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Container>
            <ContainerLeft>
                <PageLink onClick={() => navigate('/')} isActive={currentPath === '/'}> Home </PageLink>
                <PageLink onClick={() => navigate('/produtos')} isActive={currentPath.includes === '/produtos'}> Ver Produtos </PageLink>
            </ContainerLeft>

            <ContainerRight>
                <PageLink onClick={() => navigate('/carrinho')}>
                    <img src={Cart} alt='carrinho' />
                </PageLink>

                <Line></Line>

                <PageLink>
                    <img src={Person} alt='logo-pessoa' />
                </PageLink>

                <ContainerText>
                    <p>Olá, Jorge</p>

                    <PageLinkExit>Sair</PageLinkExit >

                </ContainerText>

            </ContainerRight>
        </Container>
    );
}

