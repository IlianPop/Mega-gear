import React from 'react';
import styled from 'styled-components';
import image1 from './css/images/image.png';
import { Link } from 'react-router-dom';
const Lin = styled.button`
    margin-top: 100px;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
`;
const PageWrapper = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledImage = styled.img`
    max-width: 100%;
    height: auto;
    width: 700px;
    cursor: pointer;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
`;

const Contacts = styled.div`
    background-color: #ffd54f;
    padding: 20px;
    border-radius: 10px;
    margin-right: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 250px;
`;

const Title = styled.h2`
    font-size: 1.5em;
    margin-top: 0;
    color: #333;
`;

const Text = styled.p`
    margin: 5px 0;
    font-size: 1em;
    color: #333;
`;

const Kontakty = () => {
    return (
        <PageWrapper>
            <Container>
                <Contacts>
                    <Title>Контакти:</Title>
                    <Text>
                        <strong>Телефон:</strong> +380977777112
                    </Text>
                    <Text>
                        <strong>Пошта:</strong> IlianPop@gmail.com
                    </Text>
                    <Text>
                        <strong>Місто Рахів</strong>
                    </Text>
                    <Text>
                        <strong>Вулиця Карпатська 7</strong>
                    </Text>
                </Contacts>
                <a href="https://maps.app.goo.gl/4phvHhL8n49XBFYe7" target="_blank" rel="noopener noreferrer">
                    <StyledImage src={image1} alt="Карта" />
                </a>
                <Link to="/katalog">
                    <Link to="/log">
                        <Lin>А</Lin>
                    </Link>
                </Link>
            </Container>
        </PageWrapper>
    );
};

export { Kontakty };
