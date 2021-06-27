# Projet VisualDon | Kevin Oliveira Paiva
## Visualisation des résultats en F1 en fonction des années.

### Site web réalisé seul: [f1.kople.ch](https://f1.kople.ch)

## Provenance des données

### Données des courses
Pour réaliser ce site web, j'ai trouvé une grande base de données qui regroupe énormément de données sur le monde de la F1 (Qualifications, courses, temps au tour, etc.): https://ergast.com/mrd/

Les données sont directement téléchargé depuis l'api que fourni gratuitement ergast. J'ai pu télécharger à travers des liens spécifiques pour ne télécharger uniquement certaines données. 

Dans mon cas, pour récupérer les différentes informations des circuits utilisés en 2021, voici un exemple d'url (J'ai pu tout simplement changer l'année depuis le lien): https://ergast.com/api/f1/2021/circuits.json?limit=100

```javascript
fetch("https://ergast.com/api/f1/" + year + "/circuits.json?limit=100")
    .then(r => r.json())
    .then(data => f1DataLive = data)
    .then(data => console.log("Circuit: " + data))

```

Pour les résultats des courses ayant eu lieu, j'ai procédé de la même manière. Voici un url d'exemple:
https://ergast.com/api/f1/2021/results.json?limit=1000

```javascript
fetch("https://ergast.com/api/f1/" + year + "/results.json?limit=1000")
    .then(r => r.json())
    .then(data => result = data)
    .then(data => console.log("Result: " + data))

```

Concernant la mise à jour des données, lorsqu'il y a une course qui s'est terminée, les données de la courses sont disponible directement après quelques heures.

### Données provenant de wikipédia
Les débuts d'articles wikipedia sur les circuits sont obtenus par les liens qui proviennent de l'api ergast. Ensuite, pour pouvoir extraire uniquement le texte de l'article, j'ai utilisé l'api de wikipedia 

```javascript
 var ret = f1DataLive.MRData.CircuitTable.Circuits[i].url.replace("http:\/\/en.wikipedia.org\/wiki\/", "");

...

 $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" + ret + "&exsentences=3&exintro=1&explaintext=1&exsectionformat=plain&origin=*&redirects",
```

Malheureusement, je n'ai réussi que d'obtenir les artricles en version anglaises.

### Données du tracé des circuits
Pour avoir la possibilité de voir le tracé de certains circuits, j'ai trouvé une autre petite base de données dédié à cela: https://github.com/bacinger/f1-circuits

Par contre, c'est bien une base de donnée statique ( pas de mises à jours automatique). Aucune préparation n'était nécessaire pour pouvoir utiliser les données étant déjà sous la norme GeoJSON.

### Données de la carte leaflet
Finalement, la carte que j'ai utilisé (Carto DarkMatter) avec leaflet provient de Carto.com . Je l'avais trouvé via ce site: https://leaflet-extras.github.io/leaflet-providers/preview/#filter=CartoDB.DarkMatter

Cette carte est [gratuite](https://carto.com/pricing/) pendant un an en utilisant des ressources "public" (Avec une limitation ), pour continuer à l'utiliser, il faudra payer en fonction des besoins et du trafic web.


