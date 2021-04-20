package com.api.adoption.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.adoption.models.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
	List<Animal> findAllByIdEspece(Long id_espece);
}
