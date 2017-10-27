import * as React from 'react';
import { EmailField, PasswordField, TextField, TextFieldProps } from './TextFields';

export interface ConnectedTextFieldProps extends TextFieldProps {
    input: { name: string, value: string },
    meta: any,
}

export const RdxTextField: React.SFC<ConnectedTextFieldProps> = (props) => {
    const { input, meta, ...rest } = props;
    return <TextField {...input} {...rest} />
}

export const RdxPasswordField: React.SFC<ConnectedTextFieldProps> = (props) => {
    const { input, meta, ...rest } = props;
    return <PasswordField {...input} {...rest} />
}

export const RdxEmailField: React.SFC<ConnectedTextFieldProps> = (props) => {
    const { input, meta, ...rest } = props;
    return <EmailField {...input} {...rest} />
}