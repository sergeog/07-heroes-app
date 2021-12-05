import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';

describe('Pruebas en <DashboardRoutes />', () => {
  test('debe mostrarse correctamente', () => {
    // Un objeto mock del contexto, simulando que está autenticado
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: 'Serge',
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span.text-info').text().trim()).toBe('Serge');
  });
});
