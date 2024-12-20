import React, { useEffect, useState } from "react"

import { Container, Img, EditIconStyles } from './styles.js'
import api from '../../../services/api'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import formatCurrency from "../../../utils/formatCurrency.jsx";
import { useNavigate } from "react-router-dom"
import paths from "../../../constants/paths.jsx";


function ListProducts() {
    const [products, SetProducts] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function loadOrders() {
            const { data } = await api.get("products");

            SetProducts(data);
        }
        loadOrders();
    }, []);

    function isOffer(offerStatus) {
        if (offerStatus) {
            return <CheckBoxIcon style={{ color: '#228B22' }} />
        }
        return <CancelIcon style={{ color: '#B22222' }} />
    }
    function editProduct(product) {
        navigate(paths.EditProduct, { state: { product } }); // Uso do navigate
      }
    
    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell >Preço</TableCell>
                            <TableCell align="center">Produto em Oferta</TableCell>
                            <TableCell align="center" >Imagem do produto</TableCell>
                            <TableCell >Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products &&
                            products.map((product) => (
                                <TableRow
                                    key={product.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.name}
                                    </TableCell>
                                    <TableCell >{formatCurrency(product.price)}</TableCell>
                                    <TableCell align="center"> {isOffer(product.offer)}</TableCell>
                                    <TableCell align="center" >
                                        <Img src={product.url} alt='imagem-produto' />
                                    </TableCell>
                                    <TableCell >
                                        <EditIconStyles onClick={() => editProduct(product)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default ListProducts