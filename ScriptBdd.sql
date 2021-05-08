CREATE TABLE `animal` (
  `id_animal` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `age` int(11) NOT NULL,
  `sexe` varchar(45) NOT NULL,
  `histoire` mediumtext DEFAULT NULL,
  `couleur` varchar(45) DEFAULT NULL,
  `caractere` varchar(45) DEFAULT NULL,
  `idEspece` int(11) NOT NULL,
  `adopte` varchar(3) NOT NULL,
  `idRace` int(11) DEFAULT NULL,
  `date_creation` datetime DEFAULT NULL,
  `date_modification` datetime DEFAULT NULL,
  PRIMARY KEY (`id_animal`,`idEspece`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

CREATE TABLE `caracteristique` (
  `id_caracteristique` int(11) NOT NULL AUTO_INCREMENT,
  `nom_caracteristique` varchar(100) NOT NULL,
  `idEspece` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id_caracteristique`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

CREATE TABLE `commentaire` (
  `id_commentaire` int(11) NOT NULL AUTO_INCREMENT,
  `id_animal` int(11) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `commentaire` mediumtext DEFAULT NULL,
  `date_creation` datetime DEFAULT NULL,
  `idAnimal` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id_commentaire`),
  KEY `id_animal` (`id_animal`),
  CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`id_animal`) REFERENCES `animal` (`id_animal`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

CREATE TABLE `espece` (
  `id_espece` int(11) NOT NULL AUTO_INCREMENT,
  `nom_espece` varchar(100) NOT NULL,
  PRIMARY KEY (`id_espece`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

CREATE TABLE `formulaire` (
  `id_formulaire` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `message` mediumtext NOT NULL,
  PRIMARY KEY (`id_formulaire`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `formulaire_adoption` (
  `id_formulaire_adoption` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `mail` varchar(45) NOT NULL,
  `adresse` varchar(45) NOT NULL,
  `habitat` varchar(45) NOT NULL,
  `jardin` varchar(45) NOT NULL,
  PRIMARY KEY (`id_formulaire_adoption`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `image` (
  `id_image` int(11) NOT NULL AUTO_INCREMENT,
  `idAnimal` int(11) NOT NULL,
  `image` longtext NOT NULL,
  PRIMARY KEY (`id_image`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;

CREATE TABLE `race` (
  `id_race` int(11) NOT NULL AUTO_INCREMENT,
  `nom_race` varchar(100) DEFAULT NULL,
  `idEspece` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id_race`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

CREATE TABLE `reponse_com` (
  `id_reponse_com` int(11) NOT NULL AUTO_INCREMENT,
  `id_commentaire` int(11) DEFAULT NULL,
  `reponse_com` mediumtext DEFAULT NULL,
  `date_creation` datetime DEFAULT NULL,
  `idCommentaire` bigint(20) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `reponseCom` longtext DEFAULT NULL,
  PRIMARY KEY (`id_reponse_com`),
  KEY `id_commentaire` (`id_commentaire`),
  CONSTRAINT `id_commentaire` FOREIGN KEY (`id_commentaire`) REFERENCES `commentaire` (`id_commentaire`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `id_user` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `permission` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `UK23y4gd49ajvbqgl3psjsvhff6` (`username`),
  UNIQUE KEY `UKncoa9bfasrql0x4nhmh1plxxy` (`email`),
  UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

CREATE TABLE `user_role` (
  `id_user` bigint(20) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKc6b9nxne5oh2yx2ntw30b6r06` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `valeur` (
  `id_valeur` int(11) NOT NULL AUTO_INCREMENT,
  `id_animal` int(11) DEFAULT NULL,
  `id_caracteristique` int(11) NOT NULL,
  `valeur` varchar(100) NOT NULL,
  `idAnimal` bigint(20) DEFAULT NULL,
  `nom_caracteristique` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_valeur`),
  KEY `id_caracteristique` (`id_caracteristique`),
  KEY `id_animal` (`id_animal`),
  CONSTRAINT `id_animal` FOREIGN KEY (`id_animal`) REFERENCES `animal` (`id_animal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_caracteristique` FOREIGN KEY (`id_caracteristique`) REFERENCES `caracteristique` (`id_caracteristique`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

ALTER TABLE `animal` AUTO_INCREMENT = 1;
ALTER TABLE `caracteristique` AUTO_INCREMENT = 1;
ALTER TABLE `commentaire` AUTO_INCREMENT = 1;
ALTER TABLE `espece` AUTO_INCREMENT = 1;
ALTER TABLE `formulaire` AUTO_INCREMENT = 1;
ALTER TABLE `formulaire_adoption` AUTO_INCREMENT = 1;
ALTER TABLE `image` AUTO_INCREMENT = 1;
ALTER TABLE `race` AUTO_INCREMENT = 1;
ALTER TABLE `reponse_com` AUTO_INCREMENT = 1;
ALTER TABLE `role` AUTO_INCREMENT = 1;
ALTER TABLE `user` AUTO_INCREMENT = 1;
ALTER TABLE `valeur` AUTO_INCREMENT = 1;