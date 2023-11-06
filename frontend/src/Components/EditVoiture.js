import React, { useEffect, useState } from 'react';
import { Card, Form, Col, Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faSave, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import { useParams } from 'react-router-dom';
import config from '../config';

function EditVoiture() {
  const { id } = useParams();
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [couleur, setCouleur] = useState('');
  const [immatricule, setImmatricule] = useState('');
  const [annee, setAnnee] = useState('');
  const [prix, setPrix] = useState('');
  const [show, setShow] = useState(false);
  const [toastType, setToastType] = useState('');
  const host = config.host;
  const port = config.port;

  useEffect(() => {
    axios.get(`http://${host}:${port}/voitures/${id}`)
      .then((response) => {
        if (response.data) {
          const voiture = response.data;
          setMarque(voiture.marque);
          setModele(voiture.modele);
          setCouleur(voiture.couleur);
          setImmatricule(voiture.immatricule);
          setAnnee(voiture.annee);
          setPrix(voiture.prix);
        }
      });
  }, [id]);

  const resetVoiture = () => {
    setMarque('');
    setModele('');
    setCouleur('');
    setImmatricule('');
    setAnnee('');
    setPrix('');
    setShow(false);
    setToastType('');
  };

  const submitVoiture = (event) => {
    event.preventDefault();

    const voiture = {
      marque,
      modele,
      couleur,
      immatricule,
      annee,
      prix,
    };

    axios
      .put(`http://${host}:${port}/voitures/${id}`, voiture)
      .then((response) => {
        if (response.data != null) {
          setShow(true);
          setToastType("success");
          setTimeout(() => {
            setShow(false);
          }, 3000);
        }
      });
  };

  const voitureChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'marque':
        setMarque(value);
        break;
      case 'modele':
        setModele(value);
        break;
      case 'couleur':
        setCouleur(value);
        break;
      case 'immatricule':
        setImmatricule(value);
        break;
      case 'annee':
        setAnnee(value);
        break;
      case 'prix':
        setPrix(value);
        break;
      default:
        break;
    }
  };

  const marginTop = {
    marginTop: '20px',
  };

  return (
    <div style={marginTop}>
      <div style={{ display: show ? 'block' : 'none' }}>
        <MyToast
          children={{
            show,
            message: 'Voiture mise à jour avec succès',
            type: 'success',
          }}
        />
      </div>
      <Card className="border borderDark bg-dark text-white">
        <Card.Header>
          <FontAwesomeIcon icon={faPlusSquare} /> Modifier Voiture
        </Card.Header>
        <Form onReset={resetVoiture} onSubmit={submitVoiture} id="VoitureFormId">
          <Card.Body as={Row}>
            <Form.Group as={Col} controlId="formGridMarque">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                required
                type="text"
                name="marque"
                value={marque}
                autoComplete="off"
                onChange={voitureChange}
                className="bg-dark text-white"
                placeholder="Entrez Marque Voiture"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridModele">
              <Form.Label>Modèle</Form.Label>
              <Form.Control
                required
                type="text"
                name="modele"
                value={modele}
                autoComplete="off"
                onChange={voitureChange}
                className="bg-dark text-white"
                placeholder="Entrez Modèle de Voiture"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCouleur">
              <Form.Label>Couleur</Form.Label>
              <Form.Control
                required
                type="text"
                name="couleur"
                value={couleur}
                autoComplete="off"
                onChange={voitureChange}
                className="bg-dark text-white"
                placeholder="Entrez Couleur de Voiture"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridImmatricule">
              <Form.Label>Immatricule</Form.Label>
              <Form.Control
                required
                type="text"
                name="immatricule"
                value={immatricule}
                autoComplete="off"
                onChange={voitureChange}
                className="bg-dark text-white"
                placeholder="Entrez Immatricule de Voiture"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPrix">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                required
                type="text"
                name="prix"
                value={prix}
                autoComplete="off"
                onChange={voitureChange}
                className="bg-dark text-white"
                placeholder="Entrez Prix de Voiture"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridAnnee">
              <Form.Label>Annee</Form.Label>
              <Form.Control
                required
                type="text"
                name="annee"
                value={annee}
                autoComplete="off"
                onChange={voitureChange}
                className="bg-dark text-white"
                placeholder="Entrez Année de Voiture"
              />
            </Form.Group>
          </Card.Body>
          <Card.Footer style={{ textAlign: 'right' }}>
            <Button size="sm" variant="success" type="submit">
              <FontAwesomeIcon icon={faSave} /> Modifier
            </Button>{' '}
            <Button size="sm" variant="info" type="reset">
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
}

export default EditVoiture;
