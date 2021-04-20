package com.api.adoption.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;


@Entity
@Table(name = "commentaire")
public class Commentaire {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_commentaire;
	
	private Long idAnimal;
	
	private String username;
	
	@Lob
	private String commentaire;
	
	private transient List<Reponse_com> TabReponse;
	
	private Date date_creation;
	
	public Commentaire() {
		
	}
	
	public Commentaire(Long id_commentaire, Long id_animal, String username, String commentaire) {
		this.id_commentaire = id_commentaire;
		this.idAnimal = id_animal;
		this.username = username;
		this.commentaire = commentaire;
		this.date_creation = new Date();
	}

	public Long getId_commentaire() {
		return id_commentaire;
	}

	public void setId_commentaire(Long id_commentaire) {
		this.id_commentaire = id_commentaire;
	}

	public Long getIdAnimal() {
		return idAnimal;
	}

	public void setIdAnimal(Long idAnimal) {
		this.idAnimal = idAnimal;
	}

	public List<Reponse_com> getTabReponse() {
		return TabReponse;
	}

	public void setTabReponse(List<Reponse_com> tabReponse) {
		TabReponse = tabReponse;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public Date getDate_creation() {
		return date_creation;
	}

	public void setDate_creation(Date date_creation) {
		this.date_creation = date_creation;
	}
	
	
}
