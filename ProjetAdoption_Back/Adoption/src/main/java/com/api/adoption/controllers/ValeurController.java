package com.api.adoption.controllers;

import java.util.List;
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

import com.api.adoption.models.Caracteristique;
import com.api.adoption.models.Image;
import com.api.adoption.models.Valeur;
import com.api.adoption.payload.response.MessageResponse;
import com.api.adoption.repository.CaracteristiqueRepository;
import com.api.adoption.repository.ValeurRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/valeur")
public class ValeurController {

	@Autowired
	private ValeurRepository valeurRepository;
	
	@Autowired
	private CaracteristiqueRepository caracteristiqueRepository;
	
	@GetMapping(path="/{id_valeur}")
	public @ResponseBody Optional<Valeur> getValeurById(@PathVariable Long id_valeur){
		return valeurRepository.findById(id_valeur);
	}
	
	@PostMapping(path="/creerValeur")
	public ResponseEntity<?> creerValeur(@RequestBody Valeur[] valeurs){
		for(Valeur valeur: valeurs) {
			if (valeur.getIdAnimal() == null) {
				return ResponseEntity.badRequest().body(
						new MessageResponse("Error: L'id_animal doit être renseigné !"));
			} else if (valeur.getId_caracteristique() == null) {
				return ResponseEntity.badRequest().body(
						new MessageResponse("Error: L'id_caracteristique doit être renseigné !"));
			} else if (valeur.getValeur() == null || valeur.getValeur().isBlank()) {
				return ResponseEntity.badRequest().body(
						new MessageResponse("Error: La valeur doit être renseignée !"));
			} else {
				valeurRepository.save(valeur);
			}
		}
			return ResponseEntity.ok(new MessageResponse("Valeur créée !"));
	}
	
	
	@GetMapping(path="/animal/{id_animal}")
    public @ResponseBody Iterable<Valeur> getValeurByIdAnimal(@PathVariable Long id_animal){
        List<Valeur> valeurs =  valeurRepository.findAllByIdAnimal(id_animal);
        valeurs.stream().forEach(valeur -> {
            Caracteristique c = caracteristiqueRepository.findById(valeur.getId_caracteristique()).get();
            valeur.setNom_caracteristique(c.getNom_caracteristique());
        });
        return valeurs;
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
		Valeur res = valeurRepository.findById(valeur.getId_valeur()).get();
		res.setIdAnimal(valeur.getIdAnimal());
		res.setId_caracteristique(valeur.getId_caracteristique());
		res.setValeur(valeur.getValeur());
		valeurRepository.save(res);
		return ResponseEntity.ok(new MessageResponse("Valeur modifiée !"));

	}
}
