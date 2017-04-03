import React, { Component } from 'react';
import Hello from '../component/Hello';
import { connect } from 'react-redux';

class App extends Component {
    render(){
        return (
            <Hello>
                {this.props.reducerOne.message}
            </Hello>
        )
    }
};

export default connect(state => state)(App);
