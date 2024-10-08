import React from "react"

import LogoutIcon from '@mui/icons-material/Logout';

import { userUser } from "../../hooks/UserContext.jsx";
import { Container,ItemContainer,ListLink  } from './styles.js'
import listLinks from "./menu-list.jsx";

export function SideMenuAdmin() {
    const {logout} = userUser()
    return (
        <Container>
            <hr></hr>
            {listLinks.map( item =>(
            <ItemContainer key={item.id} isActive={true}>
                <item.icon className="icon"/>
                <ListLink tp={item.link}>{item.label}</ListLink>
            </ItemContainer>
            ))}
             <hr></hr>
             <ItemContainer style={{position:'absolute', bottom:'30px'}}>
                <LogoutIcon style={{color:'#ffffff'}}/>
                <ListLink to='/login' onClick={logout}>Sair</ListLink>
             </ItemContainer>
        </Container>
    );
}

