import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import ProductsLogo from '../../assets/Products-logo.svg';
import { Container, ProductsImg, CategoryButton, CategoriesMenu, ProductsContainer } from './styles.js';
import api from '../../services/api.js';
import { CardProduct } from "../../components";
import formatCurrency from "../../utils/formatCurrency.jsx";
import { useNavigate } from "react-router-dom";

export function Products() {
    const location = useLocation();
    const state = location.state || {};
    let categoryId = state.categoryId || 0;

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setfilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(categoryId);

    const navigate = useNavigate()

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get("/categories");
            const newCategories = [{ id: 0, name: 'Todas' }, ...data];
            setCategories(newCategories);
        }

        async function loadProducts() {
            const { data: allProducts } = await api.get("/products");
            const newProducts = allProducts.map(product => {
                return { ...product, formatedPrice: formatCurrency(product.price) };
            });
            setProducts(newProducts);
        }

        loadProducts();
        loadCategories();
    }, []);

    useEffect(() => {
        if (activeCategory === 0) {
            setfilteredProducts(products);
        } else {
            const newFilteredProducts = products.filter(product => product.category_id === activeCategory);
            setfilteredProducts(newFilteredProducts);
        }
    }, [activeCategory, products]);

    return (
        <Container>
            <ProductsImg src={ProductsLogo} alt='logo do produto' />
            <CategoriesMenu>
                {categories && categories.map(category => (
                    <CategoryButton
                        type='button'
                        key={category.id}
                        isActiveCategory={activeCategory === category.id}
                        onClick={() => {
                            setActiveCategory(category.id);
                        }}
                    >
                        {category.name}
                    </CategoryButton>
                ))}
            </CategoriesMenu>
            <ProductsContainer>
                {filteredProducts &&
                    filteredProducts.map(product => (
                        <CardProduct key={product.id} product={product} />
                    ))}
            </ProductsContainer>
        </Container>
    );
}