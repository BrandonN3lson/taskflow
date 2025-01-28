import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosRes } from "../api/axiosDefault";



const CategoriesContext = createContext();
export const useCategories = () => useContext(CategoriesContext)

export const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState();

    useEffect(() => {
        let isMounted = true;
        const fetchCategories = async () => {
            try {
                const { data } = await axiosRes.get("/categories/");
                if (isMounted) {
                    setCategories(data.results);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const timer = setTimeout(() => {
            fetchCategories();
        }, 500);
        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, []);

    return (
        <CategoriesContext.Provider value={categories}>
            {children}
        </CategoriesContext.Provider>
    )
};
