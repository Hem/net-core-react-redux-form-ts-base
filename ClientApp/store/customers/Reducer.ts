import { KnownCustomerActions } from './Actions';
import { Action, Reducer } from 'redux';
import { fetch, addTask } from 'domain-task';

import { AppThunkAction } from '../';
import { CustomerState, DEFAULT_CUSTOMER_STATE } from './';

// ===================
// ACTION REDUCERS - These save the data to the state...
/// 
export const reducer: Reducer<CustomerState> = (state: CustomerState, incomingAction: Action) => {
    
        const action = incomingAction as KnownCustomerActions;
    
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
    
        return state || DEFAULT_CUSTOMER_STATE;
    }
    
    
    