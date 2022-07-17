import React, { Fragment, useEffect } from 'react'
import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

import './Header.css';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title1: {
    flexGrow: 10,
  },
  title2: {
    flexGrow: 10,
  },
  title3: {
    flexGrow: 10,
  },
  title4: {
    flexGrow: 10,
  },
  title5: {
    flexGrow: 150,
  }
}));


export const Header = () => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    Swal.fire({
      title: 'Logged Out Successfully',
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    }).then((value) => {
      Swal.fire((window.location = "/"));
    });

  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => { navigate('/') }}>
            <HomeIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title2} >
            <a href='#' style={{ textDecoration: "none", color: "white" }}> Features </a>
          </Typography>
          <Typography variant='h6' className={classes.title3}>
            <a href="#" style={{ textDecoration: "none", color: "white" }}> Pricing </a>
          </Typography>
          <Typography variant='h6' className={classes.title4}>
            <a href="#" style={{ textDecoration: "none", color: "white" }}> FAQs </a>
          </Typography>
          <Typography variant='h6' className={classes.title5}>
            <a href="#" style={{ textDecoration: "none", color: "white" }}> About </a>
          </Typography>

          {user ?
            <>
              {/* {user.Email + " "} */}
              <h5
                id='email'
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (user.Role == "CUSTOMER")
                    navigate(`/updateCustomer/${user.Id}`)

                  else if (user.Role == "EMPLOYEE")
                    navigate(`/updateEmployee/${user.Id}`)

                  else if (user.Role == "ADMIN")
                    navigate(`/get-all-customers`)
                }}

              >
                {user.Email}
              </h5>


              <Button style={{ marginLeft: "1%" }} color="secondary" variant='contained' onClick={logout}>Log Out</Button>
            </>
            :
            <>

              <Button color="primary" variant='contained' className={classes.menuButton}
                onClick={() => { navigate("/login") }}
              > Login </Button>
              <Button color="secondary" variant='contained' onClick={() => { navigate("/register-customer") }}>Sign Up</Button>

            </>}

        </Toolbar>
      </AppBar>
    </div>
  );
}
