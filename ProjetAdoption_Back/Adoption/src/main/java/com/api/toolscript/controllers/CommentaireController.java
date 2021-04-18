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
import com.api.toolscript.models.Commentaire;
import com.api.toolscript.payload.response.MessageResponse;
import com.api.toolscript.repository.CommentaireRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/commentaire")
public class CommentaireController {
	
	@Autowired
	private CommentaireRepository commentaireRepository;
	
	@GetMapping(path="/{id_commentaire}")
	public @ResponseBody Optional<Commentaire> getCommentaireById(@PathVariable Long id_commentaire){
		return commentaireRepository.findById(id_commentaire);
	}
	
	@PostMapping(path="/creerCommentaire")
	public ResponseEntity<?> creerCommentaire(@RequestBody Commentaire commentaire){
		commentaireRepository.save(commentaire);
		return new ResponseEntity<Commentaire>(commentaireRepository.save(commentaire), HttpStatus.OK);

	}
	
	@DeleteMapping(path="/{id_commentaire}/supprimerCommentaire")
	public ResponseEntity<?> supprimerCommentaire(@PathVariable Long id_commentaire){
		if(id_commentaire == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: l'id_commentaire doit être renseigné !"));
		}else {
			commentaireRepository.deleteById(id_commentaire);
			return ResponseEntity.ok(new MessageResponse("Commentaire supprimé !"));
		}	
	}
	
	@PutMapping(path="/{id_commentaire}/modifierCommentaire")
	public ResponseEntity<?> modifierCommentaire(@RequestBody Commentaire commentaire){
		commentaireRepository.deleteById(commentaire.getId_commentaire());
		commentaireRepository.save(commentaire);
		return ResponseEntity.ok(new MessageResponse("Commentaire modifié !"));
	}
	
	
	

}
