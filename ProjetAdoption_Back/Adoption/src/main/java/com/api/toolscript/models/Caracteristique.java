package com.api.toolscript.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "caracteristique")
public class Caracteristique {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_caracteristique; 
	
	@NotBlank
	private Long idEspece;
	
	@NotBlank
	private String nom_caracteristique;
	
	public Caracteristique() {
		
	}
	
	public Caracteristique(Long id_caracteristique, Long id_espece, String nom_carateristique) {
		this.id_caracteristique = id_caracteristique;
		this.idEspece = id_espece;
		this.nom_caracteristique = nom_carateristique;
	}

	public Long getId_caracteristique() {
		return id_caracteristique;
	}

	public void setId_caracteristique(Long id_caracteristique) {
		this.id_caracteristique = id_caracteristique;
	}

	public Long getId_espece() {
		return idEspece;
	}

	public void setId_espece(Long id_espece) {
		this.idEspece = id_espece;
	}

	public String getNom_caracteristique() {
		return nom_caracteristique;
	}

	public void setNom_caracteristique(String nom_caracteristique) {
		this.nom_caracteristique = nom_caracteristique;
	}
	
	
}
