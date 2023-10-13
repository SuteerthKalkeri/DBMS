function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    

    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;


    if(values.name === "") {
        error.name = "Name should not be empty"
    }
    else {
        error.name = ""
    }

    if(values.email === "") {
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email didn't match"
    }else {
        error.email = ""
    }

    if(values.password === "") {
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
    error.password = "Password must contain 1 Uppercase letter, 1 Lower case letter, 1 digit and a special character and must be minimum of 8 characters."
    }
    else {
        error.password = ""
    }

    if(values.address === "") {
        error.address = "Address should not be empty"
    }
    else {
        error.address = ""
    }

    if(values.phone === null) {
        error.phone = "Phone Number should not be empty"
    }
    else {
        error.phone = ""
    }

    return error;

        
}

export default Validation;