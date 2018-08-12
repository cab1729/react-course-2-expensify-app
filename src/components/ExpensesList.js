import React from 'react';
import { connect } from 'react-redux';
import ExpensesListItem from './ExpensesListItem';
import SelectExpenses from '../selectors/expenses';

export const ExpensesList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
        {
            props.expenses.length === 0 ? (
                <div className="list-item list-item--message">
                    <span>No Expenses</span>
                </div>
            ) : (
                props.expenses.map((expense) => {
                    return (<ExpensesListItem { ...expense } />);
                })
            )
        }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    console.log('ExpensesList: ', state.expenses, state.filters);
    return {
        expenses: SelectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpensesList);