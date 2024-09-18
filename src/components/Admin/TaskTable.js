import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

function TaskTable({ editFunc, deleteFunc }) {

  const user = useSelector((state) => state.user).userDetails
  const data = useSelector((state) => state.task);

  const userDetails = localStorage.getItem('userDetails');
  const parsedData = JSON.parse(userDetails);

  const [tableData, setTableData] = useState(data.tasks);


  useEffect(() => {
    setTableData(data.tasks)
  }, [data.tasks])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{ textAlign: 'center' }}>
            <TableCell>Id</TableCell>
            <TableCell align="center">Task Name</TableCell>
            <TableCell align="center">Task description</TableCell>
            {user?.role == 'admin' && <TableCell align="center">Emp Name</TableCell>}
            <TableCell align="center">Estimated hours</TableCell>
            {user?.role == 'admin' && <TableCell align="center">Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tableData.map((ele, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{ele.taskName}</TableCell>
                <TableCell>{ele.taskDesciprtion}</TableCell>
                {user?.role == 'admin' && <TableCell>{parsedData.filter((user) => user.userName === ele.empId)[0].name}</TableCell>}
                <TableCell>{ele.estHr}</TableCell>
                {user?.role == 'admin' && <TableCell>
                  <ModeIcon onClick={() => editFunc(index)} />
                  <DeleteIcon onClick={() => deleteFunc(index)} />
                </TableCell>}
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TaskTable