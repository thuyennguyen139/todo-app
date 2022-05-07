import './App.css';

import { BiEdit, BiXCircle,BiArrowFromBottom } from "react-icons/bi";
import { useEffect, useReducer, useRef } from 'react';


// initialState
const initState = {
  isUpdate: false,
  cur: 0,
  job: "",
  jobs: []
}

// Action
const SET_JOB = "set-job";
const ADD_JOB = "add-job";
const UPDATE_JOB = "update-job";
const DELETE_JOB = "delete-job";
const UPDATE_FINISH_JOB = "update-finish-job";
const UPTOP_JOB = "uptop-job";

const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload
  }
}

const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload
  }
}

const updateJob = (payload) => {
  return {
    type: UPDATE_JOB,
    payload
  }
}

const updateFinishJob = (payload) => {
  return {
    type: UPDATE_FINISH_JOB,
    payload
  }
}
const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload
  }
}


const upTopJob = (payload) => {
  return {
    type: UPTOP_JOB,
    payload
  }
}


// Reducer
const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload
      }
      break;
    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload]
      }
      break;
    case UPDATE_JOB:
      newState = {
        ...state,
        isUpdate: true,
        cur: action.payload
      }
      break;
      case UPDATE_FINISH_JOB:
        let newJobs1 =[...state.jobs];
        newJobs1[state.cur]= action.payload;
        newState = {
          ...state,
          isUpdate: false,
          jobs: newJobs1
        }
        break;
    case DELETE_JOB:
      let newJobs = [...state.jobs];
      newJobs.splice(action.payload, 1);
      newState = {
        ...state,
        jobs: newJobs
      }
      break;
      case UPTOP_JOB:
        let newJobs2 = [...state.jobs];
        let curJob = newJobs2[action.payload];
        newJobs2.splice(action.payload, 1);
        newJobs2.unshift(curJob);

        newState = {
          ...state,
          jobs: newJobs2
        }
        break;
    default:
      break;
  }

  return newState;
}

function App() {

  const [state, dispatch] = useReducer(reducer, initState);
  const { isUpdate, job, jobs } = state;
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  },[])
  const onHandleChange = (e) => {
    dispatch(setJob(e));
  }

  const onHandleClickAdd= (e) => {
    e.preventDefault();
    if (job) {
      dispatch(addJob(job));
      dispatch(setJob(""));
      inputRef.current.focus();
    }
  }

  const onHandleClickDelete = (index) => {
    dispatch(deleteJob(index));
  }


  const onHandleClickUpdate = (index) => {
    dispatch(updateJob(index));
    dispatch(setJob(jobs[index]));
    inputRef.current.focus();

  }

const onHandleClickFinishUpdate = (e) =>{
    e.preventDefault();
    dispatch(updateFinishJob(job));
    dispatch(setJob(""));
    inputRef.current.focus();

}

const onHandleClickUpTop = (index) =>{
  dispatch(upTopJob(index));

}

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      {!isUpdate? <form className="todo-form">
        <input
          required
          ref={inputRef}
          className="todo-input"
          value={job}
          placeholder="Enter todolist"
          onChange={e => onHandleChange(e.target.value)}
          

        />
        <button className="todo-button" onClick={onHandleClickAdd} > Add </button>
      </form> : <form className="todo-form">
        <input
          required
          ref={inputRef}
          className="todo-input"
          value={job}
          placeholder="Nhap cong viec"
          onChange={e => onHandleChange(e.target.value)}
          
        />
        <button className="todo-button" onClick={onHandleClickFinishUpdate} > Update </button>
  </form> }



       {jobs.map((value, index) => {
        return (
          <div key={index} className="todo-row">
            <p>{value}</p>
            <div>
              <BiArrowFromBottom className="icons" onClick={() => onHandleClickUpTop(index)} />
              <BiEdit className="icons" onClick={() => onHandleClickUpdate(index)} />
              <BiXCircle className="icons" onClick={() => onHandleClickDelete(index)} />
              
            </div>

          </div>
        )
      }) }
      


    </div>
  );
}

export default App;
