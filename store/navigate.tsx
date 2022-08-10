import { useRouter, NextRouter } from "next/router";
import { useEffect } from "react";

export let navigate: NextRouter;

export const Navigate : React.FunctionComponent<{ children: JSX.Element }> = ({ children }) => {
    const router = useRouter();
    useEffect(() => {
        navigate = router;
    }, [router])
    return (
        <>
            {children}
        </>
    )
}