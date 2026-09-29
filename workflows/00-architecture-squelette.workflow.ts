const schedule_Chaque_matin_7h30 = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.4,
  config: { name: 'Schedule - Chaque matin 7h30', parameters: { rule: { interval: [{}] } } }
});

const data_Table_Lire_dernier_passage = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Lire dernier passage', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [224, 0] }
});

const data_Table_Lire_mails_en_attente = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Lire mails en attente', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [448, 0] }
});

const data_Table_Lire_exemples_pas_importants = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Lire exemples pas importants', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [672, 0] }
});

const google_Agenda_Lire_RDV_perso = node({
  type: 'n8n-nodes-base.googleCalendar',
  version: 1.3,
  config: { name: 'Google Agenda - Lire RDV perso', parameters: { calendar: { __rl: true, mode: 'list', value: '' }, additionalFields: {} }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar account', 'cGElikHXpYCzqttR') }, position: [880, 0] }
});

const google_Agenda_Lire_RDV_ecole = node({
  type: 'n8n-nodes-base.googleCalendar',
  version: 1.3,
  config: { name: 'Google Agenda - Lire RDV ecole', parameters: { calendar: { __rl: true, mode: 'list', value: '' }, additionalFields: {} }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar account', 'cGElikHXpYCzqttR') }, position: [1104, 0] }
});

const google_Agenda_Lire_RDV_pro = node({
  type: 'n8n-nodes-base.googleCalendar',
  version: 1.3,
  config: { name: 'Google Agenda - Lire RDV pro', parameters: { calendar: { __rl: true, mode: 'list', value: '' }, additionalFields: {} }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar account', 'cGElikHXpYCzqttR') }, position: [1328, 0] }
});

const gmail_Lire_re_us_perso = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire reçus perso', parameters: { options: {} }, credentials: { gmailOAuth2: newCredential('Gmail account', 'PUXNIh3q49kGvFKu') }, position: [1552, 0], webhookId: '68399bd8-3141-4567-b6c1-44cee4a2e5ff' }
});

const gmail_Lire_envoy_s_perso = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire envoyés perso', parameters: { options: {} }, credentials: { gmailOAuth2: newCredential('Gmail account', 'PUXNIh3q49kGvFKu') }, position: [1760, 0], webhookId: '0dec02ed-187c-4ba2-8f1e-79030322281b' }
});

const gmail_Lire_re_us_ecole = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire reçus ecole', parameters: { options: {} }, credentials: { gmailOAuth2: newCredential('Gmail account', 'PUXNIh3q49kGvFKu') }, position: [1984, 0], webhookId: '8b52e5bb-d857-4446-85dd-2de179ac8dcf' }
});

const gmail_Lire_envoy_s_ecole = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire envoyés ecole', parameters: { options: {} }, credentials: { gmailOAuth2: newCredential('Gmail account', 'PUXNIh3q49kGvFKu') }, position: [2208, 0], webhookId: 'e74334e8-6276-4917-a50c-e024333dea11' }
});

const gmail_Lire_re_us_pro = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire reçus pro', parameters: { options: {} }, credentials: { gmailOAuth2: newCredential('Gmail account', 'PUXNIh3q49kGvFKu') }, position: [2432, 0], webhookId: '450fa868-5ad6-4c55-8a58-2063a57afe20' }
});

const gmail_Lire_envoy_s_pro = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire envoyés pro', parameters: { options: {} }, credentials: { gmailOAuth2: newCredential('Gmail account', 'PUXNIh3q49kGvFKu') }, position: [2640, 0], webhookId: '23785b3a-2b66-4f4a-9656-72e438b1ba82' }
});

const code_Pr_parer_RDV_conflits_et_mails = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: { name: 'Code - Préparer RDV, conflits et mails', position: [2864, 0] }
});

const claude_Trier_mails_r_pondre = node({
  type: '@n8n/n8n-nodes-langchain.anthropic',
  version: 1,
  config: { name: 'Claude - Trier mails à répondre', parameters: { modelId: { __rl: true, mode: 'list', value: '' }, messages: { values: [{}] }, options: {} }, position: [3088, 0] }
});

const code_Construire_texte_du_r_cap = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: { name: 'Code - Construire texte du récap', position: [3312, 0] }
});

const telegram_Envoyer_r_cap = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Envoyer récap', parameters: { chatId: '@recap_gaspard_bot', additionalFields: {} }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [3520, 0], webhookId: '3c4c19fc-d844-4fd2-bb42-eda153fdf582' }
});

const data_Table_Enregistrer_passage = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Enregistrer passage', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [3744, 0] }
});

const data_Table_Vider_liste_d_attente = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Vider liste d\u2019attente', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [3968, -144] }
});

const set_Extraire_mails_en_attente = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: { name: 'Set - Extraire mails en attente', parameters: { options: {} }, position: [4192, -144] }
});

const split_Out_Un_mail_par_ligne = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1,
  config: { name: 'Split Out - Un mail par ligne', parameters: { options: {} }, position: [4400, -144] }
});

const data_Table_Enregistrer_mails_en_attente = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Enregistrer mails en attente', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [4624, -144] }
});

const set_Extraire_boutons = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: { name: 'Set - Extraire boutons', parameters: { options: {} }, position: [3968, 144] }
});

const split_Out_Un_bouton_par_message = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1,
  config: { name: 'Split Out - Un bouton par message', parameters: { options: {} }, position: [4192, 144] }
});

const telegram_Envoyer_message_bouton = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Envoyer message à bouton', parameters: { chatId: '@recap_gaspard_bot', additionalFields: {} }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [4400, 144], webhookId: '8804ad83-4d0a-494e-b59f-3ddcd774463d' }
});

const data_Table_Enregistrer_boutons = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Enregistrer boutons', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [4624, 144] }
});

const telegram_Trigger_Clic_sur_bouton = trigger({
  type: 'n8n-nodes-base.telegramTrigger',
  version: 1.5,
  config: { name: 'Telegram Trigger - Clic sur bouton', parameters: { updates: ['callback_query'], additionalFields: {} }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [0, 704], webhookId: 'de51e63f-40d3-4311-9282-80ee335637df' }
});

const set_Lire_clic = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: { name: 'Set - Lire clic', parameters: { options: {} }, position: [224, 704] }
});

const data_Table_Retrouver_bouton_cliqu = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Retrouver bouton cliqué', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [448, 704] }
});

const set_Pr_parer_contexte_du_clic = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: { name: 'Set - Préparer contexte du clic', parameters: { options: {} }, position: [672, 704] }
});

const switch_Type_d_action = node({
  type: 'n8n-nodes-base.switch',
  version: 3.4,
  config: { name: 'Switch - Type d\u2019action', parameters: { mode: 'expression', numberOutputs: 3 }, position: [880, 704] }
});

const set_Pr_parer_changement_de_r_ponse = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: { name: 'Set - Préparer changement de réponse', parameters: { options: {} }, position: [1104, 512] }
});

const switch_Quel_compte = node({
  type: 'n8n-nodes-base.switch',
  version: 3.4,
  config: { name: 'Switch - Quel compte', parameters: { mode: 'expression', numberOutputs: 3 }, position: [1328, 512] }
});

const hTTP_Lire_v_nement_perso = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Lire événement perso', parameters: { options: {} }, position: [1552, 352] }
});

const hTTP_Modifier_ma_r_ponse_perso = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Modifier ma réponse perso', parameters: { options: {} }, position: [1760, 352], onError: 'continueErrorOutput' }
});

const telegram_Signaler_chec_agenda = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Signaler échec agenda', parameters: { chatId: '@recap_gaspard_bot', additionalFields: {} }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [1984, 304], webhookId: '9c2cfca8-3d47-4ce4-b13e-46ef3764a23c' }
});

const data_Table_Mettre_jour_bouton_RDV = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Mettre à jour bouton RDV', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [1984, 512] }
});

const telegram_Modifier_message_RDV = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Modifier message RDV', parameters: { chatId: '@recap_gaspard_bot', additionalFields: {} }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [2208, 512], webhookId: 'ac8eb1d7-e982-4b09-8be5-f4f3ac72d9ec' }
});

const telegram_Confirmer_clic_RDV = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Confirmer clic RDV', parameters: { chatId: '@recap_gaspard_bot', additionalFields: {} }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [2432, 512], webhookId: 'a3a66ce8-d2d5-421d-840f-d63704501787' }
});

const hTTP_Lire_v_nement_ecole = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Lire événement ecole', parameters: { options: {} }, position: [1552, 512] }
});

const hTTP_Modifier_ma_r_ponse_ecole = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Modifier ma réponse ecole', parameters: { options: {} }, position: [1760, 512], onError: 'continueErrorOutput' }
});

const hTTP_Lire_v_nement_pro = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Lire événement pro', parameters: { options: {} }, position: [1552, 672] }
});

const hTTP_Modifier_ma_r_ponse_pro = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: { name: 'HTTP - Modifier ma réponse pro', parameters: { options: {} }, position: [1760, 672], onError: 'continueErrorOutput' }
});

const set_Pr_parer_mail_pas_important = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: { name: 'Set - Préparer mail pas important', parameters: { options: {} }, position: [1104, 864] }
});

const data_Table_Ajouter_exemple_pas_important = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Ajouter exemple pas important', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [1328, 864] }
});

const data_Table_Retirer_mail_de_la_liste_d_attente = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Retirer mail de la liste d\u2019attente', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [1552, 864] }
});

const data_Table_Marquer_bouton_trait = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Marquer bouton traité', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [1760, 864] }
});

const telegram_Modifier_message_mail = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Modifier message mail', parameters: { chatId: '@recap_gaspard_bot', additionalFields: {} }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [1984, 864], webhookId: 'f76fc1d2-fea3-4ed5-95ee-6e39aa4b4c08' }
});

const telegram_Confirmer_clic_mail = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Confirmer clic mail', parameters: { chatId: '@recap_gaspard_bot', additionalFields: {} }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [2208, 864], webhookId: '2e5b9136-eca2-4806-9d9e-22df072ae129' }
});

const telegram_R_pondre_clic_refus = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Répondre clic refusé', parameters: { chatId: '@recap_gaspard_bot', additionalFields: {} }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [1104, 1040], webhookId: '8b15d064-84d8-4d17-8a0f-7804d7b5b52c' }
});

const schedule_Chaque_matin_7h45 = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.4,
  config: { name: 'Schedule - Chaque matin 7h45', parameters: { rule: { interval: [{}] } }, position: [0, 1312] }
});

const data_Table_Chercher_r_cap_du_jour = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Chercher récap du jour', parameters: { dataTableId: { __rl: true, mode: 'list', value: '' }, options: {} }, position: [224, 1312] }
});

const iF_R_cap_absent = node({
  type: 'n8n-nodes-base.if',
  version: 2.3,
  config: { name: 'IF - Récap absent ?', parameters: { options: {} }, position: [448, 1312] }
});

const set_Alerte_r_cap_manquant = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: { name: 'Set - Alerte récap manquant', parameters: { options: {} }, position: [672, 1312] }
});

const telegram_Envoyer_alerte = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Envoyer alerte', parameters: { chatId: '@recap_gaspard_bot', additionalFields: {} }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [880, 1408], webhookId: '2ee23462-ebd5-4d8d-917f-10a816b510db', onError: 'continueErrorOutput' }
});

const gmail_Envoyer_alerte_de_secours = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Envoyer alerte de secours', parameters: { options: {} }, credentials: { gmailOAuth2: newCredential('Gmail account', 'PUXNIh3q49kGvFKu') }, position: [1104, 1504], webhookId: 'ce2c2050-5ed9-4777-8978-030857bbff53' }
});

const error_Trigger_chec_d_un_workflow_r_cap = trigger({
  type: 'n8n-nodes-base.errorTrigger',
  version: 1,
  config: { name: 'Error Trigger - Échec d\u2019un workflow récap', position: [0, 1504] }
});

const set_Alerte_chec = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: { name: 'Set - Alerte échec', parameters: { options: {} }, position: [672, 1504] }
});

const wf = workflow('SN63F1lKlUlH6eKj', 'Récap quotidien · Architecture (squelette)', { executionOrder: 'v1', availableInMCP: true, binaryMode: 'separate' });

export default wf
  .add(schedule_Chaque_matin_7h30)
  .to(data_Table_Lire_dernier_passage)
  .to(data_Table_Lire_mails_en_attente)
  .to(data_Table_Lire_exemples_pas_importants)
  .to(google_Agenda_Lire_RDV_perso)
  .to(google_Agenda_Lire_RDV_ecole)
  .to(google_Agenda_Lire_RDV_pro)
  .to(gmail_Lire_re_us_perso)
  .to(gmail_Lire_envoy_s_perso)
  .to(gmail_Lire_re_us_ecole)
  .to(gmail_Lire_envoy_s_ecole)
  .to(gmail_Lire_re_us_pro)
  .to(gmail_Lire_envoy_s_pro)
  .to(code_Pr_parer_RDV_conflits_et_mails)
  .to(claude_Trier_mails_r_pondre)
  .to(code_Construire_texte_du_r_cap)
  .to(telegram_Envoyer_r_cap)
  .to(data_Table_Enregistrer_passage
  .to([
    data_Table_Vider_liste_d_attente
    .to(set_Extraire_mails_en_attente)
    .to(split_Out_Un_mail_par_ligne)
    .to(data_Table_Enregistrer_mails_en_attente),
    set_Extraire_boutons
    .to(split_Out_Un_bouton_par_message)
    .to(telegram_Envoyer_message_bouton)
    .to(data_Table_Enregistrer_boutons)]))
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
      .to(data_Table_Mettre_jour_bouton_RDV)))).onCase(1, set_Pr_parer_mail_pas_important
    .to(data_Table_Ajouter_exemple_pas_important)
    .to(data_Table_Retirer_mail_de_la_liste_d_attente)
    .to(data_Table_Marquer_bouton_trait)
    .to(telegram_Modifier_message_mail)
    .to(telegram_Confirmer_clic_mail)).onCase(2, telegram_R_pondre_clic_refus))
  .add(schedule_Chaque_matin_7h45)
  .to(data_Table_Chercher_r_cap_du_jour)
  .to(iF_R_cap_absent.onTrue(set_Alerte_r_cap_manquant
    .to(telegram_Envoyer_alerte
    .onError(gmail_Envoyer_alerte_de_secours))))
  .add(error_Trigger_chec_d_un_workflow_r_cap)
  .to(set_Alerte_chec)
  .to(telegram_Envoyer_alerte)
  .add(sticky('## 1. Récap matinal', [], { name: 'Sticky Note 01dcb75c', color: 4, position: [112, 304] }))
  .add(sticky('## 2. Actions sur les boutons', [], { name: 'Sticky Note 2d1ba24a', color: 5, position: [112, 560] }))
  .add(sticky('## 3. Signal de vie', [], { name: 'Sticky Note 6b9b3871', color: 3, position: [112, 816] }))
