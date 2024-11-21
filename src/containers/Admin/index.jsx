import React from "react";

import { Container, ContainerItems } from "./styles";
import ListProducts from "./ListProducts";
import Orders from "./Orders";
import { SideMenuAdmin } from "../../components";
import PropTypes from "prop-types";
import paths from "../../constants/paths";
import { useLocation } from "react-router-dom";
import NewProduct from "./NewProduct";
import EditProduct from "./NewProduct";


export function Admin() {
    const location = useLocation();
    const path = location.pathname; // ou conforme necessário
  
    return (
      <Container>
        <SideMenuAdmin path={path} />
        <ContainerItems>
          {path === paths.Order && <Orders />}
          {path === paths.Products && <ListProducts />}
          {path === paths.NewProduct && <NewProduct />}
          {path === paths.EditProduct && <EditProduct />}
        </ContainerItems>
      </Container>
    );
  }

Admin.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string
    })
}