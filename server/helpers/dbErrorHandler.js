const getErrorMessage = (err) => {
    let message = '';
    for (const errName in err.errors) {
        if (err.errors[errName].message) {
            message = err.errors[errName].message;            
        }
    }
    return message;
}

export default { getErrorMessage }