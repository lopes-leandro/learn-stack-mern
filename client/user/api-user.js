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