package com.api.toolscript.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "valeur")
public class Valeur {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_valeur;
	
	@NotBlank
	private Long idAnimal;


	private transient String nom_caracteristique;
	 
	@NotBlank
	private Long id_caracteristique;
	
	@NotBlank
	private String valeur;
	
	public Valeur() {
		
	}
	
	public Valeur(Long id_animal, Long id_caracteristique, String valeur) {
		this.idAnimal = id_animal;
		this.id_caracteristique = id_caracteristique;
		this.valeur = valeur;
	}

	public Long getId_valeur() {
		return id_valeur;
	}

	public void setId_valeur(Long id_valeur) {
		this.id_valeur = id_valeur;
	}

	

	public String getNom_caracteristique() {
		return nom_caracteristique;
	}

	public void setNom_caracteristique(String nom_caracteristique) {
		this.nom_caracteristique = nom_caracteristique;
	}

	public Long getIdAnimal() {
		return idAnimal;
	}

	public void setIdAnimal(Long idAnimal) {
		this.idAnimal = idAnimal;
	}

	public Long getId_caracteristique() {
		return id_caracteristique;
	}

	public void setId_caracteristique(Long id_caracteristique) {
		this.id_caracteristique = id_caracteristique;
	}

	public String getValeur() {
		return valeur;
	}

	public void setValeur(String valeur) {
		this.valeur = valeur;
	}
	
	
}
