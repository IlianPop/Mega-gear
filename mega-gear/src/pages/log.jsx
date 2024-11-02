import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-top: -100px;
`;
const InputField = styled.input`
    padding: 10px;
    background-color: #96823b;
    border: none;
    color: #423711 !important;
    -webkit-text-fill-color: #423711;
    border-radius: 14px;
    margin: 5px;
    &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px #96823b inset !important;
        -webkit-text-fill-color: #423711 !important;
    }
    &::placeholder {
        color: #423711;
    }
`;
const Contacts = styled.div`
    background-color: #ffd54f;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 220px;
    margin-right: 100px;
`;
const Buttt = styled.button`
    background-color: #418d35;
    border-radius: 14px;
    border: none;
    padding: 15px;
    color: white;
    margin: 5px;
`;
const Logi = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const validLogin = 'admin';
        const validPassword = '2005';
        if (login === validLogin && password === validPassword) {
            navigate('/admin_panel');
        } else {
            alert('Невірний логін або пароль');
            setPassword('');
        }
    };
    return (
        <Container>
            <Contacts>
                <p>Авторизація</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="login">Логін:</label>
                        <InputField type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Пароль:</label>
                        <InputField
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Buttt type="submit" className="butt">
                        Увійти
                    </Buttt>
                </form>
            </Contacts>
        </Container>
    );
};
export { Logi };
