# Gestionnaire de Tâches
https://github.com/Ayolyan/IMR-PA5-AOS-GestionTachePremium

## Introduction (IMPORTANT)
Ce projet contient 4 serveurs express :
* `app.js` : exécution d'un front office pour administrer les tâches ;
* `taskService` : service mettant à disposition des verbe API pour accéder aux tâches et les administrer ;
* `tagService` : service mettant à disposition des verbe API pour accéder aux tags et les administrer ;
* `userService` : service mettant à disposition des verbe API pour accéder aux utilisateur et les administrer.

Les fichiers nécessaires à l'exécution de chaque serveur se trouvent respectivement dans les dossiers :
* `/app`
* `/taskService`
* `/tagService`
* `/userService`

## Téléchargement des packages
Le téléchargement des packages nécessaires à la bonne exécution du code se fait via la commande `npm i`

## Lancement des serveurs
Le lancement des serveurs, se fait via la commande : `npm run start`

## Description des variables d'environnement

### URL
* `APPURL` : URL à laquelle le front office est accessible ;
* `TASKURL` : URL à laquelle le service de tâches est accessible ;
* `TAGPURL` : URL à laquelle le service de tags est accessible ;
* `USERURL` : URL à laquelle le service d'utilisateur est accessible ;

### Ports
* `APPPORT` : port sur lequel le front office est accessible ;
* `TASKPORT` : port sur lequel le service de tâches est accessible ;
* `TAGPORT` : port sur lequel le service de tags est accessible ;
* `USERPORT` : port sur lequel le service d'utilisateur est accessible ;

### Provider
* `DBPROVIDER` : provider à utiliser pour accéder à la base de donnée. Valeurs possibles :
    * `LowDB`