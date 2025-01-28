import React from "react";
import { Container, Dropdown, Row } from "react-bootstrap";
import styles from "../styles/Category.module.css";
import { useCategories } from "../context/CategoryContext";

const Category = ({ sm, md, selectedCategory, onCategorySelect }) => {
    const categories = useCategories();

    const handleSelect = (categoryName, categoryId) => {
        onCategorySelect(categoryName, categoryId);
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
                                                    category.name,
                                                    category.id
                                                )
                                            }
                                        >
                                            {category.name}
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
                        <h2 className={styles.CategoryHeader}>Category</h2>

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
                                    handleSelect(
                                        category.name,
                                        category.id
                                    )
                                }
                            >
                                <p className={`${styles.CategoryText}`}>
                                    {category.name}
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
