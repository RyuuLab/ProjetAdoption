package com.api.adoption.controllers;

import java.util.List;
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

import com.api.adoption.models.Animal;
import com.api.adoption.models.Commentaire;
import com.api.adoption.models.Reponse_com;
import com.api.adoption.payload.response.MessageResponse;
import com.api.adoption.repository.CommentaireRepository;
import com.api.adoption.repository.Reponse_comRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/commentaire")
public class CommentaireController {
	
	@Autowired
	private CommentaireRepository commentaireRepository;
	
	@Autowired
	private Reponse_comRepository reponse_comRepository;
	
	@GetMapping(path="/{id_commentaire}")
	public @ResponseBody Optional<Commentaire> getCommentaireById(@PathVariable Long id_commentaire){
		return commentaireRepository.findById(id_commentaire);
	}
	
	@GetMapping(path="/animal/{id_animal}")
	public @ResponseBody Iterable<Commentaire> getCommentaireByIdAnimal(@PathVariable Long id_animal){
		List<Commentaire> commentaires = commentaireRepository.findAllByIdAnimal(id_animal);
		commentaires.stream().forEach(commentaire -> {
			List<Reponse_com> r = reponse_comRepository.findAllByIdCommentaire(commentaire.getId_commentaire());
			commentaire.setTabReponse(r); 
		});
		return commentaires;
	}
	
	@PostMapping(path="/creerCommentaire")
	public ResponseEntity<?> creerCommentaire(@RequestBody Commentaire commentaire){
		if(commentaire.getIdAnimal() == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'id_animal doit être renseigné !"));
		}else {
			commentaireRepository.save(commentaire);
			return new ResponseEntity<Commentaire>(commentaireRepository.save(commentaire), HttpStatus.OK);
		}
		
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
	
	@PutMapping(path="/modifierCommentaire")
	public ResponseEntity<?> modifierCommentaire(@RequestBody Commentaire commentaire){
		Commentaire res = commentaireRepository.findById(commentaire.getId_commentaire()).get();
		res.setIdAnimal(commentaire.getIdAnimal());
		res.setUsername(commentaire.getUsername());
		res.setCommentaire(commentaire.getCommentaire());
		commentaireRepository.save(res);
		return ResponseEntity.ok(new MessageResponse("Commentaire modifié !"));
	}
	
	
	

}
