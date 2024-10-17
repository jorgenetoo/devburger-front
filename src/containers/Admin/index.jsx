import React from "react";

import { Container, ContainerItems } from "./styles";
import ListProducts from "./ListProducts";
import Orders from "./Orders";
import { SideMenuAdmin } from "../../components";
import PropTypes from "prop-types";
import paths from "../../constants/paths";
import { useLocation } from "react-router-dom";


export function Admin({path}) {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <Container>
            <SideMenuAdmin path={path}/>
            <ContainerItems>
                {pathname === paths.Order && <Orders/>}
                {pathname === paths.Products && <ListProducts />}                
            </ContainerItems>
        </Container>
    )
}

Admin.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string
    })
}