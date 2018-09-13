import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesListItem } from '../../components/ExpensesListItem';
import expenses from '../fixtures/expenses';

test('Should render expenses list item with expense', () => {
    const wrapper = shallow(<ExpensesListItem {...expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});