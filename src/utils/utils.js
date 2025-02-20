import { axiosReq } from "../api/axiosDefault";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.log(err);
  }
};

export const getStatusClass = (styles, taskStatus) => {
  switch (taskStatus) {
    case "pending":
      return styles.Pending;
    case "in_progress":
      return styles.InProgress;
    case "completed":
      return styles.Completed;
    default:
      return "";
  }
};

export const setTokeTimestamp = (data) => {
  const refreshTokemTimestamp = data?.refresh_token;
  localStorage.setItem("refreshTokenTimestamp", refreshTokemTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
