import React, { Component } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import axios from "axios";
import { faEdit, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyToast from "./MyToast";
import {Link} from 'react-router-dom'
import config from "../config";

const tableStyle = {
  color: 'white',

};

const tableHeaderStyle = {
  border: '1px solid white',
};

const oddRowStyle = {
  backgroundColor: 'dark',
};

const evenRowStyle = {
  backgroundColor: '#3f4952',
};

const host = config.host;
const port = config.port;

export default class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
    };
  }

componentDidMount() {
  axios
    .get(`http://${host}:${port}/voitures`)
    .then((response) => response.data)
    .then((data) => {
      this.setState({ voitures: data });
    });
}
deleteVoiture = (voitureId) => {
    axios
      .delete(`http://${host}:${port}/voitures/` + voitureId)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          this.setState({
            voitures: this.state.voitures.filter(
              (voiture) => voiture.id !== voitureId
            ),
          });
        }
      });
};

  render() {
    return (
    <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            children={{
              show: this.state.show,
              message: "Voiture supprimée avec succès.",
              type: "danger",
            }}
          />
        </div>
      <Card className='border border-dark bg-dark text-white mt-4'>
        <Card.Header className="text-white">
          <FontAwesomeIcon icon={faList} /> Liste Voitures
        </Card.Header>
        <Card.Body>
          <table style={tableStyle} className="table table-striped">
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Marque</th>
                <th style={tableHeaderStyle}>Modele</th>
                <th style={tableHeaderStyle}>Couleur</th>
                <th style={tableHeaderStyle}>Immatricule</th>
                <th style={tableHeaderStyle}>Annee</th>
                <th style={tableHeaderStyle}>Prix</th>
              </tr>
            </thead>
              <tbody>
                {this.state.voitures.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">Aucune Voiture n'est disponible</td>
                  </tr>
                ) : (
                  this.state.voitures.map((voiture, index) => (
                    <tr key={voiture.id} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                      <td>{voiture.marque}</td>
                      <td>{voiture.modele}</td>
                      <td>{voiture.couleur}</td>
                      <td>{voiture.immatricule}</td>
                      <td>{voiture.annee}</td>
                      <td>{voiture.prix}</td>
                      <td>
                        <ButtonGroup>
                            <Link to={`/list/edit/${voiture.id}`} state={voiture} className="btn btn-sm btn-outline-primary">
                            <FontAwesomeIcon icon={faEdit} />
                            </Link>{' '}
                            <Button size="sm" variant="outline-danger" onClick={this.deleteVoiture.bind(this,voiture.id)}><FontAwesomeIcon icon={faTrash} /> </Button>
                        </ButtonGroup>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
    );
  }
}
