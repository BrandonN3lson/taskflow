import Tasks from "../../../components/Tasks";
import Category from "../../../components/Category";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { axiosRes } from "../../../api/axiosDefault";

const DashBoard = () => {
  const [tasks, setTasks] = useState()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const fetchTasks = async (categoryId = null) => {
    try {
      const url = categoryId ? `/tasks/?category_id=${categoryId}/` : `/tasks/`
      const {data} = axiosRes.get(url);
      setTasks(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  const handleCategorySelect = (categoryName, categoryId) => {
    setSelectedCategory(categoryName);
    fetchTasks(categoryId)
  }

    return (
        <Row className="justify-content-between">
            <Col md="4" lg="3" className="d-block d-md-none">
                <Category sm selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
            </Col>
            <Col md="4" lg="3" className="d-none d-md-block">
                <Category md />
            </Col>
            <Col md="8" lg="9">
                <Tasks tasks={tasks}/>
            </Col>
        </Row>
    );
};

export default DashBoard;
