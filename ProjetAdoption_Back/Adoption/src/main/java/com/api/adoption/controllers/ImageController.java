package com.api.adoption.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.adoption.models.Image;
import com.api.adoption.payload.response.MessageResponse;
import com.api.adoption.repository.ImageRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/image")
public class ImageController {
	
	@Autowired
	private ImageRepository imageRepository;
	
	@GetMapping(path="/{id_image}")
	public @ResponseBody Optional<Image> getImageById(@PathVariable Long id_image){
		return imageRepository.findById(id_image);
	}
	
	@GetMapping(path="/{id_animal}/imageByAnimal")
	public @ResponseBody Iterable<Image> getImageByAnimal(@PathVariable Long id_animal){
		return imageRepository.findAllByIdAnimal(id_animal);
	}
	
	@PostMapping(path="/creerImage")
	public ResponseEntity<?> creerImage(@RequestBody Image[] images){
		for(Image image: images) {
			if(image.getIdAnimal() == null) {
				return ResponseEntity.badRequest().body(
						new MessageResponse("Error: L'id_animal doit être renseigné pour la création de l'image !"));
			}
			else {
				imageRepository.save(image);
			}
		}
		return ResponseEntity.ok(new MessageResponse("image créée !"));
	}
	
	@DeleteMapping(path="/{id_image}/supprimerImage")
	public ResponseEntity<?> supprimerImage(@PathVariable Long id_image){
		if(id_image == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: l'id_image doit être renseigné !"));
		}else {
			imageRepository.deleteById(id_image);
			return ResponseEntity.ok(new MessageResponse("Image supprimée !"));

		}
	}
	
	@PutMapping(path="/modifierImage")
	public ResponseEntity<?> modifierImage(@RequestBody Image image){
		Image res = imageRepository.findById(image.getId_image()).get();
		res.setImage(image.getImage());
		res.setIdAnimal(image.getIdAnimal());
		return ResponseEntity.ok(new MessageResponse("Image modifiée !"));

	}
	
}
