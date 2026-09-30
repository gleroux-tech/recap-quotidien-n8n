---
name: "doubt-driven-dev"
description: "Construire en doutant de tout ce qui n'est pas prouvé : lister les doutes, les classer par risque, les lever par la preuve la moins chère (exécution réelle, test, doc) avant de s'appuyer dessus. À utiliser pour développer ou configurer une automatisation, un workflow ou du code à partir d'un spec."
---

# Doubt-driven dev

Principe : tout ce qui n'a pas été vu fonctionner est un doute, y compris ce que tu crois savoir, ce que dit la doc, ce que dit une autre IA et ce que tu viens d'écrire toi-même. On ne construit pas sur un doute : on le lève d'abord, par la preuve la moins chère.

Écris en français, tutoie, montre les preuves plutôt que les affirmations.

## 1. Lister les doutes

Avant de construire, à partir du spec, écris le registre des doutes. Sources typiques :
- **API et outils** : cet endpoint existe-t-il ? ce nœud sait-il faire cette action ? quel format d'ID attend-il ? quelle limite ?
- **Identifiants et noms** : nom exact d'un modèle, d'un calendrier, d'une table, d'un champ.
- **Comportements** : fuseau horaire, pagination, champs absents quand vides, ordre des résultats, références qui ne suivent pas un renommage.
- **Accès** : credential valide pour ce compte, droits suffisants, service joignable depuis cet environnement.
- **IA** : format de sortie respecté ? que se passe-t-il si elle déraille ?
- **Ton propre travail** : « ça devrait marcher » = doute.

Pour chaque doute : `# | Doute | Impact si faux (haut/moyen/bas) | Certitude actuelle | Preuve prévue`.

## 2. Classer

Traite d'abord **impact haut × certitude basse**. Ce sont les doutes qui, faux, obligent à changer l'architecture : on les lève avant d'écrire le reste.

## 3. Lever chaque doute par la preuve la moins chère

Par ordre de préférence :
1. **Exécution réelle minimale** (spike) : un seul nœud, un seul appel, une vraie donnée. C'est la seule preuve qui compte vraiment.
2. **Test automatisé** ou validation outillée (validateur de schéma, linter, aller-retour code ↔ JSON).
3. **Doc officielle à jour**, lue plutôt que supposée.
4. Mémoire ou intuition : jamais suffisant seul pour un doute à impact haut.

Note le résultat : **levé** (avec la preuve : ID d'exécution, sortie, lien), **infirmé** (et ce qu'on change), ou **accepté** comme risque (explicitement).

## 4. Construire par petits incréments

- Ajoute une brique, exécute, regarde la vraie sortie, puis la brique suivante.
- Un vert ne prouve rien si tu n'as pas regardé ce qui a été produit : ouvre la sortie, vérifie le contenu (le message est-il arrivé ? dans quel format ?).
- Quand quelque chose échoue, isole la cause avant de corriger (compare avec une brique qui marche, change une seule chose à la fois).
- Chaque correction ajoute un doute : « ma correction a-t-elle cassé autre chose ? » → re-exécute le flux complet.
- Remets en état tout réglage de diagnostic (mode d'erreur, logs, données de test) avant de publier.

## 5. Prouver les affirmations du spec

À la fin, reprends chaque affirmation A1…An du spec : `A# | Prouvée par | Statut (prouvée / non testée / échoue)`. Une affirmation sans preuve reste « non testée », même si tu es confiant.

## Livrable

- ce qui est construit et publié ;
- le registre des doutes (levés, infirmés, acceptés) ;
- le tableau des affirmations avec leurs preuves ;
- les doutes restants, nommés, avec la preuve qui les lèverait.

Ne dis jamais « ça marche » sans montrer où tu l'as vu marcher.