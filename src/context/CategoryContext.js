import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosRes } from "../api/axiosDefault";
import { useCurrentUser } from "./CurrentUserContext";

const CategoriesContext = createContext();
export const useCategories = () => useContext(CategoriesContext);

/**
 * Categories Context
 *
 * This context manages categories for tasks, providing functionality to fetch and stored category data.
 * It ensures categories are updated when a user is logged in.
 *
 * External Dependencies:
 * - axiosRes for API requests.
 *
 * @returns {JSX.Element} The Categories context provider.
 */
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState({ results: [], next: null });
  const currentUser = useCurrentUser();

  /**
   * Fetches category data from the API and updates the state.
   */
  const handleFetchCategories = async () => {
    const { data } = await axiosRes.get("/categories/");
    setCategories((prevState) => ({
      ...prevState,
      results: data.results,
      next: data.next,
    }));
  };

  useEffect(() => {
    if (currentUser) {
      handleFetchCategories();
    }
  }, [currentUser]);

  return (
    <CategoriesContext.Provider
      value={{ categories, setCategories, handleFetchCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
