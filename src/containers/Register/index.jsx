import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { api } from '../../services/api'
import { toast, ToastContainer } from "react-toastify"

import { Button } from '../../components/Button'
import Logo from '../../assets/Logo.svg'
import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link } from "./styles"
import { useNavigate } from "react-router-dom"

export function Register() {
    const navigate = useNavigate()
    const schema = yup
        .object({
            name: yup.string().required('O nome é obrigatório'),
            email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
            password: yup.string().min(6, 'Senha mínima de seis caracteres').required('Digite uma senha'),
            confirmPassword: yup.string().oneOf([yup.ref('password')], 'As senhas devem ser iguais').required('Confirma sua senha'),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    console.log(errors)

    const onSubmit = async (data) => {
        try {
            const { status } =
                await api.post('/users', {
                    name: data.name,
                    email: data.email,
                    password: data.password,

                },
                    {
                        validateStatus: () => true,
                    }
                )
            if (status === 200 || status === 201) {
                setTimeout(() => {
                    navigate('login')
                }, 2000)
                toast.sucess('Conta criada com sucesso!')
            } else if (status === 409) {
                toast.error('Email existente! Faça o login para continuar')
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error('😭 Falha no Sistema! Tente novamente')
        }
    }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt='logo-devburger' />
            </LeftContainer>
            <RightContainer>
                <Title>Criar Conta</Title>
                <Form form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label> Nome</label>
                        <input type="text" {...register("name")} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label> Email</label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label> senha</label>
                        <input type="password"{...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label> Confirmar Senha</label>
                        <input type="password" {...register("confirmPassword")} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>
                    <Button type="submit">CONFIRMAR CADASTRO</Button>
                </Form>
                <p>
                    Já possui conta? <Link to='/login'>Clique aqui.</Link>
                </p>
            </RightContainer>
        </Container>
    )
}


export default Register