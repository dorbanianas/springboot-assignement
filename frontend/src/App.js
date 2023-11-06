import React from 'react';
import './App.css';
import { Container, Row, Card, Col } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Footer from './Components/Footer';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe'
import EditVoiture from './Components/EditVoiture'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {

    return (
        <Router>
            <NavigationBar />
            <Container>
                <Routes>
                    <Route path="/" element={<Bienvenue/>} />
                    <Route path="/add" element={<Voiture/>} />
                    <Route path="/list/edit/:id" element={<EditVoiture />} />
                    <Route path="/list" element={<VoitureListe/>} />
                </Routes>
            </Container>
            <Footer/>
        </Router>
    );
}

export default App;
