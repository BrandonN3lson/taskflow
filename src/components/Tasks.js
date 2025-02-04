import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/Tasks.module.css";
import BtnStyles from "../styles/Button.module.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../utils/utils";
import { axiosRes } from "../api/axiosDefault";

const Tasks = ({ tasks, setTasks, selectedCategoryId }) => {
  const filteredTasks = selectedCategoryId
    ? tasks.results.filter((task) => task.category === selectedCategoryId)
    : tasks.results;

    const handleDelete = async (taskId) => {
        try {
               await axiosRes.delete(`/tasks/${taskId}`)
               setTasks((prevState) => ({
                ...prevState,
                results: prevState.results.filter((task) => task.id !== taskId)
               }))
             } catch (error) {
              console.log(error)
             }
    }

  const task = (
    <>
      <InfiniteScroll
        style={{ overflowX: "hidden" }}
        dataLength={tasks.results?.length}
        loader={<p>...loading</p>}
        hasMore={!!tasks.next}
        next={() => fetchMoreData(tasks, setTasks)}
        scrollableTarget="scrollableTasksDiv"
      >
        {filteredTasks?.map((task) => (
          <Row
            
            key={task.id}
            
            className={`text-center d-flex justify-content-between ${styles.Row}`}
          >
            <Col as={Link} to="/task-detail" xs="10" sm="7" className="p-left-0 m-0 text-left">
              <p className={styles.Task}>{task.title}</p>
            </Col>
            <Col xs="auto" sm="3" className="p-0 d-none d-md-block">
              <p className={`${styles.Task}`}>{task.status}</p>
            </Col>
            <Col xs="1" sm="2" className="p-0">
              <p className={`${styles.Task} ${BtnStyles.ToggleDeleteIcon}`} onClick={()=>{handleDelete(task.id)}} >
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
          <Row className={`text-center d-flex ${styles.RowTitle}`}>
            <Col className={`col-xs-12 col-sm-7 m-0 ${styles.Col}`}>
              <p className={`${styles.Task} p-1 m-0`}>Title</p>
            </Col>
            <Col className="col-3  d-none d-md-block">
              <p className={`${styles.Task}`}>Status</p>
            </Col>
            <Col className="d-none d-md-block"></Col>
          </Row>
        </Container>
        <Container id="scrollableTasksDiv" className={styles.Container}>
          {task}
        </Container>
      </div>
    </div>
  );
};

export default Tasks;
