import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { PublicRoute } from '../../routers/PublicRoute';

describe('Pruebas en <PublicRoute />', () => {
  test('debe mostrar el componente si no está autenticado', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PublicRoute
          isAuthenticated={false}
          component={() => <span>Listo!</span>}
        />
      </MemoryRouter>
    );

    expect(wrapper.find('span').exists()).toBe(true);
  });

  test('debe bloquear el componente si está autenticado', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PublicRoute
          isAuthenticated={true}
          component={() => <span>Listo!</span>}
        />
      </MemoryRouter>
    );

    expect(wrapper.find('span').exists()).toBe(false);
  });
});
