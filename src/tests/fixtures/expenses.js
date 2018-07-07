import moment from 'moment';

export default [{
    id: '1',
    description: 'Weed',
    note: '',
    amount: 195000,
    createdAt: moment(0).valueOf()
}, {
    id: '2',
    description: 'Beer',
    note: '',
    amount: 25000,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Hookers',
    note: '',
    amount: 35000,
    createdAt: moment(0).add(4, 'days').valueOf()
}];
