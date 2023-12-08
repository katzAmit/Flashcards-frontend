import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Row, Col, Card } from "react-bootstrap";
import ButtonsGroup from "./ButtonsLayout";

interface GeneralCardV2Props {
  id: number;
  question: string;
  category: string;
  answer: string;
}
const GeneralCardV2: React.FC<GeneralCardV2Props> = (props) => {
  return (
    <Card style={{ width: "22rem", backgroundColor: '#f5f5f5' }}>
      <Card.Body>
        <Row>
          <Col xs={8}> {/* Adjust the size as needed */}
            <Card.Title>{props.question}</Card.Title>
          </Col>
          <Col xs={4} className="text-end"> {/* Adjust the size and alignment as needed */}
            <ButtonsGroup />
          </Col>
        </Row>
        <Card.Subtitle className="mb-2 text-body-secondary">{props.category}</Card.Subtitle>
        <Card.Text style={{ overflow: 'auto', maxHeight: '100px' }}>{props.answer}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default GeneralCardV2;
