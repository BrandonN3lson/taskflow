import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import styles from "../../styles/About.module.css";

/**
 * About Component
 * 
 * This component provides an overview of the TaskFlow application, 
 * highlighting its key features and benefits.
 *
 * Features:
 * - Displays an introduction to TaskFlow.
 * - Highlights key features such as task organization, mobile-friendliness, and web version support.
 * - Uses Bootstrap components for styling and layout.
 *
 * External Dependencies:
 * - React Bootstrap (Card, Col, Container, Row) for layout and styling.
 * - FontAwesome icons for visual representation of features.
 * - Custom CSS styles from About.module.css.
 *
 * @returns {JSX.Element} The About section for TaskFlow.
 */
export const About = () => {
  return (
    <Container className={`mt-5 ${styles.Container}`}>
      <Row className="justify-content-center">
        <Col lg={12}>
          <Card className={styles.Card}>
            <Card.Body>
              <h1 className="text-center mb-3 text-light">About TaskFlow</h1>
              <p className="text-center text-muted">
                TaskFlow is a productivity app designed to help you manage your tasks efficiently.
              </p>

              <Row className="mt-4">
                <Col md={12} className="mb-3">
                  <Card className={styles.FeatureCard}>
                    <Row className="align-items-center">
                      <Col xs={12} sm={2} className="text-primary d-flex justify-content-center p-1">
                        <i className="fas fa-tasks fa-2x"></i>
                      </Col>
                      <Col>
                        <p className="mb-0">
                          <strong>Organize</strong> tasks with categories & priority levels.
                        </p>
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col md={12} className="mb-3">
                  <Card className={styles.FeatureCard}>
                    <Row className="align-items-center">
                      <Col xs={12} sm={2} className="text-success d-flex justify-content-center p-1">
                        <i className="fas fa-mobile-alt fa-2x"></i>
                      </Col>
                      <Col>
                        <p className="mb-0">
                          <strong>Mobile-friendly:</strong> Add tasks on the go.
                        </p>
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col md={12}>
                  <Card className={styles.FeatureCard}>
                    <Row className="align-items-center">
                      <Col xs={12} sm={2} className="text-danger d-flex justify-content-center p-1 ">
                        <i className="fas fa-laptop fa-2x"></i>
                      </Col>
                      <Col>
                        <p className="mb-0">
                          <strong>Web Version:</strong> Access widgets, priorities, and more.
                        </p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <div className="text-center mt-4 text-muted">
                <small>TaskFlow - Your productivity, simplified.</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
