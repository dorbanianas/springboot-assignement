import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="nav-link">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/Tata_Tamo_Racemo.jpg" width="25" height="25" />
                </Link>
                <Link to={"add"} className="nav-link">
                    Ajouter une voiture
                </Link>
                <Link to={"list"} className="nav-link">
                    Liste des voitures
                </Link>
            </Navbar>);
            }
        }
export default NavigationBar;