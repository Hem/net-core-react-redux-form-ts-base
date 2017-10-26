import { actionCreators as CustomerActions, Customer, CustomerState } from '../store/Customer';
import { ApplicationState } from '../store';
import * as React from 'react';
import { ReactNode } from 'react-redux';
import { connectForm } from './connect-wrapper'
import { Field, reduxForm, InjectedFormProps, FormSection } from 'redux-form';

import { RouteComponentProps } from 'react-router-dom';
import { ComponentType, StatelessComponent, ComponentClass, ReactElement } from 'react';


// expected incoming props...
type PropDefs = RouteComponentProps<{}>
    & InjectedFormProps<{}, {}>
    & CustomerState
    & typeof CustomerActions
    & { formValues:Customer[] }
    ;

export interface CustomerListItemProp {
    customer: Customer;
    index: number;
}
export class CustomerListItem extends React.Component<CustomerListItemProp, {}> {

    render() {
        const { customer, index } = this.props;
        const firstNameField: string = `[${index}]['firstName']`;
        const lastNameField: string = `[${index}]['lastName']`;


        return <div key={customer.id}>
            <Field name={firstNameField} value={customer.firstName} component="input" />
            <Field name={lastNameField} value={customer.lastName} component="input" />
            <div>
                {customer.firstName},
                {customer.lastName}
            </div>
        </div>
    }
}


class CustomerList extends React.Component<PropDefs, {}> {

    onHandleSubmit(values) {
        console.info("Values submitted", values);
    }

    componentWillReceiveProps(nextProps: PropDefs) {
        if(this.props.customers !== nextProps.customers){
            console.info("Updated form values with", nextProps.customers);
        }
    }

    componentDidMount() {
        const { requestCustomers, filter } = this.props;
        requestCustomers(filter);
    }

    render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props;
        const customers = ( this.props.formValues || this.props.initialValues || [] ) as Customer[];

        const customerLines = customers.map((customer, index) => {
            return <CustomerListItem key={index} customer={customer} index={index} />
        });

        return <div>
            
            <h1>Customers</h1>

            <form onSubmit={handleSubmit(this.onHandleSubmit.bind(this))}>
                {customerLines}
                <button type="submit">Go Go Go</button>
            </form>
        </div>
    }
}

export default connectForm(
    {
        form: 'customer-list',
        enableReinitialize: true
    },
    (state: ApplicationState) => ({
        ...state.customer,
        initialValues: state.customer.customers,
        formValues:  state.form['customer-list'] ? state.form['customer-list'].values : undefined, 
    }),
    CustomerActions)(CustomerList) as typeof CustomerList;;

