import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq, axiosRes } from "../../api/axiosDefault";
import { useCategories } from "../../context/CategoryContext";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
} from "react-bootstrap";
import styles from "../../styles/TaskDetail.module.css";

const TaskDetail = () => {
  const { taskId } = useParams();
  const { categories } = useCategories();
  const fileInputRef = useRef(null);
  const [task, setTask] = useState(null);
  const [taskFiles, setTaskFiles] = useState([]);
  const [files, setFiles] = useState({
    file: "",
  });

  const statusChoices = [
    ["pending", "Pending"],
    ["in_progress", "In Progress"],
    ["completed", "Completed"],
  ];
  //fetch task details
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

  //  fetch task files
  const fetchTaskFiles = async () => {
    try {
      const { data } = await axiosRes.get(`/task-files/?task=${taskId}`);
      setTaskFiles(data.results);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchTaskFiles();
  }, [taskId]);

  // handle uploading files
  const handleChange = (e) => {
    setFiles({
      ...file,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("task", taskId);

    try {
       await axiosReq.post("/task-files/", formData);
      setFiles({ file: "" });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      fetchTaskFiles();
    } catch (error) {
      console.log(error);
    }
  };

  const getFileName = (url) => {
    if (!url) return "Unknown File";
    return url.split("/").pop().split("_").join(".");
  };

  // update status of task
  const handleStatusChange = async (newStatus) => {
    try {
      await axiosReq.patch(`/tasks/${taskId}/`, { status: newStatus });
      fetchTask();
    } catch (error) {
      console.log(error);
    }
  };

  if (!task) {
    return <p className={styles.TaskLoader}>Loading task detail...</p>;
  }

  const categoryObject = categories.results.find(
    (category) => category.id === task.category
  );
  const categoryName = categoryObject
    ? categoryObject.title
    : "Unknown Category";

  const { title, priority, due_date, description } = task;
  const { file } = files;

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
            <Form onSubmit={handleFileUpload} encType="multipart/form-data">
              <Form.Group>
                <Form.Label className="d-none">Add a file</Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  ref={fileInputRef}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  variant="outline-primary"
                  className={`${styles.AddFile}`}
                >
                  + Add file
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className={`${styles.Row}`}>
          {taskFiles?.map((file) => (
            <Col className={`col-2 ${styles.Col}`}>
              <div>
                <a className={styles.TaskFile} href={file.file} target="_blank" rel="noopener noreferrer">
                  <i className="fa-regular fa-file"></i>
                  <p className={styles.TaskFileText}>
                    {getFileName(file?.file)}
                  </p>
                </a>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </Container>
  );
};

export default TaskDetail;
