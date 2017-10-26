import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Customer from './components/customers/CustomerList';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/customers' component={Customer} />    
</Layout>;
