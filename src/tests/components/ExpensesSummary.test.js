import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';
import { filters } from '../fixtures/filters';

test('Should render expenses totals - count and total amount', () =>{
    const wrapper = shallow(<ExpensesSummary expensesCount={3} expensesTotal={12500} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render 1 expense correctly', () =>{
    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={2500} />);
    expect(wrapper).toMatchSnapshot();
});
