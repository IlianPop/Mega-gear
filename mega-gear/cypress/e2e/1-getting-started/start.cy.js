describe('Navigation and Content Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('should navigate to the Main page and check content', () => {
        cy.contains('Автодилер').should('be.visible');
        cy.get('button').contains('Замовити').should('be.visible');
    });
    it('should navigate to Katalog page and check content', () => {
        cy.get('header').contains('Каталог').click();
        cy.url().should('include', '/katalog');
        cy.contains('Каталог').should('be.visible');
    });
    it('should navigate to Konfigurator page and check content', () => {
        cy.get('header').contains('Каталог').click();
        cy.contains('Конфігуратор').click();
        cy.url().should('include', '/konfigurator');
        cy.contains('Конфігуратор').should('be.visible');
    });
    it('should navigate to Porivnyannya page and check content', () => {
        cy.get('header').contains('Каталог').click();
        cy.contains('Порівняння').click();
        cy.url().should('include', '/poryvnyannya');
        cy.contains('Порівняння').should('be.visible');
    });
    it('should navigate to Kontakty page and check content', () => {
        cy.get('header').contains('Контакти').click();
        cy.url().should('include', '/kontakty');
        cy.contains('Контакти:').should('be.visible');
        cy.contains('Телефон: +380977777112').should('be.visible');
        cy.contains('Пошта: IlianPop@gmail.com').should('be.visible');
        cy.contains('Місто Рахів').should('be.visible');
        cy.contains('Вулиця Карпатська 7').should('be.visible');
        cy.get('img[alt="Карта"]').should('be.visible');
    });
    it('should navigate to Log page and check content', () => {
        cy.get('header').contains('Контакти').click();
        cy.get('a[href="https://maps.app.goo.gl/4phvHhL8n49XBFYe7"]').trigger('mouseover');
        cy.get('a').contains('А').click();
        cy.url().should('include', '/log');
        cy.get('input#login').should('exist');
        cy.get('input#password').should('exist');
        cy.get('button.butt').should('exist');
    });
    it('should navigate to Admin_Panel page and check content', () => {
        cy.get('header').contains('Контакти').click();
        cy.get('a[href="https://maps.app.goo.gl/4phvHhL8n49XBFYe7"]').trigger('mouseover');
        cy.get('a').contains('А').click();
        cy.url().should('include', '/log');
        cy.get('input#login').should('exist');
        cy.get('input#password').should('exist');
        cy.get('button.butt').should('exist');

        cy.get('input#login').type('admin');
        cy.get('input#password').type('2005');
        cy.get('button.butt').click();
        cy.url().should('include', '/admin_panel');
        cy.get('.handleAdd').should('be.visible').and('contain', 'Додати');
        cy.get('.handleDell').should('be.visible').and('contain', 'Видалити');
        cy.get('.handleSearch').should('be.visible').and('contain', 'Знайти');
        cy.get('input[placeholder="Назва"]').should('exist');
        cy.get('input[placeholder="Категорія"]').should('exist');
        cy.get('input[placeholder="Двигун"]').should('exist');
        cy.get('input[placeholder="Колір"]').should('exist');
        cy.get('input[placeholder="Коробка"]').should('exist');
        cy.get('input[placeholder="Комплектація"]').should('exist');
        cy.get('button').contains('Додати фото').should('be.visible');
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
        cy.get('input#Name').clear();
        cy.get('input#country').clear();
        cy.get('input#engine').clear();
        cy.get('input#color').clear();
        cy.get('input#box').clear();
        cy.get('input#comp').clear();
        cy.get('input#Name').clear().type('mercedes');
        cy.get('.handleSearch').click();
        cy.get('input#country').should('have.value', 'Europian');
        cy.get('input#Name').clear();
        cy.get('input#country').clear();
        cy.get('input#engine').clear();
        cy.get('input#color').clear();
        cy.get('input#box').clear();
        cy.get('input#comp').clear();
        cy.get('input#Name').type('mercedes');
        cy.get('.handleDell').should('be.enabled').click();
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.contains('Автомобіль успішно видалено!');
        });
    });
});
