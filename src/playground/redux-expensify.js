import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = ({ 
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0 } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        uuid: uuid(),
        description,
        note,
        amount,
        createdAt
    }
    
});

const removeExpense = ({ uuid = undefined}) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        uuid
    }
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY',
    sortBy: 'amount'
});

const sortByDate = () => ({
    type: 'SORT_BY',
    sortBy: 'date'
});

const setStartDate = (date = undefined) => ({
    type: 'SET_START_DATE',
    date
});

const setEndDate = (date = undefined) => ({
    type: 'SET_END_DATE',
    date
});

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(expense => expense.uuid !== action.expense.uuid);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.uuid === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            })
            
        default:
            return state;
    }
};

const filtersReducerDefaultState = [{ 
    text: '', 
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined 
}];

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY':
            return {
                ...state,
                sortBy: action.sortBy
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }
        default:
            return state;
    }
};

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = text !== '' || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? -1 : 1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? -1 : 1;
        }
    });
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer 
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log('filters: ', state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 500, createdAt: 11235 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Internet', amount: 100, createdAt: 10000 }));

// store.dispatch(removeExpense({ uuid: expenseTwo.expense.uuid }));

// const expenseThree = store.dispatch(addExpense({ description: 'Internet', amount: 100 }));

// store.dispatch(editExpense(expenseThree.expense.uuid, { amount: 200 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoState = {
    expenses: [{
        id: 1123458,
        description: 'January rent',
        note: 'Final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }    
};