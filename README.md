# Récap quotidien · n8n

Chaque matin à 7h30, un assistant m'écrit sur Telegram le point sur ma journée : les rendez-vous de mes 3 agendas Google (perso, ecole, pro), les conflits à trancher, les mails qui attendent une réponse et un aperçu du lendemain. Des boutons permettent de décliner un RDV en un clic (et d'annuler ce refus), ou de marquer un mail « pas important » pour affiner le tri.

Hébergé sur n8n Cloud. Tri et rédaction par Claude (Haiku 4.5).

## Workflows

| Fichier | Workflow n8n | Déclencheur | Rôle |
|---|---|---|---|
| `workflows/01-recap-matinal.workflow.ts` | Récap quotidien · 1. Récap matinal | Schedule 7h30 | Lit les 3 Gmail et 3 agendas, trie les mails, fait rédiger le récap par Claude, l'envoie avec un message à bouton par RDV déclinable et par mail |
| `workflows/02-actions-boutons.workflow.ts` | Récap quotidien · 2. Actions sur les boutons | Telegram Trigger | Décliner / annuler le refus dans le bon agenda (organisateur prévenu), ou « pas important » |
| `workflows/03-signal-de-vie.workflow.ts` | Récap quotidien · 3. Signal de vie | Schedule 7h45 + Error Trigger | Alerte si le récap n'est pas parti ou si un workflow échoue, repli par mail |
| `workflows/00-architecture-squelette.workflow.ts` | Récap quotidien · Architecture (squelette) | — | Vue d'architecture non configurée, pour la revue |

Les fichiers `.workflow.ts` sont au format du [n8n Workflow SDK](https://www.npmjs.com/package/@n8n/workflow-sdk), le même que `n8ncli pull`. Le dossier `json/` contient les mêmes workflows au format d'export n8n, importables directement (menu *Import from file*).

```
workflows/   code TypeScript (SDK n8n)
json/        exports JSON importables
SPEC.md      spec : objectifs, affirmations A1–A27, architecture, décisions
skills/      méthode : interview, hostile-interview, doubt-driven-dev
```

## Architecture

```
7h30  Schedule
      → Data Tables (dernier passage, mails en attente, exemples « pas importants »)
      → Google Agenda ×3 → Gmail reçus/envoyés ×3
      → Code : RDV, conflits, mails sans réponse
      → Claude : tri des mails à répondre
      → Code : données du récap (+ texte de secours)
      → Claude : rédaction façon assistant
      → Telegram : récap
      → Data Tables : passage, liste d'attente, boutons
      → Telegram : un message silencieux à bouton par élément

Clic  Telegram Trigger → Data Table → Switch (Décliner / Annuler / Pas important / Refusé)
      → HTTP Google Calendar (PATCH attendees, sendUpdates=all) → Telegram (message modifié + notification)

7h45  Schedule → récap du jour présent ? sinon alerte Telegram (repli Gmail)
      Error Trigger (workflows 1 et 2) → même alerte
```

## Data Tables

| Table | Colonnes principales |
|---|---|
| `recap_runs` | run_id, lance_le, message_id, nb_rdv, nb_mails, elements, statut |
| `recap_boutons` | bouton_id, run_id, action, compte, calendar_id, event_id, thread_id, debut_rdv, libelle, statut_avant, statut, expediteur, objet, traite_le |
| `recap_mails_en_attente` | thread_id, compte, de, email, objet, attendu, priorite, recu_le |
| `recap_feedback` | expediteur, objet, compte, marque_le |

## Réinstaller sur une autre instance

1. Créer les 4 Data Tables ci-dessus.
2. Importer les fichiers de `json/` (ou `n8ncli push`).
3. Connecter les credentials : 3 Gmail, 3 Google Calendar, Telegram, Anthropic (ou crédits Gateway n8n).
4. Remplacer les ID de Data Tables, le `chatId` Telegram et les adresses d'agenda par les siens.
5. Publier le workflow 3, le déclarer comme *Error workflow* des workflows 1 et 2, puis publier 1 et 2.

## Sécurité

Aucun token ni clé d'API dans ce dépôt : les nœuds référencent des credentials n8n par leur identifiant. Le dépôt contient en revanche des données personnelles (adresses mail, chat_id Telegram), il doit rester privé.

## Méthode (skills)

Le dossier `skills/` contient les trois skills utilisés pour cadrer, challenger et construire ce projet :

| Skill | Rôle |
|---|---|
| `interview` | Cadrer le besoin : une question à la fois, avec une réponse recommandée |
| `hostile-interview` | Attaquer le spec : trous, hypothèses cachées, modes de panne, sécurité, coût |
| `doubt-driven-dev` | Construire en levant chaque doute par une preuve réelle avant de s'appuyer dessus |
