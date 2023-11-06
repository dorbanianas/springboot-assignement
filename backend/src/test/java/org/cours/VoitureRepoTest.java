package org.cours;

import static org.assertj.core.api.Assertions.assertThat;

import org.cours.modele.Proprietaire;
import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class VoitureRepoTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    VoitureRepo voitureRepo;

    @Test
    public void ajouterVoiture() {
        Proprietaire proprietaire = new Proprietaire("John", "Doe");
        entityManager.persistAndFlush(proprietaire); // Save the Proprietaire first

        Voiture voiture = new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000, proprietaire);
        entityManager.persistAndFlush(voiture); // Save the Voiture

        assertThat(voiture.getId()).isNotNull();
    }

    @Test
    public void supprimerVoiture() {
        Proprietaire proprietaire = new Proprietaire("John", "Doe");
        entityManager.persistAndFlush(proprietaire); // Save the Proprietaire first

        Voiture voiture1 = new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000, proprietaire);
        entityManager.persistAndFlush(voiture1); // Save the first Voiture

        Voiture voiture2 = new Voiture("MiniCooper", "Uber", "Rouge", "C-2020", 2021, 180000, proprietaire);
        entityManager.persistAndFlush(voiture2); // Save the second Voiture

        voitureRepo.deleteAll();
        assertThat(voitureRepo.findAll()).isEmpty();
    }
}
