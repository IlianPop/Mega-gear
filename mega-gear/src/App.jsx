import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Main } from './pages/main';
import { Katalog } from './pages/katalog';
import { Konfigurator } from './pages/konfigurator';
import { Kontakty } from './pages/kontakty';
import { Porivnyannya } from './pages/porivnyannya';
import './styles/style.css';
class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <Link to="/">Головна</Link>
                    <Link to="/katalog">Каталог</Link>
                    <Link to="/konfigurator">Конфігуратор</Link>
                    <Link to="/poryvnyannya">Порівняння</Link>
                    <Link to="/kontakty">Контакти</Link>
                </header>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/katalog" element={<Katalog />} />
                    <Route path="/konfigurator" element={<Konfigurator />} />
                    <Route path="/poryvnyannya" element={<Porivnyannya />} />
                    <Route path="/kontakty" element={<Kontakty />} />
                    <Route path="/to_k" element={<Katalog />} />
                </Routes>
            </div>
        );
    }
}
export default App;
