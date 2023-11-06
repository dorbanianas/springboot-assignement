import React from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';

class Bienvenue extends React.Component {
    render() {
        const marginTop = {
            marginTop: "20px",
        };

        const cardStyle = {
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        };

        const textStyle = {
            marginTop: "50px",
        }

        return (
            <Row>
                <Col lg={12} style={marginTop}>
                    <Card className="bg-dark text-white" style={cardStyle}>
                        <Card.Body>
                            <Card.Title style={textStyle}>Bienvenue au Magasin des Voitures</Card.Title>
                            <blockquote className="blockquote mb-0">
                                <Card.Text>Le meilleur de nos voitures est exposé près de chez vous</Card.Text>
                                <footer className="blockquote-footer">Master MIOLA</footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Bienvenue;
