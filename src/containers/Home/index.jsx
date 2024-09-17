import React from "react"

import HomeLogo from '../../assets/Home-logo.svg'
import {Container, HomeImg} from './styles.js'
import {CategoryCarousel, OffersCarousel, Header} from '../../components';


export function Home() {

    return (
        <Container>
            <Header/>
            <HomeImg src={HomeLogo} alt='logo da home'/>
            <CategoryCarousel/>
            <OffersCarousel/>
        </Container>
    );
}

