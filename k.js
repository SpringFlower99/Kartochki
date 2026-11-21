/* Карточки решений. Только дизайн, без данных. v1.2 · 21.11.2026 (now:true — кнопка «Делаю сейчас»; level с ❓ — серый)
   По умолчанию всегда светлая. mode:'dark' — тёмная, mode:'auto' — по экрану. */
(function () {
  var CSS = '.k-pl{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:500;line-height:1;padding:4px 8px;border-radius:2px;letter-spacing:.03em}.k-bt{display:flex;gap:8px;align-items:flex-start;width:100%;text-align:left;padding:8px 14px;border-radius:3px;height:auto;cursor:pointer}.k-em{width:24px;flex:none;font-size:18px;line-height:22px;text-align:center}.k-lb{font-size:17px;font-weight:500;line-height:22px}.k-ds{font-size:14px;line-height:18px;margin-top:2px}.k-card{max-width:420px;box-sizing:border-box;margin:.5rem 0}@media (min-width:520px){.k-card{zoom:.84;max-width:504px}}.k-sv{font-size:12px;padding:5px 8px;border-radius:2px;height:auto;cursor:pointer}';

  var TAGS = {
    div: ['💃', 'DIV', '#0B9C9C', '#6FE3D9', '#FFF'],
    school: ['⚖️', 'ШКОЛА', '#4F45C9', '#9A8CF0', '#FFF'],
    utrennik: ['🎭', 'УТРЕННИК', '#FFD21F', '#FFF08A', '#3D2E00'],
    cro: ['🧭', 'CRO', '#1F64C0', '#6FAEF0', '#FFF'],
    starta: ['🏪', 'STARTA EGET', '#1F64C0', '#6FAEF0', '#FFF'],
    rusta: ['🤝', 'RUSTA OCH MATCHA', '#1F64C0', '#6FAEF0', '#FFF'],
    money: ['💰', 'ФИНАНСЫ', '#5A0F28', '#A33356', '#FFF'],
    health: ['💊', 'ЗДОРОВЬЕ', '#FF7A1A', '#FFB870', '#3D1600'],
    family: ['🧸', 'ДЕФНЕ И СЕМЬЯ', '#E9739F', '#F9C6DA', '#4B1528'],
    korkort: ['🚗', 'ПРАВА', '#A9A79D', '#E0DED6', '#2C2C2A'],
    routine: ['🔁', 'РУТИНА', '#4E8A1A', '#A8D46A', '#FFF']
  };

  var SVC = [['🤯', 'Не понимаю'], ['🧠', 'О чём это?'], ['🤷', 'Реши сам'], ['🫁', 'Подышу']];

  function isDark() {
    var p = document.createElement('span');
    p.style.color = 'var(--text-primary)';
    document.body.appendChild(p);
    var m = getComputedStyle(p).color.match(/\d+/g) || [0, 0, 0];
    p.remove();
    return (+m[0] + +m[1] + +m[2]) / 3 > 128;
  }

  function theme(dark) {
    return dark
      ? { card: '#240A0A', bd: '1px solid #3A1C1C', title: '#FFFFFF', warn: '#E24B4A', main: '2px solid #E24B4A', bBg: '#2C2C2A', bBd: '1px solid #444441', bTx: '#FFFFFF', bDs: '#B4B2A9', sv: '#B4B2A9', svBd: '1px solid #444441', goalBg: '#1A0606' }
      : { card: '#FCEBEB', bd: '2px solid #111111', title: '#501313', warn: '#A32D2D', main: '2px solid #111111', bBg: '#FFFFFF', bBd: '1px solid #111111', bTx: '#111111', bDs: '#5F5E5A', sv: '#444441', svBd: '1px solid #888780', goalBg: '#FFFFFF' };
  }

  function send(text) {
    if (typeof sendPrompt === 'function') sendPrompt(text);
  }

  window.K = function (C, rootId) {
    if (!document.getElementById('k-css')) {
      var s = document.createElement('style');
      s.id = 'k-css';
      s.textContent = CSS;
      document.head.appendChild(s);
    }
    var root = document.getElementById(rootId || 'k-root');
    var t = theme(C.mode === 'dark' || (C.mode === 'auto' && isDark()));
    var g = TAGS[C.tag] || TAGS.routine;
    var level = C.level || '⚠️ РЕШАЕШЬ ТЫ';
    var levelBg = level.indexOf('❓') === 0 ? (t.title === '#FFFFFF' ? '#444441' : '#5F5E5A') : t.warn;
    var nowBar = C.now ? '<button class="k-now" style="display:block;width:100%;text-align:center;background:#FAC775;color:#412402;border:2px solid #111111;border-radius:3px;padding:10px 14px;font-size:15px;font-weight:500;letter-spacing:.03em;height:auto;cursor:pointer;margin-bottom:8px">⚡ ДЕЛАЮ СЕЙЧАС — веди по шагам</button>' : '';
    var stamp = '<span class="k-pl" style="background:transparent;border:1px solid #0B9C9C;color:#0B9C9C;padding:3px 7px;margin-top:6px">♟ ХАДИЖАТ БЫ ВЫЖИДАЛА</span>';

    function opt(o, i) {
      if (o.main) {
        return '<button class="k-bt" data-i="' + i + '" style="background:#501313;border:' + t.main + '"><span class="k-em">' + o.em + '</span><span style="flex:1;min-width:0"><span style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span class="k-lb" style="color:#FFF">' + o.label + '</span><span class="k-pl" style="background:#E24B4A;color:#FFF">ДЕЛАЙ!</span></span><span class="k-ds" style="display:block;color:#F7C1C1">' + o.desc + '</span></span></button>';
      }
      return '<button class="k-bt" data-i="' + i + '" style="background:' + t.bBg + ';border:' + t.bBd + '"><span class="k-em">' + o.em + '</span><span style="flex:1;min-width:0"><span class="k-lb" style="display:block;color:' + t.bTx + '">' + o.label + '</span><span class="k-ds" style="display:block;color:' + t.bDs + '">' + o.desc + '</span>' + (o.hot && C.tag === 'div' ? stamp : '') + '</span></button>';
    }

    var deadline = C.deadline ? '<span class="k-pl" style="background:#FAC775;color:#412402">⏰ СРОК: ' + C.deadline + '</span>' : '';
    var ifnot = C.ifnot ? '<span class="k-pl" style="background:' + t.warn + ';color:#FFF;font-size:13.2px;line-height:1.25">Если нет: ' + C.ifnot + '</span>' : '';
    var goal = C.goal ? '<div style="background:' + t.goalBg + ';border-left:3px solid #0B9C9C;border-radius:0;padding:8px 10px;margin-bottom:10px"><div style="font-size:12px;font-weight:500;letter-spacing:.03em;color:#0B9C9C">🎯 ЧЕГО ДОБИВАЕТСЯ ЭТОТ ЧЕЛОВЕК?</div><div style="font-size:14px;line-height:18px;color:' + t.bTx + ';margin-top:2px">' + C.goal + '</div></div>' : '';
    var where = !C.where ? '' : C.whereUrl
      ? '<a href="' + C.whereUrl + '" class="k-pl" style="background:#FAC775;color:#412402;font-weight:400;text-decoration:none">📁 ' + C.where + ' ↗</a>'
      : '<span class="k-pl" style="background:#FAC775;color:#412402;font-weight:400">📁 ' + C.where + '</span>';
    var svc = SVC.map(function (s, i) {
      return '<button class="k-sv" data-s="' + i + '" style="background:transparent;border:' + t.svBd + ';color:' + t.sv + '">' + s[0] + ' ' + s[1] + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="k-card" style="background:' + t.card + ';border:' + t.bd + ';border-radius:4px;padding:12px 16px">' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px"><span class="k-pl" style="background:' + levelBg + ';color:#FFF">' + level + '</span><span class="k-pl" style="background:linear-gradient(90deg,' + g[2] + ',' + g[3] + ');color:' + g[4] + '">' + g[0] + ' ' + g[1] + '</span></div>' +
      '<div style="font-size:22px;font-weight:500;line-height:1.15;color:' + t.title + ';text-wrap:balance;margin-bottom:10px">' + C.title + '</div>' +
      '<div style="display:flex;flex-direction:column;align-items:flex-start;gap:6px;margin-bottom:12px">' + deadline + ifnot + '</div>' +
      nowBar +
      '<div style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px">' + (C.options || []).map(opt).join('') + '</div>' +
      '<div style="display:flex;gap:6px;margin-bottom:4px"><input class="k-cm" placeholder="✍️ Ничего не подходит — напишу сама" style="flex:1;min-width:0;font-size:14px"><button class="k-cs k-sv" style="background:transparent;border:' + t.svBd + ';color:' + t.sv + '">→</button></div>' +
      '<div class="k-er" style="font-size:13px;color:var(--text-danger);min-height:4px;margin-bottom:6px"></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">' + svc + '</div>' +
      goal + where + '</div>';

    root.querySelectorAll('.k-bt').forEach(function (b) {
      b.addEventListener('click', function () { send(C.options[+b.dataset.i].send); });
    });
    root.querySelectorAll('.k-sv[data-s]').forEach(function (b) {
      b.addEventListener('click', function () { send(SVC[+b.dataset.s][1] + ' — ' + C.title); });
    });
    var nb = root.querySelector('.k-now');
    if (nb) nb.addEventListener('click', function () { send('⚡ Делаю сейчас: ' + C.title); });
    var cm = root.querySelector('.k-cm'), er = root.querySelector('.k-er');
    cm.addEventListener('input', function () { er.textContent = ''; });
    root.querySelector('.k-cs').addEventListener('click', function () {
      var v = cm.value.trim();
      if (!v) { er.textContent = 'Сначала напиши пару слов'; return; }
      send(C.title + ' — мой ответ: ' + v);
    });
  };
})();
