import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Text1 = styled.div`
    position: absolute;
    top: 150px;
    left: 100px;
    font-family: 'Playfair Display', serif;
    color: #ffffff;
    font-size: 30px;
    font-weight: bold;
`;
const Text2 = styled.div`
    position: absolute;
    top: 300px;
    left: 100px;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    line-height: 43px;
`;
const Butt = styled.button`
    position: absolute;
    top: 410px;
    left: 80px;
    border-radius: 19px;
    height: 63px;
    width: 170px;
    border: none;
    background-color: #60b62b;
    color: #274116;
    font-family: 'Montserrat', system-ui;
    font-size: 24px;
    font-weight: bold;
    padding: 0;
    cursor: pointer;
    &:hover {
        background-color: #478124;
    }
`;

const Main = () => {
    return (
        <div>
            <Text2>
                <p>
                    Все про улюблені
                    <br />
                    авто мільйонів
                </p>
            </Text2>
            <Text1>
                <h1>
                    Автодилер
                    <br />
                    Mega gear
                </h1>
            </Text1>
            <Link to="/katalog">
                <Butt>Замовити</Butt>
            </Link>
        </div>
    );
};

export { Main };
