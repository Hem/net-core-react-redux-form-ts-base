import * as Actions from './Actions';
import * as Reducers from './Reducer';

export const actionCreators = Actions.actionCreators; 
export const reducer  = Reducers.reducer;



export interface CustomerState {
    isLoading: boolean,
    filter: FilterParam;
    customers: Customer[];
    currentCustomer?: Customer;
}

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

export const DEFAULT_CUSTOMER_STATE: CustomerState = {
    isLoading: false,
    filter: { filterText: '', pageSize: 50, pageNumber: 1 },
    customers: [],
    currentCustomer: undefined
};





