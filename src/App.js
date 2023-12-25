import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  let taskPattern = /(?=.*[a-zA-Z]).{2,}$/
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [taskList, setTaskList] = useState(['Hoc JS', 'Doc Sach', 'Nau an'])
  const [inputValue, setInputValue] = useState('')
  const [user, setUser] = useState('')
  const handleDelete =(task) => {
    let newList = taskList.filter((item, index)=> {return index !== taskList.indexOf(task)})
    setTaskList(newList)
    localStorage.setItem(user, JSON.stringify(newList))
  }
  function handleChange(e) {
    setInputValue(e.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskPattern.test(inputValue)) {
      let newList = [...taskList, inputValue]
      setTaskList(newList)
      setInputValue('')
      localStorage.setItem(user, JSON.stringify(newList))
    } else (alert('input valid task'))
  }
  /*useEffect(()=>{
    if (localStorage.getItem('chau'))
    localStorage.setItem('chau',JSON.stringify(['Hoc JS', 'Doc Sach', 'Nau an']))
    localStorage.setItem('uyen',JSON.stringify(['Hoc JS', 'Doc Sach', 'Nau an']))
    localStorage.setItem('quan',JSON.stringify(['Hoc JS', 'Doc Sach', 'Nau an']))
  },[])
  */
  function handleChau(e){
    const newUser = e.target.name;
    setUser(newUser);
    setIsUserSelected(true)
    localStorage.getItem(newUser) ?
    setTaskList(JSON.parse(localStorage.getItem(newUser))) :
    setTaskList([]);
  }
  function handleUyen(e){
    const newUser = e.target.name;
    setUser(newUser);
    localStorage.getItem(newUser) ?
    setTaskList(JSON.parse(localStorage.getItem(newUser))) :
    setTaskList([]);
  }
  function handleQuan(e){
    const newUser = e.target.name;
    setUser(newUser);
    localStorage.getItem(newUser) ?
    setTaskList(JSON.parse(localStorage.getItem(newUser))) :
    setTaskList([]);
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
        <div className='button-group'>
          <button className='userButton' onClick={handleChau} name='@@@chau'>Châu</button>
          <button className='userButton' onClick={handleChau} name ='@@@uyen'>Uyên</button>
          <button className='userButton' onClick={handleChau} name='@@@quan'>Quân</button>
        </div>
        <form onSubmit={handleSubmit} className='form'>
          <label className='label'>New task</label>
          <div className='input'>
            <input type='text' name='taskInput' className='taskInput' onChange={handleChange} value={inputValue}></input>
            <input type='submit' value={'Submit'} className='inputButton' disabled={!isUserSelected}></input>
            {!isUserSelected && <p>Please select a user to enable the submit button.</p>}

          </div>
        </form>
        <ul className='taskListGroup'>
          {taskLiList}
        </ul>
        <p>{localStorage.getItem(user)?localStorage.getItem(user):''}</p>
      </header>
    </div>
  );
}

export default App;
