import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosRes } from "../api/axiosDefault";
import { useCurrentUser } from "./CurrentUserContext";



const CategoriesContext = createContext();
export const useCategories = () => useContext(CategoriesContext)

export const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState();
    const currentUser = useCurrentUser()

    const handleFetchCategories = async () => {
        const { data } = await axiosRes.get("/categories/");
        setCategories(data.results);
    }

    useEffect(() => {
        handleFetchCategories()
    }, [currentUser]);

    return (
        <CategoriesContext.Provider value={categories}>
            {children}
        </CategoriesContext.Provider>
    )
};
