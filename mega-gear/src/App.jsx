import React from 'react';
import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
import { Main } from './pages/main';
import { Katalog } from './pages/katalog';
import { Konfigurator } from './pages/konfigurator';
import { Kontakty } from './pages/kontakty';
import { Porivnyannya } from './pages/porivnyannya';
import { Logi } from './pages/log';
import { Admin_panel } from './pages/admin_panel';
import image2 from './styles/images/Pegeot.jpg';

const BodyWrapper = styled.div`
    font-family: Arial, sans-serif;
    background-image: url(${image2});
    background-size: cover;
    background-position: center;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #9b8d58;
    font-size: 20px;
    font-weight: bold;

    &:hover {
        color: #85763f;
    }
`;

class App extends React.Component {
    gettingcar = async () => {
        const api_url = await fetch('http://localhost:4000/api/cars/Jaguar_X-type_2004');
        const data = await api_url.json();
        return data;
    };

    render() {
        return (
            <BodyWrapper>
                <Header>
                    <StyledLink to="/">Головна</StyledLink>
                    <StyledLink to="/katalog">Каталог</StyledLink>
                    <StyledLink to="/konfigurator">Конфігуратор</StyledLink>
                    <StyledLink to="/poryvnyannya">Порівняння</StyledLink>
                    <StyledLink to="/kontakty">Контакти</StyledLink>
                </Header>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/katalog" element={<Katalog />} />
                    <Route path="/konfigurator/:id" element={<Konfigurator gettingcar={this.gettingcar} />} />
                    <Route path="/poryvnyannya" element={<Porivnyannya />} />
                    <Route path="/kontakty" element={<Kontakty />} />
                    <Route path="/log" element={<Logi />} />
                    <Route path="/admin_panel" element={<Admin_panel />} />
                </Routes>
            </BodyWrapper>
        );
    }
}

export default App;
