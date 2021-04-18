package com.api.toolscript.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.toolscript.models.Valeur;
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
	
	//@PostMapping(path="/creerValeur")
}
