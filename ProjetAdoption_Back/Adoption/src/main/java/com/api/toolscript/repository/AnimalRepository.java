package com.api.toolscript.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.toolscript.models.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

}