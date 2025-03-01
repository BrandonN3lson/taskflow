import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import styles from "../../styles/DashBoard.module.css";

import Tasks from "../../components/Tasks";
import Category from "../../components/Category";
import TaskWidget from "../../components/TaskWidget";
import { axiosRes } from "../../api/axiosDefault";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

/**
 * DashBoard
 * 
 * This component renders the main dashboard page where users can view and manage their tasks.
 * It includes task widgets for important and due soon tasks, a category selector, and a task list.
 * 
 * Features:
 * - Fetches and displays tasks from the API.
 * - Allows users to filter tasks by category.
 * - Uses Bootstrap for responsive layout.
 * - Redirects logged-out users.
 *
 * External Dependencies:
 * - React Bootstrap (Col, Container, Row) for UI layout.
 * - axiosRes for API requests.
 * - fetchMoreData utility for pagination.
 * - Context hooks for user authentication and redirection.
 *
 * @returns {JSX.Element} The dashboard component.
 */
const DashBoard = () => {
  useRedirect('loggedOut')
  const currentUser = useCurrentUser();
  const [tasks, setTasks] = useState({ results: [], next: null });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  /**
   * Fetches tasks from the API and updates the state.
   * If there are more tasks, fetchMoreData is called to load additional data.
   */
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

  /**
   * Handles category selection, updating the selected category and fetching relevant tasks.
   * 
   * @param {string} categoryName - The name of the selected category.
   * @param {number|null} categoryId - The ID of the selected category (null for 'All').
   */
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
