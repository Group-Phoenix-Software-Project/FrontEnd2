import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useContext } from 'react';
import { UserContext } from '../../UserContext';

import jwtDecode from 'jwt-decode'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(/images/cusEmp/Login.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const ResetEmpPassword = () => {

    const { user, token } = useContext(UserContext);

    const { id } = useParams()
    const classes = useStyles();

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    let navigate = useNavigate()


    const changePassword = async () => {

        if (password === confirmPassword) {

            try {

                const res = await axios({
                    method: 'patch',
                    url: `http://localhost:4000/employee/resetPassword/${id}`,
                    headers: { 'x-access-token': token },
                    data: {
                        password
                    }
                })

                localStorage.clear();


                Swal.fire({
                    title: 'Password is changed Successfully',
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });

            } catch (error) {
                alert(error);
            }

        } else {
            Swal.fire({
                title: "Passowrds Not Matched!!",
                text: "Please enter your details correctly...",
                icon: "error",
                confirmButtonText: "OK",
            });
        }



    }
    return (

        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <form className={classes.form}
                        onSubmit={() => {
                            changePassword();
                            if (user.Role == "CUSTOMER") {
                                navigate('/')
                            }
                            else if (user.Role == "ADMIN") {
                                navigate('/get-all-customers')
                            }
                        }}
                    >

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Change Password
                        </Button>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}
