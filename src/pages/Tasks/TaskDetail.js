import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefault";
import { useCategories } from "../../context/CategoryContext";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Row,
} from "react-bootstrap";
import styles from "../../styles/TaskDetail.module.css";

const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const { categories } = useCategories();

  const statusChoices = [
    ["pending", "Pending"],
    ["in_progress", "In Progress"],
    ["completed", "Completed"],
  ];

  const fetchTask = useCallback(async () => {
    try {
      const { data } = await axiosReq.get(`/tasks/${taskId}/`);
      setTask(data);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleStatusChange = async (newStatus) => {
    try {
      await axiosReq.patch(`/tasks/${taskId}/`, { status: newStatus });
      fetchTask();
    } catch (error) {
      console.log(error);
    }
  };

  if (!task) {
    return <p>Loading task detail...</p>;
  }

  const categoryObject = categories.results.find(
    (category) => category.id === task.category
  );
  const categoryName = categoryObject
    ? categoryObject.title
    : "Unknown Category";

  const { title, priority, due_date, description } = task;

  return (
    <Container className={`mt-4 ${styles.TaskDetailContainer}`}>
      {/* Task Detail Card */}
      <Card className={`p-4 shadow-sm ${styles.TaskCard}`}>
        <Row className="mb-2">
          <Col>
            <h5 className={`${styles.Priority} ${priority.toLowerCase()}`}>
              Priority: {priority}
            </h5>
          </Col>
          <Col className="text-right">
            <span className={`${styles.Category}`}>{categoryName}</span>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h2 className={`${styles.TaskTitle}`}>{title}</h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <p className={`${styles.DueDate}`}>
              <strong>Due: </strong> {due_date}
            </p>
          </Col>
          <Col className="text-right">
            <p className={styles.CategoryTitle}>
              {statusChoices.find(([value]) => value === task.status)?.[1] ||
                task.status}
              <Dropdown className="d-inline">
                <Dropdown.Toggle
                  variant="link"
                  className={styles.ToggleStatusButton}
                >
                  <i className="bi bi-caret-down-fill"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {statusChoices.map(([value, label]) => (
                    <Dropdown.Item
                      className="d-flex justify-content-between"
                      key={value}
                      onClick={() => handleStatusChange(value)}
                    >
                      {label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex">
            <p className={`${styles.Description}`}>{description}</p>
          </Col>
        </Row>

        {/* File Upload Placeholder */}
        <Row className="mt-4">
          <Col>
            <Button variant="outline-primary" className={`${styles.AddFile}`}>
              + Add file
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default TaskDetail;
