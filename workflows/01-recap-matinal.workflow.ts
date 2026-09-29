const schedule_Chaque_matin_7h30 = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.4,
  config: { name: 'Schedule - Chaque matin 7h30', parameters: { rule: { interval: [{ triggerAtHour: 7, triggerAtMinute: 30 }] } }, position: [0, 128] }
});

const data_Table_Lire_dernier_passage = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Lire dernier passage', parameters: { operation: 'get', dataTableId: { __rl: true, mode: 'id', value: 'KvUr1GrtbYLwf1Z7', cachedResultName: 'recap_runs' }, matchType: 'allConditions', filters: { conditions: [{ keyName: 'statut', keyValue: 'ok' }] }, limit: 1, orderBy: true }, position: [288, 256], executeOnce: true, alwaysOutputData: true }
});

const data_Table_Lire_mails_en_attente = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Lire mails en attente', parameters: { operation: 'get', dataTableId: { __rl: true, mode: 'id', value: 'wG2eoblGHs8H4TF5', cachedResultName: 'recap_mails_en_attente' }, returnAll: true }, position: [512, 256], executeOnce: true, alwaysOutputData: true }
});

const data_Table_Lire_exemples_pas_importants = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Lire exemples pas importants', parameters: { operation: 'get', dataTableId: { __rl: true, mode: 'id', value: 'vbaHh4Y3ki290cKr', cachedResultName: 'recap_feedback' }, limit: 20, orderBy: true }, position: [736, 256], executeOnce: true, alwaysOutputData: true }
});

const google_Agenda_Lire_RDV_perso = node({
  type: 'n8n-nodes-base.googleCalendar',
  version: 1.3,
  config: { name: 'Google Agenda - Lire RDV perso', parameters: { operation: 'getAll', calendar: { __rl: true, value: 'leroux.gaspard56500@gmail.com', mode: 'list', cachedResultName: 'leroux.gaspard56500@gmail.com' }, returnAll: true, timeMin: expr('{{ $today.toISO() }}'), timeMax: expr('{{ $today.plus({ days: 2 }).toISO() }}'), options: { orderBy: 'startTime' } }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar - Perso', 'vkE0fKuokYwH02VV') }, position: [816, 256], executeOnce: true, alwaysOutputData: true }
});

const google_Agenda_Lire_RDV_ecole = node({
  type: 'n8n-nodes-base.googleCalendar',
  version: 1.3,
  config: { name: 'Google Agenda - Lire RDV ecole', parameters: { operation: 'getAll', calendar: { __rl: true, value: 'gleroux@eugeniaschool.com', mode: 'list', cachedResultName: 'gleroux@eugeniaschool.com' }, returnAll: true, timeMin: expr('{{ $today.toISO() }}'), timeMax: expr('{{ $today.plus({ days: 2 }).toISO() }}'), options: { orderBy: 'startTime' } }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar - École', 'bEhR4XthgCh8OpjP') }, position: [1040, 256], executeOnce: true, alwaysOutputData: true }
});

const google_Agenda_Lire_RDV_pro = node({
  type: 'n8n-nodes-base.googleCalendar',
  version: 1.3,
  config: { name: 'Google Agenda - Lire RDV pro', parameters: { operation: 'getAll', calendar: { __rl: true, value: 'gaspard.l@morning.fr', mode: 'list', cachedResultName: 'gaspard.l@morning.fr', cachedResultUrl: '' }, returnAll: true, timeMin: expr('{{ $today.toISO() }}'), timeMax: expr('{{ $today.plus({ days: 2 }).toISO() }}'), options: { orderBy: 'startTime' } }, credentials: { googleCalendarOAuth2Api: newCredential('Google Calendar - Pro', '08yb13WRZ9NJlumx') }, position: [1264, 256], executeOnce: true, alwaysOutputData: true }
});

const gmail_Lire_re_us_perso = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire reçus perso', parameters: { operation: 'getAll', limit: 150, filters: { q: 'in:inbox newer_than:14d -category:promotions -category:social -from:me', readStatus: 'both' } }, credentials: { gmailOAuth2: newCredential('Gmail - Perso', 'OpY8l4A1W34wFuED') }, position: [1488, 256], webhookId: '5b66672c-d560-4460-8958-f5b5980281b4', executeOnce: true, alwaysOutputData: true }
});

const gmail_Lire_envoy_s_perso = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire envoyés perso', parameters: { operation: 'getAll', limit: 150, filters: { q: 'in:sent newer_than:14d', readStatus: 'both' } }, credentials: { gmailOAuth2: newCredential('Gmail - Perso', 'OpY8l4A1W34wFuED') }, position: [1712, 256], webhookId: '9fac011b-efc0-41eb-8c76-324aa37fbb8f', executeOnce: true, alwaysOutputData: true }
});

const gmail_Lire_re_us_ecole = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire reçus ecole', parameters: { operation: 'getAll', limit: 150, filters: { q: 'in:inbox newer_than:14d -category:promotions -category:social -from:me', readStatus: 'both' } }, credentials: { gmailOAuth2: newCredential('Gmail - École', '5jPra1nHcYLsnorK') }, position: [1936, 256], webhookId: '4cd284e3-3e3f-40f3-95df-2a65af1fbfe0', executeOnce: true, alwaysOutputData: true }
});

const gmail_Lire_envoy_s_ecole = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire envoyés ecole', parameters: { operation: 'getAll', limit: 150, filters: { q: 'in:sent newer_than:14d', readStatus: 'both' } }, credentials: { gmailOAuth2: newCredential('Gmail - École', '5jPra1nHcYLsnorK') }, position: [2160, 256], webhookId: '239dde94-54d0-4203-b116-f63bc07a87a4', executeOnce: true, alwaysOutputData: true }
});

const gmail_Lire_re_us_pro = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire reçus pro', parameters: { operation: 'getAll', limit: 150, filters: { q: 'in:inbox newer_than:14d -category:promotions -category:social -from:me', readStatus: 'both' } }, credentials: { gmailOAuth2: newCredential('Gmail - Pro', 'RILCvIIh8oSHCBLt') }, position: [2384, 256], webhookId: '65cfef08-655d-4dbd-bb9d-29396552e3be', executeOnce: true, alwaysOutputData: true }
});

const gmail_Lire_envoy_s_pro = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: { name: 'Gmail - Lire envoyés pro', parameters: { operation: 'getAll', limit: 150, filters: { q: 'in:sent newer_than:14d', readStatus: 'both' } }, credentials: { gmailOAuth2: newCredential('Gmail - Pro', 'RILCvIIh8oSHCBLt') }, position: [2608, 256], webhookId: '3e581815-9f76-4136-87db-4b06569150a0', executeOnce: true, alwaysOutputData: true }
});

const code_Pr_parer_RDV_conflits_et_mails = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: { name: 'Code - Préparer RDV, conflits et mails', parameters: { jsCode: 'const tz = \'Europe/Paris\';\nconst now = DateTime.now().setZone(tz);\nconst today = now.toISODate();\nconst tomorrow = now.plus({ days: 1 }).toISODate();\n\nfunction rows(name) {\n  try {\n    return $(name).all().map(function (i) { return i.json; }).filter(function (j) { return j && Object.keys(j).length > 0; });\n  } catch (e) {\n    return [];\n  }\n}\n\nconst comptes = [\n  { compte: \'perso\', cal: \'Google Agenda - Lire RDV perso\', inbox: \'Gmail - Lire reçus perso\', sent: \'Gmail - Lire envoyés perso\' },\n  { compte: \'ecole\', cal: \'Google Agenda - Lire RDV ecole\', inbox: \'Gmail - Lire reçus ecole\', sent: \'Gmail - Lire envoyés ecole\' },\n  { compte: \'pro\', cal: \'Google Agenda - Lire RDV pro\', inbox: \'Gmail - Lire reçus pro\', sent: \'Gmail - Lire envoyés pro\' }\n];\n\nconst runs = rows(\'Data Table - Lire dernier passage\').filter(function (r) { return r.lance_le; });\nconst lastTs = runs.length ? new Date(runs[0].lance_le).getTime() : now.minus({ days: 1 }).toMillis();\n\nconst seen = {};\nconst rdvJour = [];\nconst rdvDemain = [];\ncomptes.forEach(function (c) {\n  rows(c.cal).forEach(function (ev) {\n    if (!ev.id || ev.status === \'cancelled\' || !ev.start) return;\n    const key = ev.iCalUID || ev.id;\n    if (seen[key]) return;\n    seen[key] = true;\n    const attendees = ev.attendees || [];\n    const me = attendees.find(function (a) { return a.self; });\n    if (me && me.responseStatus === \'declined\') return;\n    const allDay = !ev.start.dateTime;\n    const start = allDay ? DateTime.fromISO(ev.start.date, { zone: tz }) : DateTime.fromISO(ev.start.dateTime).setZone(tz);\n    const end = allDay ? DateTime.fromISO(ev.end.date, { zone: tz }) : DateTime.fromISO(ev.end.dateTime).setZone(tz);\n    const organisateurMoi = !!(ev.organizer && ev.organizer.self);\n    const autres = attendees.filter(function (a) { return !a.self && !a.resource; }).map(function (a) { return a.displayName || a.email; });\n    const lieu = ev.location ? ev.location : (ev.hangoutLink ? \'Google Meet\' : \'\');\n    const rdv = {\n      event_id: ev.id,\n      compte: c.compte,\n      titre: ev.summary || \'(sans titre)\',\n      journee: allDay,\n      debut: allDay ? \'\' : start.toFormat(\'HH:mm\'),\n      fin: allDay ? \'\' : end.toFormat(\'HH:mm\'),\n      debut_iso: start.toISO(),\n      fin_iso: end.toISO(),\n      lieu: lieu,\n      avec: autres.slice(0, 3).join(\', \'),\n      organisateur_moi: organisateurMoi,\n      mon_statut: me ? me.responseStatus : \'accepted\',\n      declinable: !!me && !organisateurMoi\n    };\n    const sd = start.toISODate();\n    const ed = end.toISODate();\n    const coversToday = allDay ? (sd <= today && ed > today) : sd === today;\n    const coversTomorrow = allDay ? (sd <= tomorrow && ed > tomorrow) : sd === tomorrow;\n    if (coversToday) rdvJour.push(rdv);\n    else if (coversTomorrow) rdvDemain.push(rdv);\n  });\n});\n\nrdvJour.sort(function (a, b) {\n  if (a.journee !== b.journee) return a.journee ? -1 : 1;\n  return a.debut_iso < b.debut_iso ? -1 : (a.debut_iso > b.debut_iso ? 1 : 0);\n});\n\nconst conflits = [];\nconst timed = rdvJour.filter(function (r) { return !r.journee; });\nfor (let i = 0; i < timed.length; i++) {\n  for (let j = i + 1; j < timed.length; j++) {\n    const a = timed[i];\n    const b = timed[j];\n    if (a.debut_iso < b.fin_iso && b.debut_iso < a.fin_iso) conflits.push({ a: a, b: b });\n  }\n}\n\nconst demainTimed = rdvDemain.filter(function (r) { return !r.journee; }).sort(function (a, b) { return a.debut_iso < b.debut_iso ? -1 : 1; });\nconst demain = { nb: rdvDemain.length, premier: demainTimed.length ? demainTimed[0].debut : \'\' };\n\nfunction senderEmail(from) {\n  const s = String(from || \'\');\n  const m = s.match(/<([^>]+)>/);\n  return (m ? m[1] : s).trim().toLowerCase();\n}\nfunction senderName(from) {\n  const s = String(from || \'\');\n  const i = s.indexOf(\'<\');\n  const n = (i > 0 ? s.slice(0, i) : s).replace(/"/g, \'\').trim();\n  return n || senderEmail(s);\n}\n\nconst pendingByThread = {};\nrows(\'Data Table - Lire mails en attente\').forEach(function (p) { if (p.thread_id) pendingByThread[p.thread_id] = p; });\n\nconst nouveaux = [];\nconst gardes = [];\ncomptes.forEach(function (c) {\n  const received = {};\n  const sentMax = {};\n  rows(c.sent).forEach(function (m) {\n    if (!m.threadId) return;\n    const t = Number(m.internalDate || 0);\n    if (!sentMax[m.threadId] || t > sentMax[m.threadId]) sentMax[m.threadId] = t;\n  });\n  rows(c.inbox).forEach(function (m) {\n    if (!m.threadId) return;\n    const t = Number(m.internalDate || 0);\n    if (!received[m.threadId] || t > received[m.threadId].t) received[m.threadId] = { t: t, m: m };\n  });\n  Object.keys(received).forEach(function (tid) {\n    const r = received[tid];\n    if ((sentMax[tid] || 0) > r.t) return;\n    const p = pendingByThread[tid];\n    if (p) {\n      const recu = DateTime.fromJSDate(new Date(p.recu_le)).setZone(tz);\n      gardes.push(Object.assign({}, p, { attente_jours: Math.max(0, Math.floor(now.startOf(\'day\').diff(recu.startOf(\'day\'), \'days\').days)) }));\n      return;\n    }\n    if (r.t > lastTs) {\n      nouveaux.push({\n        id: tid,\n        compte: c.compte,\n        de: senderName(r.m.From),\n        email: senderEmail(r.m.From),\n        objet: r.m.Subject || \'(sans objet)\',\n        extrait: String(r.m.snippet || \'\').slice(0, 500),\n        recu_le: new Date(r.t).toISOString()\n      });\n    }\n  });\n});\n\nconst feedback = rows(\'Data Table - Lire exemples pas importants\').slice(0, 20).map(function (f) { return \'- \' + f.expediteur + \' | \' + f.objet + \' | \' + f.compte; }).join(\'\\n\');\nconst payload = { mails: nouveaux.map(function (m) { return { id: m.id, compte: m.compte, de: m.de + \' <\' + m.email + \'>\', objet: m.objet, extrait: m.extrait }; }) };\n\nreturn [{ json: { today: today, rdvJour: rdvJour, conflits: conflits, demain: demain, nouveaux: nouveaux, gardes: gardes, feedback: feedback || \'(aucun)\', payload: JSON.stringify(payload) } }];' }, position: [1344, 256], executeOnce: true }
});

const claude_Trier_mails_r_pondre = node({
  type: '@n8n/n8n-nodes-langchain.anthropic',
  version: 1,
  config: { name: 'Claude - Trier mails à répondre', parameters: { modelId: { __rl: true, mode: 'list', value: 'claude-haiku-4-5-20251001', cachedResultName: 'claude-haiku-4-5-20251001' }, messages: { values: [{ content: expr('Nouveaux mails à trier (JSON) :\n{{ $json.payload }}\n\nMails marqués « pas importants » par Gaspard (expéditeur | objet | compte) :\n{{ $json.feedback }}') }] }, options: { includeMergedResponse: true, system: 'Tu tries les nouveaux mails de Gaspard, reçus sur 3 comptes : perso, ecole, pro.\n\nGarde uniquement ceux qui attendent une réponse ou une action de Gaspard, écrits par une vraie personne. Écarte les newsletters, publicités, reçus, confirmations, mails où il est seulement en copie sans question qui le concerne, et toutes les notifications automatiques d\'outils (Asana, Notion, Slack, Google Drive, Calendly, LinkedIn, GitHub…), même quand elles mentionnent un collègue, sauf si le texte contient une demande explicite adressée à Gaspard avec une échéance.\nÉcarte aussi les mails du même type ou du même expéditeur que les exemples que Gaspard a marqués « pas importants ».\n\nPour chaque mail gardé, donne ce qui est attendu en une phrase de 15 mots maximum, et une priorité : haute (échéance proche, personne qui attend, enjeu important) ou normale.\n\nRéponds uniquement avec un objet JSON, sans texte autour ni balises de code, de la forme :\n{"mails":[{"id":"<id reçu>","attendu":"<phrase>","priorite":"haute|normale"}]}\nSi aucun mail n\'est à garder, réponds {"mails":[]}. Utilise exactement les id reçus. N\'invente aucune information absente des données.', maxTokens: 2000, temperature: 0 } }, position: [1568, 256] }
});

const code_Construire_texte_du_r_cap = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: { name: 'Code - Construire texte du récap', parameters: { jsCode: 'const tz = \'Europe/Paris\';\nconst now = DateTime.now().setZone(tz);\nconst prep = $(\'Code - Préparer RDV, conflits et mails\').first().json;\nconst raw = $input.first().json || {};\n\nlet txt = \'\';\nif (typeof raw.merged_response === \'string\') txt = raw.merged_response;\nelse if (Array.isArray(raw.content)) txt = raw.content.filter(function (c) { return c.type === \'text\'; }).map(function (c) { return c.text; }).join(\'\\n\');\nelse if (typeof raw.text === \'string\') txt = raw.text;\nelse if (typeof raw.output === \'string\') txt = raw.output;\n\nlet tri = null;\ntry {\n  const s = txt.indexOf(\'{\');\n  const e = txt.lastIndexOf(\'}\');\n  const parsed = JSON.parse(txt.slice(s, e + 1));\n  tri = Array.isArray(parsed.mails) ? parsed.mails : null;\n} catch (err) {\n  tri = null;\n}\n\nconst byId = {};\nprep.nouveaux.forEach(function (m) { byId[m.id] = m; });\n\nlet nouveauxGardes;\nif (tri === null) {\n  nouveauxGardes = prep.nouveaux.map(function (m) { return Object.assign({}, m, { attendu: \'\', priorite: \'normale\', nouveau: true, attente_jours: 0 }); });\n} else {\n  nouveauxGardes = tri.filter(function (t) { return t && byId[t.id]; }).map(function (t) {\n    return Object.assign({}, byId[t.id], { attendu: t.attendu || \'\', priorite: t.priorite === \'haute\' ? \'haute\' : \'normale\', nouveau: true, attente_jours: 0 });\n  });\n}\nconst anciens = prep.gardes.map(function (p) {\n  return { id: p.thread_id, compte: p.compte, de: p.de, email: p.email || \'\', objet: p.objet, attendu: p.attendu || \'\', priorite: p.priorite || \'normale\', recu_le: p.recu_le, attente_jours: p.attente_jours, nouveau: false };\n});\nconst mails = nouveauxGardes.concat(anciens).sort(function (a, b) {\n  if (a.priorite !== b.priorite) return a.priorite === \'haute\' ? -1 : 1;\n  return b.attente_jours - a.attente_jours;\n});\n\nfunction esc(s) { return String(s || \'\').replace(/&/g, \'&amp;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\'); }\nfunction ligneRdv(r) {\n  const h = r.journee ? \'Journée\' : (r.debut + \'–\' + r.fin);\n  let s = h + \' \' + esc(r.titre);\n  if (r.avec) s += \' avec \' + esc(r.avec);\n  if (r.lieu) s += \', \' + esc(r.lieu);\n  s += \' (\' + r.compte + (r.organisateur_moi ? \', tu organises\' : \'\') + \')\';\n  return s;\n}\n\nconst L = [];\nL.push(\'<b>Récap du \' + now.setLocale(\'fr\').toFormat(\'cccc d LLLL\') + \'</b>\');\nif (prep.conflits.length) {\n  L.push(\'\');\n  L.push(\'<b>Conflit</b>\');\n  prep.conflits.forEach(function (k) {\n    L.push(\'· \' + k.a.debut + \' \' + esc(k.a.titre) + \' (\' + k.a.compte + \') chevauche \' + k.b.debut + \' \' + esc(k.b.titre) + \' (\' + k.b.compte + \')\');\n  });\n}\nL.push(\'\');\nL.push(\'<b>Rendez-vous</b>\');\nif (!prep.rdvJour.length) L.push(\'· Rien de prévu\');\nprep.rdvJour.forEach(function (r) { L.push(\'· \' + ligneRdv(r)); });\nL.push(\'\');\nL.push(\'<b>Mails en attente</b>\');\nif (!mails.length) L.push(\'· Aucun mail en attente\');\nmails.forEach(function (m) {\n  const tags = [];\n  if (m.priorite === \'haute\') tags.push(\'[haute]\');\n  tags.push(m.nouveau ? \'[nouveau]\' : \'[\' + m.attente_jours + \' j]\');\n  L.push(\'· \' + tags.join(\' \') + \' \' + esc(m.de) + \' (\' + m.compte + \') — \' + esc(m.objet) + (m.attendu ? \' : \' + esc(m.attendu) : \'\'));\n});\nL.push(\'\');\nL.push(prep.demain.nb ? \'Demain : \' + prep.demain.nb + \' RDV\' + (prep.demain.premier ? \', premier à \' + prep.demain.premier : \'\') : \'Demain : rien de prévu\');\nif (tri === null && prep.nouveaux.length) {\n  L.push(\'\');\n  L.push(\'<i>Tri indisponible ce matin : nouveaux mails listés sans résumé.</i>\');\n}\nlet texte = L.join(\'\\n\');\nif (texte.length > 4000) texte = texte.slice(0, 3990) + \'\\n…\';\n\nconst runId = now.toFormat(\'yyyyLLdd\');\nconst nowIso = now.toISO();\nconst finJour = now.endOf(\'day\').toISO();\nconst boutons = [];\nlet n = 0;\nprep.rdvJour.filter(function (r) { return r.declinable && !r.journee && r.debut_iso > nowIso; }).forEach(function (r) {\n  n = n + 1;\n  const id = runId + \'-R\' + n;\n  const libelle = r.debut + \' \' + r.titre + \' (\' + r.compte + \')\';\n  boutons.push({\n    bouton_id: id, run_id: runId, action: \'decliner\', compte: r.compte, calendar_id: \'primary\', event_id: r.event_id, thread_id: \'\',\n    debut_rdv: r.debut_iso, libelle: libelle, statut_avant: r.mon_statut, statut: \'en_attente\', expediteur: \'\', objet: \'\',\n    texte_message: \'RDV · \' + esc(libelle), bouton_texte: \'Décliner\', callback: id + \'|D\'\n  });\n});\nmails.forEach(function (m) {\n  n = n + 1;\n  const id = runId + \'-M\' + n;\n  const libelle = m.de + \' — \' + m.objet + \' (\' + m.compte + \')\';\n  boutons.push({\n    bouton_id: id, run_id: runId, action: \'pas_important\', compte: m.compte, calendar_id: \'\', event_id: \'\', thread_id: m.id,\n    debut_rdv: finJour, libelle: libelle, statut_avant: \'\', statut: \'en_attente\', expediteur: m.email || m.de, objet: m.objet,\n    texte_message: \'Mail · \' + esc(libelle), bouton_texte: \'Pas important\', callback: id + \'|I\'\n  });\n});\n\nconst attente = mails.map(function (m) {\n  return { thread_id: m.id, compte: m.compte, de: m.de, email: m.email || \'\', objet: m.objet, attendu: m.attendu, priorite: m.priorite, recu_le: m.recu_le };\n});\n\nreturn [{ json: {\n  texte: texte,\n  boutons: boutons,\n  attente: attente,\n  run: { run_id: runId, lance_le: nowIso, nb_rdv: prep.rdvJour.length, nb_mails: mails.length, elements: JSON.stringify({ rdv: prep.rdvJour, mails: mails, conflits: prep.conflits, demain: prep.demain }), statut: \'ok\' }\n} }];' }, position: [1920, 256] }
});

const claude_R_diger_r_cap_personnalis = node({
  type: '@n8n/n8n-nodes-langchain.anthropic',
  version: 1,
  config: { name: 'Claude - Rédiger récap personnalisé', parameters: { resource: 'text', operation: 'message', modelId: { __rl: true, mode: 'list', value: 'claude-haiku-4-5-20251001', cachedResultName: 'claude-haiku-4-5-20251001' }, messages: { values: [{ content: expr('Date : {{ $now.setZone(\'Europe/Paris\').setLocale(\'fr\').toFormat(\'cccc d LLLL, HH:mm\') }}\n\nDonnées du jour (JSON) :\n{{ (() => { const d = JSON.parse($json.run.elements || \'{}\'); const solo = r => r && r.organisateur_moi && !r.avec; d.conflits = (d.conflits || []).filter(c => !(solo(c.a) && solo(c.b))); return JSON.stringify(d); })() }}') }] }, simplify: true, options: { system: 'Tu es l\'assistant personnel de Gaspard. Chaque matin, tu lui écris sur Telegram le point sur sa journée, comme un bon assistant qui le connaît bien : chaleureux, direct, utile. Tu le tutoies.\n\nContexte : trois comptes. « pro » = son alternance chez Morning (Built Ops), « ecole » = son MSc à Eugenia School, « perso » = sa vie perso.\n\nTu reçois en JSON : rdv (RDV du jour), conflits (chevauchements détectés automatiquement, bruts), mails (mails qui attendent une réponse, avec ce qui est attendu, la priorité et l\'ancienneté en jours), demain (nombre de RDV et heure du premier).\n\nComment écrire :\n- Commence par « Salut Gaspard » et une phrase qui donne le ton de la journée (chargée, calme, grosse après-midi…).\n- Puis « L\'essentiel » : 1 à 3 points qui comptent vraiment (un RDV avec d\'autres personnes, une invitation à laquelle il n\'a pas encore répondu, un mail urgent ou qui traîne depuis plusieurs jours).\n- Puis l\'agenda, en liste courte et chronologique : heure, titre raccourci, avec qui (prénoms seulement, jamais d\'adresse mail ; si seul un nom d\'adresse est connu, écris « 3 participants » plutôt que de deviner), lieu si utile.\n- Un RDV où organisateur_moi est vrai et avec est vide est un bloc de travail ou une activité perso que Gaspard a posé lui-même, pas une réunion. Un chevauchement qui implique un tel bloc n\'est PAS un conflit : ne le mentionne pas comme tel.\n- Ne signale un conflit que s\'il oppose deux engagements réels (au moins un avec d\'autres personnes ou une activité à heure fixe comme le sport qui tombe pendant un cours), et propose une solution concrète (décaler, écourter, choisir).\n- Mails : qui attend quoi, depuis quand. Si aucun mail n\'attend, dis-le en une phrase.\n- Termine par une ligne sur demain et, si c\'est pertinent, un conseil concret pour bien démarrer.\n\nContraintes : 15 lignes maximum. Texte brut uniquement, sans HTML, sans markdown, sans astérisques. Au plus un emoji par section. N\'invente rien qui ne soit pas dans les données. Ne parle pas des boutons ni du fonctionnement technique.', maxTokens: 2000, temperature: 0.4, includeMergedResponse: true } }, position: [1760, 256], retryOnFail: true, maxTries: 2, waitBetweenTries: 3000, onError: 'continueRegularOutput' }
});

const telegram_Envoyer_r_cap = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Envoyer récap', parameters: { chatId: '8810986469', text: expr('{{ String($json.merged_response || \'\').trim() ? String($json.merged_response).trim().replace(/^```[a-z]*\\n?|```$/g, \'\').replace(/&/g, \'&amp;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\').slice(0, 4000) : $(\'Code - Construire texte du récap\').first().json.texte }}'), additionalFields: { appendAttribution: false, disable_web_page_preview: true, parse_mode: 'HTML' } }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [1872, 256], webhookId: 'b4d8ce17-1f8b-4ace-84bb-205ff2093ac2' }
});

const data_Table_Enregistrer_passage = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Enregistrer passage', parameters: { dataTableId: { __rl: true, mode: 'id', value: 'KvUr1GrtbYLwf1Z7', cachedResultName: 'recap_runs' }, columns: { mappingMode: 'defineBelow', value: { run_id: expr('{{ $(\'Code - Construire texte du récap\').first().json.run.run_id }}'), lance_le: expr('{{ $(\'Code - Construire texte du récap\').first().json.run.lance_le }}'), message_id: expr('{{ $json.result.message_id }}'), nb_rdv: expr('{{ $(\'Code - Construire texte du récap\').first().json.run.nb_rdv }}'), nb_mails: expr('{{ $(\'Code - Construire texte du récap\').first().json.run.nb_mails }}'), elements: expr('{{ $(\'Code - Construire texte du récap\').first().json.run.elements }}'), statut: 'ok' }, schema: [{ id: 'run_id', displayName: 'run_id', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'lance_le', displayName: 'lance_le', required: false, defaultMatch: false, display: true, type: 'dateTime', canBeUsedToMatch: true }, { id: 'message_id', displayName: 'message_id', required: false, defaultMatch: false, display: true, type: 'number', canBeUsedToMatch: true }, { id: 'nb_rdv', displayName: 'nb_rdv', required: false, defaultMatch: false, display: true, type: 'number', canBeUsedToMatch: true }, { id: 'nb_mails', displayName: 'nb_mails', required: false, defaultMatch: false, display: true, type: 'number', canBeUsedToMatch: true }, { id: 'elements', displayName: 'elements', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'statut', displayName: 'statut', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }] }, options: {} }, position: [2096, 256] }
});

const data_Table_Vider_liste_d_attente = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Vider liste d\u2019attente', parameters: { operation: 'deleteRows', dataTableId: { __rl: true, mode: 'id', value: 'wG2eoblGHs8H4TF5', cachedResultName: 'recap_mails_en_attente' }, filters: { conditions: [{ keyName: 'thread_id', condition: 'isNotEmpty' }] }, options: {} }, position: [2400, 160], executeOnce: true, alwaysOutputData: true }
});

const set_Extraire_mails_en_attente = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: { name: 'Set - Extraire mails en attente', parameters: { assignments: { assignments: [{ id: 'attente', name: 'attente', value: expr('{{ $(\'Code - Construire texte du récap\').first().json.attente }}'), type: 'array' }] }, options: {} }, position: [2624, 160] }
});

const split_Out_Un_mail_par_ligne = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1,
  config: { name: 'Split Out - Un mail par ligne', parameters: { fieldToSplitOut: 'attente', options: {} }, position: [2752, 160] }
});

const data_Table_Enregistrer_mails_en_attente = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Enregistrer mails en attente', parameters: { dataTableId: { __rl: true, mode: 'id', value: 'wG2eoblGHs8H4TF5', cachedResultName: 'recap_mails_en_attente' }, columns: { mappingMode: 'defineBelow', value: { thread_id: expr('{{ $json.thread_id }}'), compte: expr('{{ $json.compte }}'), de: expr('{{ $json.de }}'), email: expr('{{ $json.email }}'), objet: expr('{{ $json.objet }}'), attendu: expr('{{ $json.attendu }}'), priorite: expr('{{ $json.priorite }}'), recu_le: expr('{{ $json.recu_le }}') }, schema: [{ id: 'thread_id', displayName: 'thread_id', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'compte', displayName: 'compte', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'de', displayName: 'de', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'email', displayName: 'email', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'objet', displayName: 'objet', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'attendu', displayName: 'attendu', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'priorite', displayName: 'priorite', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'recu_le', displayName: 'recu_le', required: false, defaultMatch: false, display: true, type: 'dateTime', canBeUsedToMatch: true }] }, options: { optimizeBulk: true } }, position: [2848, 160] }
});

const set_Extraire_boutons = node({
  type: 'n8n-nodes-base.set',
  version: 3.4,
  config: { name: 'Set - Extraire boutons', parameters: { assignments: { assignments: [{ id: 'boutons', name: 'boutons', value: expr('{{ $(\'Code - Construire texte du récap\').first().json.boutons }}'), type: 'array' }] }, options: {} }, position: [2400, 352] }
});

const split_Out_Un_bouton_par_message = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1,
  config: { name: 'Split Out - Un bouton par message', parameters: { fieldToSplitOut: 'boutons', options: {} }, position: [2512, 352] }
});

const telegram_Envoyer_message_bouton = node({
  type: 'n8n-nodes-base.telegram',
  version: 1.2,
  config: { name: 'Telegram - Envoyer message à bouton', parameters: { chatId: '8810986469', text: expr('{{ $json.texte_message }}'), replyMarkup: 'inlineKeyboard', inlineKeyboard: { rows: [{ row: { buttons: [{ text: expr('{{ $json.bouton_texte }}'), additionalFields: { callback_data: expr('{{ $json.callback }}') } }] } }] }, additionalFields: { appendAttribution: false, disable_notification: true, parse_mode: 'HTML' } }, credentials: { telegramApi: newCredential('Telegram account', '4s7dJVypuGIruu4e') }, position: [2624, 352], webhookId: 'b0a849ce-cba5-4a00-b469-8c4a27405aeb' }
});

const data_Table_Enregistrer_boutons = node({
  type: 'n8n-nodes-base.dataTable',
  version: 1.1,
  config: { name: 'Data Table - Enregistrer boutons', parameters: { dataTableId: { __rl: true, mode: 'id', value: 'bUBDcv21azWIACmO', cachedResultName: 'recap_boutons' }, columns: { mappingMode: 'defineBelow', value: { bouton_id: expr('{{ $(\'Split Out - Un bouton par message\').item.json.bouton_id }}'), run_id: expr('{{ $(\'Split Out - Un bouton par message\').item.json.run_id }}'), action: expr('{{ $(\'Split Out - Un bouton par message\').item.json.action }}'), compte: expr('{{ $(\'Split Out - Un bouton par message\').item.json.compte }}'), calendar_id: expr('{{ $(\'Split Out - Un bouton par message\').item.json.calendar_id }}'), event_id: expr('{{ $(\'Split Out - Un bouton par message\').item.json.event_id }}'), thread_id: expr('{{ $(\'Split Out - Un bouton par message\').item.json.thread_id }}'), debut_rdv: expr('{{ $(\'Split Out - Un bouton par message\').item.json.debut_rdv }}'), libelle: expr('{{ $(\'Split Out - Un bouton par message\').item.json.libelle }}'), statut_avant: expr('{{ $(\'Split Out - Un bouton par message\').item.json.statut_avant }}'), statut: 'en_attente', expediteur: expr('{{ $(\'Split Out - Un bouton par message\').item.json.expediteur }}'), objet: expr('{{ $(\'Split Out - Un bouton par message\').item.json.objet }}') }, schema: [{ id: 'bouton_id', displayName: 'bouton_id', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'run_id', displayName: 'run_id', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'action', displayName: 'action', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'compte', displayName: 'compte', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'calendar_id', displayName: 'calendar_id', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'event_id', displayName: 'event_id', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'thread_id', displayName: 'thread_id', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'debut_rdv', displayName: 'debut_rdv', required: false, defaultMatch: false, display: true, type: 'dateTime', canBeUsedToMatch: true }, { id: 'libelle', displayName: 'libelle', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'statut_avant', displayName: 'statut_avant', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'statut', displayName: 'statut', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'expediteur', displayName: 'expediteur', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }, { id: 'objet', displayName: 'objet', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true }] }, options: {} }, position: [2848, 352] }
});

const wf = workflow('3l3obvVRhCKt8E3S', 'Récap quotidien · 1. Récap matinal', { executionOrder: 'v1', availableInMCP: true, timezone: 'Europe/Paris', binaryMode: 'separate', errorWorkflow: '3hqi0xDTVt0CczkS' });

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
  .to(claude_R_diger_r_cap_personnalis)
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
  .add(sticky('## Récap matinal\nAvant d\u2019activer : connecte les credentials (3 Gmail, 3 Google Agenda, Anthropic, Telegram) et renseigne ton chat_id Telegram dans les deux nœuds Telegram.', [], { name: 'Sticky Note d34968e6', color: 4, position: [-112, 0] }))
  .add(sticky('## Spec — Récap quotidien\n**Objectif** : chaque matin à 7h30, un récap Telegram des RDV du jour et des mails qui attendent une réponse (perso, ecole, pro), avec un bouton pour décliner un RDV.\n\n### Objectifs\n- O1 Aucun RDV du jour raté\n- O2 Aucun mail important raté (jeu de test 3 jours)\n- O3 Pas de newsletters ni notifications\n- O4 Décliner / annuler depuis Telegram, organisateur prévenu\n- O5 Récap chaque jour, alerte à 7h45 sinon\n- O6 Conflits entre agendas en tête du récap\n\n### Affirmations (critères d\'acceptation)\n- A1 Récap à 7h30 tous les jours\n- A2 Chaque RDV du jour une seule fois ; A3 RDV déclinés absents\n- A4 Chevauchements en section « Conflit » ; A5 aperçu de demain\n- A6 Nouveau mail = [nouveau] + attendu ; A7 newsletters absentes\n- A8 Mail sans réponse = [1 j], [2 j]… ; A9 disparaît une fois répondu\n- A10 [haute] en premier ; A11 récap même vide ; A12 récap sans Claude si échec\n- A13–A14 Un message à bouton par RDV déclinable et par mail\n- A15–A17 Décliner / annuler change ma seule réponse et prévient l\'organisateur\n- A18 « Pas important » écarte l\'expéditeur dès le lendemain\n- A19 Double clic = « Déjà traité » ; A20 après le début = « Trop tard »\n- A21 Échec agenda = alerte ; A22 notification à chaque clic\n- A23–A25 Signal de vie, alerte d\'échec, repli par mail\n- A26 Aucun secret en clair ; A27 seuls les boutons modifient l\'agenda\n\nSpec complète : spec-recap-quotidien.md', [], { name: 'Spec - Objectifs et affirmations', color: 6, width: 900, height: 700, position: [-128, -768] }))
