import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          <Row>
            <Col className='text-center py-3'>Copyright &copy; Smol❤️.</Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer
