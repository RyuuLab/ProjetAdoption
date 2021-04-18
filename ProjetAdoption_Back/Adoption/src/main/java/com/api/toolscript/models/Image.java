package com.api.toolscript.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.print.attribute.standard.Sides;

@Entity
@Table(name = "image")
public class Image {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_image;
	
	private Long idAnimal;
	
	@Lob
	private String image;
	
	public Image() {
		
	}
	
	public Image(Long id_animal, String image ) {
		this.idAnimal = id_animal;
		this.image = image;
	}

	public Long getId_image() {
		return id_image;
	}

	public void setId_image(Long id_image) {
		this.id_image = id_image;
	}

	public Long getIdAnimal() {
		return idAnimal;
	}

	public void setIdAnimal(Long idAnimal) {
		this.idAnimal = idAnimal;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
}
