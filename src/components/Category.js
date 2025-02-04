import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
} from "react-bootstrap";
import styles from "../styles/Category.module.css";
import { useCategories } from "../context/CategoryContext";
import BtnStyles from "../styles/Button.module.css";
import AlertStyles from "../styles/Alert.module.css";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../utils/utils";

const Category = ({ sm, md, selectedCategory, onCategorySelect }) => {
  const { categories, setCategories, handleFetchCategories } = useCategories();
  const [addCategory, setAddCategory] = useState({
    title: "",
  });
  const [errors, setErrors] = useState({});
  const { title } = addCategory;

  const handleSelect = (categoryName, categoryId) => {
    onCategorySelect(categoryName, categoryId);
  };

  const handleChange = (event) => {
    setAddCategory({
      ...addCategory,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitCategory = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post("/categories/", addCategory);
      handleFetchCategories();
      setAddCategory({ title: "" });
    } catch (error) {
      if (error.response?.status !== 401) {
        setErrors(error?.response.data);
      }
    }
  };

  const handleDelete = async (categoryId) => {
     try {
       await axiosRes.delete(`/categories/${categoryId}`)
       await handleFetchCategories()
     } catch (error) {
      console.log(error)
     }
  }

  return (
    <>
      {sm && (
        <Container>
          <div className={`text-center ${styles.DropdownContainer}`}>
            <h1 className={styles.CategoryTitle}>
              {selectedCategory}
              <Dropdown className="d-inline">
                <Dropdown.Toggle variant="link" className={styles.ToggleButton}>
                  <i className="bi bi-caret-down-fill"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
                  <Dropdown.Item onClick={() => handleSelect("All", null)}>
                    All
                  </Dropdown.Item >
                  {categories.results?.map((category) => (
                    <Dropdown.Item className="d-flex justify-content-between"
                      key={category.id}
                      onClick={() => handleSelect(category.title, category.id)}
                    >
                      {category.title}
                      <span className={`${styles.DeleteIcon} ${BtnStyles.MobileToggleDeleteIcon}`} onClick={(e) => {e.stopPropagation(); handleDelete(category.id)}}>
                        <i className="fa-regular fa-trash-can"></i>
                      </span>
                    </Dropdown.Item>
                    
                    
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </h1>

            <div>
              <Form onSubmit={handleSubmitCategory}>
                <Row>
                  <Col className="col-10 p-0">
                    <Form.Group>
                      <Form.Label className="d-none">Category</Form.Label>
                      <Form.Control
                        className={styles.CategoryInput}
                        type="text"
                        placeholder="Category"
                        name="title"
                        value={title}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col className="col-2 text-center p-0">
                    <Button
                      type="submit"
                      className={`${BtnStyles.AddCategory}`}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </Button>
                  </Col>
                  {errors.title?.map((message, idx) => (
                    <Alert
                      className={AlertStyles.Alert}
                      variant="warning"
                      key={idx}
                    >
                      {message}
                    </Alert>
                  ))}
                </Row>
              </Form>
            </div>
          </div>
        </Container>
      )}
      {md && (
        <Container className={styles.CategoryContainer}>
          <div className={`${styles.Category}`}>
            <h2 className={styles.CategoryHeader}>{selectedCategory}</h2>

            <div>
              <Form onSubmit={handleSubmitCategory}>
                <Row>
                  <Col className="col-10 p-0">
                    <Form.Group>
                      <Form.Label className="d-none">Category</Form.Label>
                      <Form.Control
                        className={styles.CategoryInput}
                        type="text"
                        placeholder="Category"
                        name="title"
                        value={title}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col className="col-2 text-center p-0">
                    <Button
                      type="submit"
                      className={`${BtnStyles.AddCategory}`}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </Button>
                  </Col>
                  {errors.title?.map((message, idx) => (
                    <Alert
                      className={AlertStyles.Alert}
                      variant="warning"
                      key={idx}
                    >
                      {message}
                    </Alert>
                  ))}
                </Row>
              </Form>
            </div>
            <div>
              <Row
                className={`align-items-center justify-content-center ${styles.AllRow}`}
                onClick={() => handleSelect("All", null)}
              >
                <p className={`${styles.CategoryText}`}>All</p>
              </Row>
            </div>

            <div
              id="scrollableDiv"
              style={{
                height: "300px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
              className={styles.ScrollDiv}
            >
              <InfiniteScroll
                style={{ overflowX: "hidden" }}
                dataLength={categories.results?.length}
                loader={<p>...loading</p>}
                hasMore={!!categories.next}
                next={() => fetchMoreData(categories, setCategories)}
                scrollableTarget="scrollableDiv"
              >
                {categories.results.map((category) => (
                  <Row
                    key={category.id}
                    className={`align-items-center justify-content-center ${styles.Row} `}
                    onClick={() => handleSelect(category.title, category.id)}
                  >
                    <div className={styles.CategoryItem}>
                      <p className={`${styles.CategoryText}`}>
                        {category.title}
                      </p>
                      <span className={`${styles.DeleteIcon} ${BtnStyles.ToggleDeleteIcon}`} onClick={() => handleDelete(category.id)}>
                        <i className="fa-regular fa-trash-can"></i>
                      </span>
                    </div>


                  </Row>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Category;
