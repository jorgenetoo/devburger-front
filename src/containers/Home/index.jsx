import React from "react"

import HomeLogo from '../../assets/Home-logo.svg'
import {Container, HomeImg} from './styles.js'
import CategoryCarousel from '../../components/CategoryCarousel';
import OffersCarousel from "../../components/OffersCarousel/index.jsx";

function Home() {

    return (
        <Container>
            <HomeImg src={HomeLogo} alt='logo da home'/>
            <CategoryCarousel/>
            <OffersCarousel/>
        </Container>
    );
}

export default Home