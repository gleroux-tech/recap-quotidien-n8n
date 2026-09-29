# Spec — Récap quotidien n8n

> Projet perso · Gaspard · n8n Cloud · dossier n8n « Récap quotidien »
> Version du 29/09/2026

## 1. Objectif

Chaque matin à 7h30, recevoir sur Telegram **un seul récap** des rendez-vous du jour et des mails qui attendent une réponse, issus de **3 comptes Google** (perso, ecole, pro). Pouvoir **décliner un RDV en un clic** (et annuler ce refus), sans ouvrir Gmail ni Agenda.

## 2. Objectifs mesurables

| # | Objectif | Mesure de réussite |
|---|---|---|
| O1 | Ne rater aucun RDV du jour | 100 % des RDV des 3 agendas présents dans le récap, sur 1 semaine de test |
| O2 | Ne rater aucun mail qui attend une réponse | 0 mail important raté sur le jeu de test de 3 jours annoté |
| O3 | Limiter le bruit | Newsletters, notifications et reçus absents du récap ; baisse visible après usage du bouton « Pas important » |
| O4 | Agir sans ouvrir l'agenda | Décliner puis annuler un RDV depuis Telegram, organisateur prévenu à chaque fois |
| O5 | Fiabilité | Récap reçu chaque jour à 7h30, week-end compris ; alerte à 7h45 si absent |
| O6 | Voir les chevauchements | Tout conflit entre les 3 agendas affiché en tête du récap |

## 3. Périmètre

**Inclus (V1)**
- 3 comptes : perso (`leroux.gaspard56500@gmail.com`), ecole (`gleroux@eugeniaschool.com`), pro (`gaspard.l@morning.fr`)
- RDV du jour + aperçu de demain (nombre de RDV, heure du premier)
- Mails en attente de réponse, suivis d'un jour sur l'autre avec leur ancienneté
- Boutons : « Décliner », « Annuler le refus », « Pas important »
- Tri des mails par Claude (Haiku 4.5)
- Signal de vie et alerte en cas d'échec

**Exclu (V1)**
- WhatsApp et iMessage
- Alertes en temps réel dans la journée
- Réponse automatique aux mails, message d'excuse lors d'un refus
- Proposition d'un autre créneau

## 4. Affirmations

Chaque affirmation est vraie quand le système fonctionne. Elles servent de critères d'acceptation : on les coche une par une pendant la semaine de test.

### Récap matinal

- [ ] **A1** — Chaque jour à 7h30 (Europe/Paris), week-end compris, un message « Récap du <jour> » arrive sur Telegram.
- [ ] **A2** — Tout RDV du jour, dans l'un des 3 agendas, apparaît une seule fois dans le récap, même s'il est présent dans plusieurs agendas.
- [ ] **A3** — Un RDV que j'ai déjà décliné n'apparaît pas.
- [ ] **A4** — Deux RDV qui se chevauchent, même sur des comptes différents, apparaissent dans une section « Conflit » en tête du récap.
- [ ] **A5** — La dernière ligne indique le nombre de RDV de demain et l'heure du premier.
- [ ] **A6** — Un mail reçu depuis le récap précédent et qui attend ma réponse apparaît avec la mention « [nouveau] » et une phrase sur ce qui est attendu.
- [ ] **A7** — Une newsletter, une notification automatique ou un reçu n'apparaît pas.
- [ ] **A8** — Un mail laissé sans réponse réapparaît le lendemain avec « [1 j] », puis « [2 j] », etc.
- [ ] **A9** — Un mail disparaît du récap dès que j'y ai répondu.
- [ ] **A10** — Les mails marqués « [haute] » sont listés avant les autres.
- [ ] **A11** — Une journée sans RDV ni mail produit quand même un récap (« Rien de prévu », « Aucun mail en attente »).
- [ ] **A12** — Si Claude ne répond pas correctement, le récap part quand même, avec les nouveaux mails sans résumé et la mention « Tri indisponible ».

### Boutons

- [ ] **A13** — Juste après le récap, chaque RDV dont je suis invité (pas organisateur) et qui n'a pas commencé reçoit un message silencieux avec un bouton « Décliner ».
- [ ] **A14** — Chaque mail en attente reçoit un message silencieux avec un bouton « Pas important ».
- [ ] **A15** — Un clic sur « Décliner » passe ma réponse à « refusé » dans le bon agenda, prévient l'organisateur, barre le message et remplace le bouton par « Annuler le refus ».
- [ ] **A16** — Un clic sur « Annuler le refus » rétablit ma réponse d'avant, prévient l'organisateur et remet le bouton « Décliner ».
- [ ] **A17** — Le refus ne modifie que ma ligne : les autres participants de l'événement restent inchangés.
- [ ] **A18** — Un clic sur « Pas important » barre le message, retire le mail de la liste d'attente et l'ajoute aux exemples à écarter ; le lendemain, un mail du même expéditeur n'apparaît plus.
- [ ] **A19** — Un double clic ne déclenche qu'une seule action ; le second reçoit « Déjà traité ».
- [ ] **A20** — Un clic après le début du RDV ne change rien et reçoit « Trop tard ».
- [ ] **A21** — Si la mise à jour de l'agenda échoue, une alerte Telegram « Échec, à faire à la main » s'affiche et le bouton reste inchangé.
- [ ] **A22** — Chaque clic affiche une courte notification Telegram de confirmation.

### Fiabilité et sécurité

- [ ] **A23** — Si aucun récap n'est enregistré pour le jour à 7h45, une alerte « Récap du matin non envoyé » arrive sur Telegram.
- [ ] **A24** — Si le workflow 1 ou 2 échoue, une alerte avec le nom du nœud et le message d'erreur arrive sur Telegram.
- [ ] **A25** — Si Telegram est indisponible, l'alerte part par mail.
- [ ] **A26** — Aucun token ni clé d'API n'apparaît en clair dans un nœud : tout passe par les credentials n8n.
- [ ] **A27** — Aucune action sur l'agenda n'est déclenchée par le contenu d'un mail : seules les actions des boutons modifient l'agenda.

## 5. Architecture

Trois workflows dans le dossier n8n « Récap quotidien », plus un squelette non configuré pour la revue d'architecture. Nœuds nommés « Outil - Action ».

| Workflow | Déclencheur | Rôle |
|---|---|---|
| Récap quotidien · Architecture (squelette) | — | Vue de l'architecture, sans configuration |
| 1. Récap matinal | Schedule 7h30 | Collecte, tri, envoi du récap et des messages à bouton |
| 2. Actions sur les boutons | Telegram Trigger | Décliner, annuler, pas important |
| 3. Signal de vie | Schedule 7h45 + Error Trigger | Alerte si récap absent ou workflow en échec |

**Workflow 1 — Récap matinal**
`Schedule` → `Data Table - Lire dernier passage / mails en attente / exemples pas importants` → `Google Agenda - Lire RDV perso / ecole / pro` → `Gmail - Lire reçus / envoyés` (×3) → `Code - Préparer RDV, conflits et mails` → `Claude - Trier mails à répondre` → `Code - Construire texte du récap` → `Claude - Rédiger récap personnalisé` (ton d'assistant, tutoiement, « L'essentiel » en tête ; repli sur le texte construit si Claude échoue) → `Telegram - Envoyer récap` → `Data Table - Enregistrer passage` → deux branches :
- `Data Table - Vider liste d'attente` → `Set` → `Split Out` → `Data Table - Enregistrer mails en attente`
- `Set - Extraire boutons` → `Split Out - Un bouton par message` → `Telegram - Envoyer message à bouton` → `Data Table - Enregistrer boutons`

**Workflow 2 — Actions sur les boutons**
`Telegram Trigger` → `Set - Lire clic` → `Data Table - Retrouver bouton cliqué` → `Set - Préparer contexte du clic` → `Switch - Type d'action` :
- Décliner / Annuler → `Set - Préparer changement de réponse` → `Switch - Quel compte` → `HTTP - Lire événement` → `HTTP - Modifier ma réponse` → `Data Table - Mettre à jour bouton RDV` → `Telegram - Modifier message RDV` → `Telegram - Confirmer clic RDV`
- Pas important → `Set` → `Data Table` ×3 → `Telegram - Modifier message mail` → `Telegram - Confirmer clic mail`
- Refusé → `Telegram - Répondre clic refusé`

**Workflow 3 — Signal de vie**
`Schedule 7h45` → `Data Table - Chercher récap du jour` → `IF - Récap absent ?` → `Set` → `Telegram - Envoyer alerte` (repli `Gmail - Envoyer alerte de secours`) ; `Error Trigger` → `Set - Alerte échec` → même envoi.

**Nœuds non natifs conservés**

| Nœud | Justification |
|---|---|
| 6 × HTTP (workflow 2) | Le nœud Google Agenda natif ne permet pas de changer ma réponse à une invitation |
| Code - Préparer RDV, conflits et mails | Comparaison des RDV deux à deux, suivi des fils de mails entre réception et envoi |
| Code - Construire texte du récap | Texte multi-sections et contrôle de la réponse de Claude |

## 6. Données (Data Tables n8n)

| Table | Contenu |
|---|---|
| `recap_runs` | Un passage par jour : horodatage, message_id, nombre de RDV et de mails, statut |
| `recap_boutons` | Un bouton par ligne : action, compte, événement ou fil, statut, statut d'avant |
| `recap_mails_en_attente` | Mails en attente de réponse, avec date de réception et résumé |
| `recap_feedback` | Exemples marqués « pas importants », relus par Claude |

## 7. Décisions

| Sujet | Décision |
|---|---|
| Canal | Telegram (WhatsApp reporté en V2) |
| Noms des comptes | perso, ecole, pro |
| Décliner | Un clic, sans confirmation, avec « Annuler le refus » jusqu'au début du RDV |
| Message d'excuse | Non |
| Mails pro via l'API Anthropic | Oui |
| Heure d'envoi | 7h30 tous les jours |
| Format des boutons | Un message par bouton, pour garder le token du bot dans un credential |

## 8. Reste à faire avant activation

- [ ] Associer chaque paire de nœuds Gmail (reçus / envoyés) au bon compte
- [ ] Renseigner le chat_id Telegram dans les nœuds qui l'attendent
- [ ] Activer le workflow 3, puis le déclarer comme workflow d'erreur des workflows 1 et 2
- [ ] Constituer le jeu de test de 3 jours et vérifier les affirmations A1 à A27
