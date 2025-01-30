import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { useHistory } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
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
                    await axios.post("/dj-rest-auth/token/refresh/");
                } catch (err) {
                    setCurrentUser((prevCurrentUser) => {
                        if (prevCurrentUser) {
                            history.push("/signin");
                        }
                        return null;
                    });
                    removeTokenTimestamp()
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
                    await axios.post("/dj-rest-auth/token/refresh/");
                } catch (err) {
                    setCurrentUser((prevCurrentUser) => {
                        if (prevCurrentUser) {
                            history.push("/signin");
                        }
                        return null;
                    });
                    removeTokenTimestamp()
                }
                return axios(err.config);
            }
            return Promise.reject(err);
        }
    );
}, [history]);




  // useMemo(() => {
  //   axiosReq.interceptors.request.use(
  //      (config) => {
  //       const accessToken = localStorage.getItem('my-app-auth');
  //       console.log(accessToken) // Get the access token from localStorage
  //       if (accessToken) {
  //         config.headers['Authorization'] = `Bearer ${accessToken}`;
  //       }
  //       return config;
  //     },
  //     (err) => {
  //       return Promise.reject(err);
  //     }
  //   );

  //   axiosRes.interceptors.response.use(
  //     (response) => response,
  //     async (err) => {
  //       if (err.response?.status === 401) {
  //         const refreshToken = localStorage.getItem('my-refresh-token'); // Get the refresh token from localStorage
  //         try {
  //           // Send the refresh token to get a new access token
  //           const { data } = await axios.post("/dj-rest-auth/token/refresh/", { refresh: refreshToken });
  //           // Save the new access token
  //           localStorage.setItem('my-app-auth', data.access);
  //           err.config.headers['Authorization'] = `Bearer ${data.access}`;
  //           return axios(err.config);
  //         } catch (refreshError) {
  //           setCurrentUser(null);
  //           history.push("/signin");
  //           return Promise.reject(refreshError);
  //         }
  //       }
  //       return Promise.reject(err);
  //     }
  //   );
  // }, [history]);

 


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};