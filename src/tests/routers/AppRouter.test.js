import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import { AppRouter } from '../../routers/AppRouter';

describe('Pruebas en <AppRouter />', () => {
  test('debe mostrar el login si no está autenticado', () => {
    // Un objeto mock del contexto, simulando que no está autenticado
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: false,
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.contains('Login')).toBe(true);
  });

  test('debe mostrar el componente marvel si está autenticado', () => {
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
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper.find('.navbar').exists()).toBe(true);
  });
});
