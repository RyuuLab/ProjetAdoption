package com.api.adoption.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.adoption.models.Valeur;

@Repository
public interface ValeurRepository extends JpaRepository<Valeur, Long> {

	List<Valeur> findAllByIdAnimal(Long idAnimal);
}
