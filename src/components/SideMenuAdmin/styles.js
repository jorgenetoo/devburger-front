import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
background: #3c3c3c;
box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.15);
width: 300px;
top: 0px;
left: 0px;
padding: 10px;

hr{
    margin: 50px 15px;
}

`
export const ItemContainer = styled.div`
height: 60px;
display: flex;
align-items: center;
background:${props => props.isActive ? '#565656' : 'none'} ;
border-radius: 2px;
margin: 8px;
padding-left: 25px;

.icon{
    color: white;
    border: 0.4px solid #FFFFFF;
    
}

`
export const ListLink = styled(Link)`
font-size: 20px;
font-weight: normal;
line-height: 19px;
color: #FFFFFF;
font-style: normal;
text-decoration: none;
margin-left: 8px;
`
