import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

/**
 * useRedirect Hook
 * 
 * This hook handles user authentication status and redirects users accordingly.
 *
 * Effects:
 * - If the user is logged in, they are redirected to the home page ("/").
 * - If the user is logged out, they are redirected to the sign-in page ("/signin").
 * - The hook attempts to refresh the authentication token before determining redirection.
 *
 * @param {string} userAuthStatus - Defines the authentication status ("loggedIn" or "loggedOut").
 */
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/", {
            refresh: window.localStorage.getItem("refreshTokenTimestamp")
        });

        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (error) {
        if (userAuthStatus === "loggedOut") {
          history.push("/signin");
        }
      }
    };
    handleMount();
  }, [history, userAuthStatus]);
};
