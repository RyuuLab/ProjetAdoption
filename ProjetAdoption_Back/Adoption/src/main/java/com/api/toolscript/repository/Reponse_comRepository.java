package com.api.toolscript.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.toolscript.models.Reponse_com;

@Repository
public interface Reponse_comRepository extends JpaRepository<Reponse_com, Long> {
	List<Reponse_com> findAllByCommentaire(Long id_commentaire);
	List<Reponse_com> deleteAllByIdCommentaire(Long id_commentaire);
}
