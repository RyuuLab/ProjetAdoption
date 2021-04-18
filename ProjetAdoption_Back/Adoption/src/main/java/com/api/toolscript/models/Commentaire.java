package com.api.toolscript.models;

import java.util.Date;

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
	
	private Long id_animal;
	
	private String username;
	
	@Lob
	private String commentaire;
	
	private Date date_creation;
	
	public Commentaire() {
		
	}
	
	public Commentaire(Long id_commentaire, Long id_animal, String username, String commentaire) {
		this.id_commentaire = id_commentaire;
		this.id_animal = id_animal;
		this.username = username;
		this.commentaire = commentaire;
		long millis=System.currentTimeMillis();
		this.date_creation = new java.sql.Date(millis);
	}

	public Long getId_commentaire() {
		return id_commentaire;
	}

	public void setId_commentaire(Long id_commentaire) {
		this.id_commentaire = id_commentaire;
	}

	public Long getId_animal() {
		return id_animal;
	}

	public void setId_animal(Long id_animal) {
		this.id_animal = id_animal;
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
