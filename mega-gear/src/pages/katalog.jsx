import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Sidebar = styled.div`
    width: 150px;
    margin-right: 16px;
`;
const Contacts = styled.div`
    background-color: #ffd54f;
    padding: 20px;
    border-radius: 10px;
    margin-right: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 250px;
`;
const StyledLink = styled.p`
    cursor: pointer;
    color: color: #574A19;;
    text-decoration: none;
    margin-bottom: 80px;
    transition: all 0.3s ease;
    &:hover {
        font-size: 1.2em;
    }
`;

const Content = styled.div`
    flex: 1;
`;

const Title = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-top: -20px;
`;

const CarList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    overflow-y: auto;
    max-height: 430px;
`;

const CarItem = styled.div`
    width: 250px;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
    background-color: rgba(88, 77, 77, 0.55);
`;
const CarImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
`;
const KatalogWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: 16px;
    padding-top: 80px;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    margin-top: -80px;
`;

const Katalog = () => {
    const [cars, setCars] = useState([]);
    const [category, setCategory] = useState('Europian');
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:4000/api/cars/${category}/cou`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Помилка отримання даних');
                }
                return response.json();
            })
            .then((data) => setCars(data))
            .catch((error) => console.error('Помилка:', error));
    }, [category]);
    const handleCarClick = (carName) => {
        navigate(`/konfigurator/${carName}`);
    };
    return (
        <KatalogWrapper>
            <Container>
                <Contacts>
                    <Sidebar>
                        <StyledLink onClick={() => setCategory('Europian')}>Europian</StyledLink>
                        <StyledLink onClick={() => setCategory('American')}>American</StyledLink>
                        <StyledLink onClick={() => setCategory('Japan')}>Japan</StyledLink>
                        <StyledLink onClick={() => setCategory('Tuning')}>Tuning</StyledLink>
                    </Sidebar>
                </Contacts>
                <Content>
                    <Title>Каталог</Title>
                    <CarList>
                        {cars.length > 0 ? (
                            cars.map((car) => (
                                <CarItem key={car._id} onClick={() => handleCarClick(car.name)}>
                                    <h3>{car.name}</h3>
                                    <p>Категорія: {car.category}</p>
                                    <p>Двигуни: {car.engines.join(', ')}</p>
                                    <p>Коробки: {car.gearboxes.join(', ')}</p>
                                    <p>Комплектація: {car.completeSet.join(', ')}</p>
                                    <p>Кольори: {car.color.join(', ')}</p>
                                    {car.photo && <CarImage src={car.photo} alt={`${car.name} photo`} />}
                                </CarItem>
                            ))
                        ) : (
                            <p>Немає доступних автомобілів.</p>
                        )}
                    </CarList>
                </Content>
            </Container>
        </KatalogWrapper>
    );
};

export { Katalog };
