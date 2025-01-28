import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import styles from "../../styles/Form.module.css";
import ContainerStyles from "../../styles/Container.module.css";
import BtnStyles from "../../styles/Button.module.css";
import { useCategories } from "../../context/CategoryContext";
import { axiosReq } from "../../api/axiosDefault";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddTask = () => {
    const categories = useCategories();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [taskData, setTaskData] = useState({
        title: "",
        category: "",
        descriptiom: "",
        priority: "none",
        dueDate: "",
    });
    const { title, description, priority, dueDate } = taskData;

    const handleChange = (event) => {
        setTaskData({
            ...taskData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosReq.post("/tasks/", taskData);
            history.push('/')
        } catch (error) {
            if (error.response?.status !== 401) {
                setErrors(error.response?.data);
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
                        defaultValue=""
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Category
                        </option>
                        {categories?.map((category) => (
                            <option value={category.id} key={category.id}>{category.name}</option>
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
                                checked={priority === "Important"}
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
                                type="datetime-local"
                                name="dueDate"
                                value={dueDate}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Button className={BtnStyles.Button} type="submit">
                    Add
                </Button>
            </Form>
        </Container>
    );
};

export default AddTask;
