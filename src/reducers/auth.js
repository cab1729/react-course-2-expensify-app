export default (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                uid: action.uid,
                user: action.user
            }
        case 'LOGOUT':
            return {}
        default:
            return state
    };
};