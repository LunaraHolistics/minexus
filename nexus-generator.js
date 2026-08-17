/**
 * NEXUS GENERATOR v4.0 — Roteirista procedural
 * - Revelação progressiva (5 cidades: roubo → +2 → +2)
 * - DENSIDADE ALTA: múltiplos locais por cidade dão o salto geográfico
 * - Exclui vilões PRESOS do pool de culpados
 * - Suporta caso REABERTO (culpritId fixo = foragido)
 */
(function () {
  "use strict";
  var DB = window.NEXUS_DATABASE;

  function getPrison() {
    try {
      var p = JSON.parse(localStorage.getItem("minexus_prison")) || [];
      return p;
    } catch (e) {
      return [];
    }
  }

  var GEN_CITIES = {
    "São Petersburgo": {
      country: "Rússia",
      tz: "UTC+3",
      lat: 59.9311,
      lon: 30.3609,
      photo: "../img/cidade-sao-petersburgo.jpg",
      keywords: ["petersburgo", "rússia", "russo", "hermitage"],
    },
    Pequim: {
      country: "China",
      tz: "UTC+8",
      lat: 39.9042,
      lon: 116.4074,
      photo: "../img/cidade-pequim.jpg",
      keywords: ["pequim", "china", "chinês", "beijing"],
    },
    Xangai: {
      country: "China",
      tz: "UTC+8",
      lat: 31.2304,
      lon: 121.4737,
      photo: "../img/cidade-xangai.jpg",
      keywords: ["xangai", "china", "chinês", "shanghai"],
    },
    Mumbai: {
      country: "Índia",
      tz: "UTC+5:30",
      lat: 19.076,
      lon: 72.8777,
      photo: "../img/cidade-mumbai.jpg",
      keywords: ["mumbai", "índia", "indiano", "bombaim"],
    },
    "Cidade do México": {
      country: "México",
      tz: "UTC-6",
      lat: 19.4326,
      lon: -99.1332,
      photo: "../img/cidade-mexico.jpg",
      keywords: ["méxico", "mexicano", "asteca"],
    },
    Estocolmo: {
      country: "Suécia",
      tz: "UTC+1",
      lat: 59.3293,
      lon: 18.0686,
      photo: "../img/cidade-estocolmo.jpg",
      keywords: ["estocolmo", "suécia", "sueco"],
    },
    Roma: {
      country: "Itália",
      tz: "UTC+1",
      lat: 41.9028,
      lon: 12.4964,
      photo: "../img/cidade-roma.jpg",
      keywords: ["roma", "itália", "italiano", "coliseu"],
    },
    Kiev: {
      country: "Ucrânia",
      tz: "UTC+2",
      lat: 50.4501,
      lon: 30.5234,
      photo: "../img/cidade-kiev.jpg",
      keywords: ["kiev", "ucrania", "ucraniano"],
    },
    Zurique: {
      country: "Suíça",
      tz: "UTC+1",
      lat: 47.3769,
      lon: 8.5417,
      photo: "../img/cidade-zurique.jpg",
      keywords: ["zurique", "suíça", "suico", "alpes"],
    },
    Bruxelas: {
      country: "Bélgica",
      tz: "UTC+1",
      lat: 50.8503,
      lon: 4.3517,
      photo: "../img/cidade-bruxelas.jpg",
      keywords: ["bruxelas", "bélgica", "belga"],
    },
  };
  Object.keys(GEN_CITIES).forEach(function (n) {
    if (!DB.cities[n]) DB.cities[n] = GEN_CITIES[n];
  });

  var ESCAPE = {
    "Rio de Janeiro": ["Paraty", "Santos"],
    Paris: ["Lyon", "Marselha"],
    Londres: ["Dover", "Calais"],
    Tóquio: ["Kyoto", "Osaka"],
    Cairo: ["Alexandria", "Port Said"],
    Cusco: ["Lima", "Arequipa"],
    "Buenos Aires": ["La Plata", "Mar del Plata"],
    Havana: ["Varadero", "Santiago de Cuba"],
    Moscou: ["Tver", "São Petersburgo"],
    Viena: ["Bratislava", "Praga"],
    Berlim: ["Leipzig", "Dresden"],
    Atenas: ["Pireu", "Salônica"],
    "Nova York": ["Newark", "Filadélfia"],
    Pequim: ["Tianjin", "Qinhuangdao"],
    Xangai: ["Ningbo", "Nantong"],
    Mumbai: ["Pune", "Goa"],
    "Cidade do México": ["Puebla", "Veracruz"],
    "São Petersburgo": ["Vyborg", "Helsinque"],
    Roma: ["Nápoles", "Civitavecchia"],
    Praga: ["Brno", "Viena"],
    Kyoto: ["Osaka", "Kobe"],
  };

  var TRAIT_POS = {
    "chapéu panamá": "Usava um chapéu panamá, mesmo fora de moda.",
    "sotaque francês": "Falava com um sotaque francês carregado.",
    "anel de sinete": "Um anel de sinete de ouro brilhava no mindinho.",
    "mão esquerda": "Assinava e segurava tudo com a mão esquerda.",
    "cabelos grisalhos": "Os cabelos grisalhos estavam penteados com vaidade.",
    "terno azul": "Vestia um terno azul-marinho impecável.",
    "cabelos loiros": "Cabelos loiros, brilhantes de pomada.",
    "relógio de ouro": "Consultava um relógio de ouro a todo momento.",
    "cabelos negros": "Cabelos negros como a noite, bem cuidados.",
    "cicatriz no rosto": "Uma cicatriz cortava o rosto, mal disfarçada.",
    "perfume forte": "Deixou no ar um perfume forte, inesquecível.",
    "óculos escuros": "Usava óculos escuros mesmo à noite.",
    barba: "Uma barba cerrada marcava o rosto.",
    charuto: "O cheiro de charuto ficou no ambiente.",
    "luvas de couro": "Usava luvas de couro, elegantes.",
    "terno escuro": "Vestia um terno escuro, sóbrio.",
    "sotaque alemão": "O sotaque alemão escapava nas vogais.",
  };
  var TRAIT_NEG = {
    "óculos escuros": "Tenho certeza: NÃO usava óculos escuros.",
    barba: "Ele NÃO tinha barba. Rosto liso.",
    charuto: "Recusou tabaco. Ele NÃO fuma charuto.",
    "perfume forte": "Ele NÃO usava perfume algum.",
    "luvas de couro": "Ele NÃO usava luvas de couro.",
    "sotaque alemão": "NÃO tinha sotaque alemão.",
    "cabelos grisalhos": "Era jovem, sem cabelos grisalhos.",
    "cicatriz no rosto": "O rosto era liso, sem cicatriz.",
    "relógio de ouro": "NÃO usava relógio de ouro.",
    "cabelos loiros": "Os cabelos NÃO eram loiros.",
    "terno azul": "NÃO vestia terno azul.",
    "mão esquerda": "Era destro, NÃO canhoto.",
  };
  var CITY_LORE = {
    Tóquio: ["a terra das cerejeiras, onde o sol nasce primeiro"],
    Paris: ["a Cidade Luz", "as margens do Sena"],
    Londres: ["a névoa do grande relógio"],
    Cairo: ["o rio que abraça os templos"],
    Luxor: ["as ruínas ao entardecer"],
    Atenas: ["o mármore da Acrópole"],
    Cusco: ["o frio da altitude andina"],
    "Rio de Janeiro": ["o mar de Ipanema"],
    Moscou: ["as cúpulas coloridas"],
    Viena: ["a valsa do Danúbio"],
    Berlim: ["o portão de Brandemburgo"],
    "Buenos Aires": ["o tango de San Telmo"],
    Havana: ["o malecón e os carros clássicos"],
    "Nova York": ["o skyline de Manhattan"],
  };

  var SHELLS = [
    {
      icon: "🏛️",
      hint: "Cena do roubo",
      roles: ["Curador", "Diretor", "Vigilante"],
    },
    {
      icon: "🏨",
      hint: "Hospedagem recente",
      roles: ["Recepcionista", "Concierge", "Gerente"],
    },
    {
      icon: "🍸",
      hint: "Encontro noturno",
      roles: ["Bartender", "Dançarina", "Músico"],
    },
    {
      icon: "🏪",
      hint: "Rumores de rua",
      roles: ["Vendedor", "Mercador", "Cambista"],
    },
    {
      icon: "⚓",
      hint: "Embarcações",
      roles: ["Capitão", "Portuário", "Marinheiro"],
    },
    {
      icon: "🛍️",
      hint: "Compras de luxo",
      roles: ["Lojista", "Alfaiate", "Joalheiro"],
    },
  ];
  var FIRST = [
    "Ana",
    "Bruno",
    "Carla",
    "Diego",
    "Elena",
    "Fábio",
    "Greta",
    "Hugo",
    "Iris",
    "João",
    "Kira",
    "Luís",
    "Mara",
    "Nino",
    "Olga",
    "Paulo",
    "Rita",
    "Sami",
    "Tina",
    "Vera",
  ];
  var LAST = [
    "Silva",
    "Costa",
    "Mamani",
    "Tanaka",
    "Dubois",
    "Evans",
    "Weber",
    "Rossi",
    "Petrov",
    "Andrade",
    "Sato",
    "Moreau",
    "Klein",
    "Vargas",
    "Nakamura",
    "Condori",
  ];
  var CALLSIGNS = [
    "AURORA",
    "NILO",
    "CREPÚSCULO",
    "TANGO",
    "Boreal",
    "Mirage",
    "Vendaval",
    "Eclipse",
    "Quimera",
    "Zênite",
  ];

  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pick(rnd, arr) {
    return arr[Math.floor(rnd() * arr.length)];
  }
  function trim(s) {
    return (s || "").trim();
  }
  function has(s, t) {
    return s.traits.indexOf(t) > -1;
  }
  function cleanSuspect(s) {
    return {
      id: trim(s.id),
      name: trim(s.name),
      alias: trim(s.alias),
      initial: trim(s.initial),
      nationality: trim(s.nationality),
      age: trim(s.age),
      portrait: s.portrait ? trim(s.portrait) : null,
      quote: s.quote ? trim(s.quote) : "",
      traits: (s.traits || []).map(trim),
    };
  }
  function posText(t) {
    return TRAIT_POS[t] || "Notei que ele tinha " + t + ".";
  }
  function negText(t) {
    return TRAIT_NEG[t] || "Ele NÃO tinha " + t + ".";
  }
  function geoClueText(to, rnd) {
    var l = CITY_LORE[to];
    if (l) {
      return "Soube que ele partiu. Foi buscar " + pick(rnd, l) + ".";
    }
    return "Soube que ele partiu rumo a " + to + ".";
  }

  function makeLoc(city, i, witness, clue, geo, rnd) {
    var sh = SHELLS[i];
    var loc = {
      id: city.toLowerCase().replace(/\s+/g, "-") + "-" + i,
      name: sh.hint === "Cena do roubo" ? "Museu de " + city : sh.hint,
      icon: sh.icon,
      hint: sh.hint,
      hasClue: false,
      clueType: "positive",
      witness: {
        name: witness.toUpperCase(),
        role: pick(rnd, sh.roles),
        avatar: witness.charAt(0).toUpperCase(),
      },
    };
    if (clue) {
      loc.hasClue = true;
      if (clue.type === "pos") {
        loc.clueType = "positive";
        loc.idClue = clue.text;
        loc.idTrait = clue.trait;
      } else {
        loc.clueType = "negative";
        loc.negClue = clue.text;
        loc.negTrait = clue.trait;
      }
    }
    if (geo) {
      loc.hasClue = true;
      loc.geoClue = geo.text;
      if (geo.reveal && geo.reveal.length) loc.reveals = geo.reveal;
      loc.pointsTo = geo.pointsTo || geo.reveal || [];
    }
    if (!clue && !geo) {
      loc.hasClue = false;
      loc.noClue = "Nada fora do comum por aqui.";
    }
    return loc;
  }
  function buildCity(city, clues, geos, rnd) {
    var out = [];
    for (var i = 0; i < 6; i++) {
      var w = pick(rnd, FIRST) + " " + pick(rnd, LAST);
      out.push(makeLoc(city, i, w, clues[i] || null, geos[i] || null, rnd));
    }
    return out;
  }

  function generateCase(opts) {
    opts = opts || {};
    var seed =
      opts.seed || (Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0;
    var rnd = mulberry32(seed);
    var suspects = (DB.suspects || []).map(cleanSuspect);
    var artifacts = window.NEXUS_ARTIFACTS || [];
    var artifact = opts.artifact || pick(rnd, artifacts);

    // ⛓️ Exclui vilões PRESOS (a menos que seja caso reaberto com culpritId fixo)
    var imprisoned = getPrison().map(function (x) {
      return x.id;
    });
    var poolSus = suspects.filter(function (s) {
      return imprisoned.indexOf(s.id) < 0;
    });
    if (poolSus.length === 0) poolSus = suspects;
    var culprit = null;
    if (opts.culpritId) {
      culprit =
        suspects.filter(function (s) {
          return s.id === opts.culpritId;
        })[0] || null;
    }
    if (!culprit) culprit = pick(rnd, poolSus);

    var all = DB.cities;
    var theft =
      artifact && all[artifact.origin]
        ? artifact.origin
        : pick(rnd, Object.keys(all));
    var pool = Object.keys(all).filter(function (c) {
      return c !== theft;
    });
    var transit = pick(rnd, pool);
    var p2 = pool.filter(function (c) {
      return c !== transit;
    });
    var decoy1 = pick(rnd, p2);
    var p3 = p2.filter(function (c) {
      return c !== decoy1;
    });
    var capture = pick(rnd, p3);
    var p4 = p3.filter(function (c) {
      return c !== capture;
    });
    var decoy2 = pick(rnd, p4);

    // Funil de identidade simulado — com mais pistas por estágio
    var ALL = {};
    suspects.forEach(function (s) {
      s.traits.forEach(function (t) {
        ALL[t] = 1;
      });
    });
    ALL = Object.keys(ALL);
    var rem = suspects.slice(),
      usedPos = {},
      usedNeg = {},
      stages = [[], [], []];
    function addPos(st) {
      var best = null,
        bl = rem.length;
      culprit.traits.forEach(function (t) {
        if (usedPos[t]) return;
        var len = rem.filter(function (s) {
          return has(s, t);
        }).length;
        if (len >= 1 && len < bl) {
          best = t;
          bl = len;
        }
      });
      if (best) {
        usedPos[best] = 1;
        rem = rem.filter(function (s) {
          return has(s, best);
        });
        stages[st].push({ type: "pos", trait: best, text: posText(best) });
        return true;
      }
      return false;
    }
    function addNeg(st) {
      var best = null,
        bl = rem.length;
      ALL.forEach(function (t) {
        if (has(culprit, t) || usedNeg[t]) return;
        var len = rem.filter(function (s) {
          return !has(s, t);
        }).length;
        if (len >= 1 && len < bl) {
          best = t;
          bl = len;
        }
      });
      if (best) {
        usedNeg[best] = 1;
        rem = rem.filter(function (s) {
          return !has(s, best);
        });
        stages[st].push({ type: "neg", trait: best, text: negText(best) });
        return true;
      }
      return false;
    }
    addPos(0);
    addPos(0);
    addNeg(0);
    addNeg(0); // 4 pistas no roubo
    addPos(1);
    addNeg(1);
    addNeg(1); // 3 pistas no trânsito
    var g = 0;
    while (rem.length > 1 && g < 8) {
      if (!addPos(2)) {
        if (!addNeg(2)) break;
      }
      g++;
    }

    var R1 = [transit, decoy1],
      R2 = [capture, decoy2];
    var geoMain1 = { text: geoClueText(transit, rnd), reveal: R1 };
    var geoDecoy1 = {
      text: "Cuidado: um boato aponta para " + decoy1 + ". Pode ser despiste.",
      reveal: R1,
    };
    var geoMain2 = { text: geoClueText(capture, rnd), reveal: R2 };
    var locations = {};

    // 🎯 ROUBO: 2 locais dão o salto principal + 1 dá a isca
    locations[theft] = buildCity(
      theft,
      stages[0],
      [geoMain1, geoMain1, geoDecoy1],
      rnd,
    );
    // 🎯 TRÂNSITO: 2 locais revelam a CAPTURA (não dá pra travar)
    locations[transit] = buildCity(
      transit,
      stages[1],
      [geoMain2, geoMain2],
      rnd,
    );
    // 🎯 CAPTURA: confirmação final
    locations[capture] = buildCity(
      capture,
      stages[2],
      [
        {
          text:
            "Ele não pretende sair de " + capture + ". 'A caça termina aqui'.",
          reveal: [],
        },
      ],
      rnd,
    );
    // 🎯 ISCA 1: 2 locais confessam que é despiste e apontam o trânsito
    locations[decoy1] = buildCity(
      decoy1,
      [],
      [
        {
          text:
            "ERA UMA ISCA! O contato riu: 'o verdadeiro foi para " +
            transit +
            ".'",
          reveal: [transit],
        },
        {
          text: "ERA UMA ISCA! Pergunte em " + transit + ".",
          reveal: [transit],
        },
      ],
      rnd,
    );
    // 🎯 ISCA 2: 2 locais apontam a captura
    locations[decoy2] = buildCity(
      decoy2,
      [],
      [
        {
          text: "ERA UMA ISCA! O rastro verdadeiro leva a " + capture + ".",
          reveal: [capture],
        },
        {
          text: "ERA UMA ISCA! Ele foi visto em " + capture + ".",
          reveal: [capture],
        },
      ],
      rnd,
    );

    function cityObj(n, rev, cur, vis) {
      var c = all[n] || {};
      return {
        name: n,
        country: c.country || "",
        photo: c.photo || null,
        visited: !!vis,
        current: !!cur,
        revealed: !!rev,
      };
    }
    var cities = [
      cityObj(theft, true, true, true),
      cityObj(transit, false, false, false),
      cityObj(decoy1, false, false, false),
      cityObj(capture, false, false, false),
      cityObj(decoy2, false, false, false),
    ];

    return {
      id: "GER_" + seed,
      codename: "OPERAÇÃO " + pick(rnd, CALLSIGNS),
      artifact: artifact ? artifact.name : "Artefato Desconhecido",
      artifactIcon: artifact ? artifact.icon : "🏺",
      artifactImage: artifact ? artifact.image : null,
      initialProfile: culprit.nationality + ", " + culprit.traits[0],
      timeLimitHours: 48,
      difficulty: "ALTA",
      brief:
        "O " +
        (artifact ? artifact.name : "artefato") +
        " foi subtraído de " +
        theft +
        ". O rastro esfria rápido — siga as pistas para destravar novos destinos.",
      culprit: {
        id: culprit.id,
        location: {
          city: capture,
          country: (all[capture] || {}).country || "",
        },
      },
      cities: cities,
      locations: locations,
      escapeChain: [capture].concat(ESCAPE[capture] || [capture, capture]),
      seed: seed,
    };
  }
  window.NexusGenerator = { generateCase: generateCase };
  console.log("[GERADOR] v4.0 — densidade alta + prisão/reabertura");
})();
