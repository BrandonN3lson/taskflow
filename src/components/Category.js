import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import styles from "../styles/Category.module.css";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSetCurrentUser } from "../context/CurrentUserContext";
import { axiosRes } from "../api/axiosDefault";

const Category = ({ sm, md, selectedCategory, onCategorySelect }) => {
    const currentUser = useSetCurrentUser();
    const [categories, setCategories] = useState();
    const history = useHistory();

    useEffect(() => {
        let isMounted = true;
        const fetchCategories = async () => {
            try {
                const { data } = await axiosRes.get("/categories/");
                if (isMounted) {
                    setCategories(data.results);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const timer = setTimeout(() => {
            fetchCategories();
        }, 500);
        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [currentUser, history]);

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
                        {categories?.map((category) => (
                            <Row
                                as={Link}
                                key={category.id}
                                className={`align-items-center justify-content-center ${styles.Row}`}
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
