package com.api.adoption.controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.api.adoption.models.Valeur;
import com.api.adoption.repository.EspeceRepository;
import com.api.adoption.repository.RaceRepository;
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

import com.api.adoption.models.Animal;
import com.api.adoption.payload.response.MessageResponse;
import com.api.adoption.repository.AnimalRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/animal")
public class AnimalController {

	@Autowired
	private AnimalRepository animalRepository;

	@Autowired
	private EspeceRepository especeRepository;

	@Autowired
	private RaceRepository raceRepository;

	@GetMapping(path="/{id_animal}")
	public @ResponseBody Optional<Animal> getAnimalById(@PathVariable Long id_animal){
		Animal animal = animalRepository.findById(id_animal).get();
		animal.setNom_espece(especeRepository.findById(animal.getIdEspece()).get().getNom_espece());
		animal.setNom_race(raceRepository.findById(animal.getIdRace()).get().getNom_race());
		return animalRepository.findById(id_animal);
	}
	
	@GetMapping(path="/{id_espece}/animauxByEspece")
	public @ResponseBody Iterable<Animal> getAnimauxByEspece(@PathVariable Long id_espece){
		List<Animal> animals = animalRepository.findAllByIdEspece(id_espece);
		for(Animal animal: animals) {
			animal.setNom_espece(especeRepository.findById(animal.getIdEspece()).get().getNom_espece());
			animal.setNom_race(raceRepository.findById(animal.getIdRace()).get().getNom_race());
		}
		return animals;
	}
	
	
	@PostMapping(path="/creerAnimal")
	public ResponseEntity<?> creerAnimal(@RequestBody Animal animal){
		
		if(animal.getNom() == null || animal.getNom().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le nom l'animal doit être renseigné!"));
		}
		else if(animal.getSexe() == null || animal.getSexe().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le sexe de l'animal doit être renseigné!"));
		}
		else if(animal.getAge() == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'age de l'animal doit être renseigné!"));
		}
		else {
			DateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss",Locale.FRANCE);
			Date date = Calendar.getInstance().getTime();
			animal.setDate_creation(format.format(date));
			animal.setAdopte("non");
			animal.setDate_modification(null);
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
		Animal res = animalRepository.findById(animal.getId_animal()).get();
		res.setNom(animal.getNom());
		res.setAge(animal.getAge());
		res.setSexe(animal.getSexe());
		res.setHistoire(animal.getHistoire());
		res.setCouleur(animal.getCouleur());
		res.setCaractere(animal.getCaractere());
		res.setIdEspece(animal.getIdEspece());
		res.setAdopte(animal.getAdopte());
		res.setIdRace(animal.getIdRace());
		DateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss",Locale.FRANCE);
		Date date = Calendar.getInstance().getTime();
		res.setDate_modification(format.format(date));
		animalRepository.save(res);
		return new ResponseEntity<Animal>(animalRepository.save(res), HttpStatus.OK);
	}
	
	@PutMapping(path="/adoption")
	public ResponseEntity<?> adoption(@PathVariable Long id_animal){
		Animal res = animalRepository.findById(id_animal).get();
		res.setAdopte("oui");
		return ResponseEntity.ok(new MessageResponse("Champ adoption = oui !"));

	}
	
	
}
