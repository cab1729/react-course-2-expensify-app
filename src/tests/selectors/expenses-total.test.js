import moment from 'moment';
import getExpensesTotal from '../../selectors/expenses-total.js';

const expenses = [{
    id: '1',
    description: 'Gin',
    note: '',
    amount: 195,
    createdAt: 0
},{
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
},{
    id: '3',
    decripttion: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}];

test('Should correctly add up expenses', () => {
    const totalExp = getExpensesTotal(expenses);
    expect(totalExp).toBe(114195);
});

test('Should return 0 for empty expenses array', () => {
    const totalExp = getExpensesTotal([]);
    expect(totalExp).toBe(0);
});

test('Should correctly add up a single expense', () => {
    const totalExp = getExpensesTotal([expenses[1]]);
    expect(totalExp).toBe(109500);
});