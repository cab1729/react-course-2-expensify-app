import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { removeExpense } from '../actions/expenses';
import EditExpensePage from './EditExpensePage';

export const ExpensesListItem = ({dispatch, id, description, amount, createdAt, note}) => {
    return (
        <Router>
        <div>
            <Route path="/edit/:id" component={EditExpensePage} />
            <h3><Link to={`/edit/${id}`} >{description}</Link></h3>
            <p>Amount: {numeral(amount / 100).format('$0,0.00')} 
               -
               Date: {moment(createdAt).format('MMMM Do, YYYY')}</p>
            <p>{note}</p>
            
        </div>
        </Router>
    );
};

export default connect()(ExpensesListItem);