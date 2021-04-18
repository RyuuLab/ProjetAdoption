package com.api.toolscript.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.toolscript.models.Valeur;

@Repository
public interface ValeurRepository extends JpaRepository<Valeur, Long> {

}
