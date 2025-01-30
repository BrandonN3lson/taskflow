import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/Tasks.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Tasks = ({ tasks, selectedCategoryId }) => {

    const filteredTasks = selectedCategoryId
        ? tasks.filter((task) => task.category === selectedCategoryId)
        : tasks;

    const task = (
        <>
            {filteredTasks?.map((task) => (
                <Row
                    as={Link}
                    key={task.id}
                    to="/task-detail"
                    className={`text-center d-flex ${styles.Row}`}
                >
                    <Col sm="4" className="col-2 m-0">
                        <p className={styles.Task}>{task.title}</p>
                    </Col>
                    <Col sm="3" >
                        <p className={`col-2 ${styles.Task}`}>{task.status}</p>
                    </Col>
                    <Col sm="3" className="col-2 d-none d-md-block">
                        <p className={styles.Task}>{task.priority}</p>
                    </Col>
                    <Col sm="2">
                        <p className={styles.Task}>edit/delete</p>
                    </Col>
                </Row>
            ))}
        </>
    );

    return (
        <div>
            <Container className={styles.Container}>
                <Row className={`text-center d-flex ${styles.RowTitle}`}>
                    <Col className="m-0">
                        <p className={styles.Task}>Title</p>
                    </Col>
                    <Col>
                        <p className={`${styles.Task}`}>Status</p>
                    </Col>
                    <Col className="d-none d-md-block">
                        <p className={styles.Task}>Priority</p>
                    </Col>
                    <Col></Col>
                </Row>
                {task}
            </Container>
        </div>
    );
};

export default Tasks;
