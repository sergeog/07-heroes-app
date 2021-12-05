import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen />', () => {
  test('debe mostrarse correctamente con los valores por defecto', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div.alert-info').text().trim()).toBe('Search a hero');
  });

  test('debe de mostrar a Batman y el input con el valor del queryString', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('input[name="searchText"]').prop('value')).toBe(
      'batman'
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de mostrar un error si no se encuentra el Hero', () => {
    const q = 'batman123';
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${q}`]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input[name="searchText"]').prop('value')).toBe(q);
    expect(wrapper.find('div.alert-danger').text().trim()).toBe(
      `There is no a hero with "${q}"`
    );
  });

  test('debe hacer el submit de la forma', () => {
    const historyMock = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route
          path="/search"
          component={() => <SearchScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchText',
        value: 'batman',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {},
    });

    expect(historyMock.push).toHaveBeenCalledWith(`?q=batman`);
  });
});
