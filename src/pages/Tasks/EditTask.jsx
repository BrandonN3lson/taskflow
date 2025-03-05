import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

import styles from "../../styles/Form.module.css";
import ContainerStyles from "../../styles/Container.module.css";
import BtnStyles from "../../styles/Button.module.css";

import { useCategories } from "../../context/CategoryContext";
import { axiosReq } from "../../api/axiosDefault";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * EditTask
 * 
 * This component provides a form for users to edit an existing task.
 * It fetches task details from the API, pre-fills the form, and allows updates.
 * 
 * Features:
 * - Retrieves and updates task details.
 * - Displays error messages if submission fails.
 * - Uses Bootstrap for styling and layout.
 * - Redirects users who are not signed in.
 * 
 * External Dependencies:
 * - React Bootstrap for form elements and layout.
 * - toast for success/error notifications.
 * - axiosReq for API requests.
 * - Context hooks for authentication and category selection.
 * 
 * @returns {JSX.Element} The task edit form.
 */
const EditTask = () => {
  useRedirect("loggedOut");
  const categories = useCategories();
  const history = useHistory();
  const { taskId } = useParams();
  const [errors, setErrors] = useState({});
  const [taskData, setTaskData] = useState({
    title: "",
    category: "",
    description: "",
    priority: "none",
    due_date: "",
  });
  const { title, description, priority, due_date } = taskData;

   /**
   * Fetches task data on component mount and populates the form fields.
   */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/${taskId}`);
        const { title, description, category, priority, due_date } = data;
        const formattedDate = due_date
          ? new Date(due_date).toISOString().split("T")[0]
          : "";
        setTaskData({
          title,
          description,
          category,
          priority,
          due_date: formattedDate,
        });
      } catch (error) {
        // console.log(error);
      }
    };
    handleMount();
  }, [history, taskId]);

  /**
   * Handles changes to input fields and updates state.
   * 
   * @param {Object} event - The input change event.
   */
  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Handles form submission, sending updated task data to the API.
   * If successful, redirects to the task detail page and shows a success toast.
   * If an error occurs, updates error state and shows an error toast.
   * 
   * @param {Object} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updateTaskData = {
        ...taskData,
        due_date:
          taskData.due_date === ""
            ? null
            : new Date(taskData.due_date).toISOString(),
      };
      await axiosReq.put(`/tasks/${taskId}`, updateTaskData);
      history.push(`/task-detail/${taskId}`);
      toast.success("Task updated!");
    } catch (error) {
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
        toast.error("Failed to update Task!");
      }
    }
  };

  return (
    <Container className={ContainerStyles.Container}>
      <Form className={styles.Form} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="d-none">Title</Form.Label>
          <Form.Control
            className={styles.FormInput}
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label className="d-none">Category</Form.Label>
          <Form.Control
            className={styles.FormInput}
            as="select"
            name="category"
            value={taskData.category}
            onChange={handleChange}
          >
            <option value="" disabled>
              Category
            </option>
            {categories.categories.results?.map((category) => (
              <option value={category.id} key={category.id}>
                {category.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {errors.category?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label className="d-none">Description</Form.Label>
          <Form.Control
            className={styles.FormInput}
            as="textarea"
            placeholder="Description"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Priority:</Form.Label>
            </Col>
            <Col>
              <Form.Check
                className={styles.InputRadio}
                type="radio"
                label="None"
                name="priority"
                value="none"
                checked={priority === "none"}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Check
                className={styles.InputRadio}
                type="radio"
                label="Important"
                name="priority"
                value="important"
                checked={priority === "important"}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row className="align-items-center">
            <Col>
              <Form.Label>Due date:</Form.Label>
            </Col>
            <Col>
              <Form.Control
                className={styles.FormInput}
                type="date"
                name="due_date"
                value={due_date || ""}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Row>
          <Col>
            <Button className={BtnStyles.Button} type="submit" aria-label="Update task">
              Update
            </Button>
          </Col>
          <Button
            className={BtnStyles.Button}
            type="button"
            aria-label="cancel"
            onClick={() => {
              history.push(`/task-detail/${taskId}`);
            }}
          >
            Cancel
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default EditTask;
