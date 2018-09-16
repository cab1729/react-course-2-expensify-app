import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import getExpensesTotal from '../selectors/expenses-total.js';
import SelectExpenses from '../selectors/expenses';

export const ExpensesSummary = ({ expensesCount, expensesTotal, userName }) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');

    return(
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">User: <span>{userName}</span></h1>
                <h1 className="page-header__title">Viewing <span>{expensesCount}</span> {expenseWord} totaling <span>{formattedExpensesTotal}</span></h1>
                <div className="page-header__actions">
                    <Link className="button-cl" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = SelectExpenses(state.expenses, state.filters);
    return {
        expensesCount: visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses),
        userName: state.auth.user.displayName
        //userName: 'cab1729'
    };
};

export default connect(mapStateToProps)(ExpensesSummary);