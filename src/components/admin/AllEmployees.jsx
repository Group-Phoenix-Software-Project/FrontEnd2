import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Drawer, TextField, Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import { SideNavigation } from '../layout/SideNavigation';

import { useContext } from 'react';
import { UserContext } from '../../UserContext';

export const AllEmployees = () => {
  const { token } = useContext(UserContext);
  const [employees, setEmployees] = useState([])

  const [searchKeyword, setSearchKeyword] = useState("");

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


  let navigate = useNavigate()

  async function getAllEmployees() {

    try {

      const res = await axios({
        method: 'get',
        url: 'http://localhost:4000/employee/',
        headers: { 'x-access-token': token }
      })
      setEmployees(res.data);

    } catch (error) {
      console.error(error);
    }

  }

  const columns = [
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    { id: 'designation', label: 'Designation', minWidth: 50 },
    { id: 'address', label: 'Address', minWidth: 100 },
    { id: 'contactNo', label: 'Contact No', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'dob', label: 'dob', minWidth: 80 },
    { id: 'salary', label: 'salary', minWidth: 60 },
    { id: 'position', label: 'Position', minWidth: 60 },
    { id: 'update', label: 'update', minWidth: 50 },
    { id: 'delete', label: 'delete', minWidth: 50 }
  ]

  async function deleteEmployee(id) {

    await axios({
      method: 'delete',
      url: `http://localhost:4000/employee/delete/${id}`,
      headers: { 'x-access-token': token }
    })
      .then(res => console.log(res.data))
      .catch(err => console.error(err))



    Swal.fire({
      title: 'Deleted Successfully',
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    }).then((value) => {
      Swal.fire((window.location = "/get-all-employees"));
    });
  }

  useEffect(() => {
    getAllEmployees()
  }, [])

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const theme = useTheme();
  const classes = useStyles();







  return (

    <div>
      <SideNavigation />

      <Typography variant='h4' color='primary' style={{ marginLeft: "10%" }} > Employee Management </Typography>

      <Fab
        variant="extended"
        style={{ left: "10%", marginBottom: "1%", top: "40px" }}
        onClick={() => {
          navigate("/register-employee");
        }}
      >
        <AddIcon />
        Add Employee
      </Fab>

      <TextField variant='outlined' style={{ marginLeft: "76%", marginBottom: "1%", width: "14%", fontSize: "16px" }} type="search"
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
        placeholder="Search..."
      />
      <TableContainer
        style={{ width: "80%", marginLeft: "10%", justifyContent: "center" }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Designation</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Contact No</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Date of Birth</StyledTableCell>
              <StyledTableCell align="center">Salary</StyledTableCell>
              <StyledTableCell align="center">Position</StyledTableCell>
              <StyledTableCell align="center">Update</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>


            {
              employees.map((employee) => {
                if (searchKeyword == "") {
                  return (
                    <TableRow hover key={employee.name}>
                      <TableCell component="th" scope="row" align="center">
                        {employee.firstName}
                      </TableCell>
                      <TableCell align="center">{employee.lastName}</TableCell>
                      <TableCell align="center">{employee.designation}</TableCell>
                      <TableCell align="center">{employee.address}</TableCell>
                      <TableCell align="center">{employee.contactNo}</TableCell>
                      <TableCell align="center">{employee.email}</TableCell>
                      <TableCell align="center">{employee.dob.substring(0, 10)}</TableCell>
                      <TableCell align="center">{employee.salary}</TableCell>
                      <TableCell align="center">{employee.position}</TableCell>
                      <TableCell align="center">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            navigate(`/updateEmployee/${employee.id}`);
                          }}
                        >
                          UPDATE
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="secondary"
                          variant="contained"
                          // onClick={() => {
                          //     deleteEmployee(employee.id)
                          // }}

                          onClick={() => {
                            Swal.fire({
                              title: "Warning!",
                              text: "Do you want to delete the Employee?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteEmployee(employee.id);
                              } else {
                              }
                            });
                          }}
                        >
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                }
                else if ((employee.firstName.includes(searchKeyword)) || (employee.lastName.includes(searchKeyword)) || (employee.contactNo.toString().includes(searchKeyword)) || (employee.email.includes(searchKeyword))) {
                  return (
                    <TableRow hover key={employee.name}>
                      <TableCell component="th" scope="row" align="center">
                        {employee.firstName}
                      </TableCell>
                      <TableCell align="center">{employee.lastName}</TableCell>
                      <TableCell align="center">{employee.designation}</TableCell>
                      <TableCell align="center">{employee.address}</TableCell>
                      <TableCell align="center">{employee.contactNo}</TableCell>
                      <TableCell align="center">{employee.email}</TableCell>
                      <TableCell align="center">{employee.dob.substring(0, 10)}</TableCell>
                      <TableCell align="center">{employee.salary}</TableCell>
                      <TableCell align="center">{employee.position}</TableCell>
                      <TableCell align="center">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            navigate(`/updateEmployee/${employee.id}`);
                          }}
                        >
                          UPDATE
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="secondary"
                          variant="contained"
                          // onClick={() => {
                          //     deleteEmployee(employee.id)
                          // }}

                          onClick={() => {
                            Swal.fire({
                              title: "Warning!",
                              text: "Do you want to delete the Employee?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteEmployee(employee.id);
                              } else {
                              }
                            });
                          }}
                        >
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  )

                }
              })
            }

          </TableBody>
        </Table>
      </TableContainer>
    </div>


  );
}
