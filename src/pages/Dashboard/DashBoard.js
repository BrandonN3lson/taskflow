import Tasks from "../../components/Tasks";
import Category from "../../components/Category";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { axiosRes } from "../../api/axiosDefault";
import { fetchMoreData } from "../../utils/utils";
import TaskWidget from "../../components/TaskWidget";
import styles from "../../styles/DashBoard.module.css";
import { useCurrentUser } from "../../context/CurrentUserContext";

const DashBoard = () => {
  const currentUser = useCurrentUser();
  const [tasks, setTasks] = useState({ results: [], next: null });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await axiosRes.get(`/tasks/`);
      setTasks((prevState) => ({
        ...prevState,
        results: data.results,
        next: data.next,
      }));
      if (data.next) {
        fetchMoreData({ next: data.next, results: data.results }, setTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCategorySelect = (categoryName, categoryId) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryId);
    fetchTasks(categoryId);
  };

  return (
    <>
      {currentUser ? (
        <>
          <Row className={` d-none d-md-flex ${styles.Row}`}>
            <Col className="col-auto">
              <TaskWidget title={"important"} filter={"important"} />
            </Col>
            <Col className="col-auto">
              <TaskWidget title={"Due Soon"} filter={"due_soon"} />
            </Col>
          </Row>

          <Row className={`justify-content-between`}>
            <Col md="4" lg="3" className="d-block d-md-none">
              <Category
                sm
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </Col>
            <Col md="4" lg="3" className="d-none d-md-block">
              <Category
                md
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            </Col>
            <Col md="8" lg="9">
              <Tasks
                tasks={tasks}
                setTasks={setTasks}
                selectedCategoryId={selectedCategoryId}
              />
            </Col>
          </Row>
        </>
      ) : (
        <Container fluid className="text-center">
          <p>Please sign in to view</p>
          
        </Container>
      )}
    </>
  );
};

export default DashBoard;
