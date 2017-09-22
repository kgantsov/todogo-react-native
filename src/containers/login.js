import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { changeLoginFormData, Login } from '../actions/login';
import LoginComponent from '../components/login.js';

const mapStateToProps = state => ({
  ...state
});


const mapDispatchToProps = dispatch => bindActionCreators({
  changeLoginFormData,
  Login,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
