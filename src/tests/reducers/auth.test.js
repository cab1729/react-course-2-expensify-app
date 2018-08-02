import authReducer from '../../reducers/auth';

test('Should login and return uid', () => {
    const uid = '1592';
    const action = {
        type: 'LOGIN',
        uid: uid
    }
    const state = authReducer({}, action);
    expect(state).toEqual({uid: uid});
});

test('Should logout and return empty state', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({}, action);
    expect(state).toEqual({});
});