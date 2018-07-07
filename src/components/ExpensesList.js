import React from 'react';
import { connect } from 'react-redux';
import ExpensesListItem from './ExpensesListItem';
import SelectExpenses from '../selectors/expenses';

export const ExpensesList = (props) => (
    <div>
        <h1>Expenses List</h1>
        {
            props.expenses.length === 0 ? (
                <p>No Expenses</p>
            ) : (
                props.expenses.map((expense) => {
                    return (<ExpensesListItem { ...expense } />);
                })
            )
        }
    </div>
);

const mapStateToProps = (state) => {
    console.log('ExpensesList: ', state.expenses, state.filters);
    return {
        expenses: SelectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpensesList);