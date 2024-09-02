import React from "react"

import HomeLogo from '../../assets/Home-logo.svg'
import {Container, HomeImg} from './styles.js'
import {CategoryCarousel, OffersCarousel} from '../../components';


export function Home() {

    return (
        <Container>
            <HomeImg src={HomeLogo} alt='logo da home'/>
            <CategoryCarousel/>
            <OffersCarousel/>
        </Container>
    );
}

