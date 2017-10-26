import * as React from 'react';

export interface TextFieldProps extends React.InputHTMLAttributes<{}> {    
}

export class TextField extends React.Component<TextFieldProps, {}> {
    render() {
        return <input {...this.props}/>
    }
}

export interface ConnectedTextFieldProps extends TextFieldProps {
    input: { name:string, value:string},
    meta: any,
}

export class ConnectedTextField extends React.Component< ConnectedTextFieldProps, {} > {
    render() {
        const { input, meta, ...props } = this.props;
        
        return <TextField {...input} {...props} />
    }
}
