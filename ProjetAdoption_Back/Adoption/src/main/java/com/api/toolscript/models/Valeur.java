package com.api.toolscript.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "valeur")
public class Valeur {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_valeur;
	
	@NotBlank
	private Long id_animal;
	 
	@NotBlank
	private Long id_caracteristique;
	
	@NotBlank
	private String valeur;
	
	public Valeur() {
		
	}
	
	public Valeur(Long id_animal, Long id_caracteristique, String valeur) {
		this.id_animal = id_animal;
		this.id_caracteristique = id_caracteristique;
		this.valeur = valeur;
	}

	public Long getId_valeur() {
		return id_valeur;
	}

	public void setId_valeur(Long id_valeur) {
		this.id_valeur = id_valeur;
	}

	public Long getId_animal() {
		return id_animal;
	}

	public void setId_animal(Long id_animal) {
		this.id_animal = id_animal;
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
