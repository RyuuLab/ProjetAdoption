package com.api.toolscript.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.toolscript.models.Formulaire;

@Repository
public interface FormulaireRepository extends JpaRepository<Formulaire, Long> {

}
