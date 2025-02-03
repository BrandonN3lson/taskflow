import Tasks from "../../components/Tasks";
import Category from "../../components/Category";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { axiosRes } from "../../api/axiosDefault";
import { fetchMoreData } from "../../utils/utils";

const DashBoard = () => {
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
    <Row className="justify-content-between">
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
  );
};

export default DashBoard;
