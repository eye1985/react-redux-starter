import React, { Component } from 'react';
import Hello from '../component/Hello';
import { connect } from 'react-redux';
import {
  action,
  outPutText,
  thunkActionCreator
} from '../action';

class App extends Component {
    updateHelloWorldText(){
      this.props.say('No more hello world!');
    }

    sayCake(){
      this.props.sayCake('I think I love waffles more!');
    }

    callThunkAction(){
      this.props.thunkAction();
    }

    render(){
        return (
            <Hello>
              {this.props.messageFromReducerOne}
              <button type="button" onClick={this.updateHelloWorldText.bind(this)}>
                Update hello world
              </button>

              <br />

              {this.props.messageFromReducerTwo}
              <button type="button" onClick={this.sayCake.bind(this)}>
                Say something else
              </button>

              <button type="button" onClick={this.callThunkAction.bind(this)}>
                Use redux thunk action creator
              </button>
            </Hello>
        )
    }
};

export default connect(
  state => ({
    messageFromReducerOne : state.reducerOne.message,
    messageFromReducerTwo : state.reducerTwo.message
  }),
  dispatch => ({
    say: text => {dispatch(action(text))},
    sayCake : text => {dispatch(outPutText(text))},
    thunkAction : () => {dispatch(thunkActionCreator())}
}))(App);
