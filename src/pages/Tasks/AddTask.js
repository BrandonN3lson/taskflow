import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import styles from "../../styles/Form.module.css";
import ContainerStyles from "../../styles/Container.module.css";
import BtnStyles from "../../styles/Button.module.css";

const AddTask = () => {
    return (
        <Container className={ContainerStyles.Container}>
            <Form className={styles.Form}>
                <Form.Group>
                    <Form.Label className="d-none">Title</Form.Label>
                    <Form.Control
                        className={styles.FormInput}
                        type="text"
                        placeholder="Title"
                        name="title"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className="d-none">Category</Form.Label>
                    <Form.Control
                        className={styles.FormInput}
                        as="select"
                        name="category"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Category
                        </option>
                        <option>Large select</option>
                        <option>Large select</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="d-none">Description</Form.Label>
                    <Form.Control
                        className={styles.FormInput}
                        as="textarea"
                        placeholder="Description"
                        name="description"
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
                                defaultChecked
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                className={styles.InputRadio}
                                type="radio"
                                label="Important"
                                name="priority"
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
                                name="dateTime"
                                placeholder="Select Date and Time"
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Button className={BtnStyles.Button} type="submit">
                    Log in
                </Button>
            </Form>
        </Container>
    );
};

export default AddTask;
