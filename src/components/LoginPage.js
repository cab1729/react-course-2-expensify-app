import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startLoginFB } from '../actions/auth';

export const LoginPage = ({ startLogin, startLoginFB }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify App</h1>
            <p>It's time to get your expenses under control.</p>
            <button className="button-cl" onClick={startLoginFB}>Login with Facebook</button>
            <button className="button-cl" onClick={startLogin}>Login with Google</button>
        </div>
    </div> 
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()),
    startLoginFB: () => dispatch(startLoginFB())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);