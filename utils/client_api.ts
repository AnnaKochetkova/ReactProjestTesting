import { IContacts, IUser } from "../store";

export type baseError = {
    error: string
}

const checkResponse = async(res: Response) => {
    if (!res.ok) {
        const errorData = await res.json();
        if(errorData.error) {
            throw new Error(errorData.error);
        } else {
            throw new Error('Ответ сети был не ok.');
        }
    }
    return await res.json();
}

interface IClientApiPublic {
    login: (name: string, password: string) => Promise<IUser>
}

interface IClientApiPrivate {
    contacts: () => Promise<IContacts[]>
    createContact: (name: string, phone: string) => Promise<IContacts>
    deleteContact: (id: number) => Promise<void>
    updateContact: (id: number, name: string, phone: string) => Promise<IContacts>
}

function clientApi(base_url: string) : IClientApiPublic;

function clientApi(base_url: string, token: string) : IClientApiPrivate;

function clientApi(
    base_url: string, token?: string
): IClientApiPublic | IClientApiPrivate {
    const baseUrl: string = base_url;
    const tokenApi: string | undefined = token;

    const contacts = async(): Promise<IContacts[]> => {
        const res = await fetch(`${baseUrl}/contact`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': tokenApi as string,
            },
        });
        return checkResponse(res);
    }

    const createContact = async(name: string, phone: string): Promise<IContacts> => {
        const res = await fetch(`${baseUrl}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': tokenApi as string,
            },
            body: JSON.stringify({ name, phone })
        });        
        return checkResponse(res);
    }

    const deleteContact = async(id: number) => {
        const res = await fetch(`${baseUrl}/contact/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': tokenApi as string,
            }
            
        });
        return checkResponse(res);
    }

    const updateContact = async(id: number, name: string, phone: string) => {
        const res = await fetch(`${baseUrl}/contact/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': tokenApi as string,
            },
            body: JSON.stringify({ name, phone })
        });
        return checkResponse(res);
    }
    
    const login = async(name: string, password: string): Promise<IUser> => {
        const res = await fetch(`${baseUrl}/login` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": name, "password": password})
        });
        return checkResponse(res);
    }
    
    if (token !== undefined) {
        return {contacts, createContact, deleteContact, updateContact}
    } else {
        return { login }
    }
}

export default clientApi;