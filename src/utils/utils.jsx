import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefault";
import { toast } from "react-toastify";

/**
 * Fetches more data for infinite scrolling and updates the resource state.
 * 
 * Taken from Code institute Moments react project.
 *
 * @param {Object} resource - The current resource containing `next` URL and results.
 * @param {Function} setResource - State setter function to update the resource.
 * @returns {Promise<void>} - Resolves when data is successfully fetched and state is updated.
 */
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
    // console.log(err);
  }
};

/**
 * Returns the corresponding CSS class based on the task's status.
 *
 * @param {Object} styles - The styles object containing CSS class names.
 * @param {string} taskStatus - The status of the task (`pending`, `in_progress`, `completed`).
 * @returns {string} - The CSS class for the given status.
 */
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

/**
 * Capitalizes the first letter of a given string.
 * 
 * Taken from Codedamn.com (https://codedamn.com/news/javascript/how-to-capitalize-first-letter-in-javascript)
 *
 * @param {string} str - The input string.
 * @returns {string} - The updated string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Displays a confirmation toast with options to proceed or cancel.
 *
 * @param {string} message - The confirmation message to display.
 * @param {Function} onConfirm - Function to execute when the user confirms the action.
 */
export const showConfirmToast = (message, onConfirm) => {
  let confirmToast = null;

  confirmToast = toast.info(
    <div className="text-center">
      <Row className="justify-content-center">
        <Col xs={12}>
          <p>{message}</p>
        </Col>

        <Col>
          <ButtonGroup>
            {/* yes button */}
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                onConfirm();
                toast.dismiss(confirmToast);
              }}
            >
              Yes, Delete
            </Button>

            {/* Cancel button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => toast.dismiss(confirmToast)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>,
    { autoClose: false, closeOnClick: false }
  );
};

/**
 * Stores the refresh token timestamp in localStorage.
 * 
 * Taken from Code institute Moments react project
 *
 * @param {Object} data - The authentication data containing `refresh_token`.
 */
export const setTokeTimestamp = (data) => {
  const refreshTokemTimestamp = data?.refresh_token;
  localStorage.setItem("refreshTokenTimestamp", refreshTokemTimestamp);
};

/**
 * Checks if the refresh token timestamp exists in localStorage.
 * 
 * Taken from Code institute Moments react project
 *
 * @returns {boolean} - Returns `true` if the token timestamp exists, otherwise `false`.
 */
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};


/**
 * Removes the refresh token timestamp from localStorage.
 * 
 * Taken from Code institute Moments react project
 * 
 */
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
