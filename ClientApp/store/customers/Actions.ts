import { Action } from 'redux';
import { fetch, addTask } from 'domain-task';
import { AppThunkAction } from '../';
import { FilterParam, Customer, CustomerState } from './';

export interface RequestCustomersAction {
    type: 'REQUEST_CUSTOMERS';
    filter: FilterParam;
}
export interface ReceiveCustomersAction {
    type: 'RECEIVE_CUSTOMERS';
    customers: Customer[];
    filter: FilterParam;
}

export type KnownCustomerActions = RequestCustomersAction | ReceiveCustomersAction;


export const actionCreators = {

    requestCustomers: (filter: FilterParam): AppThunkAction<KnownCustomerActions> => (dispatch, getState) => {

        let customerState: CustomerState = getState().customer;

        if (customerState.isLoading === true) return;

        dispatch({ type: 'REQUEST_CUSTOMERS', filter });

        let fetchTask = fetch('/api/customer')
            .then(r => r.json() as Promise<Customer[]>)
            .then(customers => dispatch({
                type: 'RECEIVE_CUSTOMERS',
                customers,
                filter
            }));

        addTask(fetchTask);

    }
};

