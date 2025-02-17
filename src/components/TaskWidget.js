import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../api/axiosDefault";
import { fetchMoreData } from "../utils/utils";

import styles from "../styles/TaskWidget.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

const TaskWidget = ({ title, filter }) => {
  const [filteredTasks, setFilteredTasks] = useState({
    results: [],
    next: null,
  });

  const fetchFilteredTasks = async () => {
    try {
      let url = "/tasks/";
      if (filter === "due_soon") {
        url = "/tasks/due-soon/";
      }
      const { data } = await axiosRes.get(url);
      setFilteredTasks((prevState) => ({
        ...prevState,
        results: data.results,
        next: data.next,
      }));

      if (data.next) {
        fetchMoreData(
          { next: data.next, results: data.results },
          setFilteredTasks
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilteredTasks();
  }, []);

  const tasksToDisplay =
    filter === "important"
      ? filteredTasks.results
          .filter((task) => task.priority === "important" && task.status !== "completed")
      : filteredTasks.results.filter((task) => task.status !== "completed");

  return (
    <Container className={styles.Container}>
      <Row className={`text-center ${styles.WidgetTitle}`}>
        <Col className={`col-12 justify-content-center ${styles.Col}`}>
          <p className={`${styles.Task} p-1 m-0`}>{title}</p>
        </Col>
      </Row>
      <div id="taskWidgetScroll" className={styles.TaskContainerDiv}>
        <InfiniteScroll
          style={{ overflowX: "hidden", paddingLeft: "5px" }}
          dataLength={filteredTasks.results?.length}
          loader={<p>...loading</p>}
          hasMore={!!filteredTasks.next}
          next={() => fetchMoreData(filteredTasks, setFilteredTasks)}
          scrollableTarget="taskWidgetScroll"
        >
          {tasksToDisplay.map((task) => (
            <Row
              key={task.id}
              className={`text-center d-flex justify-content-between ${styles.Row}`}
              as={Link}
              to={`/task-detail/${task.id}`}
            >
              <Col className={` col-auto ${styles.Col} ${styles.ColTitle}`}>
                <p className={styles.Task}>{task.title}</p>
              </Col>
              <Col
                className={` ${styles.Col} ${styles.ColDaysLeft} ${
                  filter === "important" ? "d-none" : "d=block"
                }`}
              >
                <p
                  className={`${styles.Task} ${
                    task.is_overdue ? `${styles.OverDue}` : ""
                  }`}
                >
                  {task.is_overdue ? "Overdue" : `${task.days_left} days`}
                </p>
              </Col>
            </Row>
          ))}
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default TaskWidget;
