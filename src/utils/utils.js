import { regPass, regName } from "./constant";

export const validatePhone = (phone) => {
    if (!phone) {
        return "Phone numberis required";
    }
    return "";
}

export const validatePassword = (pass) => {
    const value = typeof pass === "string" ? pass.trim() : "";
    console.log("length", value.length)
    if (!value) {
        return "Password is required";
    } else if (value.length < 8) {
        return "Password should be atleast 8 character";
    }
    else if (!regPass.test(value)) {
        return "Password only contains letters, numbers, underscores,  dashes and @";
    }
    return "";
}


export const validateName = (title, name) => {
    const value = typeof name === "string" ? name.trim() : "";
    if (!value) {
        return `${title || "Name"} is required`;
    } else if (!regName.test(value)) {
        return "Enter alphabetric name";
    }
    return "";
}


export const setLocalStorage = (key, value) => {
    if (key && value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

}

export const getLocalStorage = (key) => {
    if (key) {
        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
    }
}

export const removeLocalStorage = (key) => {
    if (key) {
        localStorage.removeItem(key)
    }
}

export const validateInput = (schema, name, e, setterFunction) => {
    if (schema && name && setterFunction){
        console.log({[name] : e})
        schema.validate({ [name] : e, })
            .then(setterFunction(""))
            .catch(function (err) {
                setterFunction(err.errors)
                console.log(err.name);
                console.log(err.errors);
            });
        }
}

export const confirmSignIn = (e,code, handle, setStorage, keys) => {
    e.confirm(code).then(function (result) {
        handle();
        const res = result.user
        setStorage(keys.preUser, { id: res.id, phone: res.phone, token: res.accessToken })
    }).catch(function (error) {
        alert(error.message);
    });
}