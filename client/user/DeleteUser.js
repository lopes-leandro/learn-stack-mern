import React, { useState, useEffect } from 'react';
import {
    IconButton, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    Button} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { remove } from './api-user';
import auth from "./../auth/auth-helper";
import { Redirect } from 'react-router';

export default function DeleteUser(props) {
    
    const [open, setOpen] = useState(false);    
    const [redirect, setRedirect] = useState(false);

    const jwt = auth.isAuthenticated();

    const clickButton = () => {
        setOpen(true);
    }

    const deleteAccount = () => {
        const jwt = auth.isAuthenticated();
        remove({userId: props.userId}, {t: jwt.token}).then((data) => {
            if (data && data.error) {
                console.log(data.error);                
            } else {
                auth.clearJWT(() => console.log('deletado'));
                setRedirect(true);
            }
        });
    }

    const handleRequestClose = () => {
        setOpen(false);
    }    

    if(redirect){
        return <Redirect to='/'/>
    }

    return (<span>
            <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
                <Delete />
            </IconButton>
            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>{"Deletar Conta"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirma a remoção da sua conta.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequestClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={deleteAccount} color="secondary" autoFocus="autoFocus">
                        Confirma
                    </Button>
                </DialogActions>
            </Dialog>
        </span>)
}