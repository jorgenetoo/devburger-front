import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { api } from '../../services/api'
import { toast, ToastContainer } from "react-toastify"

import { Button } from '../../components/Button'
import Logo from '../../assets/Logo.svg'
import { Container, LeftContainer, RightContainer, Title, Form, InputContainer, Link } from "./styles"
import { useNavigate, useHistory } from "react-router-dom"
import { userUser } from "../../hooks/UserContext"

export function Login() {
    const history = useHistory()
    const { putUserData } = userUser()


    const navigate = useNavigate()
    const schema = yup
        .object({
            email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
            password: yup.string().min(6, 'Senha mínima de seis caracteres').required('Digite uma senha'),
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
        const response = await toast.promise(
            api.post('/sessions', {
                email: data.email,
                password: data.password,
            }),
            {
                pending: 'Verificando seus dados',
                success: {
                    render() {
                        setTimeout(() => {
                            navigate('/')
                        }, 2000)
                        return 'Seja Bem-vindo(a) 👌'
                    }
                },
                error: 'Email ou Senha Incorretos 🤯'
            }


        )

        putUserData(data)

        setTimeout(() => {
            history.push('/')
        }, 1000)


    }


    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt='logo-devburger' />
            </LeftContainer>
            <RightContainer>
                <Title>Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    <br />  Acesse com seu <span>Login e senha.</span>
                </Title>
                <Form form onSubmit={handleSubmit(onSubmit)}>
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
                    <Button type="submit" style={{ marginTop: 75, marginBottom: 25 }}>Entrar</Button>
                </Form>
                <p>
                    Não possui conta? <Link to='/cadastro'>Clique aqui.</Link>
                </p>
            </RightContainer>
        </Container>
    )
}