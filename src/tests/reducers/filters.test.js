import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('Should set up default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY', sortBy: 'amount' });
    expect(state.sortBy).toBe('amount');
});

test('Should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY', sortBy: 'date' };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
    const text = 'cab1729';
    const action = { type: 'SET_TEXT_FILTER', text };
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
});

test('Should set start date filter', () => {
    const date = moment(0);
    const action = { type: 'SET_START_DATE', date };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(date);
});

test('Should set end date filter', () => {
    const date = moment(0);
    const action = { type: 'SET_END_DATE', date };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(date);
});