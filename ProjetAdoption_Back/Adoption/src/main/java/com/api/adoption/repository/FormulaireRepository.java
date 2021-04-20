package com.api.adoption.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.adoption.models.Formulaire;

@Repository
public interface FormulaireRepository extends JpaRepository<Formulaire, Long> {

}
