import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from '../styles/Tasks.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Tasks = () => {
    const task = (
        <>
            <Row as={Link} to="/task-detail" className={`text-center d-flex ${styles.Row}`}>
                <Col className='m-0'>
                    <p className={styles.Task}>Task name</p>
                </Col>
                <Col>
                    <p className={`${styles.Task}`}>Progress</p>
                </Col>
                <Col className='d-none d-md-block' >
                    <p className={styles.Task}>Due date</p>
                </Col>
                <Col>
                    <p className={styles.Task}>edit/delete</p>
                </Col>
            </Row>
        </>
    )


  return (
    <div>
        <Container>
            {task}
            {task}
            {task}
            {task}
            {task}
            {task}
        </Container>
    </div>
  )
}

export default Tasks