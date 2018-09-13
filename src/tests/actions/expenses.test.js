import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense, 
    addExpense, 
    removeExpense, 
    startRemoveExpense, 
    editExpense, 
    setExpenses, 
    startSetExpenses, 
    startEditExpense } from  '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismymockuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should set up remove expense action object', () => {
    const action = removeExpense({ id: '112358'});

    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        expense: {
            id: '112358'
        }
    });
});

test('Should set up add expense object', () => {
    const action = addExpense({ description: 'New expense test', amount: 5000 });

    expect(action).toMatchObject({
        type: 'ADD_EXPENSE',
        expense: {
            description: 'New expense test',
            amount: 5000
        }
    });
});

test('Should set up add expense action object with provided values', () =>{
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('Should add expense to database and store', (done) =>{
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('Should add expense with defaults to database and store', (done) =>{
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'expense with defaults',
        note: '',
        amount: 5000,
        createdAt: 0
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('Should remove expense from database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            expense: {
                id
            }
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

// test('Should set up add expense object with default values', () => {
//     const action = addExpense({});

//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             amount: 0,
//             note: '',
//             createdAt: 0
//         }
//     });
// });

test('Should set up edit expense object', () => {
    const action = editExpense(expenses[2].id, { note: 'new note value'});

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: expenses[2].id,
        updates: {
            note: 'new note value'
        }
    });
});

test('Should edit expense in database', (done) => {
    const store = createMockStore(defaultAuthState);
    const newnote = 'new note value';
    store.dispatch(startEditExpense(expenses[2].id, { note: newnote })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id: expenses[2].id,
            updates: {
                note: newnote
            }    
        });
        return database.ref(`users/${uid}/expenses/${expenses[2].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().note).toEqual(newnote);
        done();
    });
});

test('Should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('Should load expenses from database into store', () => {
    const store = createMockStore(defaultAuthState);

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });

        return database.ref(`users/${uid}/expenses`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(store.expenses);
    });
});