import React,{useEffect} from 'react'
import AdminDashboard from './Admin/Dashboard'
import Dashboard from './User/Dashboard'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createNewTask } from '../store/action/taskAction';


function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user).userDetails

  const tasks = localStorage.getItem('tasks');
  const parsedTasksData = tasks ? JSON.parse(tasks) : [];
  
  useEffect(()=>{
    if(!user){
      navigate('/')
    }
    if(user?.role === 'admin'){
      dispatch(createNewTask(parsedTasksData))
    } else {
      const userTask = parsedTasksData.filter((ele)=> ele.empId === user.userName)
      dispatch(createNewTask(userTask))
    }
  },[])

  return (
    <div>{
      user?.role === 'admin'
        ? (<AdminDashboard />)
        : (<Dashboard />)
    }
    </div>
  )
}

export default Home