import { Button, Fab, IconButton, List, ListItem, ListItemText, OutlinedInput, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import styles from '../styles/contacts.module.css';
import store, { IContacts } from "../store";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

const Contacts = observer(() => {
    const [values, setValues] = useState({
        name: '',
        phone: '',
    })
    const [valuesUpdate, setValuesUpdate] = useState({
        editId: 0,
        nameUpdate: '',
        phoneUpdate: '',
    })
    const [search, setSearch] = useState('');
    const router = useRouter()

    const createContact = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        store.createContact(values.name, values.phone);
    }, [values]);

    const onClickEdit = (el: IContacts) => {
        setValuesUpdate({
            editId: el.id,
            nameUpdate: el.name,
            phoneUpdate: el.phone,
        })
    }

    const updateContact = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        store.updateContact(valuesUpdate.editId, valuesUpdate.nameUpdate, valuesUpdate.phoneUpdate);
        setValuesUpdate({...valuesUpdate, editId: 0})
    }, [valuesUpdate])

    const onChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value,
        }))
    }, [])

    const deleteContact = (id: number) => {
        store.deleteContact(id);
    }

    const onChangeFormUpdate = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValuesUpdate((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value,
        }))
    }, [])

    const searchContact = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    useEffect(() => {
        console.log(store.user, 'store user cont');
        if(store.user === undefined){
            router.push('/login', undefined, { shallow: true })
        } else {
            store.getContacts();  
        }
         
    }, [router, store.user])
      
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Contacts</h1>
            <form>
                <h3>Search contact</h3>
                <OutlinedInput placeholder="Search" value={search} onChange={searchContact}/>
            </form>
            {valuesUpdate.editId === 0 && 
                <div className={styles.formContainer}>
                    <h3>Create contact</h3>
                    <form className={styles.form} onSubmit={createContact}>
                        <TextField onChange={onChangeForm} id="outlined-name" label="name" variant="outlined" value={values.name} name={"name"}/>
                        <TextField onChange={onChangeForm} id="outlined-password" label="phone" variant="outlined" value={values.phone} name={"phone"}/>
                        <Button type="submit" variant="outlined" size="large">Create</Button>
                    </form>
                </div>
            }
            {valuesUpdate.editId !== 0 && 
                <div className={styles.formContainer}>
                    <h3>Update contact</h3>
                    <form className={styles.form} onSubmit={updateContact}>
                        <TextField onChange={onChangeFormUpdate} id="outlined-name" label="name" variant="outlined" value={valuesUpdate.nameUpdate} name={"nameUpdate"}/>
                        <TextField onChange={onChangeFormUpdate} id="outlined-password" label="phone" variant="outlined" value={valuesUpdate.phoneUpdate} name={"phoneUpdate"}/>
                        <Button type="submit" variant="outlined" size="large">Update</Button>
                    </form>
                </div>
            }
            
            <List className={styles.list}>
                {
                    store.contacts.filter(el => el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1).map(el => {
                        return (
                            <ListItem key={el.id} className={styles.listitem}>
                                <ListItemText
                                    primary={el.name}
                                />
                                <ListItemText
                                    primary={el.phone}
                                />
                                <Fab onClick={()=>onClickEdit(el)} color="secondary" aria-label="edit" size="small">
                                    <EditIcon />
                                </Fab>
                                <IconButton onClick={()=>deleteContact(el.id)} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
    )
})

export default Contacts;
