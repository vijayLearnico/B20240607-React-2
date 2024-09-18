import React, { useState, useEffect } from 'react'
import { Grid2, Paper, TextField, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createUserDetails } from '../store/action/userAction';
import { useDispatch } from 'react-redux';
import axios from 'axios';


function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [apiData,setApiData] = useState([])

    const signIn = () =>{
       const userDetails = localStorage.getItem('userDetails');
       const parsedData = JSON.parse(userDetails);
       const user = parsedData ? parsedData.filter((ele)=> ele.userName === userName) : [];
       
       if(user.length === 0){
        return alert('Kindly sign up');
       }
       
       if(Number(user[0].password) !== Number(password)){
        return alert('Invalid Password');
       }
       dispatch(createUserDetails(user[0]))
       navigate('/home');

    }

    useEffect(() => {
        axios.get('https://cat-fact.herokuapp.com/facts').then((response)=>{
            setApiData(response.data);
          }).catch(()=>{
            console.log('Fail');
          })
          
    }, [])
    


    return (
        <>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',

        }}>
            <Paper elevation={3} square={false} style={{ width: '15rem' }}>
                <Grid2 container spacing={2} margin={3}>
                    <Grid2 size={12}>
                        <Typography>Sign In</Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            value={userName}
                            onChange={(event) => {
                                setUserName(event.target.value.toLowerCase())
                            }} />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            value={password}
                            type='password'
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <Button variant="contained" onClick={signIn}>Log In</Button>
                    </Grid2>
                    <Grid2 size={12}>
                        <Link to='/sign-up'>
                           <a>Create an account?</a>
                        </Link>
                    </Grid2>
                </Grid2>
            </Paper>
        </div>
            {apiData.map((ele)=>(
                <h5>{ele.text}</h5>
            ))}
        </>
    )
}

export default SignIn