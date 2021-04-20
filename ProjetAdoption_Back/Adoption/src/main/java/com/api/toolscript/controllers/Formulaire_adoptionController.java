package com.api.toolscript.controllers;

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

import com.api.toolscript.models.Formulaire_adoption;
import com.api.toolscript.payload.response.MessageResponse;
import com.api.toolscript.repository.Formulaire_adoptionRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/formulaire_adoption")
public class Formulaire_adoptionController {

	@Autowired
	private Formulaire_adoptionRepository formulaire_adoptionRepository;
	
	@GetMapping(path="/{id_formulaire_adoption")
	public @ResponseBody Optional<Formulaire_adoption> getFormAdoptById(@PathVariable Long id_formulaire_adoption){
		return formulaire_adoptionRepository.findById(id_formulaire_adoption);
	}
	
	@GetMapping(path="/formulaires")
	public @ResponseBody Iterable<Formulaire_adoption> getAllFormAdopt(){
		return formulaire_adoptionRepository.findAll();
	}
	
	@PostMapping(path="/creerFormulaire_adoption")
	public ResponseEntity<?> creerFormAdopt(@RequestBody Formulaire_adoption formulaire_adoption){
		if(formulaire_adoption.getNom() == null || formulaire_adoption.getNom().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le nom doit être renseigné !"));
		}
		else if(formulaire_adoption.getPrenom() == null || formulaire_adoption.getPrenom().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le prenom doit être renseigné !"));
		}
		else if(formulaire_adoption.getMail() == null ||formulaire_adoption.getMail().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'email doit être renseigné !"));
		}
		else if(formulaire_adoption.getAdresse() == null ||formulaire_adoption.getAdresse().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'adresse doit être renseignée !"));
		}
		else if(formulaire_adoption.getHabitat() == null || formulaire_adoption.getHabitat().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'habitat doit être renseigné !"));
		}
		else if(formulaire_adoption.getJardin() == null || formulaire_adoption.getJardin().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: La présence d'un jardin ou non doit être renseignée !"));
		}
		else {
			formulaire_adoptionRepository.save(formulaire_adoption);
			return ResponseEntity.ok(new MessageResponse("Formulaire adoption créé !"));
		}
	}
	
	@DeleteMapping(path="/{id_formulaire_adoption}/supprimerFormulaire_adoption")
	public ResponseEntity<?> supprimerFormAdopt(@PathVariable Long id_formulaire_adoption){
		if(id_formulaire_adoption == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: l'id_formulaire_adoption doit être renseigné !"));
		}else {
			formulaire_adoptionRepository.deleteById(id_formulaire_adoption);
			return ResponseEntity.ok(new MessageResponse("Formulaire adoption supprimé !"));
		}
	}
	
	@PutMapping(path="/modifierFormulaire_adoption")
	public ResponseEntity<?> modifierFormAdopt(@RequestBody Formulaire_adoption formulaire_adoption){
		Formulaire_adoption res = formulaire_adoptionRepository.findById(formulaire_adoption.getId_formulaire_adoption()).get();
		res.setNom(formulaire_adoption.getNom());
		res.setPrenom(formulaire_adoption.getPrenom());
		res.setMail(formulaire_adoption.getMail());
		res.setAdresse(formulaire_adoption.getAdresse());
		res.setTelephone(formulaire_adoption.getTelephone());
		res.setHabitat(formulaire_adoption.getHabitat());
		res.setJardin(formulaire_adoption.getJardin());
		formulaire_adoptionRepository.save(res);
		return ResponseEntity.ok(new MessageResponse("Formulaire adoption modifié !"));

	}
}
