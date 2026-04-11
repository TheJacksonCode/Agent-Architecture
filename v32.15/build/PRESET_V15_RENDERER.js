// === V32.15: AGENT V14 ENCYCLOPEDIA extended to preset rysujBentoPresetV15 + ENC_V14_PILOTS fix ===

// V32.15: rewrite the "next agent" button to cycle ALL agents via AD instead of the 4-pilot array.
// We keep ENC_V14_PILOTS for backward compatibility but the render function will read AD directly.
// (The actual patch of rysujBentoAgentaV14's next-button logic is applied by inject15.py.)

function rysujBentoPresetV15(pid){
  const m = PM[pid]; if(!m) return;
  const edu = (typeof PRESET_EDU_PL !== 'undefined') ? PRESET_EDU_PL[pid] : null;
  if(!edu){ return rysujBentoPresetLegacy(pid) }
  const pr = PR[pid] || [];
  const pk = (typeof getPresetKnowledge === 'function') ? getPresetKnowledge(pid) : null;
  const isFeatured = (pid === 'deep_five_minds' || pid === 'deep');

  // Team composition stats
  const modelMix = {opus:0, sonnet:0, haiku:0};
  const phases = {};
  pr.forEach(function(p){
    const d = AD_MAP.get(p.d); if(!d) return;
    const mdl = (p.m || d.model || 'sonnet').toLowerCase();
    if(modelMix[mdl] !== undefined) modelMix[mdl]++;
    if(d.phase) phases[d.phase] = (phases[d.phase]||0)+1;
  });
  const presetCost = (typeof calcPresetCost === 'function') ? calcPresetCost(pid) : 0;
  const agentCount = m.c || pr.length;
  const phaseCount = Object.keys(phases).length;

  // HERO (section 1) - tagline + icon + name + mission + analogy quote + team badges in top-right
  let heroHtml = '<div class="bento-card bento-4x1 enc-tile enc-hero" style="--i:0;grid-row:span 2">';
  heroHtml += '<div class="enc-hero-main">';
  heroHtml += '<div class="enc-hero-top"><div class="enc-hero-icon">'+(PRESET_SVG[pid]?svgPresetu(pid,56):(m.i||'')).toString()+'</div>';
  heroHtml += '<div><div class="enc-hero-tagline">'+encEsc(edu.tagline||'')+'</div>';
  heroHtml += '<div class="enc-hero-name"'+(isFeatured?' style="background:linear-gradient(135deg,var(--mc-opus),var(--mc-sonnet));-webkit-background-clip:text;-webkit-text-fill-color:transparent"':'')+'>'+encEsc(getPresetName(pid))+'</div></div></div>';
  heroHtml += '<p class="enc-hero-mission">'+encInjectGlossary(encEsc(edu.missionShort||''))+'</p>';
  heroHtml += '<blockquote class="enc-hero-quote">&bdquo;'+encEsc(edu.analogy||'')+'&rdquo;</blockquote>';
  heroHtml += '</div>';
  // Team mini-badge instead of infographic preview
  heroHtml += '<div class="enc-hero-preview" style="cursor:default;display:grid;place-items:center;min-width:120px;min-height:80px;background:rgba(var(--ph-strategy-rgb,129,140,248),0.08);border-radius:12px;padding:8px">';
  heroHtml += '<div style="font-family:var(--mn);font-size:9px;letter-spacing:.12em;color:var(--t2);margin-bottom:4px">ZESPOL</div>';
  heroHtml += '<div style="font-size:28px;font-weight:800;color:var(--ph-strategy,#818CF8);line-height:1">'+agentCount+'</div>';
  heroHtml += '<div style="font-size:10px;color:var(--t2);margin-top:2px">'+t('agentow')+' | '+phaseCount+' '+(phaseCount===1?'faza':(phaseCount<5?'fazy':'faz'))+'</div>';
  heroHtml += '</div>';
  heroHtml += '</div>';

  // WHY (section 2) - whoIs + 3 benefits
  const benefits = (edu.bestFor || []).slice(0,3);
  let whyHtml = '<div class="bento-card bento-4x1 enc-tile" style="--i:1">';
  whyHtml += encKicker('2','DLACZEGO TEN PRESET');
  whyHtml += '<h3 class="enc-section-title">'+encEsc(edu.whoIs ? edu.whoIs.split('.')[0]+'.' : getPresetName(pid))+'</h3>';
  whyHtml += '<p class="enc-section-lead">'+encInjectGlossary(encEsc(edu.whoIs||''))+'</p>';
  if(benefits.length){
    whyHtml += '<ul class="enc-benefit-list">';
    benefits.forEach(function(b,i){
      whyHtml += '<li class="enc-benefit-item"><div class="enc-benefit-icon">'+(i+1)+'</div><div class="enc-benefit-text">'+encEsc(b)+'</div></li>';
    });
    whyHtml += '</ul>';
  }
  whyHtml += '</div>';

  // HOW (section 3) - 4 flow steps (phases)
  const steps = (edu.howItWorks || []).slice(0,4);
  let howHtml = '<div class="bento-card bento-2x1 enc-tile" style="--i:2">';
  howHtml += encKicker('3','JAK DZIALA');
  howHtml += '<div class="enc-flow">';
  steps.forEach(function(s,i){
    const lab = (typeof s === 'string') ? s : (s.label||'');
    const dsc = (typeof s === 'string') ? '' : (s.desc||'');
    howHtml += '<div class="enc-flow-step"><div class="enc-flow-num">'+(i+1)+'</div><div>';
    howHtml += '<div class="enc-flow-label">'+encEsc(lab)+'</div>';
    if(dsc) howHtml += '<div class="enc-flow-desc">'+encEsc(dsc)+'</div>';
    howHtml += '</div></div>';
  });
  howHtml += '</div></div>';

  // META (section 4) - agents/phases/cost/time/pattern/model mix
  let metaHtml = '<div class="bento-card bento-2x1 enc-tile" style="--i:3">';
  metaHtml += encKicker('4','META');
  metaHtml += '<div class="enc-meta-grid">';
  metaHtml += '<div class="enc-meta-row"><span class="enc-meta-label">'+t('agentow')+'</span><span class="enc-meta-value">'+agentCount+'</span></div>';
  metaHtml += '<div class="enc-meta-row"><span class="enc-meta-label">Fazy</span><span class="enc-meta-value">'+phaseCount+'</span></div>';
  metaHtml += '<div class="enc-meta-row"><span class="enc-meta-label">Koszt est.</span><span class="enc-meta-value">'+(typeof fmtCost === 'function' ? fmtCost(presetCost) : ('$'+presetCost.toFixed(2)))+'</span></div>';
  metaHtml += '<div class="enc-meta-row"><span class="enc-meta-label">Wzorzec</span><span class="enc-meta-pill">'+encEsc(m.pt||'-')+'</span></div>';
  metaHtml += '<div class="enc-meta-row"><span class="enc-meta-label">Model mix</span><span class="enc-meta-value" style="font-size:10px">';
  if(modelMix.opus) metaHtml += '<span style="color:var(--mc-opus)">O:'+modelMix.opus+'</span> ';
  if(modelMix.sonnet) metaHtml += '<span style="color:var(--mc-sonnet)">S:'+modelMix.sonnet+'</span> ';
  if(modelMix.haiku) metaHtml += '<span style="color:var(--mc-haiku)">H:'+modelMix.haiku+'</span>';
  metaHtml += '</span></div>';
  metaHtml += '<div class="enc-meta-row"><span class="enc-meta-label">Tokens</span><span class="enc-meta-value">'+encEsc(m.t||'-')+'</span></div>';
  (edu.stats||[]).slice(0,2).forEach(function(st){
    metaHtml += '<div class="enc-meta-row"><span class="enc-meta-label">'+encEsc(st.label||'')+'</span><span class="enc-meta-value">'+encEsc(st.value||'')+'</span></div>';
  });
  metaHtml += '</div></div>';

  // DO (section 5)
  const doArr = (edu.does || []).slice(0,8);
  let doHtml = '<div class="bento-card bento-1x1 enc-tile accent-green" style="--i:4">';
  doHtml += encKicker('5','CO OSIAGASZ');
  doHtml += '<ul class="bento-do-list">'+doArr.map(function(x){return '<li>'+encEsc(x)+'</li>'}).join('')+'</ul>';
  doHtml += '</div>';

  // DONT (section 6)
  const dontArr = (edu.doesNotDo || []).slice(0,8);
  let dontHtml = '<div class="bento-card bento-1x1 enc-tile accent-red" style="--i:5">';
  dontHtml += encKicker('6','CZEGO NIE OSIAGNIESZ');
  dontHtml += '<ul class="bento-dont-list">'+dontArr.map(function(x){return '<li>'+encEsc(x)+'</li>'}).join('')+'</ul>';
  dontHtml += '</div>';

  // EXAMPLE (section 7)
  let exHtml = '<div class="bento-card bento-2x1 enc-tile" style="--i:6">';
  exHtml += encKicker('7','PRZYKLAD Z ZYCIA');
  exHtml += '<div class="enc-example"><div class="enc-example-label">Scenariusz</div>';
  exHtml += '<p class="enc-example-body">'+encEsc(edu.realExample||'')+'</p></div>';
  exHtml += '</div>';

  // ANTI (section 8)
  const antiArr = (edu.antiPatterns || []).slice(0,5);
  let antiHtml = '<div class="bento-card bento-2x1 enc-tile accent-amber" style="--i:7">';
  antiHtml += encKicker('8','KIEDY ZAWODZE');
  antiHtml += '<ul class="bento-anti-list">'+antiArr.map(function(x){return '<li>'+encEsc(x)+'</li>'}).join('')+'</ul>';
  antiHtml += '</div>';

  // FACTS (section 9) - PK keyFeatures + learning quote
  const factsArr = (pk && pk.keyFeatures) ? pk.keyFeatures.slice(0,5) : [];
  let factsHtml = '<div class="bento-card bento-2x1 enc-tile accent-violet" style="--i:8">';
  factsHtml += encKicker('9','CIEKAWOSTKI');
  if(factsArr.length){factsHtml += '<ul class="bento-facts-list">'+factsArr.map(function(x){return '<li>'+encEsc(x)+'</li>'}).join('')+'</ul>'}
  if(edu.learningQuote){factsHtml += '<blockquote class="enc-hero-quote" style="margin-top:12px">&bdquo;'+encEsc(edu.learningQuote)+'&rdquo;</blockquote>'}
  factsHtml += '</div>';

  // DEEP DIVE (section 10) - team composition table, full agent list, diagram flow
  const presetName = encEsc(getPresetName(pid));
  let deepHtml = '<details class="bento-card bento-4x1 enc-tile enc-deep" style="--i:9">';
  deepHtml += '<summary>'+encKickerInline('10','ZANURKUJ')+'Sklad zespolu + przeplyw + porownanie</summary>';
  deepHtml += '<div class="enc-deep-body">';
  // Diagram flow
  if(typeof budujBentoFlow === 'function'){
    deepHtml += '<div><h4>Przeplyw faz</h4>';
    deepHtml += '<div class="bento-diagram" style="padding:16px;background:rgba(255,255,255,0.02);border-radius:12px">';
    deepHtml += '<div class="bento-diagram-flow" style="display:flex;flex-direction:column;gap:6px">'+budujBentoFlow(pid)+'</div></div></div>';
  }
  // Full agent list
  deepHtml += '<div><h4>Agenci w zespole ('+agentCount+')</h4>';
  deepHtml += '<table class="bento-table"><tr><th>#</th><th>Agent</th><th>Faza</th><th>Model</th></tr>';
  pr.forEach(function(p,i){
    const d = AD_MAP.get(p.d); if(!d) return;
    const mdl = (p.m || d.model || 'sonnet').toLowerCase();
    const mdlColor = mdl==='opus'?'var(--mc-opus)':(mdl==='sonnet'?'var(--mc-sonnet)':'var(--mc-haiku)');
    deepHtml += '<tr><td>'+(i+1)+'</td>';
    deepHtml += '<td>'+svgAgenta(d.id,14)+' '+encEsc(getAgentName(d.id))+'</td>';
    deepHtml += '<td>'+encEsc(getCatLabel(d.cat))+'</td>';
    deepHtml += '<td style="color:'+mdlColor+';font-weight:700">'+mdl.toUpperCase()+'</td></tr>';
  });
  deepHtml += '</table></div>';
  // When to use verdict (from PGN/PRD)
  const pgn = (typeof PRESET_GREEN_PL !== 'undefined' && PRESET_GREEN_PL[pid]) ? PRESET_GREEN_PL[pid] : null;
  const prd = (typeof PRESET_RED_PL !== 'undefined' && PRESET_RED_PL[pid]) ? PRESET_RED_PL[pid] : null;
  if(pgn || prd){
    deepHtml += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">';
    if(pgn){
      deepHtml += '<div style="padding:14px;background:rgba(52,211,153,0.08);border-left:3px solid var(--mc-haiku);border-radius:8px">';
      deepHtml += '<h4 style="color:var(--mc-haiku);margin:0 0 8px">Zielone swiatlo</h4>';
      deepHtml += '<ul style="margin:0;padding-left:18px;font-size:11px;line-height:1.7">'+(Array.isArray(pgn)?pgn.map(function(x){return '<li>'+encEsc(x)+'</li>'}).join(''):'<li>'+encEsc(pgn)+'</li>')+'</ul>';
      deepHtml += '</div>';
    }
    if(prd){
      deepHtml += '<div style="padding:14px;background:rgba(248,113,113,0.08);border-left:3px solid var(--ph-qa);border-radius:8px">';
      deepHtml += '<h4 style="color:var(--ph-qa);margin:0 0 8px">Czerwone swiatlo</h4>';
      deepHtml += '<ul style="margin:0;padding-left:18px;font-size:11px;line-height:1.7">'+(Array.isArray(prd)?prd.map(function(x){return '<li>'+encEsc(x)+'</li>'}).join(''):'<li>'+encEsc(prd)+'</li>')+'</ul>';
      deepHtml += '</div>';
    }
    deepHtml += '</div>';
  }
  deepHtml += '</div></details>';

  // NASTEPNY PRESET button
  const allPids = [];
  if(typeof PCAT !== 'undefined') PCAT.forEach(function(c){c.ids.forEach(function(p){allPids.push(p)})});
  const idx = allPids.indexOf(pid);
  const nextPid = idx >= 0 ? allPids[(idx+1) % allPids.length] : allPids[0];
  let nextHtml = '<button type="button" class="enc-next" onclick="otworzEncykl(\'preset\',\''+nextPid+'\')" aria-label="Nastepny preset">';
  nextHtml += '<div style="width:44px;height:44px;display:grid;place-items:center;background:rgba(var(--ph-build-rgb,52,211,153),0.15);border-radius:12px">'+(PRESET_SVG[nextPid]?svgPresetu(nextPid,28):(PM[nextPid]?PM[nextPid].i:''))+'</div>';
  nextHtml += '<div><div class="enc-next-kicker">NASTEPNY PRESET</div><div class="enc-next-name">'+encEsc(getPresetName(nextPid))+'</div></div>';
  nextHtml += '<div class="enc-next-arrow">&rarr;</div>';
  nextHtml += '</button>';

  // Banner + grid
  let h = '<div class="bento-banner"'+(isFeatured?' style="border-color:rgba(245,158,11,0.3)"':'')+'>';
  h += '<div class="bento-banner-icon">'+(PRESET_SVG[pid]?svgPresetu(pid,36):(m.i||'')).toString()+'</div>';
  h += '<div class="bento-banner-text"><h2'+(isFeatured?' style="background:linear-gradient(135deg,var(--mc-opus),var(--mc-sonnet));-webkit-background-clip:text;-webkit-text-fill-color:transparent"':'')+'>'+encEsc(getPresetName(pid))+'</h2>';
  h += '<p>Preset '+agentCount+' '+t('agentow')+' | v32.15 Encyklopedia Universal</p></div>';
  h += '<div class="bento-banner-badge">'+encEsc(m.pt||'')+'</div></div>';
  h += '<div class="bento-grid bento-grid-v14">';
  h += heroHtml + whyHtml + howHtml + metaHtml + doHtml + dontHtml + exHtml + antiHtml + factsHtml + deepHtml;
  h += '</div>';
  h += nextHtml;

  G('loBody').innerHTML = h;
  G('loBody').scrollTop = 0;
  wireBentoReveal();
  wireEncProgress();
  return h;
}

// Feature-gate wrapper for presets
function rysujBentoPreset(pid){
  if(typeof PRESET_EDU_PL !== 'undefined' && PRESET_EDU_PL[pid]){
    return rysujBentoPresetV15(pid);
  }
  return rysujBentoPresetLegacy(pid);
}
