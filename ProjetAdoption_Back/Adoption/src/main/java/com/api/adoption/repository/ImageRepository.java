package com.api.adoption.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.adoption.models.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{
	List<Image> findAllByIdAnimal(Long id_animal);
}
