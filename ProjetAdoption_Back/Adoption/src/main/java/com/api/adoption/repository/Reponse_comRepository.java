package com.api.adoption.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.adoption.models.Reponse_com;

@Repository
public interface Reponse_comRepository extends JpaRepository<Reponse_com, Long> {

	List<Reponse_com> findAllByIdCommentaire(Long id_commentaire);
	
}
