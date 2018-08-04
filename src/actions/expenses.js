import uuid from 'uuid';
import database from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt };
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

export const removeExpense = ({ id = undefined }) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id
    }
});

export const startRemoveExpense = ({ id = undefined }) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
       return database.ref(`users/${uid}/expenses/${id}`).remove()
        .then(() => {
            dispatch(removeExpense({ id }));
        })
        .catch((e) => {
            console.log('Error removing expense', e);
        }); 
    };
};

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates)
        .then(() => {
            dispatch(editExpense(id, updates));
        })
        .catch((e) => {
            console.log('Error updating expense', e);
        });
    };
};

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const expenses = [];
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                expenses.push({ 
                    id: childSnapshot.key, 
                    ...childSnapshot.val() 
                })
            });
            dispatch(setExpenses(expenses));
        });
        
    };
};