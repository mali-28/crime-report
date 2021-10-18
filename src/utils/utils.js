import { regPass, regName, regEmail } from "./constant";


export const validatePhone = (phone) => {
    if (!phone) {
        return "Phone numberis required";
    }
    return "";
}

export const validatePassword = (pass) => {
    const value = typeof pass === "string" ? pass.trim() : "";
    if (!value) {
        return "Password is required";
    }else if(value.length < 8){
        return "Password should be atleast 8 character";
    }
    else if(!regPass.test(value)){
        return "Password only contains letters, numbers, underscores,  dashes and @";
    }
    return "";
}

export const validateName = (title,name) => {
    const value = typeof name === "string" ? name.trim() : "";
    if (!value) {
        return `${title || "Name"} is required`;
    }else if(!regName.test(value)){
        return "Enter alphabetric name";
    }
    return "";
}


export const validateEmail = (email) => {
    const value = typeof email === "string" ? email.trim() : "";
    if (!value) {
      return "Email is required";
    } else if (!regEmail.test(value)) {
      return "Please Enter valid Email";
    }
    return "";
  };
  
export const setLocalStorage = (key,value)=>{
     if(key && value){
         localStorage.setItem(key, JSON.stringify(value))
     }
    
}

export const getLocalStorage = (key) =>{
    if(key){
        const data = localStorage.getItem(key);
        if(data){
            return JSON.parse(data);
        }
    }
}

export const removeLocalStorage = (key) =>{
    if(key){
        localStorage.removeItem(key)
    }
}
 