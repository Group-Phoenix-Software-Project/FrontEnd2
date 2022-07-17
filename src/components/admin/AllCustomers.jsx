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

export const AllCustomers = () => {
  const { token } = useContext(UserContext);
  const [customers, setCustomers] = useState([]);

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

  async function getAllCustomers() {

    try {
      const res = await axios({
        method: 'get',
        url: 'http://localhost:4000/customer/',
        headers: { 'x-access-token': token }
      })
      setCustomers(res.data)

    } catch (error) {
      console.error(error)
    }

  }

  const columns = [
    { id: 'designation', label: 'Designation', minWidth: 50 },
    { id: 'firstName', label: 'First Name', minWidth: 100 },
    { id: 'lastName', label: 'Last Name', minWidth: 100 },
    { id: 'contactNo', label: 'Contact No', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'address', label: 'Address', minWidth: 100 },
    { id: 'dob', label: 'dob', minWidth: 80 },
    { id: 'update', label: 'update', minWidth: 50 },
    { id: 'delete', label: 'delete', minWidth: 50 }
  ]

  // const firstNameForSearch = "aa"

  async function deleteCustomer(id) {

    await axios({
      method: 'delete',
      url: `http://localhost:4000/customer/delete/${id}`,
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
      Swal.fire((window.location = "/get-all-customers"));
    });
  }

  useEffect(() => {
    getAllCustomers()
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

      <Typography variant='h4' color='primary' style={{ marginLeft: "10%" }} > Customer Management </Typography>

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
              <StyledTableCell align="center">Contact No</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Date of Birth</StyledTableCell>
              <StyledTableCell align="center">Update</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>


            {
              customers.map((customer) => {
                if (searchKeyword == "") {
                  return (
                    <TableRow hover key={customer.name}>
                      <TableCell component="th" scope="row" align="center">
                        {customer.firstName}
                      </TableCell>
                      <TableCell align="center">{customer.lastName}</TableCell>
                      <TableCell align="center">{customer.designation}</TableCell>
                      <TableCell align="center">{customer.contactNo}</TableCell>
                      <TableCell align="center">{customer.email}</TableCell>
                      <TableCell align="center">{customer.address}</TableCell>
                      <TableCell align="center">{customer.dob.substring(0, 10)}</TableCell>
                      <TableCell align="center">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            navigate(`/updateCustomer/${customer.id}`);
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
                              text: "Do you want to delete this Customer?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteCustomer(customer.id);
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
                else if ((customer.firstName.includes(searchKeyword)) || (customer.lastName.includes(searchKeyword)) || (customer.contactNo.toString().includes(searchKeyword)) || (customer.email.includes(searchKeyword))) {
                  return (
                    <TableRow hover key={customer.name}>
                      <TableCell component="th" scope="row" align="center">
                        {customer.firstName}
                      </TableCell>
                      <TableCell align="center">{customer.lastName}</TableCell>
                      <TableCell align="center">{customer.designation}</TableCell>
                      <TableCell align="center">{customer.contactNo}</TableCell>
                      <TableCell align="center">{customer.email}</TableCell>
                      <TableCell align="center">{customer.address}</TableCell>
                      <TableCell align="center">{customer.dob.substring(0, 10)}</TableCell>
                      <TableCell align="center">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            navigate(`/updateCustomer/${customer.id}`);
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
                              text: "Do you want to delete this Customer?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteCustomer(customer.id);
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
