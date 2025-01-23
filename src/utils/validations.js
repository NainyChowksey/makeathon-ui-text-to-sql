

export const checkValidData=(email, password)=>{
    const isValidEmail= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isValidPassword= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    if(!isValidEmail) return "Please enter a valid email address."
    if(!isValidPassword) return "Please enter a valid password."
    return null;
}