import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosRes } from "../api/axiosDefault";
import { useCurrentUser } from "./CurrentUserContext";



const CategoriesContext = createContext();
export const useCategories = () => useContext(CategoriesContext)


export const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState({results: [], next:null});
    const currentUser = useCurrentUser()

    const handleFetchCategories = async () => {
        const { data } = await axiosRes.get("/categories/");
            setCategories((prevState) => ({
                ...prevState,
                results: data.results,
                next:data.next
            }));
    }

    useEffect(() => {
        if (currentUser) {
            handleFetchCategories();
        }
    }, [currentUser]);

    return (
        <CategoriesContext.Provider value={{categories, setCategories, handleFetchCategories}}>
            {children}
        </CategoriesContext.Provider>
    )
};
