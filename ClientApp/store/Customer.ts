import { AppThunkAction } from './';
import { Action, Reducer } from 'redux';
import { fetch, addTask } from 'domain-task';


const defaultState: CustomerState = {
    isLoading: false,
    filter: { filterText: '', pageSize: 50, pageNumber: 1 },
    customers: [],
    currentCustomer: undefined
};

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
}

export interface FilterParam {
    filterText: string;
    pageSize: number;
    pageNumber: number;
}


/**
 * Current customers
 */
export interface CustomerState {
    isLoading: boolean,
    filter: FilterParam;
    customers: Customer[];
    currentCustomer?: Customer;
}

// Actions

interface RequestCustomersAction {
    type: 'REQUEST_CUSTOMERS';
    filter: FilterParam;
}
interface ReceiveCustomersAction {
    type: 'RECEIVE_CUSTOMERS';
    customers: Customer[];
    filter: FilterParam;
}


type KnownActions = RequestCustomersAction | ReceiveCustomersAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).


export const actionCreators = {

    requestCustomers: (filter: FilterParam): AppThunkAction<KnownActions> => (dispatch, getState) => {

        let customerState:CustomerState = getState().customer;

        if(customerState.isLoading === true) return;

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


// ===================
// ACTION REDUCERS - These save the data to the state...
/// 
export const reducer: Reducer<CustomerState> = (state: CustomerState, incomingAction: Action) => {

    const action = incomingAction as KnownActions;

    switch (action.type) {        
        case 'REQUEST_CUSTOMERS':
            return {
                ...state,
                customers: [],
                isLoading: true,
            };

        case 'RECEIVE_CUSTOMERS':
            return {
                ...state,
                customers: action.customers,
                isLoading: false
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || defaultState;
}


