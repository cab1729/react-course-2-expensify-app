import React from 'react';
import ReactDOM from 'react-dom';
import ExpensesList from './ExpensesList';
import ExpensesListFilters from './ExpensesListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => (
    <div>
        <ExpensesSummary />
        <ExpensesListFilters />
        <ExpensesList />
    </div>
);

export default ExpenseDashboardPage;