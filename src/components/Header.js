import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Header = ({startLogout}) => (
    <header>
        <h1>Expensify</h1>
        <p><NavLink to="/dashboard" activeClassName="is-active" >Dashboard</NavLink></p>
        <p><NavLink to="/create" activeClassName="is-active">Add Expense</NavLink></p>
        <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
