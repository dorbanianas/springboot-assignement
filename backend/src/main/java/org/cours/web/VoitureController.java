package org.cours.web;

import org.cours.modele.VoitureRepo;
import org.cours.modele.Voiture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class VoitureController {
    @Autowired
    private VoitureRepo voitureRepo;

    @RequestMapping("/voitures")
    public Iterable<Voiture> getVoitures(){
        return voitureRepo.findAll();
    }

    @RequestMapping(value = "/voitures/{id}", method = RequestMethod.GET)
    public ResponseEntity<Voiture> getVoitureById(@PathVariable Long id) {
        Optional<Voiture> optionalVoiture = voitureRepo.findById(id);

        if (optionalVoiture.isPresent()) {
            Voiture voiture = optionalVoiture.get();
            return new ResponseEntity<>(voiture, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/voitures")
    public ResponseEntity<Voiture> addVoiture(@RequestBody Voiture voiture) {
        Voiture savedVoiture = voitureRepo.save(voiture);
        return new ResponseEntity<>(savedVoiture, HttpStatus.CREATED);
    }

    @DeleteMapping("/voitures/{id}")
    public ResponseEntity<String> deleteVoiture(@PathVariable Long id) {
        // Implement the logic to delete the voiture by ID from your repository
        try {
            voitureRepo.deleteById(id);
            return new ResponseEntity<>("Voiture supprimée avec succès.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la suppression de la voiture.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/voitures/{id}")
    public ResponseEntity<String> updateVoiture(@PathVariable Long id, @RequestBody Voiture updatedVoiture) {
        // Implémentez la logique de mise à jour de la voiture par ID dans votre repository
        try {
            Voiture existingVoiture = voitureRepo.findById(id).orElse(null);

            if (existingVoiture == null) {
                return new ResponseEntity<>("Voiture non trouvée.", HttpStatus.NOT_FOUND);
            }

            // Mettez à jour les champs de la voiture avec les nouvelles valeurs
            existingVoiture.setMarque(updatedVoiture.getMarque());
            existingVoiture.setModele(updatedVoiture.getModele());
            existingVoiture.setCouleur(updatedVoiture.getCouleur());
            existingVoiture.setImmatricule(updatedVoiture.getImmatricule());
            existingVoiture.setAnnee(updatedVoiture.getAnnee());
            existingVoiture.setPrix(updatedVoiture.getPrix());

            // Enregistrez la voiture mise à jour dans le repository
            voitureRepo.save(existingVoiture);

            return new ResponseEntity<>("Voiture mise à jour avec succès.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la mise à jour de la voiture.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
