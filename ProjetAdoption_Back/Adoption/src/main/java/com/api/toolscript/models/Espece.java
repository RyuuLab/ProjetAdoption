package com.api.toolscript.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "espece")
public class Espece {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_espece;
	
	@NotBlank
	private String nom_espece;
	
	public Espece() {
		
	}
	
	public Espece(String nom_espece) {
		this.nom_espece = nom_espece;
	}

	public Long getId_espece() {
		return id_espece;
	}

	public void setId_espece(Long id_espece) {
		this.id_espece = id_espece;
	}

	public String getNom_espece() {
		return nom_espece;
	}

	public void setNom_espece(String nom_espece) {
		this.nom_espece = nom_espece;
	}
	
	
}
