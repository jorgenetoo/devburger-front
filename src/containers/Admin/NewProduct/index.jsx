import React, { useEffect, useState } from "react"
import ReactSelect from 'react-select'
import { useForm, Controller } from "react-hook-form"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom'

import { Container, Label, Input, ButtonStyles, LabelUpload } from './styles.js'
import api from '../../../services/api'
import { toast } from "react-toastify";

function EditProduct() {
    const [fileName, setFileName] = useState(null)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();


    const schema = Yup.object().shape({
        name: Yup.string().required('Digite o nome do protudo'),
        price: Yup.string().required('Digite o preço do protudo'),
        category: Yup.object().required('Escolha uma categoria'),
        file: Yup.mixed().test('required', 'carregue um arquivo', value => {
            return value?.length > 0
        }),
    })

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        const productDataFormData = new FormData()

        productDataFormData.append('name', data.name)
        productDataFormData.append('price', data.price)
        productDataFormData.append('category_id', data.category.id)
        productDataFormData.append('file', data.file[0])

        await toast.promise(api.post('products', productDataFormData), {
            pending: 'Criando novo produto',
            success: 'Produto criado co sucesso',
            error: 'Falha ao crir o produto'
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
                    <Input type="text" {...register('name')} />
                </div>

                <div>
                    <Label>Preço</Label>
                    <Input type="number"{...register('price')} />
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
                        render={({ field }) => {
                            return (
                                <ReactSelect
                                    {...field}
                                    options={categories}
                                    getOptionLabel={cat => cat.name}
                                    getOptionValue={cat => cat.id}
                                    placeholder="Categorias"
                                />
                            )
                        }}
                    >
                    </Controller>
                </div>

                <ButtonStyles>Adicionar</ButtonStyles>

            </form>
        </Container>
    );
}

export default EditProduct