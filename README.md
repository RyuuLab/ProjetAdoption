# ProjetAdoption

## Table des Matières
1. [Informations Générales](#informations-générales)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [API](#api)

***

## Informations Générales
***

Le projet Adoption consiste à proposer un site internet afin d'aider une association dans l'adoption d'animaux abandonnés.
Le site permet de chercher un animal selon les différentes espèces présentent dans l'association. Pour adopter un animal, l'utilisateur devra remplir un formulaire afin de transmettre les informations nécessaires pour pouvoir valider une adoption.

Si l'utilisateur n'a pas trouvé ce qu'il recherchait, il peut transmettre un formulaire avec ses informations personnelles et un message afin d'expliquer ses besoins pour qu'un administrateur puisse lui proposer un animal en fonction de ceux-ci.
Il est également possible de laisser des commentaires sous chaque présentation d'un animal afin de demander des informations supplémentaires si nécessaire.

***
## Technologies
***

Concernant la partie Front du projet, nous avons fait le choix d'utiliser le framework Angular afin de fluidifier l'expérience utilisateur. La partie Back, quant à elle, est rédigée en java avec l'utilisation du framework Spring.

[ProjeAdoption_Front](https://github.com/dengler5u/ProjetAdoption/tree/main/ProjetAdoption_Front)

[ProjetAdoption_Back](https://github.com/dengler5u/ProjetAdoption/tree/main/ProjetAdoption_Back)

***
## Installation
***

Introduction à l'installation du projet :

Pour la base de donnée :

* Executer le script sur MySql Workbench --> [Script](https://github.com/dengler5u/ProjetAdoption/blob/main/ScriptBdd.sql)

Récuperer le code :

* Créer un nouveau dossier, et ouvrir un invite de commande à l'intérieur

* Executer la commande suivante
```
$ git clone https://github.com/dengler5u/ProjetAdoption.git
```
Executer le Back :

* Importer dans Eclipse ou IntelliJ le dossier Adoption qui se trouve dans ProjetAdoption/ProjetAdoption_Back
* Se rendre dans Java Ressources -> src/main/java -> com.api.adoption et executer AdoptionApp.java

Executer le Front :

* suivre ce lien [Comment Executer le Front](https://github.com/dengler5u/ProjetAdoption/tree/main/ProjetAdoption_Front#readme)

***
## API
***

[ENDPOINTS](https://github.com/dengler5u/ProjetAdoption/tree/main/ProjetAdoption_Back#readme)
