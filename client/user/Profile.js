import React, { useState, useEffect } from 'react';
import {Redirect, Link} from "react-router-dom";
import {
    makeStyles, 
    Typography, 
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    ListItemSecondaryAction,
    IconButton} from "@material-ui/core";
import { Person, Edit } from "@material-ui/icons";
import {read} from './api-user';
import auth from "./../auth/auth-helper";

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
        padding: theme.spacing(3)
    }),
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.openTitle,
        // border: '1px black dashed'
    }
}));

export default function Profile({match}) {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        read({
            userId: match.params.userId
        }, {
            t: jwt.token
        }, signal).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true);
            } else {
                setUser(data);
            }
        });
        return function cleanup() {
            abortController.abort();
        }
    }, [match.params.userId]);

    if (redirectToSignin) {
        return (<Redirect to='/signin/' />)
    }

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Perfil
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Person/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email}/>
                    {
                        auth.isAuthenticated().user &&
                        auth.isAuthenticated().user._id == user._id &&
                        (
                            <ListItemSecondaryAction>
                                <Link to={"/user/edit/" + user._id}>
                                    <IconButton aria-label="Edit" color="primary">
                                        <Edit/>
                                    </IconButton>
                                </Link>
                            </ListItemSecondaryAction>
                        )
                    }
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary={"Juntou: " + (
                        new Date(user.created)).toDateString()}/>
                </ListItem>
            </List>
        </Paper>
    )
}