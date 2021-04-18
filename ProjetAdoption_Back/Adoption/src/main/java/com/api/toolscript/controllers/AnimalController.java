package com.api.toolscript.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.api.toolscript.models.Animal;
import com.api.toolscript.payload.response.MessageResponse;
import com.api.toolscript.repository.AnimalRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/animal")
public class AnimalController {

	@Autowired
	private AnimalRepository animalRepository;
	
	@GetMapping(path="/{id_animal}")
	public @ResponseBody Optional<Animal> getAnimalById(@PathVariable Long id_animal){
		return animalRepository.findById(id_animal);
	}
	
	@GetMapping(path="/animauxByEspece")
	public @ResponseBody Iterable<Animal> getAnimauxByEspece(@PathVariable String espece){
		return animalRepository.findAllByEspece(espece);
	}
	
	@PostMapping(path="/creerAnimal")
	public ResponseEntity<?> creerAnimal(@RequestBody Animal animal){
		if(animal.getAdopte() == null || animal.getAdopte().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le status de l'animal doit être renseigné!"));
		}
		else if(animal.getNom() == null || animal.getNom().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le nom l'animal doit être renseigné!"));
		}
		else if(animal.getSexe() == null || animal.getSexe().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le sexe de l'animal doit être renseigné!"));
		}
		else if(animal.getAge() == null || animal.getSexe().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le sexe de l'animal doit être renseigné!"));
		}
		else {
			animalRepository.save(animal);
			return new ResponseEntity<Animal>(animalRepository.save(animal), HttpStatus.OK);

		}
	}
	
	@DeleteMapping(path="/{id_animal}/supprimerAnimal")
	public ResponseEntity<?> supprimerAnimal(@PathVariable Long id_animal){
		if(id_animal == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: l'id_animal doit être renseigné !"));
		}else {
			animalRepository.deleteById(id_animal);
			return ResponseEntity.ok(new MessageResponse("Animal supprimé !"));
		}
	}
	
	@PutMapping(path="/modifierAnimal")
	public ResponseEntity<?> modifierAnimal(@RequestBody Animal animal){
		animalRepository.deleteById(animal.getId_animal());
		animalRepository.save(animal);
		return new ResponseEntity<Animal>(animalRepository.save(animal), HttpStatus.OK);
	}
	
	
}
