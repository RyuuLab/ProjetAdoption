package com.api.toolscript.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.toolscript.models.Caracteristique;

@Repository
public interface CaracteristiqueRepository extends JpaRepository<Caracteristique, Long> {
	List<Caracteristique> findAllByIdEspece(Long id_espece);
}
