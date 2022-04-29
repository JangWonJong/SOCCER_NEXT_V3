import React from 'react';
import { connect } from 'react-redux';
import { increaseAsync, decreaseAsync, decrease, increase } from '@/modules/basic/counter';
import {Counter} from '@/components/basic/Counter';

const CounterPage = ({ number, increaseAsync, decreaseAsync }) => {
  return (
    <Counter
      number={number}
      onIncrease={increaseAsync}
      onDecrease={decreaseAsync}
    />
  );
};

const mapStateToProps = state => ({number: state.counter})
const registerActions = {
  increase,
  decrease
}

export default connect(
  mapStateToProps, registerActions
)(CounterPage);