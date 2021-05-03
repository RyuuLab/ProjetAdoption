
# ENDPOINTS

## Table des Controllers
1. [AnimalController](#animalcontroller)
2. [AuthController](#authcontroller)
3. [CaracteristiqueController](#caracteristiquecontroller)
4. [CommentaireController](#commentairecontroller)
5. [EspeceController](#espececontroller)
6. [Formulaire_adoptionController](#formulaire_adoptioncontroller)
7. [FormulaireController](#formulairecontroller)
8. [ImageController](#imagecontroller)
9. [RaceController](#racecontroller)
10.[Reponse_comController](#reponse_comcontroller)
11.[UserController](#usercontroller)
12.[ValeurController](#valeurcontroller)

***

## AnimalController
***

Get
  - path="/animal/{id_animal}"
  - path="/animal/{id_espece}/animauxByEspece"

Post
  - path="/animal/creerAnimal"

Delete
  - path="/animal/{id_animal}/supprimerAnimal"

Put
  - path="/animal/modifierAnimal"

***
## AuthController
***

Post
  - path="/login"
  - path="/register"

***
## CaracteristiqueController
***

Get
  - path="/caracteristique/{id_caracteristique}"
  - path="/caracteristique/{id_espece}/allCaractByEspece"

Post
  - path="/caracteristique/creerCaracteristique"

Delete
  - path="/caracteristique/{id_caracteristique}/supprimerCaracteristique"

Put
  - path="/caracteristique/modifierCaracteristique"

***
## CommentaireController
***

Get
  - path="/commentaire/{id_commentaire}"
  - path="/commentaire/animal/{id_animal}"

Post
  - path="/commentaire/creerCommentaire"

Delete
  - path="/commentaire/{id_commentaire}/supprimerCommentaire"

Put
  - path="/commentaire/modifierCommentaire"

***
## EspeceController
***

Get
  - path="/espece/{id_espece}"
  - path="/espece/especes"

Post
  - path="/espece/creerEspece"

Delete
  - path="/espece/{id_espece}/supprimerEspece"

Put
  - path="/espece/modifierEspece"

***
## Formulaire_adoptionController
***

Get
  - path="/formulaire_adoption/{id_formulaire_adoption"
  - path="/formulaire_adoption/formulaires"

Post
  - path="/formulaire_adoption/creerFormulaire_adoption"

Delete
  - path="/formulaire_adoption/{id_formulaire_adoption}/supprimerFormulaire_adoption"

Put
  - path="/formulaire_adoption/modifierFormulaire_adoption"

***
## FormulaireController
***

Get
  - path="/formulaire/{id_formulaire}"
  - path="/formulaire/formulaires"

Post
  - path="/formulaire/creerFormulaire"

Delete
  - path="/formulaire/{id_formulaire}/supprimerFormulaire"

Put
  - path="/formulaire/modifierFormulaire"

***
## ImageController
***

Get
  - path="/image/{id_image}"
  - path="/image/{id_animal}/imageByAnimal"

Post
  - path="/image/creerImage"

Delete
  - path="/image/{id_image}/supprimerImage"

Put
  - path="/image/modifierImage"

***
## RaceController
***

Get
  - path="/race/{id_race}"
  - path="/race/{id_espece}/raceByEspece"

Post
  - path="/race/creerRace"

Delete
  - path="/race/{id_race}/supprimerRace"

Put
  - path="/race/modifierRace"

***
## Reponse_comController
***

Get
  - path="/reponse_com/{id_reponse_com"
  - path="/reponse_com/{id_commentaire}/reponseComByCom"

Post
  - path="/reponse_com/creerReponseCom"

Delete
  - path="/reponse_com/{id_reponse_com}/supprimerReponseCom"
  - path="/reponse_com/{id_commentaire}/supprimerReponseByCom"

Put
  - path="/reponse_com/modifierReponseCom"

***
## UserController
***

Get
  - path="/user/{id_user}"
  - path="/user/users"

Put
  - path="/user/changePassword"
  - path="/user/changeUsername"
  - path="/user/changeMail"

***
## ValeurController
***

Get
  - path="/valeur/{id_valeur}"
  - path="/valeur/animal/{id_animal}"

Post
  - path="/valeur/creerValeur"

Delete
  - path="/valeur/{id_valeur}/supprimerValeur"

Put
  - path="/valeur/modifierValeur"
  - path="/valeur/{TabValeur}/modifierTabValeurs"


