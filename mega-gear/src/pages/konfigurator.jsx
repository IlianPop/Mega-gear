import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Contacts = styled.div`
    background-color: #ffd54f;
    padding: 20px;
    border-radius: 10px;
    margin-right: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 250px;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    max-width: 1000px;
    width: 100%;
    margin: 20px auto 0;
`;

const ImageContainer = styled.div`
    margin-left: 20px;
    img {
        width: 600px;
        height: auto;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const Konfigurator = () => {
    const { carName } = useParams();
    const [engines, setEngines] = useState([]);
    const [gearboxes, setGearboxes] = useState([]);
    const [color, setColors] = useState([]);
    const [completeSet, setCompletions] = useState([]);
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        fetch(`http://localhost:4000/api/cars/${carName}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Помилка при отриманні даних');
                }
                return response.json();
            })
            .then((data) => {
                setEngines(data[0]?.engines || []);
                setGearboxes(data[0]?.gearboxes || []);
                setColors(data[0]?.color || []);
                setCompletions(data[0]?.completeSet || []);
                setPhoto(data[0]?.photo || '');
            })
            .catch((error) => console.error('Помилка:', error));
    }, [carName]);

    return (
        <div>
            <Container>
                <Contacts>
                    <h3>Конфігуратор для автомобіля: {carName}</h3>

                    <label htmlFor="engines">Двигун:</label>
                    <select id="engines">
                        {engines.length > 0 ? (
                            engines.map((engine, index) => (
                                <option key={index} value={engine}>
                                    {engine}
                                </option>
                            ))
                        ) : (
                            <option disabled>Немає доступних двигунів</option>
                        )}
                    </select>

                    <label htmlFor="gearboxes">Коробка передач:</label>
                    <select id="gearboxes">
                        {gearboxes.length > 0 ? (
                            gearboxes.map((gearbox, index) => (
                                <option key={index} value={gearbox}>
                                    {gearbox}
                                </option>
                            ))
                        ) : (
                            <option disabled>Немає доступних коробок передач</option>
                        )}
                    </select>

                    <label htmlFor="colors">Колір:</label>
                    <select id="colors">
                        {color.length > 0 ? (
                            color.map((color, index) => (
                                <option key={index} value={color}>
                                    {color}
                                </option>
                            ))
                        ) : (
                            <option disabled>Немає доступних кольорів</option>
                        )}
                    </select>

                    <label htmlFor="completions">Комплектація:</label>
                    <select id="completions">
                        {completeSet.length > 0 ? (
                            completeSet.map((completion, index) => (
                                <option key={index} value={completion}>
                                    {completion}
                                </option>
                            ))
                        ) : (
                            <option disabled>Немає доступних комплектацій</option>
                        )}
                    </select>
                </Contacts>
                <ImageContainer>{photo && <img src={photo} alt={`${carName} Photo`} />}</ImageContainer>
            </Container>
        </div>
    );
};

export { Konfigurator };
