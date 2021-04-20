package com.api.adoption.controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
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

import com.api.adoption.models.Reponse_com;
import com.api.adoption.payload.response.MessageResponse;
import com.api.adoption.repository.Reponse_comRepository;

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
		else if(reponse_com.getUsername() == null || reponse_com.getUsername().isBlank()){
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: Le username doit être renseigné !"));
		}
		else if(reponse_com.getReponseCom() == null || reponse_com.getReponseCom().isBlank()) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: la réponse doit être renseignée !"));
		}
		else {
			DateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss",Locale.FRANCE);
			Date date = Calendar.getInstance().getTime();
			reponse_com.setDate_creation(format.format(date));
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
		res.setReponseCom(reponse_com.getReponseCom());
		res.setUsername(reponse_com.getUsername());
		reponse_comRepository.save(res);
		return ResponseEntity.ok(new MessageResponse("Reponse modifiée !"));

	}
	
	
}
