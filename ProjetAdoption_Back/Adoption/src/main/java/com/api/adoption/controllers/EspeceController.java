package com.api.adoption.controllers;

import java.util.List;
import java.util.Optional;

import com.api.adoption.repository.AnimalRepository;
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
import com.api.adoption.models.Espece;
import com.api.adoption.payload.response.MessageResponse;
import com.api.adoption.repository.EspeceRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/espece")
public class EspeceController {

	@Autowired
	private EspeceRepository especeRepository;

	@Autowired
	private AnimalRepository animalRepository;
	
	@GetMapping(path="/{id_espece}")
	public @ResponseBody Optional<Espece> getEspeceById(@PathVariable Long id_espece){
		return especeRepository.findById(id_espece);
	}
	
	@GetMapping(path="/especes")
	public @ResponseBody Iterable<Espece> getAllEspece(){
		List<Espece> especes = especeRepository.findAll();
		for(Espece espece: especes) {
			espece.setNbrAnimalEspece(this.animalRepository.findAllByIdEspece(espece.getId_espece()).size());
		}
		return especes;
	}
	
	@PostMapping(path="/creerEspece")
	public ResponseEntity<?> creerEspece(@RequestBody Espece espece){
		if(espece.getNom_espece() == null || espece.getNom_espece().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le nom de l'espece doit être renseigné !"));
		}else {
			especeRepository.save(espece);
			return new ResponseEntity<Espece>(especeRepository.save(espece), HttpStatus.OK);
		}
	}
	
	@DeleteMapping(path="/{id_espece}/supprimerEspece")
	public ResponseEntity<?> supprimerEspece(@PathVariable Long id_espece){
		if(id_espece == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: l'id_espece doit être renseigné !"));
		}else {
			especeRepository.deleteById(id_espece);
			return ResponseEntity.ok(new MessageResponse("Espece supprimée !"));

		}
	}
	
	@PutMapping(path="/modifierEspece")
	public ResponseEntity<?> modifierEspece(@RequestBody Espece espece){
		Espece res = especeRepository.findById(espece.getId_espece()).get();
		res.setNom_espece(espece.getNom_espece());
		especeRepository.save(res);
		return ResponseEntity.ok(new MessageResponse("Espece modifiée !"));
	}
}
