import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import InfiniteScroll from "react-infinite-scroll-component";
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
import taskStyles from "../../styles/Tasks.module.css";

import { axiosReq, axiosRes } from "../../api/axiosDefault";
import { useCategories } from "../../context/CategoryContext";
import { fetchMoreData, showConfirmToast } from "../../utils/utils";
import { getStatusClass, capitilizeFirstLetter  } from "../../utils/utils";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * TaskDetail
 * 
 * This component displays detailed information about a specific task, including its title, priority, category, 
 * due date, description, status, and associated files. Users can update the task status, upload and manage files, 
 * and navigate to the task edit page.
 * 
 * Features:
 * - Fetches task details and associated files from the API.
 * - Allows users to update the task status via a dropdown.
 * - Supports file uploads with preview and deletion functionality.
 * - Provides an edit button to navigate to the task edit page.
 * - Uses infinite scrolling to load additional task files dynamically.
 * 
 * External Dependencies:
 * - React Bootstrap for layout and form components.
 * - toast for displaying success/error notifications.
 * - axiosReq and axiosRes for API requests.
 * - Context hooks for fetching category details.
 * - Utility functions for confirmation dialogs, fetching additional data, and formatting.
 * 
 * @returns {JSX.Element} The task detail view.
 */

const TaskDetail = () => {
  useRedirect('loggedOut')
  const { taskId } = useParams();
  const { categories } = useCategories();
  const fileInputRef = useRef(null);
  const [task, setTask] = useState(null);
  const [taskFiles, setTaskFiles] = useState({
    results: [],
    next: null,
  });
  const [files, setFiles] = useState({
    file: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const history = useHistory();

  /**
   * Redirects to the task edit page.
   */
  const handleEditTask = () => {
    history.push(`/tasks/${taskId}/edit`);
  };

  const statusChoices = [
    ["pending", "Pending"],
    ["in_progress", "In Progress"],
    ["completed", "Completed"],
  ];
  
  /**
   * Fetches task details from the API.
   */
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

  /**
   * Fetches files attached to the task from the API.
   */
  const fetchTaskFiles = useCallback(async () => {
    try {
      const { data } = await axiosRes.get(`/task-files/?task=${taskId}`);
      setTaskFiles((prevState) => ({
        ...prevState,
        results: data.results,
        next: data.next,
      }));
    } catch (error) {
      console.log(error.response?.data);
    }
  },[taskId])

  useEffect(() => {
    fetchTaskFiles();
  }, [fetchTaskFiles]);

  /**
   * Handles file input change.
   * 
   * @param {Object} event - The input change event.
   */
  const handleChange = (e) => {
    setFiles({
      ...file,
      [e.target.name]: e.target.files[0],
    });
  };

  /**
   * Uploads a file to the task.
   * 
   * @param {Object} event - The form submission event.
   */
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
      toast.success("File uploaded to task!")
      fetchTaskFiles();
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload file")
    }
  };

  /**
   * Toggles edit mode for task files.
   */
  const handleEditToggle = () => {
    setIsEditMode((prevState) => !prevState);
  };

  /**
   * Deletes a file from the task.
   */
  const handleDeleteFile = (fileId) => {
    showConfirmToast("are you sure you want to delete this file?", async () => {

      try {
        await axiosReq.delete(`/task-files/${fileId}`);
        fetchTaskFiles();
        toast.success("File deleted!")
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete file")
      }
    })
  };

  /**
   * Extracts file name from URL.
   */
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
      <Row>
        <Col className={`col-12 text-right`}>
          <div>
            <button onClick={handleEditTask} className={styles.TaskEditButton}>
              <i className={"fa-solid fa-pencil"}></i>
            </button>
          </div>
        </Col>
      </Row>
      <Card className={`p-4 shadow-sm ${styles.TaskCard}`}>
        <Row className="mb-2">
          <Col className={`${priority === "none" ? "d-none" : ""}`}>
            <h5 className={`${styles.Priority} ${priority ? styles.PriorityHigh : ""}`}>
              {capitilizeFirstLetter(priority)}
            </h5>
          </Col>
          <Col className="text-right">
            <span className={`${styles.Category}`}>{capitilizeFirstLetter(categoryName)}</span>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h2 className={`${styles.TaskTitle}`}>{capitilizeFirstLetter(title)}</h2>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className={`${!due_date ? "d-none" : ""}`}>
            <p className={`${styles.DueDate}`}>
              <strong>Due: </strong> {due_date}
            </p>
          </Col>
          <Col className="text-right">
            <p className={`${styles.CategoryTitle} ${getStatusClass(taskStyles, task.status)}`}>
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
            <p className={`${styles.Description}`}>{capitilizeFirstLetter(description)}</p>
          </Col>
        </Row>

        {/* File Upload Placeholder */}
        <Row className={`mt-4`}>
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
        {taskFiles.results?.filter((file) => `${file.task}` === `${taskId}`)
          .length ? (
          <Row className={`${styles.TaskRow}`}>
            <Col className={`col-12 text-right`}>
              <div >
                <button
                  onClick={handleEditToggle}
                  className={styles.TaskEditButton}
                >
                  <i
                    className={
                      isEditMode ? "fa-solid fa-xmark" : "fa-solid fa-pencil"
                    }
                  ></i>
                </button>
              </div>
            </Col>
          </Row>
        ) : (
          <p>Add files to task</p>
        )}
        <Row>
          <InfiniteScroll
            style={{
              overflowX: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            dataLength={taskFiles.results?.length}
            loader={<p>loading files...</p>}
            hasMore={!!taskFiles.next}
            next={() => fetchMoreData(taskFiles, setTaskFiles)}
          >
            <div id="scrolltaskfiles" className={`${styles.Row}`}>
              {taskFiles.results
                ?.filter((file) => `${file.task}` === `${taskId}`)
                .map((file) => (
                  <Col key={file.id} className={`col-2 ${styles.Col}`}>
                    <div>
                      <a
                        className={styles.TaskFile}
                        href={file.file}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-regular fa-file"></i>
                        <p className={styles.TaskFileText}>
                          {getFileName(file?.file)}
                        </p>
                      </a>
                      {isEditMode && (
                        <button
                          onClick={() => handleDeleteFile(file.id)}
                          className={`${styles.TaskFileDeleteButton}`}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      )}
                    </div>
                  </Col>
                ))}
            </div>
          </InfiniteScroll>
        </Row>
      </Card>
    </Container>
  );
};

export default TaskDetail;
