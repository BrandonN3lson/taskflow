import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import styles from "../../styles/Form.module.css";
import ContainerStyles from "../../styles/Container.module.css";
import BtnStyles from "../../styles/Button.module.css";
import { useCategories } from "../../context/CategoryContext";
import { axiosReq } from "../../api/axiosDefault";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useRedirect } from "../../hooks/useRedirect";

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
    due_date: null,
  });
  const { title, description, priority, due_date } = taskData;

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
        console.log(error);
      }
    };
    handleMount();
  }, [history, taskId]);

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

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
                value={due_date}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Row>
          <Col>
            <Button className={BtnStyles.Button} type="submit">
              Update
            </Button>
          </Col>
          <Button
            className={BtnStyles.Button}
            type="button"
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
