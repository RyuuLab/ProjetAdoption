package com.api.toolscript.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.toolscript.models.Race;
import com.api.toolscript.payload.response.MessageResponse;
import com.api.toolscript.repository.RaceRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/race")
public class RaceController {
	
	@Autowired
	private RaceRepository raceRepository;
	
	@GetMapping(path="/{id_race}")
	public @ResponseBody Optional<Race> getRaceById(@PathVariable Long id_race){
		return raceRepository.findById(id_race);
	}
	
	@GetMapping(path="/{id_espece}/raceByEspece")
	public @ResponseBody Iterable<Race> getRaceByEspece(@PathVariable Long id_espece){
		return raceRepository.findAllByIdEspece(id_espece);
	}
	
	@PostMapping(path="/creerRace")
	public ResponseEntity<?> creerRace(@RequestBody Race race){
		if(race.getId_espece() == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: L'id_espece doit être renseigné pour la création de la race !"));
		}else {
			raceRepository.save(race);
			return ResponseEntity.ok(new MessageResponse("Race créée !"));
		}
	}
	
	@DeleteMapping(path="/{id_race}/supprimerRace")
	public ResponseEntity<?> supprimerRace(@PathVariable Long id_race){
		if(id_race == null) {
			return ResponseEntity.badRequest().body(
					new MessageResponse("Error: l'id_race doit être renseigné !"));
		}else {
			raceRepository.deleteById(id_race);
			return ResponseEntity.ok(new MessageResponse("Animal supprimé !"));

		}
	}
	
}
