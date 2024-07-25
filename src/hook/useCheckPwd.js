import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useCheckPwd = (targetPwd) => {
    const search = useLocation().search;
    const queries = new URLSearchParams(search);
    const [isValid, setIsValid] = useState();

    useEffect(()=>{
        if(queries){
            if(queries.get('pwd')===targetPwd){
                setIsValid(true);
            }
        }
    }, [queries, targetPwd]);

    return {isValid};
};

export default useCheckPwd;