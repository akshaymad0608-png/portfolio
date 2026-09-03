#!/usr/bin/env node
/**
 * The graphs behind data/wf-*.json, written out once.
 *
 * These are the node names, kinds, canvas positions and wiring of the live n8n
 * workflows — nothing else. No credentials, no sheet or chat IDs, no parameter
 * values. Copying only the shape means the diagrams on /work can be published
 * from a private automation stack without leaking anything from it.
 *
 * Re-run only when a workflow's shape changes. The Jewellery graph came out of
 * the n8n API; the other three are the shapes as built.
 *
 * Run: node scripts/write-workflow-graphs.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'data');
mkdirSync(OUT, { recursive: true });

const jobEngine = {
  id: 'job-engine',
  name: 'Job Application Engine',
  nodes: [
    { n: 'Every Morning 7:30', t: 'n8n-nodes-base.scheduleTrigger', p: [-200, 300] },
    { n: 'Fetch Remotive', t: 'n8n-nodes-base.httpRequest', p: [60, -100] },
    { n: 'Fetch RemoteOK', t: 'n8n-nodes-base.httpRequest', p: [60, 60] },
    { n: 'Fetch Arbeitnow', t: 'n8n-nodes-base.httpRequest', p: [60, 220] },
    { n: 'Fetch Himalayas', t: 'n8n-nodes-base.httpRequest', p: [60, 380] },
    { n: 'Fetch Jobicy', t: 'n8n-nodes-base.httpRequest', p: [60, 540] },
    { n: 'Combine Job Feeds', t: 'n8n-nodes-base.merge', p: [320, 220] },
    { n: 'Normalize And Score Jobs', t: 'n8n-nodes-base.code', p: [540, 220] },
    { n: 'Read Application History', t: 'n8n-nodes-base.dataTable', p: [760, 220] },
    { n: 'Drop Duplicates And Cap', t: 'n8n-nodes-base.code', p: [980, 220] },
    { n: 'Score And Write Application', t: '@n8n/n8n-nodes-langchain.chainLlm', p: [1200, 220] },
    { n: 'Gemini', t: '@n8n/n8n-nodes-langchain.lmChatGoogleGemini', p: [1180, 420] },
    { n: 'Application JSON', t: '@n8n/n8n-nodes-langchain.outputParserStructured', p: [1360, 420] },
    { n: 'Decide Send Or Queue', t: 'n8n-nodes-base.code', p: [1440, 220] },
    { n: 'Send This One?', t: 'n8n-nodes-base.if', p: [1660, 220] },
    { n: 'Send Application Email', t: 'n8n-nodes-base.gmail', p: [1880, 100] },
    { n: 'Log Applied', t: 'n8n-nodes-base.dataTable', p: [2100, 100] },
    { n: 'Log Not Sent', t: 'n8n-nodes-base.dataTable', p: [1880, 380] },
    { n: 'Build Job Digest', t: 'n8n-nodes-base.code', p: [1660, 620] },
    { n: 'Telegram Job Digest', t: 'n8n-nodes-base.telegram', p: [1880, 620] },
  ],
  connections: {
    'Every Morning 7:30': [['Fetch Remotive', 'Fetch RemoteOK', 'Fetch Arbeitnow', 'Fetch Himalayas', 'Fetch Jobicy']],
    'Fetch Remotive': [['Combine Job Feeds']],
    'Fetch RemoteOK': [['Combine Job Feeds']],
    'Fetch Arbeitnow': [['Combine Job Feeds']],
    'Fetch Himalayas': [['Combine Job Feeds']],
    'Fetch Jobicy': [['Combine Job Feeds']],
    'Combine Job Feeds': [['Normalize And Score Jobs']],
    'Normalize And Score Jobs': [['Read Application History']],
    'Read Application History': [['Drop Duplicates And Cap']],
    'Drop Duplicates And Cap': [['Score And Write Application']],
    'Score And Write Application': [['Decide Send Or Queue']],
    'Decide Send Or Queue': [['Send This One?', 'Build Job Digest']],
    'Send This One?': [['Send Application Email'], ['Log Not Sent']],
    'Send Application Email': [['Log Applied']],
    'Build Job Digest': [['Telegram Job Digest']],
  },
  ai: {
    Gemini: ['Score And Write Application'],
    'Application JSON': ['Score And Write Application'],
  },
};

const leadEngine = {
  id: 'lead-engine',
  name: 'Inbound Lead Engine',
  nodes: [
    { n: 'New Inbox Mail', t: 'n8n-nodes-base.gmailTrigger', p: [-200, 300] },
    { n: 'Normalize Inbound', t: 'n8n-nodes-base.code', p: [40, 300] },
    { n: 'Read Outreach History', t: 'n8n-nodes-base.dataTable', p: [280, 300] },
    { n: 'Skip Recent Contacts', t: 'n8n-nodes-base.code', p: [520, 300] },
    { n: 'Qualify And Draft Reply', t: '@n8n/n8n-nodes-langchain.chainLlm', p: [760, 300] },
    { n: 'Gemini', t: '@n8n/n8n-nodes-langchain.lmChatGoogleGemini', p: [720, 520] },
    { n: 'Triage JSON', t: '@n8n/n8n-nodes-langchain.outputParserStructured', p: [900, 520] },
    { n: 'Decide Reply Or Log', t: 'n8n-nodes-base.code', p: [1000, 300] },
    { n: 'Auto Reply?', t: 'n8n-nodes-base.if', p: [1220, 300] },
    { n: 'Send Reply', t: 'n8n-nodes-base.gmail', p: [1440, 180] },
    { n: 'Log Replied', t: 'n8n-nodes-base.dataTable', p: [1660, 180] },
    { n: 'Log Without Reply', t: 'n8n-nodes-base.dataTable', p: [1440, 440] },
    { n: 'Build Lead Alert', t: 'n8n-nodes-base.code', p: [1220, 680] },
    { n: 'Telegram Lead Alert', t: 'n8n-nodes-base.telegram', p: [1440, 680] },
  ],
  connections: {
    'New Inbox Mail': [['Normalize Inbound']],
    'Normalize Inbound': [['Read Outreach History']],
    'Read Outreach History': [['Skip Recent Contacts']],
    'Skip Recent Contacts': [['Qualify And Draft Reply']],
    'Qualify And Draft Reply': [['Decide Reply Or Log']],
    'Decide Reply Or Log': [['Auto Reply?', 'Build Lead Alert']],
    'Auto Reply?': [['Send Reply'], ['Log Without Reply']],
    'Send Reply': [['Log Replied']],
    'Build Lead Alert': [['Telegram Lead Alert']],
  },
  ai: {
    Gemini: ['Qualify And Draft Reply'],
    'Triage JSON': ['Qualify And Draft Reply'],
  },
};

const aiNews = {
  id: 'ai-news',
  name: 'AI News Collector',
  nodes: [
    { n: 'Every Morning 9AM', t: 'n8n-nodes-base.scheduleTrigger', p: [0, 0] },
    { n: 'OpenAI Blog', t: 'n8n-nodes-base.rssFeedRead', p: [240, -368] },
    { n: 'Meta AI Blog', t: 'n8n-nodes-base.rssFeedRead', p: [240, -184] },
    { n: 'Microsoft AI Blog', t: 'n8n-nodes-base.rssFeedRead', p: [240, 0] },
    { n: 'NVIDIA Blog', t: 'n8n-nodes-base.rssFeedRead', p: [240, 184] },
    { n: 'Hugging Face Blog', t: 'n8n-nodes-base.rssFeedRead', p: [240, 368] },
    { n: 'Combine All Feeds', t: 'n8n-nodes-base.merge', p: [528, 96] },
    { n: 'Prepare News', t: 'n8n-nodes-base.code', p: [768, 96] },
    { n: 'Save To Sheet', t: 'n8n-nodes-base.googleSheets', p: [1024, -32] },
    { n: 'Send Telegram Digest', t: 'n8n-nodes-base.telegram', p: [1024, 224] },
    { n: 'Top 3 Stories', t: 'n8n-nodes-base.limit', p: [1024, 440] },
    { n: 'Draft LinkedIn Post', t: '@n8n/n8n-nodes-langchain.chainLlm', p: [1240, 440] },
    { n: 'Gemini', t: '@n8n/n8n-nodes-langchain.lmChatGoogleGemini', p: [1240, 620] },
    { n: 'Ask To Post', t: 'n8n-nodes-base.telegram', p: [1480, 440] },
    { n: 'Approved?', t: 'n8n-nodes-base.if', p: [1700, 440] },
    { n: 'Get Article Page', t: 'n8n-nodes-base.httpRequest', p: [1920, 300] },
    { n: 'Find Image', t: 'n8n-nodes-base.code', p: [2120, 300] },
    { n: 'Has Image?', t: 'n8n-nodes-base.if', p: [2320, 300] },
    { n: 'Download Image', t: 'n8n-nodes-base.httpRequest', p: [2520, 200] },
    { n: 'Draw Headline Card', t: 'n8n-nodes-base.editImage', p: [2520, 420] },
    { n: 'Post To LinkedIn', t: 'n8n-nodes-base.linkedIn', p: [2760, 200] },
    { n: 'Post Without Image', t: 'n8n-nodes-base.linkedIn', p: [2760, 440] },
    { n: 'Confirm Posted', t: 'n8n-nodes-base.telegram', p: [3000, 300] },
    { n: 'Report LinkedIn Failure', t: 'n8n-nodes-base.telegram', p: [3000, 560] },
    { n: 'Other Drafts', t: 'n8n-nodes-base.limit', p: [1480, 700] },
    { n: 'Send Other Drafts', t: 'n8n-nodes-base.telegram', p: [1700, 700] },
  ],
  connections: {
    'Every Morning 9AM': [['OpenAI Blog', 'Meta AI Blog', 'Microsoft AI Blog', 'NVIDIA Blog', 'Hugging Face Blog']],
    'OpenAI Blog': [['Combine All Feeds']],
    'Meta AI Blog': [['Combine All Feeds']],
    'Microsoft AI Blog': [['Combine All Feeds']],
    'NVIDIA Blog': [['Combine All Feeds']],
    'Hugging Face Blog': [['Combine All Feeds']],
    'Combine All Feeds': [['Prepare News']],
    'Prepare News': [['Save To Sheet', 'Send Telegram Digest', 'Top 3 Stories']],
    'Top 3 Stories': [['Draft LinkedIn Post']],
    'Draft LinkedIn Post': [['Ask To Post', 'Other Drafts']],
    'Ask To Post': [['Approved?']],
    'Approved?': [['Get Article Page']],
    'Get Article Page': [['Find Image']],
    'Find Image': [['Has Image?']],
    'Has Image?': [['Download Image'], ['Draw Headline Card']],
    'Download Image': [['Post To LinkedIn'], ['Post Without Image']],
    'Draw Headline Card': [['Post To LinkedIn'], ['Post Without Image']],
    'Post To LinkedIn': [['Confirm Posted'], ['Report LinkedIn Failure']],
    'Post Without Image': [['Confirm Posted'], ['Report LinkedIn Failure']],
    'Other Drafts': [['Send Other Drafts']],
  },
  ai: { Gemini: ['Draft LinkedIn Post'] },
};

for (const g of [jobEngine, leadEngine, aiNews]) {
  writeFileSync(join(OUT, `wf-${g.id}.json`), JSON.stringify(g, null, 2) + '\n');
  console.log(`wrote data/wf-${g.id}.json — ${g.nodes.length} nodes`);
}
