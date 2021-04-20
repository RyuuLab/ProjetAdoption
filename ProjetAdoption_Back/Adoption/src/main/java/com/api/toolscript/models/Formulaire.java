package com.api.toolscript.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;


@Entity
@Table(name = "formulaire")
public class Formulaire {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_formulaire;
	
	@NotBlank
	private String nom;
	
	@NotBlank
	private String prenom;
	
	@NotBlank
	private String mail;
	
	@NotBlank
	private String tel;
	
	@NotBlank
	@Lob
	private String message;
	
	public Formulaire() {
		
	}
	
	public Formulaire(String nom, String prenom, String mail, String tel, String message) {
		this.nom = nom;
		this.prenom = prenom;
		this.tel = tel;
		this.message = message;
	}

	public Long getId_formulaire() {
		return id_formulaire;
	}

	public void setId_formulaire(Long id_formulaire) {
		this.id_formulaire = id_formulaire;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
