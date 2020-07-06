import React, { useState, useEffect } from "react";
import {
    makeStyles, 
    Paper, 
    List, 
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction, 
    ListItemText, 
    IconButton, 
    Avatar,
    Typography } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import ArrowForward from "@material-ui/icons/ArrowForward";
import {Link} from 'react-router-dom'
import { list } from "./api-user";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    }
}));

export default function Users() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error);                
            } else {
                setUsers(data);
            }
        });
        return function cleanup() {
            abortController.abort();
        }
    },[]);

    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant="h6" className={classes.title}>
                Todos os Usuários
            </Typography>
            <List dense>
                {
                    users.map((item, i) => {
                        return <Link to={`/user/${item._id}`} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name}/>
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    })
                }
            </List>
        </Paper>
    );
}