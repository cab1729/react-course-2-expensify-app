import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('Should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: expenses[1].id
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: '-1'
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('Should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: '4',
            description: 'Blow',
            note: '',
            amount: 55000,
            createdAt: moment(0)
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, action.expense]);
});

test('Should edit an expense', () => {
    const text = 'Note for expense 3';
    const action = {
        type: 'EDIT_EXPENSE',
        id: '3',
        updates: {
            note: text
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[2].note).toEqual(text);
});

test('Should not edit expense with id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            note: 'does not exist'
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('Should set expense', () => {
    const action = {
        type: 'SET_EXPENSE',
        expenses
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});