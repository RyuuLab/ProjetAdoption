package com.api.toolscript.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.toolscript.models.Formulaire_adoption;

@Repository
public interface Formulaire_adoptionRepository extends JpaRepository<Formulaire_adoption, Long> {

}
