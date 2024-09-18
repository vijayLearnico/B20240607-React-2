import React, { useState } from 'react'
import { Grid2, Paper, TextField, Typography, Button,
    FormControl, InputLabel, Select, MenuItem
 } from '@mui/material';
 import { useSelector, useDispatch } from 'react-redux';
import { createNewTask } from '../../store/action/taskAction';

function Form() {
    const dispatch = useDispatch()
    const [taskName, setTaskName] = useState('');
    const [taskDesciprtion, setTaskDesciprtion] = useState('');
    const [empId, setEmpId] = useState('');
    const [estHr, setEstHr] = useState('');
    const userDetails = localStorage.getItem('userDetails');
    const parsedData = JSON.parse(userDetails);
    const users = parsedData ? parsedData.filter((ele)=> ele.role === 'user') : [];

    const data = useSelector((state)=> state.task);

    console.log('data',data)


    const clearState = () => {
        setTaskName('')
        setTaskDesciprtion('')
        setEmpId('')
        setEstHr('')
    }

    const createTask = () => {
      const tempData = [{
        taskName,
        taskDesciprtion,
        empId,
        estHr
      }]

      const tasks = localStorage.getItem('tasks');
      const parsedTasksData = tasks ? JSON.parse(tasks) : [];

      const finalData = [...parsedTasksData, ...tempData]

     localStorage.setItem('tasks', JSON.stringify(finalData))
     dispatch(createNewTask([...parsedTasksData, ...tempData]))
     clearState()

    }

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',

            }}>
                <Paper elevation={3} square={false} style={{ width: '15rem' }}>
                    <Grid2 container spacing={2} margin={3}>
                        <Grid2 size={12}>
                            <Typography>Create Task</Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField
                                id="outlined-basic"
                                label="Task Name"
                                variant="outlined"
                                value={taskName}
                                onChange={(event) => {
                                    setTaskName(event.target.value.toLowerCase())
                                }} />
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField
                                id="outlined-basic"
                                label="Task Description"
                                variant="outlined"
                                value={taskDesciprtion}
                                onChange={(event) => {
                                    setTaskDesciprtion(event.target.value)
                                }}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={empId}
                                    label="Employee"
                                    onChange={(event) => {
                                        setEmpId(event.target.value)
                                    }}
                                >
                                    {users.map((ele)=>(
                                      <MenuItem value={ele.userName}>{ele.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField
                                id="outlined-basic"
                                label="Estimated hours"
                                variant="outlined"
                                value={estHr}
                                onChange={(event) => {
                                    setEstHr(event.target.value)
                                }}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <Button variant="contained" onClick={createTask}>Create</Button>
                        </Grid2>
                    </Grid2>
                </Paper>
            </div>
        </div>
    )
}

export default Form