import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// this fixes an issue with redux-form and typescript
// the issue is due to the name object.

const defaultFormName = config => Component =>
  reduxForm({ form: Component.displayName || Component.name, ...config })(Component);

const optionalConnect = (mapState, mapActions) => Component =>
  mapState || mapActions ? connect(mapState, mapActions)(Component) : Component;

export const connectForm = (config, mapState, mapActions) => Component =>
  optionalConnect(mapState, mapActions)(defaultFormName(config)(Component));