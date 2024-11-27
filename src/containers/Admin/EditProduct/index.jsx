import React, { useEffect, useState } from "react"
import ReactSelect from 'react-select'
import { useForm, Controller } from "react-hook-form"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from 'react-router-dom'

import { Container, Label, Input, ButtonStyles, LabelUpload, ContainerInput } from './styles.js'
import api from '../../../services/api'
import { toast } from "react-toastify";

function EditProduct() {
    const [fileName, setFileName] = useState(null)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();
    const { state } = useLocation();
    const { product } = state || {};


    const schema = Yup.object().shape({
        name: Yup.string().required('Digite o nome do protudo'),
        price: Yup.string().required('Digite o preço do protudo'),
        category: Yup.object().required('Escolha uma categoria'),
        offer:Yup.bool()
        
    })


    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        const productDataFormData = new FormData()

        productDataFormData.append('name', data.name)
        productDataFormData.append('price', data.price)
        productDataFormData.append('category_id', data.category.id)
        productDataFormData.append('file', data.file[0])
        productDataFormData.append('offer', data.offer)

        await toast.promise(
            api.put(`products/${product.id}`, productDataFormData),
            {
                pending: 'Editando novo produto',
                success: 'Produto editado com sucesso',
                error: 'Falha ao editar o produto'
            })

        setTimeout(() => {
            navigate('/listar-produtos')
        }, 2000)
    }


    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get("categories");

            setCategories(data)

        }
        loadCategories();
    }, []);



    return (
        <Container>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label>Nome</Label>
                    <Input type="text" {...register('name')} defaultValue={product.name} />
                </div>

                <div>
                    <Label>Preço</Label>
                    <Input type="number"{...register('price')} defaultValue={product.price} />
                </div>

                <div>
                    <LabelUpload >
                        {fileName || (
                            <>
                                <CloudUploadIcon />
                                Carregue a imagem do produto
                            </>
                        )}

                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            {...register('file')}
                            onChange={value => {
                                setFileName(value.target.files[0]?.name)
                            }}
                        />
                    </LabelUpload>
                </div>

                <div>
                    <Controller
                        name='category'
                        control={control}
                        defaultValue={product.category}
                        render={({ field }) => {
                            return (
                                <ReactSelect
                                    {...field}
                                    options={categories}
                                    getOptionLabel={cat => cat.name}
                                    getOptionValue={cat => cat.id}
                                    placeholder="Categorias"
                                    defaultValue={product.category}
                                />
                            )
                        }}
                    >
                    </Controller>
                </div>

                <ContainerInput> 

                <input type="checkbox" 
                {...register('offer')} 
                defaultChecked={product.offer} />

                <Label>Produto em oferta</Label>
                </ContainerInput>

                <ButtonStyles>Editar produtos</ButtonStyles>

            </form>
        </Container>
    );
}

export default EditProduct