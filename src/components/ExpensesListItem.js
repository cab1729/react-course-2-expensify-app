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
            <Link className="list-item" to={`/edit/${id}`} >
                <div>
                    <h3 className="list-item__title">{description}</h3>
                    <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
                </div>
                <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>  
            </Link>
        </div>
        </Router>
    );
};

export default connect()(ExpensesListItem);