package com.api.toolscript.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.toolscript.models.Commentaire;

@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {

	List<Commentaire> findAllByIdAnimal(Long id_animal);
}
