import ingredientsMock from '../../fixtures/ingredients.json';
import orderMock from '../../fixtures/order.json';

const baseApiUrl = process.env.BURGER_API_URL ?? '';
const mocks = [
  {
    method: 'GET',
    path: 'api/ingredients',
    fixture: 'ingredients',
    name: 'ingredients'
  },
  {
    method: 'POST',
    path: 'api/orders',
    fixture: 'order',
    name: 'order',
    delay: 2000
  },
  {
    method: 'GET',
    path: 'api/auth/user',
    fixture: 'user-anon',
    name: 'user-anon',
    statusCode: 401
  }
];

beforeEach(() => {
  mocks.forEach(({ method, path, fixture, name, statusCode, delay }) =>
    cy
      .intercept(method, `${baseApiUrl}/${path}`, {
        fixture: `${fixture}.json`,
        statusCode: statusCode ?? 200,
        delay: delay ?? 0
      })
      .as(name)
  );
});

it('Базовая загрузка страницы', () => {
  cy.visit('/');
});

describe('Ингридиенты', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Добавление булки', () => {
    beforeEach(() => {
      const ingredientCard = cy.get(
        `[data-testid="ingredient-list-id-${ingredientsMock.data[0]._id}"]`
      );
      ingredientCard.find('button').click();
    });

    it('Добавление булки в конструктор работает', () => {
      cy.get(`[data-testid="burger-constructor-bun"]`).should(
        'contain.text',
        ingredientsMock.data[0].name
      );
      cy.get(`[data-testid="burger-constructor-bun"]`).should(
        'contain.text',
        ingredientsMock.data[0].price
      );
    });

    it('Правильно рассчитывается стоимость булок', () => {
      cy.get(`[data-testid="burger-constructor-total"]`).should(
        'contain.text',
        ingredientsMock.data[0].price * 2
      );
    });
  });

  describe('Добавление ингридиента', () => {
    beforeEach(() => {
      const ingredientCard = cy.get(
        `[data-testid="ingredient-list-id-${ingredientsMock.data[1]._id}"]`
      );
      ingredientCard.find('button').click();
    });

    it('Добавление ингридиента в конструктор работает', () => {
      cy.get(`[data-testid="burger-constructor-element-index-0"]`).should(
        'contain.text',
        ingredientsMock.data[1].name
      );
      cy.get(`[data-testid="burger-constructor-element-index-0"]`).should(
        'contain.text',
        ingredientsMock.data[1].price
      );
    });

    it('Правильно рассчитывается стоимость ингридиента', () => {
      cy.get(`[data-testid="burger-constructor-total"]`).should(
        'contain.text',
        ingredientsMock.data[1].price
      );
    });
  });
});

describe('Управление внутри конструктора', () => {
  beforeEach(() => {
    cy.visit('/');

    for (let i = 0; i < 5; ++i) {
      const ingredientCard = cy.get(
        `[data-testid="ingredient-list-id-${ingredientsMock.data[i]._id}"]`
      );
      ingredientCard.find('button').click();
    }
  });

  it('Перемещение в конструкторе работает', () => {
    const moveDownButton = cy
      .get(`[data-testid="burger-constructor-element-index-0"]`)
      .find('button')
      .eq(1);
    moveDownButton.click();

    cy.get(`[data-testid="burger-constructor-element-index-1"]`).should(
      'contain.text',
      ingredientsMock.data[1].name
    );

    const moveUpButton = cy
      .get(`[data-testid="burger-constructor-element-index-1"]`)
      .find('button')
      .eq(0);
    moveUpButton.click();

    cy.get(`[data-testid="burger-constructor-element-index-0"]`).should(
      'contain.text',
      ingredientsMock.data[1].name
    );
  });

  it('Удаление ингридиента работает', () => {
    const deleteButton = cy
      .get(`[data-testid="burger-constructor-element-index-0"]`)
      .find('.constructor-element__action');
    deleteButton.click();

    cy.get(`[data-testid="burger-constructor-element-index-0"]`).should(
      'contain.text',
      ingredientsMock.data[2].name
    );
    cy.get(`[data-testid="burger-constructor-element-index-1"]`).should(
      'contain.text',
      ingredientsMock.data[3].name
    );
  });
});

describe('Модальное окно ингридиента', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get(
      `[data-testid="ingredient-list-id-${ingredientsMock.data[3]._id}"]`
    ).click();
  });

  it('Модальное окно открывается', () => {
    cy.get(`[data-testid="ingredient-details"]`).should('exist');
  });

  it('Модальное окно содержит информацию о нужном ингридиенте', () => {
    cy.get(`[data-testid="modal"]`).should(
      'contain.text',
      ingredientsMock.data[3].name
    );
  });

  it('Закрытие модального окна ингридиента при клике на крестик', () => {
    cy.get(`[data-testid="modal-close-button"]`).click();
    cy.get(`[data-testid="modal"]`).should('not.exist');
  });

  it('Закрытие модального окна ингридиента при клике на оверлей', () => {
    cy.get('body').click(50, 50);
    cy.get(`[data-testid="modal"]`).should('not.exist');
  });
});

it('При прямом переходе вместо модального окна открывается страница', () => {
  cy.visit(`/ingredients/${ingredientsMock.data[0]._id}`);

  cy.get(`[data-testid="modal"]`).should('not.exist');
  cy.get(`[data-testid="ingredient-details"]`).should(
    'contain.text',
    ingredientsMock.data[0].name
  );
});

describe('Оформление заказа', () => {
  it('При оформлении неавторизованным происходит редирект на страницу логина', () => {
    cy.visit('/');
    for (let i = 0; i < 4; ++i) {
      const ingredientCard = cy.get(
        `[data-testid="ingredient-list-id-${ingredientsMock.data[i]._id}"]`
      );
      ingredientCard.find('button').click();
    }

    cy.get(`[data-testid="burger-constructor-total"] button`).click();
    cy.url().should('include', '/login');
  });

  describe('Авторизованный пользователь', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'mockToken');
      localStorage.setItem('refreshToken', 'mockToken');

      cy.intercept('GET', `${baseApiUrl}/api/auth/user`, {
        fixture: 'user.json'
      }).as('authUser');

      cy.visit('/');
      for (let i = 0; i < 4; ++i) {
        const ingredientCard = cy.get(
          `[data-testid="ingredient-list-id-${ingredientsMock.data[i]._id}"]`
        );
        ingredientCard.find('button').click();
      }
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });

    it('Отображается модалка ожидания оформления заказа', () => {
      cy.get(`[data-testid="burger-constructor-total"] button`).click();
      cy.get(`[data-testid="modal"]`).should('exist');
      cy.get(`[data-testid="modal"]`).should(
        'contain.text',
        'Оформляем заказ...'
      );

      cy.wait('@order');
      cy.get(`[data-testid="modal"]`).should('exist');
      cy.get(`[data-testid="modal"]`).should(
        'contain.text',
        orderMock.order.number
      );

      cy.get(`[data-testid="modal-close-button"]`).click();
      cy.get(`[data-testid="modal"]`).should('not.exist');

      cy.get(`[data-testid="burger-constructor-bun"]`).should('not.exist');
      cy.get(`[data-testid="burger-constructor-element-index-0"]`).should(
        'not.exist'
      );
    });
  });
});
