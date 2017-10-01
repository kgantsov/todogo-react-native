import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeLoginFormData, Login, Navigate } from '../actions/login';
import LoginComponent from '../components/login';

const mapStateToProps = state => ({
  ...state,
});


const mapDispatchToProps = dispatch => bindActionCreators({
  changeLoginFormData,
  Login,
  Navigate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
