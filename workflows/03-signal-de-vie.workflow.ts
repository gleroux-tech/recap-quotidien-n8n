const schedule_Chaque_matin_7h45 = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.4,
  config: { name: 'Schedule - Chaque matin 7h45', parameters: { rule: { interval: [{ triggerAtHour: 7, triggerAtMinute: 45 }] } }, position: [0, 208] }
});

const data_Table_Chercher_r_cap_du_jour = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Chercher récap du jour', parameters: { operation: 'get', dataTableId: { __rl: true, mode: 'id', value: 'KvUr1GrtbYLwf1Z7', cachedResultName: 'recap_runs' }, matchType: 'allConditions', filters: { conditions: [{ keyName: 'run_id', keyValue: expr('{{ $now.setZone(\'Europe/Paris\').toFormat(\'yyyyLLdd\') }}') }, { keyName: 'statut', keyValue: 'ok' }] }, limit: 1 }, position: [224, 208], alwaysOutputData: true }
});

const iF_R_cap_absent = node({
  type: 'n8n-nodes-base.if',
  version: 2.3,
  config: { name: 'IF - Récap absent ?', parameters: { conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 }, conditions: [{ leftValue: expr('{{ $json.run_id ?? \'\' }}'), rightValue: '', operator: { type: 'string', operation: 'empty', singleValue: true } }], combinator: 'and' }, options: {} }, position: [448, 208] }
});

const set_Alerte_r_cap_manquant = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: { name: 'Set - Alerte récap manquant', parameters: { assignments: { assignments: [{ id: 'sujet', name: 'sujet', value: 'Récap du matin non envoyé', type: 'string' }, { id: 'texte', name: 'texte', value: expr('Aucun récap envoyé ce matin ({{ $now.setZone(\'Europe/Paris\').toFormat(\'dd/LL\') }}). Vérifie les exécutions du workflow « Récap quotidien · 1. Récap matinal » dans n8n.'), type: 'string' }] }, options: {} }, position: [672, 208] }
});

const telegram_Envoyer_alerte = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Envoyer alerte', parameters: { chatId: '8810986469', text: expr('{{ $json.texte }}'), additionalFields: { appendAttribution: false, disable_web_page_preview: true } }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [880, 368], webhookId: '0fdebdcd-f393-46e9-824f-2ddad96e5974', onError: 'continueErrorOutput' }
});

const gmail_Envoyer_alerte_de_secours = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Envoyer alerte de secours', parameters: { sendTo: 'leroux.gaspard56500@gmail.com', subject: 'Alerte récap quotidien', emailType: 'text', message: expr('{{ $json.texte || \'Une alerte du récap quotidien n\u2019a pas pu partir sur Telegram. Vérifie les exécutions dans n8n.\' }}'), options: { appendAttribution: false } }, credentials: { gmailOAuth2: newCredential('Gmail - Perso', 'OpY8l4A1W34wFuED') }, position: [1104, 464], webhookId: 'cdf63bf0-732b-40e6-88bf-a1a8cfb01a3a' }
});

const error_Trigger_chec_d_un_workflow_r_cap = trigger({
  type: 'n8n-nodes-base.errorTrigger',
  version: 1,
  config: { name: 'Error Trigger - Échec d\u2019un workflow récap', position: [0, 528] }
});

const set_Alerte_chec = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: { name: 'Set - Alerte échec', parameters: { assignments: { assignments: [{ id: 'sujet', name: 'sujet', value: expr('Échec : {{ $json.workflow.name }}'), type: 'string' }, { id: 'texte', name: 'texte', value: expr('Le workflow « {{ $json.workflow.name }} » a échoué à l\u2019étape « {{ $json.execution.lastNodeExecuted }} » : {{ $json.execution.error.message }}\n{{ $json.execution.url }}'), type: 'string' }] }, options: {} }, position: [224, 528] }
});

const wf = workflow('3hqi0xDTVt0CczkS', 'Récap quotidien · 3. Signal de vie', { executionOrder: 'v1', availableInMCP: true, timezone: 'Europe/Paris', binaryMode: 'separate' });

export default wf
  .add(schedule_Chaque_matin_7h45)
  .to(data_Table_Chercher_r_cap_du_jour)
  .to(iF_R_cap_absent.onTrue(set_Alerte_r_cap_manquant
    .to(telegram_Envoyer_alerte
    .onError(gmail_Envoyer_alerte_de_secours))))
  .add(error_Trigger_chec_d_un_workflow_r_cap)
  .to(set_Alerte_chec)
  .to(telegram_Envoyer_alerte)
  .add(sticky('## Signal de vie\nÀ 7h45, alerte si aucun récap n\u2019est parti. Sert aussi de workflow d\u2019erreur pour les workflows 1 et 2. Si Telegram échoue, l\u2019alerte part par mail.', [], { name: 'Sticky Note 10d116af', color: 4, position: [112, 304] }))
