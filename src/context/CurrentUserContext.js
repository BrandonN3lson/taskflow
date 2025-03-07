import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

import { axiosReq, axiosRes } from "../api/axiosDefault";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

/**
 * Current User Context.
 *
 * this was taken from the Code institute moments project.
 *
 * This context manages authentication and user session handling.
 * It provides access to the current user and handles automatic token refreshing.
 *
 * External Dependencies:
 * - axios for API requests.
 * - axiosReq, axiosRes for request and response handling.
 * - removeTokenTimestamp, shouldRefreshToken for authentication utilities.
 *
 * @returns {JSX.Element} The CurrentUser context provider.
 */
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  /**
   * Fetches the current user's data from the API.
   */
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/", {
              refresh: window.localStorage.getItem("refreshTokenTimestamp"),
            });
          } catch (err) {
            // console.log(err.response.data);
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/", {
              refresh: window.localStorage.getItem("refreshTokenTimestamp"),
            });
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
