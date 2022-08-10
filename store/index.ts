import { action, runInAction, makeObservable, observable} from "mobx";
import client_api, { baseError } from "../utils/client_api";
import { navigate } from './navigate';
import { snack } from "./snackbar";

export interface IContacts{
    id: number;
    name: string;
    phone: string;
}

export interface IUser {
    name: string;
    token_api: string;
}

interface IStore {
    user: IUser | undefined; 
    contacts: IContacts[] | null
}

class MyStore {
    // token: string | undefined;
    user: IUser | undefined = undefined;
    contacts: IContacts[] = [];
    constructor() {
        makeObservable(this,{
            contacts: observable,
            getContacts: action,
        })
    }

    getContacts = async () => {
        try {
            const api = client_api('http://localhost:3004', this.user?.token_api as string);
            const result = await api.contacts();
            // const result = await api.contacts(token);        
            runInAction(() => {
                this.contacts = result;
            })
        } catch (error) {

                // navigate.push('/login', undefined, { shallow: true });
                snack.enqueueSnackbar("you are not authorized", {
                    variant: "error"
                })

        }
        
    }

    createContact = async(name: string, phone: string) => {
        const api = client_api('http://localhost:3004', this.user?.token_api as string);
        const result = await api.createContact(name, phone);
        runInAction(() => {
            this.contacts.push(result);
            snack.enqueueSnackbar("create contact", {
                variant: "success"
            })
        })
    }

    deleteContact = async(id: number) => {
        const api = client_api('http://localhost:3004', this.user?.token_api as string);
        await api.deleteContact(id);
        runInAction(() => {
            this.contacts = this.contacts.filter(el => el.id !== id);
            snack.enqueueSnackbar("delete contact", {
                variant: "success"
            })
        })
    }

    updateContact = async(id: number, name: string, phone: string) => {
        const api = client_api('http://localhost:3004', this.user?.token_api as string);
        const result = await api.updateContact(id, name, phone);
        runInAction(() => {
            const item = this.contacts.find(el => el.id === id);
            if(item) {
                item.name = name;
                item.phone = phone;
            }

        })
    }

    login = async (name: string, password: string) => {
        try {
            const api = client_api('http://localhost:3004');
            const result = await api.login(name, password);
            runInAction(() => {
                this.user = result;
                navigate.push('/contacts', undefined, { shallow: true });
                snack.enqueueSnackbar("login", {
                    variant: "success"
                })
            })
        } catch (error) {
            // const messageError = await error as baseError;
            // console.log(snack, 'snack');
            console.log('error', error);
            if (error instanceof Error) {
                snack.enqueueSnackbar(error.message as string, {
                    variant: "error"
                })
            } else {
                snack.enqueueSnackbar("Something went wrong", {
                    variant: "error"
                })
            }
            
                        
        }
    }

    hydrate = (data: IStore) => {
        if (data.user) {
            this.user = data.user;
        }
        if (data.contacts) {
            this.contacts = data.contacts;
        }
    }
}

const store = new MyStore;

export default store;