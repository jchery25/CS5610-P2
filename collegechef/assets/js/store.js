import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';
import { createForms } from 'react-redux-form';

/* Structure of store data:
 * {
 *   forms: {
 *     new_photo: {...},
 *     edit_photo: {...},
 *     new_user: {...},
 *     edit_user: {...},
 *   },
 *   users: Map.new(
 *     1 => {id: 1, name: "Alice", email: "alice@example.com"},
 *     ...
 *   ),
 *   photos: Map.new(
 *     1 => {id: 1, data: "...", desc: "...", tags: [...]},
 *     ...
 *   ),
 * }
 */


function login(st0 = {email: "", password: "", errors: null}, action) {
  switch(action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function feedback(st0 = {firstname: "", lastname: "", telnum: "",email: "", agree: false, contactType: 'Tel.', message: "", errors: null}, action) {
  switch(action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers({
    ...createForms({
      feedback: feedback
    }),
    login,
  });
  return reducer(st0, action);
}

function users(st0 = new Map(), action) {
  return st0;
}

function jobs(st0 = new Map(), action) {
  switch (action.type) {
    case 'GET_JOBS':
      let st1 = new Map(st0);
      for (let job of action.data) {
        st1.set(job.id, job);
      }
      return st1;
    default:
      return st0;
  }
}

function timesheets(st0 = new Map(), action){
  let st1 = new Map(st0);
  switch(action.type){
    case 'ADD_TIMESHEET':
      for(let ts of action.data){
        st1.set(ts.id, ts);
      }
      return st1;
    case 'GET_TIMESHEETS':
      for(let ts of action.data){
        st1.set(ts.id, ts);
      }
      return st1;
    default:
      return st0;
  }
}

let session0 = localStorage.getItem('session');
if (session0) {
  session0 = JSON.parse(session0);
}

function session(st0 = session0, action) {
  switch (action.type) {
    case 'LOG_IN':
        //console.log("Session Log in:" + action.data);
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}

function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers({
    forms,
    users,
    session,
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;