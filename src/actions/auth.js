import { firebase, googleAuthProvider, facebookAuthProvider } from '../firebase/firebase';

export const login = (uid, user) => ({
    type: 'LOGIN',
    uid,
    user
});

export const startLogin = () => {
    
    return (dispatch) => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
            .then((result) => {
                const user = result.user;
                //dispatch(login(user.uid, user));
            });
    };
};

export const startLoginFB = () => {
    
    return (dispatch) => {
        return firebase.auth().signInWithPopup(facebookAuthProvider)
            .then((result) => {
                const user = result.user;
                //dispatch(login(user.uid, user));
            });
    };
};

export const logout = () => ({
    type: 'LOGOUT'   
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};
