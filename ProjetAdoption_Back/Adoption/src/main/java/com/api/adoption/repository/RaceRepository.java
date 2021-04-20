package com.api.adoption.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.adoption.models.Race;

@Repository
public interface RaceRepository extends JpaRepository<Race, Long> {
	List<Race> findAllByIdEspece(Long id_espece);
}
