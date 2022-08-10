import { Button, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import store from "../store";
import styles from '../styles/login.module.css';
import { baseError } from "../utils/client_api";

const Login = observer(() => {
    const [values, setValues] = useState({
        name: '',
        password: '',
    })
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter()

    const onChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValues(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.value,
        }))
    }, [values])

    const onSubmitForm = useCallback(async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await store.login(values.name, values.password);
    } , [values]);

    return (
        <form className={styles.wrapper} onSubmit={onSubmitForm}>
            <h1 className={styles.header}>LOG IN</h1>
            <TextField onChange={onChangeForm} id="outlined-name" label="name" variant="outlined" value={values.name} name={"name"}/>
            <TextField onChange={onChangeForm} id="outlined-password" label="password" variant="outlined" type="password" value={values.password} name={"password"}/>
            <Button type="submit" variant="outlined" size="large">Log in</Button>
        </form>
    )
})

export default Login;