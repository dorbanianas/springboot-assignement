package org.cours.modele;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
@RepositoryRestResource
public interface VoitureRepo extends CrudRepository<Voiture, Long> {
    //Lister Voitures par marque
    List<Voiture> findByModele(@Param("modele") String modele);

    //Lister Voitures par couleur
    List<Voiture> findByCouleur(@Param("couleur") String couleur);
    List<Voiture> findByAnnee(int annee);

    List<Voiture> findByMarqueAndModele(String marque,String modele);

    List<Voiture> findByMarqueOrCouleur(String marque,String couleur);

    List<Voiture> findByMarqueOrderByAnneeAsc(String marque);

    @Query("select v from Voiture v where v.marque=?1")
    List<Voiture> findByMarque(String marque);

    @Query("select v from Voiture v where v.marque like %?1")
    List<Voiture> findByMarqueEndsWith(String marque);

}
