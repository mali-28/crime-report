import { getDatabase, ref, get,child } from "firebase/database";
import { toast } from "react-toastify";
import { localStorageKeys } from "../utils/constant";
import { getLocalStorage, setLocalStorage } from "../utils/utils";

export const confirmSignIn = (user, handle, history,setToken, setPreUser, setUser) => {

    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("realsnap", snapshot.key, snapshot.val())
            const snap = snapshot.val();
            setLocalStorage(localStorageKeys.token, snap.token)
            setLocalStorage(localStorageKeys.user, { id: snapshot.key, phone: snap.phone, fname: snap.fname, lname: snap.lname, email: snap.email })
            history.replace("/")
            toast.success(`Login successfully!!`);

        } else {
            setLocalStorage(localStorageKeys.preUser, { id: user.uid, phone: user.phoneNumber, token: user.stsTokenManager.accessToken })
            setPreUser(getLocalStorage(localStorageKeys.preUser))
            handle();
        }
        setToken(getLocalStorage(localStorageKeys.token))
        setUser(getLocalStorage(localStorageKeys.user))

    }).catch((error) => {
        toast.error('error on set SignIn userData', error.message);
    });
}