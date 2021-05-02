# RechercheTonCoéquipier.com

## Objectifs
  
Ce projet a pour but de créer un application web permettant aux utilisateurs inscrient de publier une recherche de coéquipier pour le jeu vidéo de son choix.
Il lui sera aussi possible de recevoir des notifications, de se constituer une liste d'amis avec lesquels il pourra intéragir.  
  
## Avant Projet

### Technologies utilisées

 - Angular
 - NodeJS
 - SocketIo

### Use Case

![Use Case](/avant%20projet/UseCaseDiagram.jpg "Use case")

### Maquettes
![Maquette Home PC](/avant%20projet/Home.png "Maquette Vue PC")

![Maquette Home Mobile](/avant%20projet/Android%20-%201.png "Maquette Home Mobile")

![Maquette Ami Mobile](/avant%20projet/Android%20-%202.png "Maquette Ami Mobile")

## Comment Installer

 - Faire npm i dans le dossier Front et Back puis npm start.


## Avancement du Projet

### Réalisé

- Application entièrement responsive
- S'inscrire
- Se connecter
- Se déconnecter
- Modifier son profil
- Ajouter des préférences de jeux
- Publier une publication (+ utilisation SocketIo)
- Réagir avec "like" (+ utilisation SocketIo)
- Réagir avec "share" (+ utilisation SocketIo)
- Pouvoir regarder les "likes" de la publication avec le "i"
- Accepter / refuser une personne ayant liké avec envoie d'une notification à la personne concernée (+ utilisation SocketIo)
- Ajouter une personne en ami (+ utilisation SocketIo)
- Accepter / supprimer une demande d'ami (+ utilisation SocketIo)
- Supprimer un ami (+ utilisation SocketIo)

### Reste à Faire

- Gestion des suggestions
- Gestion du "share"
- Hébergement web
- Gestion de la messagerie (version 1.1)

### Bugs

- Après s'être déconnecté, si on se reconnecte, l'utilisateur n'est pas redirigé que la home (il faut recliquer sur le bouton "se connecter")
- On peut revenir sur la page de login/ register alors que l'on est connecté

