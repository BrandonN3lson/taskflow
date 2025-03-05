import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefault";
import { toast } from "react-toastify";

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

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

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
