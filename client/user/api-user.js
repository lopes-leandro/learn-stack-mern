const { method } = require("lodash");
const { json } = require("body-parser");

const create = async (user) => {
    try {
        let response = await fetch('/api/v1/users', {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.log(err);        
    }
}

const list = async (signal) => {
    try {
        let response = await fetch('/api/v1/users', {
            method: 'GET',
            signal: signal
        });
        return await response.json();
    } catch (err) {
        console.log(err);        
    }
}

const read = async(params, credentials, signal) => {
    try {
        let response = await fetch(`/api/v1/users/${params.userId}`, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Autorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);        
    }
}

const update = async(params, credentials, user) => {
    try {
        let response = await fetch(`/api/v1/users/${params.userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Autorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.log(err);        
    }
}

const remove = async(params, credentials) => {
    try {
        let response = await fetch(`/api/v1/users/${params.userId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Autorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);        
    }
}

