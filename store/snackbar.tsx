import { SnackbarProvider, useSnackbar, ProviderContext } from 'notistack';
import { useEffect } from 'react';

export let snack: ProviderContext;

export const Snackbar : React.FunctionComponent<{ children: JSX.Element }> = ({children}) => {
    const snackApi = useSnackbar();
    useEffect(() => {
        snack = snackApi;
    }, [snackApi])
    return (
        <>
            {children}
        </>
    )
}