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

import com.api.toolscript.models.Formulaire;
import com.api.toolscript.payload.response.MessageResponse;
import com.api.toolscript.repository.FormulaireRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/formulaire")
public class FormulaireController {

	@Autowired
	private FormulaireRepository formulaireRepository;
	
	@GetMapping(path="/{id_formulaire}")
	public @ResponseBody Optional<Formulaire> getFormulaireById(@PathVariable Long id_formulaire){
		return formulaireRepository.findById(id_formulaire);
	}
	
	@GetMapping(path="/formulaires")
	public @ResponseBody Iterable<Formulaire> getAllFormulaire(){
		return formulaireRepository.findAll();
	}
	
	@PostMapping(path="/creerFormulaire")
	public ResponseEntity<?> creerFormulaire(@RequestBody Formulaire formulaire){
		if(formulaire.getNom() == null || formulaire.getNom().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le nom doit être renseigné !"));
		}
		else if(formulaire.getPrenom() == null || formulaire.getPrenom().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le prenom doit être renseigné !"));
		}
		else if(formulaire.getMail() == null || formulaire.getMail().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'email doit être renseigné !"));
		}
		else if(formulaire.getMessage() == null || formulaire.getMessage().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le message de renseignement doit être renseigné !"));
		}
		else {
			formulaireRepository.save(formulaire);
			return ResponseEntity.ok(new MessageResponse("Formulaire créé !"));

		}
	}
	
	@DeleteMapping(path="/{id_formulaire}/supprimerFormulaire")
	public ResponseEntity<?> supprimerFormulaire(@PathVariable Long id_formulaire){
		if(id_formulaire == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: l'id_formulaire doit être renseigné !"));
		}else {
			formulaireRepository.deleteById(id_formulaire);
			return ResponseEntity.ok(new MessageResponse("Formulaire supprimé !"));

		}
	}
	
	@PutMapping(path="/modifierFormulaire")
	public ResponseEntity<?> modifierFormulaire(@RequestBody Formulaire formulaire){
		Formulaire res = formulaireRepository.findById(formulaire.getId_formulaire()).get();
		res.setNom(formulaire.getNom());
		res.setPrenom(formulaire.getPrenom());
		res.setMail(formulaire.getMail());
		res.setMessage(formulaire.getMessage());
		res.setTel(formulaire.getTel());
		formulaireRepository.save(res);
		return ResponseEntity.ok(new MessageResponse("Formulaire modifié !"));
	}
}
