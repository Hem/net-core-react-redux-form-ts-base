import { RdxTextField } from '../../common/fields/Index';
import * as React from 'react';
import { ReactNode } from 'react-redux';
import { Field, FieldArray, reduxForm, InjectedFormProps, FormSection } from 'redux-form';
import { connectForm } from '../connect-wrapper'
import { ApplicationState } from '../../store';
import { actionCreators as CustomerActions, Customer, CustomerState } from '../../store/customers';

import { RouteComponentProps } from 'react-router-dom';
import { ComponentType, StatelessComponent, ComponentClass, ReactElement } from 'react';

class CustomerTBody extends React.Component<{ fields: any[] }, {}> {
    render() {
        const { fields } = this.props;
        return (<tbody>
                {fields.map((customer, index) => (
                    <tr key={index}>
                        <td>
                            <Field name={`${customer}.firstName`} component={RdxTextField} className="form-control" />
                        </td>
                        <td><Field name={`${customer}.lastName`} component="input"  className="form-control" /></td>
                    </tr>
                ))}
            </tbody>)
    }
}

// expected incoming props...
type PropDefs = RouteComponentProps<{}>
    & InjectedFormProps<{}, {}>
    & CustomerState
    & typeof CustomerActions
    & { formValues: Customer[] }
    ;

class CustomerList extends React.Component<PropDefs, {}> {

    onHandleSubmit(values:any) {
        console.info("Values submitted", values);
    }

    componentWillReceiveProps(nextProps: PropDefs) {
        if (this.props.customers !== nextProps.customers) {
            console.info("Updated form values with", nextProps.customers);
        }
    }

    componentDidMount() {
        const { requestCustomers, filter } = this.props;
        requestCustomers(filter);
    }

    render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props;

        return <div>

            <h1>Customers</h1>

            <form onSubmit={handleSubmit(this.onHandleSubmit.bind(this))}>
                <table className="table">
                    <FieldArray name="customers" component={CustomerTBody} />
                <tfoot>
                    <button type="submit">Go Go Go</button>
                </tfoot>
                </table>
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
        initialValues: state.customer,
        formValues: state.form['customer-list'] ? state.form['customer-list'].values : undefined,
    }),
    CustomerActions)(CustomerList) as typeof CustomerList;;

