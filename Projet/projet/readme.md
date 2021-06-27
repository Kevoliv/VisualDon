# Projet VisualDon | Kevin Oliveira Paiva
## Visualisation des résultats en F1 en fonction des années.

### [f1.kople.ch](https://f1.kople.ch)

## Provenance des données

### Données des courses
Pour réaliser ce site web, j'ai trouvé une grande base de données qui regroupe énormément de données sur le monde de la F1 (Qualifications, courses, temps au tour, etc.): https://ergast.com/mrd/

Les données sont directement téléchargé depuis l'api que fourni gratuitement ergast. J'ai pu télécharger à travers des liens spécifiques pour ne télécharger uniquement certaines données. 

Dans mon cas, pour récupérer les différentes informations des circuits utilisés en 2021, voici un exemple d'url (J'ai pu tout simplement changer l'année depuis le lien): https://ergast.com/api/f1/2021/circuits.json?limit=100

Pour les résultats des courses ayant eu lieu, j'ai procédé de la même manière. Voici un url d'exemple:
https://ergast.com/api/f1/2021/results.json?limit=1000


### Données du tracé des circuits
Pour avoir la possibilité de voir le tracé de certains circuits, j'ai trouvé une autre petite base de données dédié à cela: https://github.com/bacinger/f1-circuits

### Données de la carte leaflet
Finalement, la carte que j'ai utilisé (Carto DarkMatter) avec leaflet provient de Carto.com . Je l'avais trouvé via ce site: https://leaflet-extras.github.io/leaflet-providers/preview/#filter=CartoDB.DarkMatter

Cette carte est [gratuite](https://carto.com/pricing/) pendant un an en utilisant des ressources "public" (Avec une limitation ), pour continuer à l'utiliser, il faudra payer en fonction des besoins et du trafic web.
