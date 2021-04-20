package com.api.adoption.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.adoption.models.Formulaire_adoption;

@Repository
public interface Formulaire_adoptionRepository extends JpaRepository<Formulaire_adoption, Long> {

}
