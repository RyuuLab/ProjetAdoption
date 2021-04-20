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
	
	private Long idEspece;
	
	@NotBlank
	private String adopte;
	
	private Long idRace;
	
	private Date date_creation;
	
	private Date date_modification;
	
	public Animal() {
		
	}
	
	public Animal(String nom, Integer age, String sexe, String histoire, String couleur, String caractere, Long id_espece, String adopte, Long id_race) {
		this.nom = nom;
		this.age = age;
		this.sexe = sexe;
		this.histoire = histoire;
		this.couleur = couleur;
		this.caractere = caractere;
		this.idEspece = id_espece;
		this.adopte = adopte;
		this.idRace = id_race;
		long millis=System.currentTimeMillis();
		this.date_creation = new java.sql.Date(millis); 
		this.date_modification = null;
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

	

	public Long getIdEspece() {
		return idEspece;
	}

	public void setIdEspece(Long idEspece) {
		this.idEspece = idEspece;
	}

	public Long getIdRace() {
		return idRace;
	}

	public void setIdRace(Long idRace) {
		this.idRace = idRace;
	}

	public String getAdopte() {
		return adopte;
	}

	public void setAdopte(String adopte) {
		this.adopte = adopte;
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
