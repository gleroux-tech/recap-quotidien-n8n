const telegram_Trigger_Clic_sur_bouton = trigger({
  type: 'n8n-nodes-base.telegramTrigger',
  version: 1.5,
  config: { name: 'Telegram Trigger - Clic sur bouton', parameters: { updates: ['callback_query'], additionalFields: { userIds: '8810986469' } }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [0, 400], webhookId: 'a915bbdf-4b83-4b30-b5bd-250b24d94e4c' }
});

const set_Lire_clic = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: { name: 'Set - Lire clic', parameters: { assignments: { assignments: [{ id: 'query_id', name: 'query_id', value: expr('{{ $json.callback_query.id }}'), type: 'string' }, { id: 'chat_id', name: 'chat_id', value: expr('{{ $json.callback_query.message.chat.id }}'), type: 'string' }, { id: 'message_id', name: 'message_id', value: expr('{{ $json.callback_query.message.message_id }}'), type: 'string' }, { id: 'bouton_id', name: 'bouton_id', value: expr('{{ String($json.callback_query.data).split(\'|\')[0] }}'), type: 'string' }, { id: 'code', name: 'code', value: expr('{{ String($json.callback_query.data).split(\'|\')[1] || \'\' }}'), type: 'string' }] }, options: {} }, position: [256, 320] }
});

const data_Table_Retrouver_bouton_cliqu = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Retrouver bouton cliqué', parameters: { operation: 'get', dataTableId: { __rl: true, mode: 'id', value: 'bUBDcv21azWIACmO', cachedResultName: 'recap_boutons' }, matchType: 'allConditions', filters: { conditions: [{ keyName: 'bouton_id', keyValue: expr('{{ $json.bouton_id }}') }] }, limit: 1 }, position: [480, 320], alwaysOutputData: true }
});

const set_Pr_parer_contexte_du_clic = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: { name: 'Set - Préparer contexte du clic', parameters: { assignments: { assignments: [{ id: 'query_id', name: 'query_id', value: expr('{{ $(\'Set - Lire clic\').item.json.query_id }}'), type: 'string' }, { id: 'chat_id', name: 'chat_id', value: expr('{{ $(\'Set - Lire clic\').item.json.chat_id }}'), type: 'string' }, { id: 'message_id', name: 'message_id', value: expr('{{ $(\'Set - Lire clic\').item.json.message_id }}'), type: 'string' }, { id: 'code', name: 'code', value: expr('{{ $(\'Set - Lire clic\').item.json.code }}'), type: 'string' }, { id: 'trouve', name: 'trouve', value: expr('{{ !!$json.action }}'), type: 'boolean' }, { id: 'passe', name: 'passe', value: expr('{{ $json.debut_rdv ? new Date($json.debut_rdv).getTime() < Date.now() : false }}'), type: 'boolean' }] }, includeOtherFields: true, options: {} }, position: [704, 320] }
});

const switch_Type_d_action = node({
  type: 'n8n-nodes-base.switch',
  version: 3.4,
  config: { name: 'Switch - Type d\u2019action', parameters: { rules: { values: [{ conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 }, combinator: 'and', conditions: [{ leftValue: expr('{{ $json.code }}'), rightValue: 'D', operator: { type: 'string', operation: 'equals' } }, { leftValue: expr('{{ $json.action }}'), rightValue: 'decliner', operator: { type: 'string', operation: 'equals' } }, { leftValue: expr('{{ $json.statut }}'), rightValue: '^(en_attente|annule)$', operator: { type: 'string', operation: 'regex' } }, { leftValue: expr('{{ $json.passe }}'), rightValue: '', operator: { type: 'boolean', operation: 'false', singleValue: true } }] }, renameOutput: true, outputKey: 'Décliner' }, { conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 }, combinator: 'and', conditions: [{ leftValue: expr('{{ $json.code }}'), rightValue: 'U', operator: { type: 'string', operation: 'equals' } }, { leftValue: expr('{{ $json.action }}'), rightValue: 'decliner', operator: { type: 'string', operation: 'equals' } }, { leftValue: expr('{{ $json.statut }}'), rightValue: 'decline', operator: { type: 'string', operation: 'equals' } }, { leftValue: expr('{{ $json.passe }}'), rightValue: '', operator: { type: 'boolean', operation: 'false', singleValue: true } }] }, renameOutput: true, outputKey: 'Annuler le refus' }, { conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 }, combinator: 'and', conditions: [{ leftValue: expr('{{ $json.code }}'), rightValue: 'I', operator: { type: 'string', operation: 'equals' } }, { leftValue: expr('{{ $json.action }}'), rightValue: 'pas_important', operator: { type: 'string', operation: 'equals' } }, { leftValue: expr('{{ $json.statut }}'), rightValue: 'en_attente', operator: { type: 'string', operation: 'equals' } }, { leftValue: expr('{{ $json.passe }}'), rightValue: '', operator: { type: 'boolean', operation: 'false', singleValue: true } }] }, renameOutput: true, outputKey: 'Pas important' }] }, options: { fallbackOutput: 'extra', renameFallbackOutput: 'Refusé' } }, position: [880, 400] }
});

const set_Pr_parer_changement_de_r_ponse = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: { name: 'Set - Préparer changement de réponse', parameters: { assignments: { assignments: [{ id: 'nouveau_statut_google', name: 'nouveau_statut_google', value: expr('{{ $json.code === \'D\' ? \'declined\' : ($json.statut_avant || \'needsAction\') }}'), type: 'string' }, { id: 'statut_bouton', name: 'statut_bouton', value: expr('{{ $json.code === \'D\' ? \'decline\' : \'annule\' }}'), type: 'string' }, { id: 'texte_edit', name: 'texte_edit', value: expr('{{ $json.code === \'D\' ? \'RDV · <s>\' + String($json.libelle).replace(/&/g, \'&amp;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\') + \'</s> — décliné\' : \'RDV · \' + String($json.libelle).replace(/&/g, \'&amp;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\') }}'), type: 'string' }, { id: 'bouton_texte', name: 'bouton_texte', value: expr('{{ $json.code === \'D\' ? \'Annuler le refus\' : \'Décliner\' }}'), type: 'string' }, { id: 'bouton_cb', name: 'bouton_cb', value: expr('{{ $json.bouton_id + ($json.code === \'D\' ? \'|U\' : \'|D\') }}'), type: 'string' }, { id: 'notif', name: 'notif', value: expr('{{ $json.code === \'D\' ? \'Refus envoyé à l\u2019organisateur\' : \'Refus annulé\' }}'), type: 'string' }] }, includeOtherFields: true, options: {} }, position: [1104, 240] }
});

const switch_Quel_compte = node({
  type: 'n8n-nodes-base.switch',
  version: 3.4,
  config: { name: 'Switch - Quel compte', parameters: { rules: { values: [{ conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 }, combinator: 'and', conditions: [{ leftValue: expr('{{ $json.compte }}'), rightValue: 'perso', operator: { type: 'string', operation: 'equals' } }] }, renameOutput: true, outputKey: 'perso' }, { conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 }, combinator: 'and', conditions: [{ leftValue: expr('{{ $json.compte }}'), rightValue: 'ecole', operator: { type: 'string', operation: 'equals' } }] }, renameOutput: true, outputKey: 'ecole' }, { conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 }, combinator: 'and', conditions: [{ leftValue: expr('{{ $json.compte }}'), rightValue: 'pro', operator: { type: 'string', operation: 'equals' } }] }, renameOutput: true, outputKey: 'pro' }] }, options: {} }, position: [1328, 240] }
});

const hTTP_Lire_v_nement_perso = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Lire événement perso', parameters: { url: expr('https://www.googleapis.com/calendar/v3/calendars/{{ encodeURIComponent($json.calendar_id || \'primary\') }}/events/{{ encodeURIComponent($json.event_id) }}'), authentication: 'predefinedCredentialType', nodeCredentialType: 'googleCalendarOAuth2Api', options: {} }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar account 2', 'Q2ihyUahcE40waDR') }, position: [1552, 80] }
});

const hTTP_Modifier_ma_r_ponse_perso = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Modifier ma réponse perso', parameters: { method: 'PATCH', url: expr('https://www.googleapis.com/calendar/v3/calendars/{{ encodeURIComponent($(\'Set - Préparer changement de réponse\').item.json.calendar_id || \'primary\') }}/events/{{ encodeURIComponent($(\'Set - Préparer changement de réponse\').item.json.event_id) }}?sendUpdates=all'), authentication: 'predefinedCredentialType', nodeCredentialType: 'googleCalendarOAuth2Api', sendBody: true, specifyBody: 'json', jsonBody: expr('{{ JSON.stringify({ attendees: ($json.attendees || []).map(a => a.self ? Object.assign({}, a, { responseStatus: $(\'Set - Préparer changement de réponse\').item.json.nouveau_statut_google }) : a) }) }}'), options: {} }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar account 2', 'Q2ihyUahcE40waDR') }, position: [1760, 80], onError: 'continueErrorOutput' }
});

const telegram_Signaler_chec_agenda = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Signaler échec agenda', parameters: { resource: 'callback', queryId: expr('{{ $(\'Set - Préparer changement de réponse\').first().json.query_id }}'), additionalFields: { show_alert: true, text: 'Échec de la mise à jour de l\u2019agenda : à faire à la main' } }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [1984, 0], webhookId: '4fbc07d7-064e-440f-8530-beecedd7e082', executeOnce: true }
});

const data_Table_Mettre_jour_bouton_RDV = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Mettre à jour bouton RDV', parameters: { operation: 'update', dataTableId: { __rl: true, mode: 'id', value: 'bUBDcv21azWIACmO', cachedResultName: 'recap_boutons' }, matchType: 'allConditions', filters: { conditions: [{ keyName: 'bouton_id', keyValue: expr('{{ $(\'Set - Préparer changement de réponse\').item.json.bouton_id }}') }] }, columns: { mappingMode: 'defineBelow', value: { statut: expr('{{ $(\'Set - Préparer changement de réponse\').item.json.statut_bouton }}'), traite_le: expr('{{ $now.toISO() }}') }, schema: [{ id: 'statut', displayName: 'statut', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'traite_le', displayName: 'traite_le', required: false, defaultMatch: false, display: true, type: 'dateTime', canBeUsedToMatch: true }] }, options: {} }, position: [1984, 240] }
});

const telegram_Modifier_message_RDV = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Modifier message RDV', parameters: { operation: 'editMessageText', chatId: expr('{{ $(\'Set - Préparer changement de réponse\').item.json.chat_id }}'), messageId: expr('{{ $(\'Set - Préparer changement de réponse\').item.json.message_id }}'), replyMarkup: 'inlineKeyboard', text: expr('{{ $(\'Set - Préparer changement de réponse\').item.json.texte_edit }}'), inlineKeyboard: { rows: [{ row: { buttons: [{ text: expr('{{ $(\'Set - Préparer changement de réponse\').item.json.bouton_texte }}'), additionalFields: { callback_data: expr('{{ $(\'Set - Préparer changement de réponse\').item.json.bouton_cb }}') } }] } }] }, additionalFields: { parse_mode: 'HTML' } }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [2208, 240], webhookId: '2c4f4490-e296-4979-9e71-cb73f8b5ae07' }
});

const telegram_Confirmer_clic_RDV = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Confirmer clic RDV', parameters: { resource: 'callback', queryId: expr('{{ $(\'Set - Préparer changement de réponse\').item.json.query_id }}'), additionalFields: { text: expr('{{ $(\'Set - Préparer changement de réponse\').item.json.notif }}') } }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [2432, 240], webhookId: '0ab607d5-2753-4847-a9d0-78691f4fcc71' }
});

const hTTP_Lire_v_nement_ecole = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Lire événement ecole', parameters: { url: expr('https://www.googleapis.com/calendar/v3/calendars/{{ encodeURIComponent($json.calendar_id || \'primary\') }}/events/{{ encodeURIComponent($json.event_id) }}'), authentication: 'predefinedCredentialType', nodeCredentialType: 'googleCalendarOAuth2Api', options: {} }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar account 4', 'uUnjBjjf7gdn6z2z') }, position: [1552, 240] }
});

const hTTP_Modifier_ma_r_ponse_ecole = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Modifier ma réponse ecole', parameters: { method: 'PATCH', url: expr('https://www.googleapis.com/calendar/v3/calendars/{{ encodeURIComponent($(\'Set - Préparer changement de réponse\').item.json.calendar_id || \'primary\') }}/events/{{ encodeURIComponent($(\'Set - Préparer changement de réponse\').item.json.event_id) }}?sendUpdates=all'), authentication: 'predefinedCredentialType', nodeCredentialType: 'googleCalendarOAuth2Api', sendBody: true, specifyBody: 'json', jsonBody: expr('{{ JSON.stringify({ attendees: ($json.attendees || []).map(a => a.self ? Object.assign({}, a, { responseStatus: $(\'Set - Préparer changement de réponse\').item.json.nouveau_statut_google }) : a) }) }}'), options: {} }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar account 4', 'uUnjBjjf7gdn6z2z') }, position: [1760, 240], onError: 'continueErrorOutput' }
});

const hTTP_Lire_v_nement_pro = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Lire événement pro', parameters: { url: expr('https://www.googleapis.com/calendar/v3/calendars/{{ encodeURIComponent($json.calendar_id || \'primary\') }}/events/{{ encodeURIComponent($json.event_id) }}'), authentication: 'predefinedCredentialType', nodeCredentialType: 'googleCalendarOAuth2Api', options: {} }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar - Pro', '08yb13WRZ9NJlumx') }, position: [1552, 400] }
});

const hTTP_Modifier_ma_r_ponse_pro = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Modifier ma réponse pro', parameters: { method: 'PATCH', url: expr('https://www.googleapis.com/calendar/v3/calendars/{{ encodeURIComponent($(\'Set - Préparer changement de réponse\').item.json.calendar_id || \'primary\') }}/events/{{ encodeURIComponent($(\'Set - Préparer changement de réponse\').item.json.event_id) }}?sendUpdates=all'), authentication: 'predefinedCredentialType', nodeCredentialType: 'googleCalendarOAuth2Api', sendBody: true, specifyBody: 'json', jsonBody: expr('{{ JSON.stringify({ attendees: ($json.attendees || []).map(a => a.self ? Object.assign({}, a, { responseStatus: $(\'Set - Préparer changement de réponse\').item.json.nouveau_statut_google }) : a) }) }}'), options: {} }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar - Pro', '08yb13WRZ9NJlumx') }, position: [1760, 400], onError: 'continueErrorOutput' }
});

const set_Pr_parer_mail_pas_important = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: { name: 'Set - Préparer mail pas important', parameters: { assignments: { assignments: [{ id: 'texte_edit', name: 'texte_edit', value: expr('{{ \'Mail · <s>\' + String($json.libelle).replace(/&/g, \'&amp;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\') + \'</s> — pas important\' }}'), type: 'string' }, { id: 'notif', name: 'notif', value: 'Noté : ce type de mail sera écarté', type: 'string' }] }, includeOtherFields: true, options: {} }, position: [1104, 560] }
});

const data_Table_Ajouter_exemple_pas_important = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Ajouter exemple pas important', parameters: { dataTableId: { __rl: true, mode: 'id', value: 'vbaHh4Y3ki290cKr', cachedResultName: 'recap_feedback' }, columns: { mappingMode: 'defineBelow', value: { expediteur: expr('{{ $json.expediteur }}'), objet: expr('{{ $json.objet }}'), compte: expr('{{ $json.compte }}'), marque_le: expr('{{ $now.toISO() }}') }, schema: [{ id: 'expediteur', displayName: 'expediteur', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'objet', displayName: 'objet', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'compte', displayName: 'compte', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'marque_le', displayName: 'marque_le', required: false, defaultMatch: false, display: true, type: 'dateTime', canBeUsedToMatch: true }] }, options: {} }, position: [1328, 560] }
});

const data_Table_Retirer_mail_de_la_liste_d_attente = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Retirer mail de la liste d\u2019attente', parameters: { operation: 'deleteRows', dataTableId: { __rl: true, mode: 'id', value: 'wG2eoblGHs8H4TF5', cachedResultName: 'recap_mails_en_attente' }, filters: { conditions: [{ keyName: 'thread_id', keyValue: expr('{{ $(\'Set - Préparer mail pas important\').first().json.thread_id }}') }] }, options: {} }, position: [1552, 560], executeOnce: true, alwaysOutputData: true }
});

const data_Table_Marquer_bouton_trait = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Marquer bouton traité', parameters: { operation: 'update', dataTableId: { __rl: true, mode: 'id', value: 'bUBDcv21azWIACmO', cachedResultName: 'recap_boutons' }, matchType: 'allConditions', filters: { conditions: [{ keyName: 'bouton_id', keyValue: expr('{{ $(\'Set - Préparer mail pas important\').first().json.bouton_id }}') }] }, columns: { mappingMode: 'defineBelow', value: { statut: 'traite', traite_le: expr('{{ $now.toISO() }}') }, schema: [{ id: 'statut', displayName: 'statut', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'traite_le', displayName: 'traite_le', required: false, defaultMatch: false, display: true, type: 'dateTime', canBeUsedToMatch: true }] }, options: {} }, position: [1760, 560], executeOnce: true }
});

const telegram_Modifier_message_mail = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Modifier message mail', parameters: { operation: 'editMessageText', chatId: expr('{{ $(\'Set - Préparer mail pas important\').first().json.chat_id }}'), messageId: expr('{{ $(\'Set - Préparer mail pas important\').first().json.message_id }}'), text: expr('{{ $(\'Set - Préparer mail pas important\').first().json.texte_edit }}'), additionalFields: { parse_mode: 'HTML' } }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [1984, 560], webhookId: 'fe1c17a9-6d39-4c0c-b0d5-9bcf7be0945f', executeOnce: true }
});

const telegram_Confirmer_clic_mail = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Confirmer clic mail', parameters: { resource: 'callback', queryId: expr('{{ $(\'Set - Préparer mail pas important\').first().json.query_id }}'), additionalFields: { text: expr('{{ $(\'Set - Préparer mail pas important\').first().json.notif }}') } }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [2208, 560], webhookId: 'a1761301-d055-4922-892f-21345042d884', executeOnce: true }
});

const telegram_R_pondre_clic_refus = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Répondre clic refusé', parameters: { resource: 'callback', queryId: expr('{{ $json.query_id }}'), additionalFields: { text: expr('{{ !$json.trouve ? \'Bouton inconnu\' : ($json.passe ? \'Trop tard : ce RDV a déjà commencé\' : \'Déjà traité\') }}') } }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [1104, 768], webhookId: '4abca190-3bf7-48f7-9f47-8ac1135ba91b' }
});

const wf = workflow('JxAihhyllMPTxe5J', 'Récap quotidien · 2. Actions sur les boutons', { executionOrder: 'v1', availableInMCP: true, timezone: 'Europe/Paris', binaryMode: 'separate', errorWorkflow: '3hqi0xDTVt0CczkS' });

export default wf
  .add(telegram_Trigger_Clic_sur_bouton)
  .to(set_Lire_clic)
  .to(data_Table_Retrouver_bouton_cliqu)
  .to(set_Pr_parer_contexte_du_clic)
  .to(switch_Type_d_action.onCase(0, set_Pr_parer_changement_de_r_ponse
    .to(switch_Quel_compte.onCase(0, hTTP_Lire_v_nement_perso
      .to(hTTP_Modifier_ma_r_ponse_perso
      .onError(telegram_Signaler_chec_agenda))
      .to(data_Table_Mettre_jour_bouton_RDV)
      .to(telegram_Modifier_message_RDV)
      .to(telegram_Confirmer_clic_RDV)).onCase(1, hTTP_Lire_v_nement_ecole
      .to(hTTP_Modifier_ma_r_ponse_ecole
      .onError(telegram_Signaler_chec_agenda))
      .to(data_Table_Mettre_jour_bouton_RDV)).onCase(2, hTTP_Lire_v_nement_pro
      .to(hTTP_Modifier_ma_r_ponse_pro
      .onError(telegram_Signaler_chec_agenda))
      .to(data_Table_Mettre_jour_bouton_RDV)))).onCase(1, set_Pr_parer_changement_de_r_ponse).onCase(2, set_Pr_parer_mail_pas_important
    .to(data_Table_Ajouter_exemple_pas_important)
    .to(data_Table_Retirer_mail_de_la_liste_d_attente)
    .to(data_Table_Marquer_bouton_trait)
    .to(telegram_Modifier_message_mail)
    .to(telegram_Confirmer_clic_mail)).onCase(3, telegram_R_pondre_clic_refus))
  .add(sticky('## Actions sur les boutons\nConseil : dans « Telegram Trigger - Clic sur bouton », renseigne ton user ID Telegram dans « Restrict to User IDs » pour ignorer tout autre utilisateur.\nLes nœuds HTTP sont nécessaires : le nœud Google Agenda natif ne sait pas changer ta réponse à une invitation.', [], { name: 'Sticky Note 8a595c05', color: 4, position: [112, 304] }))
