import React from 'react';
import { Main } from '../../src/pages/main.jsx';
import { Katalog } from '../../src/pages/katalog.jsx';
import { Konfigurator } from '../../src/pages/konfigurator.jsx';
import { Kontakty } from '../../src/pages/kontakty.jsx';
import { Porivnyannya } from '../../src/pages/porivnyannya.jsx';
import { Logi } from '../../src/pages/log.jsx';
import { Admin_panel } from '../../src/pages/admin_panel.jsx';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'cypress/react';
describe('Main Component', () => {
    it('renders the component correctly', () => {
        mount(
            <MemoryRouter>
                <Main />
            </MemoryRouter>,
        );
        cy.contains('Автодилер').should('exist');
        cy.contains('Mega gear').should('exist');
        cy.contains('Все про улюблені').should('exist');
        cy.contains('авто мільйонів').should('exist');
        cy.get('button').contains('Замовити').should('exist');
        cy.get('button').should('have.css', 'background-color', 'rgb(96, 182, 43)');
        cy.get('a').should('have.attr', 'href', '/katalog');
    });
});
describe('Katalog Component', () => {
    it('renders the Katalog component correctly', () => {
        mount(
            <MemoryRouter>
                <Katalog />
            </MemoryRouter>,
        );
        cy.get('.e1').should('exist');
        cy.contains('Каталог').should('exist');
    });
});
describe('Konfigurator Component', () => {
    it('renders the Konfigurator component correctly', () => {
        mount(
            <MemoryRouter>
                <Konfigurator />
            </MemoryRouter>,
        );
        cy.contains('Конфігуратор').should('exist');
    });
});
describe('Porivnyannya Component', () => {
    it('renders the Porivnyannya component correctly', () => {
        mount(
            <MemoryRouter>
                <Porivnyannya />
            </MemoryRouter>,
        );
        cy.contains('Порівняння').should('exist');
    });
});
describe('Kontakty Component', () => {
    it('renders the Contacts component correctly', () => {
        mount(
            <MemoryRouter>
                <Kontakty />
            </MemoryRouter>,
        );
        cy.contains('Контакти:').should('exist');
        cy.contains('Телефон:').should('exist');
        cy.contains('Пошта:').should('exist');
        cy.contains('Місто Рахів').should('exist');
        cy.contains('Вулиця Карпатська 7').should('exist');
        cy.get('a').should('have.attr', 'href', 'https://maps.app.goo.gl/4phvHhL8n49XBFYe7');
        cy.get('img').should('have.attr', 'src').and('include', 'image.png');
        cy.get('img').should('have.attr', 'alt', 'Карта');
    });
});
describe('Logi Component', () => {
    it('renders the login form correctly', () => {
        mount(
            <MemoryRouter>
                <Logi />
            </MemoryRouter>,
        );
        cy.contains('Авторизація').should('exist');
        cy.get('input#login').should('exist');
        cy.get('input#password').should('exist');
        cy.get('button').contains('Увійти').should('exist');
    });

    it('displays an alert when login or password is incorrect', () => {
        cy.mount(
            <MemoryRouter>
                <Logi />
            </MemoryRouter>,
        );

        cy.get('input#login').type('wronguser');
        cy.get('input#password').type('wrongpass');
        cy.get('button').contains('Увійти').click();
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Невірний логін або пароль');
        });
    });

    it('redirects to /admin_panel when login and password are correct', () => {
        cy.mount(
            <MemoryRouter initialEntries={['/log']}>
                <Logi />
            </MemoryRouter>,
        );
    });
});
describe('Testing the add car form', () => {
    beforeEach(() => {
        mount(
            <MemoryRouter>
                <Admin_panel />
            </MemoryRouter>,
        );
    });
    it('Adds a car through the form', () => {
        cy.intercept('POST', 'http://localhost:4000/api/cars').as('addCar');
        cy.get('input#Name').type('mercedes');
        cy.get('input#country').type('Europian');
        cy.get('input#engine').type('TDI');
        cy.get('input#color').type('Black');
        cy.get('input#box').type('Auto');
        cy.get('input#comp').type('Lux');
        cy.get('.handleAdd').should('be.enabled').click();
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Автомобіль успішно додано!');
        });
    });
});
describe('Car search testing', () => {
    beforeEach(() => {
        mount(
            <MemoryRouter>
                <Admin_panel />
            </MemoryRouter>,
        );
        cy.intercept('GET', 'http://localhost:4000/api/cars*').as('searchCar');
    });
    it('Searches for a car by name', () => {
        cy.get('input#Name').type('mercedes');
        cy.get('.handleSearch').click();
        cy.get('input#country').should('have.value', 'Europian');
    });
});
describe('Vehicle removal testing', () => {
    beforeEach(() => {
        mount(
            <MemoryRouter>
                <Admin_panel />
            </MemoryRouter>,
        );
    });
    it('Deletes a car through a form', () => {
        cy.get('input#Name').type('mercedes');
        cy.get('.handleDell').should('be.enabled').click();
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Автомобіль успішно видалено!');
        });
    });
});
