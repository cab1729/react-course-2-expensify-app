import { addExpense, removeExpense, editExpense } from  '../../actions/expenses';

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
            amount: 5000,
            note: '',
            createdAt: 0
        }
    });
});

test('Should set up add expense object with default values', () => {
    const action = addExpense({});

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            amount: 0,
            note: '',
            createdAt: 0
        }
    });
});

test('Should set up edit expense object', () => {
    const action = editExpense('112358', { note: 'new note value'});

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '112358',
        updates: {
            note: 'new note value'
        }
    });
});