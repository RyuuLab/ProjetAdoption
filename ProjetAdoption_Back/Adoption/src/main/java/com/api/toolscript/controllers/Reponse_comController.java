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

import com.api.toolscript.models.Reponse_com;
import com.api.toolscript.payload.response.MessageResponse;
import com.api.toolscript.repository.Reponse_comRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/reponse_com")
public class Reponse_comController {

	@Autowired
	private Reponse_comRepository reponse_comRepository;
	
	@GetMapping(path="/{id_reponse_com")
	public @ResponseBody Optional<Reponse_com> getReponsecomById(@PathVariable Long id_reponse_com){
		return reponse_comRepository.findById(id_reponse_com);
	}
	
	@GetMapping(path="/{id_commentaire}/reponseComByCom")
	public @ResponseBody Iterable<Reponse_com> getReponseComByCom(@PathVariable Long id_commentaire){
		return reponse_comRepository.findAllByIdCommentaire(id_commentaire);
	}
	
	@PostMapping(path="/creerReponseCom")
	public ResponseEntity<?> creerReponseCom(@RequestBody Reponse_com reponse_com){
		if(reponse_com.getIdCommentaire() == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'id_commentaire doit être renseigné !"));
		}
		else if(reponse_com.getDate_creation() == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: La date de création doit être renseignée !"));
		}
		else if(reponse_com.getReponse_com() == null || reponse_com.getReponse_com().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: la réponse doit être renseignée !"));
		}
		else {
			reponse_comRepository.save(reponse_com);
			return ResponseEntity.ok(new MessageResponse("ReponseCom créée !"));
		}
	}
	
	@DeleteMapping(path="/{id_reponse_com}/supprimerReponseCom")
	public ResponseEntity<?> supprimerReponseCom(@PathVariable Long id_reponse_com){
		if(id_reponse_com == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: l'id_reponse_com doit être renseigné !"));
		}else {
			reponse_comRepository.deleteById(id_reponse_com);
			return ResponseEntity.ok(new MessageResponse("Reponse supprimée !"));
		}
	}
	
	@DeleteMapping(path="/{id_commentaire}/supprimerReponseByCom")
	public ResponseEntity<?> supprimerReponseByCom(@PathVariable Long id_commentaire){
		if(id_commentaire == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: l'id_commentaire doit être renseigné !"));
		}else {
			reponse_comRepository.deleteById(id_commentaire);
			return ResponseEntity.ok(new MessageResponse("toutes les réponses du commentaire ont été supprimées !"));

		}
	}
	
	@PutMapping(path="/modifierReponseCom")
	public ResponseEntity<?> modifierReponseCom(@RequestBody Reponse_com reponse_com){
		Reponse_com res = reponse_comRepository.findById(reponse_com.getId_reponse_com()).get();
		res.setIdCommentaire(reponse_com.getIdCommentaire());
		res.setReponse_com(reponse_com.getReponse_com());
		reponse_comRepository.save(res);
		return ResponseEntity.ok(new MessageResponse("Reponse modifiée !"));

	}
	
	
}
