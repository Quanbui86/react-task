import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  let taskPattern = /(?=.*[a-zA-Z]).{2,}$/
  const [taskList, setTaskList] = useState(['Hoc JS', 'Doc Sach', 'Nau an'])
  const handleDelete =(task) => {
    setTaskList(taskList.filter((item, index)=> {return index !== taskList.indexOf(task)}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    let inputValue = event.target.elements.taskInput.value
    if (taskPattern.test(inputValue)) {
      let newList = [...taskList, inputValue]
      setTaskList(newList)
      event.target.elements.taskInput.value = ''
    }else (alert('input valid task'))
  }
  const taskLiList = 
  <TransitionGroup className='taskList'>
    {taskList.map((task, index)=> {
      return (
        <CSSTransition key={index} timeout={500} classNames="item"> 
        <div className='listContain'>
            <li key={index} className='list'>{task}</li>
            <button onClick={()=>handleDelete(task)} className='button'>X</button>
        </div>

        </CSSTransition>
      )
    })}
  </TransitionGroup>
  
  return (
    <div className="App">
      <header className="App-header container">
        <form onSubmit={handleSubmit} className='form'>
          <label className='label'>New task</label>
          <div className='input'>
            <input type='text' name='taskInput' className='taskInput'></input>
            <input type='submit' value={'Submit'} className='inputButton'></input>
          </div>
        </form>
        <ul className='taskList'>
          {taskLiList}
        </ul>
      </header>
    </div>
  );
}

export default App;
