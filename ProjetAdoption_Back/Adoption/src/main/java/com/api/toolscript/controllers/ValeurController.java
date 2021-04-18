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

import com.api.toolscript.models.Valeur;
import com.api.toolscript.payload.response.MessageResponse;
import com.api.toolscript.repository.ValeurRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/valeur")
public class ValeurController {

	@Autowired
	private ValeurRepository valeurRepository;
	
	@GetMapping(path="/{id_valeur}")
	public @ResponseBody Optional<Valeur> getValeurById(@PathVariable Long id_valeur){
		return valeurRepository.findById(id_valeur);
	}
	
	@PostMapping(path="/creerValeur")
	public ResponseEntity<?> creerValeur(@RequestBody Valeur valeur){
		if(valeur.getId_animal() == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'id_animal doit être renseigné !"));
		}
		else if(valeur.getId_caracteristique() == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'id_caracteristique doit être renseigné !"));
		}
		else if(valeur.getValeur() == null || valeur.getValeur().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: La valeur doit être renseignée !"));
		}
		else {
			valeurRepository.save(valeur);
			return ResponseEntity.ok(new MessageResponse("Valeur créée !"));
		}
	}
	
	@DeleteMapping(path="/{id_valeur}/supprimerValeur")
	public ResponseEntity<?> supprimerValeur(@PathVariable Long id_valeur){
		if(id_valeur == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'id_valeur doit être renseigné !"));
		}else {
			valeurRepository.deleteById(id_valeur);
			return ResponseEntity.ok(new MessageResponse("Valeur supprimée !"));

		}
	}
	
	@PutMapping(path="/modifierValeur")
	public ResponseEntity<?> modifierValeur(@RequestBody Valeur valeur){
		valeurRepository.deleteById(valeur.getId_valeur());
		valeurRepository.save(valeur);
		return ResponseEntity.ok(new MessageResponse("Valeur modifiée !"));

	}
}
