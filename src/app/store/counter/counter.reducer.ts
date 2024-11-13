/*define how state should change based on actions*/

import { createReducer, on } from '@ngrx/store';
import { initialState } from './counter.state';
import { decrement, increment, reset } from './counter.actions';

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ count: state.count + 1 })),
  on(decrement, (state) => ({ count: state.count - 1 })),
  on(reset, (state) => initialState)
);
