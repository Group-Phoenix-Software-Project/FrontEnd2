import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { useContext } from 'react';
import { UserContext } from '../../UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
  },
  wrapper: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(14)
  },
  content: {
    marginLeft: theme.spacing(20),
    marginRight: theme.spacing(20)
  },
  edge: {
    marginLeft: theme.spacing(20),
    marginRight: theme.spacing(20)
  },
  bottom: {
    marginLeft: theme.spacing(39),
    marginRight: theme.spacing(39),
    marginTop: theme.spacing(3)
  }
}));

export const UpdateEmployee = () => {

  const { user, token } = useContext(UserContext);

  const classes = useStyles();

  const { id } = useParams()

  const [designation, setDesignation] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [contactNo, setContactNo] = useState(null)
  const [email, setEmail] = useState("")
  const [dob, setDOB] = useState(null)
  const [salary, setSalary] = useState(0)
  const [position, setPosition] = useState("")
  let navigate = useNavigate()

  async function getEmployeeDetails() {
    try {

      const res = await axios({
        method: 'get',
        url: `http://localhost:4000/employee/${id}`,
        headers: { 'x-access-token': token }
      })

      setDesignation(res.data.designation)
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setAddress(res.data.address);
      setContactNo(res.data.contactNo);
      setEmail(res.data.email);
      const unformattedDOB = res.data.dob;
      const formattedDOB = unformattedDOB.substring(0, 10);
      setDOB(formattedDOB);
      setSalary(res.data.salary);
      setPosition(res.data.position);

    } catch (error) {
      console.error(error)
    }

  }

  async function updateEmployeeDetails() {

    try {
      const formattedDOB = `${dob}T00:00:00.000Z`

      await axios({
        method: 'patch',
        url: `http://localhost:4000/employee/update/${id}`,
        headers: { 'x-access-token': token },
        data: {
          firstName, lastName, designation, address, contactNo, email, DOB: formattedDOB, salary, position
        }
      })

      Swal.fire({
        title: 'Updated Successfully',
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error(error)
    }





  }

  useEffect(() => {
    getEmployeeDetails()
  }, [])

  return (
    <div className={classes.wrapper} style={{ background: "url(/images/cusEmp/RegisterCustomer.jpg)" }}>
      <div className={classes.edge}>
        <div className={classes.content} style={{ backgroundColor: "white", paddingTop: "5%", paddingBottom: "5%", borderRadius: "15px" }}>
          <form
            onSubmit={() => {
              updateEmployeeDetails();
              if (user.Role == "EMPLOYEE") {
                navigate('/')
              }
              else if (user.Role == "ADMIN") {
                navigate('/get-all-employees')
              }
            }}
          >

            <h1 style={{ marginLeft: "13%" }}> Update Employee Details </h1>  <br /><br />

            <div className={classes.textField}>
              <FormControl component="fieldset" style={{ marginTop: "4%" }}  >
                <FormLabel component="legend">Designation</FormLabel>
                <RadioGroup
                  aria-label="mister"
                  name="mister"
                  value={designation}
                  onChange={(e) => {
                    setDesignation(e.target.value)
                  }}
                >
                  <FormControlLabel
                    value="Mr."
                    control={<Radio />}
                    label="Mr."
                  />
                  <FormControlLabel
                    value="Mrs."
                    control={<Radio />}
                    label="Mrs."
                  />
                  <FormControlLabel
                    value="Ms."
                    control={<Radio />}
                    label="Ms."
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className={classes.root}>
              <br /><br /><br />
              <TextField
                id="filled-full-width"
                label="First Name"
                placeholder="Input your first name"
                value={firstName}
                fullWidth
                margin="normal"
                className={classes.textField}
                variant="filled"
                required
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
            </div>

            <div className={classes.root}>
              <TextField
                id="filled-full-width"
                label="Last Name"
                placeholder="Input your last name"
                value={lastName}
                fullWidth
                margin="normal"
                className={classes.textField}
                variant="filled"
                required
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>

            <div className={classes.root}>
              <TextField
                id="filled-full-width"
                label="Address"
                placeholder="Enter your address here"
                value={address}
                fullWidth
                margin="normal"
                className={classes.textField}
                variant="filled"
                required
                onChange={(e) => {
                  setAddress(e.target.value)
                }}
              />
            </div>

            <div className={classes.root}>
              <TextField
                id="contactNo"
                label="Contact No"
                variant="filled"
                placeholder="Input your Contact No"
                value={contactNo}
                fullWidth
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}

                required
                onChange={(e) => {
                  let iContactNo = Number.parseInt(e.target.value)
                  setContactNo(iContactNo)
                }}
              />
            </div>

            <div className={classes.root}>
              <TextField
                type="email"
                id="filled-full-width"
                label="Email"
                placeholder="Input email address"
                value={email}
                fullWidth
                margin="normal"
                className={classes.textField}
                variant="filled"
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            {/* <div className={classes.root}>
        <TextField
        type = "number"
          id="outlined-full-width"
          label="Phone Number"
          placeholder="Input phone number"
          fullWidth
          margin="normal"
          className={classes.textField}
          variant="outlined"
          required
          onChange={(e)=>{
            setPhone_no(e.target.value)
          }}
        />
      </div> */}

            <div className={classes.root}>
              <TextField
                id="date"
                label="Birthday"
                variant="filled"
                type="date"
                value={dob}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setDOB(e.target.value)
                }}
              />
            </div><br />

            <div className={classes.root}>
              <TextField
                id="salary"
                label="Salary"
                variant="filled"
                type="number"
                value={salary}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  let iSalary = Number.parseInt(e.target.value)
                  setSalary(iSalary)
                }}
              />
            </div>

            <div className={classes.root}>
              <TextField
                id="filled-full-width"
                label="Position"
                placeholder="Enter Epmloyee's position here"
                value={position}
                fullWidth
                margin="normal"
                className={classes.textField}
                variant="filled"
                required
                onChange={(e) => {
                  setPosition(e.target.value)
                }}
              />
            </div>

            <Button type="submit" className={classes.textField} variant="contained" color="primary" style={{ marginLeft: "40%", width: "20%", marginTop: "5%" }}>
              UPDATE
            </Button>
          </form>

          <Button variant="contained" color="secondary" className={classes.bottom} onClick={() => { navigate(`/resetEmpPassword/${id}`) }}>Click here to reset password</Button>
        </div>
      </div>
    </div>
  );
}

