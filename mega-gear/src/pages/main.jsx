import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <p className="text2">
                Все про улюблені
                <br />
                авто мільйонів
            </p>
            <h1 className="text1">
                Автодилер
                <br />
                Mega gear
            </h1>
            <Link to="/katalog">
                <button className="butt" type="button">
                    Замовити
                </button>
            </Link>
        </div>
    );
};

export { Main };
