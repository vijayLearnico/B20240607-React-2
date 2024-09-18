import React,{useState} from 'react'
import { Grid2, Paper, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [name, setName] = useState('');
  const [isError,setIsError] = useState(false)
  const [isNotValidateUserName,setIsNotValidateUserName] = useState(false)


    const createNewUser = () => {
      if(!name || !userName || !password || !cnfPassword){
        setIsError(true)
        alert('Fill all the fields')
        return;
      }

      const userDetails = localStorage.getItem('userDetails');
      const parsedData = JSON.parse(userDetails);
      const user = parsedData ? parsedData.filter((ele)=> ele.userName === userName) : [];

      if(user[0]){
        setIsError(true)
        setIsNotValidateUserName(true)
        alert('Username already Exist')
        return;
      }

      if(password !== cnfPassword){
        setIsError(true);
        alert("Given password doesn't match")
        return;
      }
      

      const tempData = {
        name: name,
        userName: userName,
        password: password,
        role: 'user'
      }
      const finalData = [...parsedData, tempData]

     localStorage.setItem('userDetails', JSON.stringify(finalData))

     navigate('/');
    }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',

  }}>
      <Paper elevation={3} square={false} style={{ width: '18rem' }}>
          <Grid2 container spacing={2} margin={3}>
              <Grid2 size={12}>
                  <Typography>Create a new account</Typography>
              </Grid2>
              <Grid2 size={12}>
                  <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      required={true}
                      value={name}
                      onChange={(event) => {
                          setName(event.target.value)
                      }} 
                      error={isError && !name}
                      />
              </Grid2>
              <Grid2 size={12}>
                  <TextField
                      id="outlined-basic"
                      label="Username"
                      required={true}
                      variant="outlined"
                      value={userName}
                      onChange={(event) => {
                          setUserName(event.target.value.toLowerCase())
                      }} 
                      error={isError && (!userName || isNotValidateUserName)}
                      />
              </Grid2>
              <Grid2 size={12}>
                  <TextField
                      id="outlined-basic"
                      label="Password"
                      required={true}
                      variant="outlined"
                      value={password}
                      type='password'
                      error={isError && !password}
                      onChange={(event) => {
                          setPassword(event.target.value)
                      }}
                  />
              </Grid2>
              <Grid2 size={12}>
                  <TextField
                      id="outlined-basic"
                      label="Confirm password"
                      variant="outlined"
                      required={true}
                      value={cnfPassword}
                      type='password'
                      error={isError && (!cnfPassword || password !== cnfPassword)}
                      onChange={(event) => {
                          setCnfPassword(event.target.value)
                      }}
                  />
              </Grid2>
              <Grid2 size={12}>
                  <Button variant="contained" onClick={createNewUser}>Sign up</Button>
              </Grid2>
          </Grid2>
      </Paper>
  </div>
  )
}

export default SignUp