package com.api.toolscript.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "animal")
public class Animal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_animal;
	
	@NotBlank
	private String nom;
	
	@NotBlank
	private Integer age;
	
	@NotBlank
	private String sexe;
	
	@Lob
	private String histoire;
	
	private String couleur;
	
	private String caractere;
	
	private String espece;
	
	@NotBlank
	private String adopte;
	
	private String race;
	
	private Date date_creation;
	
	private Date date_modification;
	
	public Animal() {
		
	}
	
	public Animal(String nom, Integer age, String sexe, String histoire, String couleur, String caractere, String espece, String adopte, String race, Date date_creation, Date date_modification) {
		this.nom = nom;
		this.age = age;
		this.sexe = sexe;
		this.histoire = histoire;
		this.couleur = couleur;
		this.caractere = caractere;
		this.espece = espece;
		this.adopte = adopte;
		this.race = race;
		this.date_creation = date_creation;
		this.date_modification = date_modification;
	}

	public Long getId_animal() {
		return id_animal;
	}

	public void setId_animal(Long id_animal) {
		this.id_animal = id_animal;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getSexe() {
		return sexe;
	}

	public void setSexe(String sexe) {
		this.sexe = sexe;
	}

	public String getHistoire() {
		return histoire;
	}

	public void setHistoire(String histoire) {
		this.histoire = histoire;
	}

	public String getCouleur() {
		return couleur;
	}

	public void setCouleur(String couleur) {
		this.couleur = couleur;
	}

	public String getCaractere() {
		return caractere;
	}

	public void setCaractere(String caractere) {
		this.caractere = caractere;
	}

	public String getEspece() {
		return espece;
	}

	public void setEspece(String espece) {
		this.espece = espece;
	}

	public String getAdopte() {
		return adopte;
	}

	public void setAdopte(String adopte) {
		this.adopte = adopte;
	}

	public String getRace() {
		return race;
	}

	public void setRace(String race) {
		this.race = race;
	}

	public Date getDate_creation() {
		return date_creation;
	}

	public void setDate_creation(Date date_creation) {
		this.date_creation = date_creation;
	}

	public Date getDate_modification() {
		return date_modification;
	}

	public void setDate_modification(Date date_modification) {
		this.date_modification = date_modification;
	}
	
	
}
