import React from 'react';
import { useParams } from 'react-router-dom';
const Konfigurator = () => {
    const { id } = useParams();
    return (
        <div className="e1">
            <p>Конфігуратор</p>
            <p>ID: {id}</p> {/* Просто виводимо ID */}
        </div>
    );
};

export { Konfigurator };
