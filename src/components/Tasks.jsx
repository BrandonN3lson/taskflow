import React from "react";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import styles from "../styles/Tasks.module.css";
import BtnStyles from "../styles/Button.module.css";

import { axiosRes } from "../api/axiosDefault";
import {
  fetchMoreData,
  getStatusClass,
  capitalizeFirstLetter,
  showConfirmToast,
} from "../utils/utils";

/**
 * Tasks Component
 * 
 * This component displays a list of tasks with infinite scrolling.
 * Users can view task details, check their status, and delete tasks.
 * 
 * Props:
 * @param {Object} tasks - The task list object containing results and pagination info.
 * @param {Function} setTasks - Function to update the task list state.
 * @param {number|null} selectedCategoryId - The ID of the selected category for filtering tasks.

 * External Dependencies:
 * - react-toastify for notifications.
 * - react-infinite-scroll-component for infinite scrolling.
 * - react-bootstrap for UI components.
 * 
 * @returns {JSX.Element} The Tasks component.
 */
const Tasks = ({ tasks, setTasks, selectedCategoryId }) => {
  /**
   * Filters tasks based on the selected category.
   */
  const filteredTasks = selectedCategoryId
    ? tasks.results.filter((task) => task.category === selectedCategoryId)
    : tasks.results;

  /**
   * Handles task deletion with a confirmation prompt.
   * @param {number} taskId - The ID of the task to be deleted.
   */
  const handleDelete = (taskId) => {
    showConfirmToast("Are you sure you want to delete this task?", async () => {
      try {
        await axiosRes.delete(`/tasks/${taskId}`);
        setTasks((prevState) => ({
          ...prevState,
          results: prevState.results.filter((task) => task.id !== taskId),
        }));
        toast.success("Task deleted successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete task");
      }
    });
  };

  const statusChoices = [
    ["pending", "Pending"],
    ["in_progress", "In Progress"],
    ["completed", "Completed"],
  ];

  const task = (
    <>
      <InfiniteScroll
        style={{ overflowX: "hidden" }}
        dataLength={tasks.results?.length}
        loader={<Spinner animation="grow"><span className="sr-only">Loading...</span></Spinner>}
        hasMore={!!tasks.next}
        next={() => fetchMoreData(tasks, setTasks)}
      >
        {filteredTasks?.map((task) => (
          <Row
            key={task.id}
            className={`text-center d-flex justify-content-between ${styles.Row}`}
          >
            <Col
              as={Link}
              to={`/task-detail/${task.id}`}
              xs="10"
              sm="7"
              className={`p-left-0 m-0 ${styles.ColTitle}`}
            >
              <p className={styles.Task}>{capitalizeFirstLetter(task.title)}</p>
            </Col>
            <Col
              xs="auto"
              sm="3"
              className={`p-0 d-none d-md-block ${styles.ColStatus}`}
            >
              <p
                className={`${styles.Task} ${getStatusClass(
                  styles,
                  task.status
                )}`}
              >
                {statusChoices.find(([value]) => value === task.status)?.[1] ||
                  task.status}
              </p>
            </Col>
            <Col xs="1" sm="2" className="p-0">
              <p
                className={`${styles.Task} ${BtnStyles.ToggleDeleteIcon}`}
                onClick={() => {
                  handleDelete(task.id);
                }}
              >
                <i className="fa-regular fa-trash-can"></i>
              </p>
            </Col>
          </Row>
        ))}
      </InfiniteScroll>
    </>
  );

  return (
    <div>
      <div className={`${styles.TaskContainer}`}>
        <Container className={`${styles.ContainerTitle}`}>
          <Row className={`text-left d-flex ${styles.RowTitle}`}>
            <Col className={`col-xs-12 col-sm-7 m-0 ${styles.Col}`}>
              <p className={`${styles.Task} p-1 m-0`}>Title</p>
            </Col>
            <Col className="col-3  d-none d-md-block text-right">
              <p className={`${styles.Task}`}>Status</p>
            </Col>
            <Col className={`col-2 d-none d-md-block`}>
              <p className={`${styles.Task}`}>Qty: {tasks.results?.length}</p>
            </Col>
          </Row>
        </Container>
        <Container className={styles.Container}>{task}</Container>
      </div>
    </div>
  );
};

export default Tasks;
