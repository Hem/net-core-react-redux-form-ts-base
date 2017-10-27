import * as React from 'react';
import { FormControl } from 'react-bootstrap';

export interface TextFieldProps extends React.InputHTMLAttributes<{}> {    
}

export const TextField : React.SFC<TextFieldProps> = (props) => {
    return <FormControl type="text" {...props}/>
}

export const PasswordField : React.SFC<TextFieldProps> = (props) => {    
    return <FormControl type="password" {...props} />
}

export const EmailField : React.SFC<TextFieldProps> = (props) => {    
    return <FormControl type="email" {...props} />
}

export const NumberField : React.SFC<TextFieldProps> = (props) => {    
    return <FormControl type="number" {...props} />
}
