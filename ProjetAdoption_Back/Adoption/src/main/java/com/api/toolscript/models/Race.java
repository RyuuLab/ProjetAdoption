package com.api.toolscript.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "race")
public class Race {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_race;
	
	private Long id_espece;
	
	private String nom_race;
	
	public Race() {
		
	}
	
	public Race(Long id_espece, String nom_race) {
		this.id_espece = id_espece;
		this.nom_race = nom_race;
	}

	public Long getId_race() {
		return id_race;
	}

	public void setId_race(Long id_race) {
		this.id_race = id_race;
	}

	public Long getId_espece() {
		return id_espece;
	}

	public void setId_espece(Long id_espece) {
		this.id_espece = id_espece;
	}

	public String getNom_race() {
		return nom_race;
	}

	public void setNom_race(String nom_race) {
		this.nom_race = nom_race;
	}
	
	
}
