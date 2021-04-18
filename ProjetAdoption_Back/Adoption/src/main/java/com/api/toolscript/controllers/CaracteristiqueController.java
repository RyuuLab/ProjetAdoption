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
import com.api.toolscript.models.Caracteristique;
import com.api.toolscript.payload.response.MessageResponse;
import com.api.toolscript.repository.CaracteristiqueRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/caracteristique")
public class CaracteristiqueController {

	@Autowired
	private CaracteristiqueRepository caracteristiqueRepository;
	
	@GetMapping(path="/{id_caracteristique}")
	public @ResponseBody Optional<Caracteristique> getCaractById(@PathVariable Long id_caract){
		return caracteristiqueRepository.findById(id_caract);
	}
	
	@GetMapping(path="/{id_espece}/allCaractByEspece")
	public @ResponseBody Iterable<Caracteristique> getAllCaractByEspece(@PathVariable Long id_espece){
		return caracteristiqueRepository.findAllByIdEspece(id_espece);
	}
	
	@PostMapping(path="/creerCaracteristique")
	public ResponseEntity<?> creerCaracteristique(@RequestBody Caracteristique caracteristique){
		if(caracteristique.getId_espece() == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'id_espece doit être renseigné!"));
		}else if(caracteristique.getNom_caracteristique() == null || caracteristique.getNom_caracteristique().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le nom de la caracteristique doit être renseigné!"));
		}else {
			caracteristiqueRepository.save(caracteristique);
			return new ResponseEntity<Caracteristique>(caracteristiqueRepository.save(caracteristique), HttpStatus.OK);
		}
	}
	
	@DeleteMapping(path="/{id_caracteristique}/supprimerCaracteristique")
	public ResponseEntity<?> supprimerCaracteristique(@PathVariable Long id_caracteristique){
		if(id_caracteristique == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: l'id_caracteristique doit être renseigné !"));
		}else {
			caracteristiqueRepository.deleteById(id_caracteristique);
			return ResponseEntity.ok(new MessageResponse("Caracteristique supprimée !"));

		}
	}
	
	@PutMapping(path="/modifierCaracteristique")
	public ResponseEntity<?> modifierCaracteristique(@RequestBody Caracteristique caracteristique){
		caracteristiqueRepository.deleteById(caracteristique.getId_caracteristique());
		caracteristiqueRepository.save(caracteristique);
		return new ResponseEntity<Caracteristique>(caracteristiqueRepository.save(caracteristique), HttpStatus.OK);
	}
}
