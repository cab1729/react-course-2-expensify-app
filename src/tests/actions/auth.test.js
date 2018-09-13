import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLogin, startLogout } from '../../actions/auth';

const createMockStore = configureMockStore([thunk]);

test('Should login', () => {
    const store = createMockStore({});
    const uid = '1592';

    store.dispatch(login(uid));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
        type: 'LOGIN',
        uid: uid
    });
});

test('Should logout', () => {
    const store = createMockStore({});
    
    store.dispatch(logout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
        type: 'LOGOUT'
    });
});