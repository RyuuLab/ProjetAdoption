package com.api.adoption.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "formulaire_adoption")
public class Formulaire_adoption {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_formulaire_adoption;
	
	@NotBlank
	private String nom;
	
	@NotBlank
	private String prenom;
	
	private String telephone;
	
	@NotBlank
	private String mail;

	@NotBlank
	private String adresse;

	@NotBlank
	private String habitat;

	@NotBlank
	private String jardin;
	
	public Formulaire_adoption() {
		
	}
	
	public Formulaire_adoption(String nom, String prenom, String telephone, String mail, String adresse, String habitat, String jardin) {
		this.nom = nom;
		this.prenom = prenom;
		this.telephone = telephone;
		this.mail = mail;
		this.adresse = adresse;
		this.habitat = habitat;
		this.jardin = jardin;
	}

	public Long getId_formulaire_adoption() {
		return id_formulaire_adoption;
	}

	public void setId_formulaire_adoption(Long id_formulaire_adoption) {
		this.id_formulaire_adoption = id_formulaire_adoption;
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

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getHabitat() {
		return habitat;
	}

	public void setHabitat(String habitat) {
		this.habitat = habitat;
	}

	public String getJardin() {
		return jardin;
	}

	public void setJardin(String jardin) {
		this.jardin = jardin;
	}
	
	



}
