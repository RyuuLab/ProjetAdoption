package com.api.adoption.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "reponse_com")
public class Reponse_com {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_reponse_com;
	
	private Long idCommentaire;
	
	@Lob
	private String reponse_com;
	
	@NotBlank
	private String username;
	
	private Date date_creation;
	
	public Reponse_com() {
		
	}
	
	public Reponse_com(Long id_commentaire, String reponse_com, String username) {
		this.idCommentaire = id_commentaire;
		this.reponse_com = reponse_com;
		this.date_creation = new Date();
		this.username = username;
	}

	public Long getId_reponse_com() {
		return id_reponse_com;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setId_reponse_com(Long id_reponse_com) {
		this.id_reponse_com = id_reponse_com;
	}

	

	public Long getIdCommentaire() {
		return idCommentaire;
	}

	public void setIdCommentaire(Long idCommentaire) {
		this.idCommentaire = idCommentaire;
	}

	public String getReponse_com() {
		return reponse_com;
	}

	public void setReponse_com(String reponse_com) {
		this.reponse_com = reponse_com;
	}

	public Date getDate_creation() {
		return date_creation;
	}

	public void setDate_creation(Date date_creation) {
		this.date_creation = date_creation;
	}
	
	
}
