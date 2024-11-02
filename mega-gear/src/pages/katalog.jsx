import React from 'react';
import { Link } from 'react-router-dom';

const Katalog = () => {
    return (
        <div className="e1">
            <p>Каталог</p>
            <Link to="/katalog/priora">
                <button className="butt" type="button">
                    Замовити
                </button>
            </Link>
        </div>
    );
};

export { Katalog };
