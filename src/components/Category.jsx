import React, { useState } from "react";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Alert,
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import styles from "../styles/Category.module.css";
import BtnStyles from "../styles/Button.module.css";
import AlertStyles from "../styles/Alert.module.css";

import { useCategories } from "../context/CategoryContext";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import {
  fetchMoreData,
  showConfirmToast,
  capitalizeFirstLetter,
} from "../utils/utils";

/**
 * Category Component
 *
 * This component displays and manages categories. It allows users to select a category,
 * add a new category, and delete existing categories. The categories are fetched
 * from the backend and displayed using InfiniteScroll for efficient loading.
 *
 * Props:
 * @param {boolean} sm - Determines if the small screen version should be displayed.
 * @param {boolean} md - Determines if the medium screen version should be displayed.
 * @param {string} selectedCategory - The currently selected category.
 * @param {Function} onCategorySelect - Callback function triggered when a category is selected.
 *
 * @returns {JSX.Element} The Category component.
 */
const Category = ({ sm, md, selectedCategory, onCategorySelect }) => {
  const { categories, setCategories, handleFetchCategories } = useCategories();
  const [addCategory, setAddCategory] = useState({
    title: "",
  });
  const [errors, setErrors] = useState({});
  const { title } = addCategory;

  /**
   * Handles category selection and triggers the callback.
   * @param {string} categoryName - The name of the selected category.
   * @param {number|null} categoryId - The ID of the selected category.
   */
  const handleSelect = (categoryName, categoryId) => {
    onCategorySelect(categoryName, categoryId);
  };

  /**
   * Handles changes in the category input field.
   * @param {Object} event - The event object from the input field.
   */
  const handleChange = (event) => {
    setAddCategory({
      ...addCategory,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Submits a new category to the backend and updates the category list.
   * @param {Object} event - The event object from the form submission.
   */
  const handleSubmitCategory = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post("/categories/", addCategory);
      handleFetchCategories();
      setAddCategory({ title: "" });
      toast.success("Category added successfully");
    } catch (error) {
      if (error.response?.status !== 401) {
        setErrors(error?.response.data);
        toast.error("Failed to add Category");
      }
    }
  };

  /**
   * Deletes a category after user confirmation.
   * @param {number} categoryId - The ID of the category to be deleted.
   */
  const handleDelete = (categoryId) => {
    showConfirmToast(
      "Are you sure you want to delete this category?",
      async () => {
        try {
          await axiosRes.delete(`/categories/${categoryId}`);
          await handleFetchCategories();
          toast.success("category deleted!");
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete category");
        }
      }
    );
  };

  return (
    <>
      {sm && (
        <Container>
          <div className={`text-center ${styles.DropdownContainer}`}>
            <div className={`d-flex justify-content-center align-items-center`}>
              <h1 id="categoryDropdownLabel" className={styles.CategoryTitle}>
                {selectedCategory}
              </h1>
              <Dropdown className="d-inline">
                <Dropdown.Toggle
                  variant="link"
                  aria-haspopup="true"
                  aria-expanded="false"
                  aria-labelledby="categoryDropdownLabel"
                  className={styles.ToggleButton}
                >
                  <i className="bi bi-caret-down-fill"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  id="DropdownMenue"
                  className={`${styles.ScrollDiv}`}
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  <Dropdown.Item onClick={() => handleSelect("All", null)}>
                    All
                  </Dropdown.Item>
                  <InfiniteScroll
                    style={{ overflowX: "hidden" }}
                    dataLength={categories.results?.length}
                    loader={
                      <p>
                        <Spinner animation="grow">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      </p>
                    }
                    hasMore={!!categories.next}
                    next={() => fetchMoreData(categories, setCategories)}
                    scrollableTarget="DropdownMenue"
                  >
                    {categories.results?.map((category) => (
                      <Dropdown.Item
                        className="d-flex justify-content-between"
                        key={category.id}
                        onClick={() =>
                          handleSelect(category.title, category.id)
                        }
                      >
                        {capitalizeFirstLetter(category.title)}
                        <span
                          className={`${styles.DeleteIcon} ${BtnStyles.MobileToggleDeleteIcon}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(category.id);
                          }}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </span>
                      </Dropdown.Item>
                    ))}
                  </InfiniteScroll>
                </Dropdown.Menu>
              </Dropdown>
            </div>

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
                        onFocus={() => setErrors({})}
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
                        onFocus={() => setErrors({})}
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
                loader={
                  <Spinner animation="grow">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                }
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
                        {capitalizeFirstLetter(category.title)}
                      </p>
                      <span
                        className={`${styles.DeleteIcon} ${BtnStyles.ToggleDeleteIcon}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(category.id);
                        }}
                      >
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
