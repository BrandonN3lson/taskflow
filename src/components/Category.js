import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Form, Row } from "react-bootstrap";
import styles from "../styles/Category.module.css";
import { useCategories } from "../context/CategoryContext";
import BtnStyles from "../styles/Button.module.css";
import { axiosReq } from "../api/axiosDefault";

const Category = ({ sm, md, selectedCategory, onCategorySelect }) => {
    const categories = useCategories();

    const [addCategory, setAddCategory] = useState({
        title: "",
    });

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
        } catch (error) {
            if (error.response?.status !== 401) {
                console.log(error)
            }
        }
    };

    return (
        <>
            {sm && (
                <Container>
                    <div className={`text-center ${styles.DropdownContainer}`}>
                        <h1 className={styles.CategoryTitle}>
                            {selectedCategory}
                            <Dropdown className="d-inline">
                                <Dropdown.Toggle
                                    variant="link"
                                    className={styles.ToggleButton}
                                >
                                    <i className="bi bi-caret-down-fill"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() =>
                                            handleSelect("All", null)
                                        }
                                    >
                                        All
                                    </Dropdown.Item>
                                    {categories?.map((category) => (
                                        <Dropdown.Item
                                            key={category.id}
                                            onClick={() =>
                                                handleSelect(
                                                    category.title,
                                                    category.id
                                                )
                                            }
                                        >
                                            {category.title}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </h1>
                    </div>
                </Container>
            )}
            {md && (
                <Container className={styles.CategoryContainer}>
                    <div className={`${styles.Category}`}>
                        <h2 className={styles.CategoryHeader}>
                            {selectedCategory}
                        </h2>

                        <Form onSubmit={handleSubmitCategory}>
                            <Row>
                                <Col className="col-10 p-0">
                                    <Form.Group>
                                        <Form.Label className="d-none">
                                            Category
                                        </Form.Label>
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
                            </Row>
                        </Form>

                        <Row
                            className={`align-items-center justify-content-center ${styles.Row}`}
                            onClick={() => handleSelect("All", null)}
                        >
                            <p className={`${styles.CategoryText}`}>All</p>
                        </Row>

                        {categories?.map((category) => (
                            <Row
                                key={category.id}
                                className={`align-items-center justify-content-center ${styles.Row}`}
                                onClick={() =>
                                    handleSelect(category.title, category.id)
                                }
                            >
                                <p className={`${styles.CategoryText}`}>
                                    {category.title}
                                </p>
                            </Row>
                        ))}
                    </div>
                </Container>
            )}
        </>
    );
};

export default Category;
