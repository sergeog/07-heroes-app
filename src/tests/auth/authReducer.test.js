// const state = {
//   name: 'Serge',
//   logged: true,
// };

import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {
  test('debe retornar el estado por defecto', () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test('debe de autenticar y colocar el name del usuario', () => {
    const user = {
      name: 'Serge',
    };

    const action = {
      type: types.login,
      payload: user,
    };

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({ ...action.payload, logged: true });
  });

  test('debe de borrar el name el usuario y logged en false', () => {
    const action = {
      type: types.logout,
    };

    const state = authReducer({ logged: true, name: 'Serge' }, action);
    expect(state).toEqual({ logged: false });
  });
});
