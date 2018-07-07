import React from 'react';
import ReactDOM from 'react-dom';

import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <p><NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink></p>
        <p><NavLink to="/create" activeClassName="is-active">Add Expense</NavLink></p>
        <p><NavLink to="/help" activeClassName="is-active">Help</NavLink></p>
    </header>
);

export default Header;
