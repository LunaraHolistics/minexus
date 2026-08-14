// CASO 03 — VALSA DO CREPÚSCULO (culpado: Victor Vex)
(function(){
  var D = window.NEXUS_DATABASE;
  D.cases["VALSA_CREPUSCULO"] = {
    id:"VALSA_CREPUSCULO", codename:"VALSA DO CREPÚSCULO",
    artifact:"Ovo Fabergé 'Cisne Imperial'", artifactIcon:"🦢", artifactImage:"../img/artefato-ovo-faberge.jpg",
    initialProfile:"Homem loiro, elegante, relógio de ouro",
    timeLimitHours:40, difficulty:"ALTA",
    brief:"O Ovo Fabergé 'Cisne Imperial' sumiu do cofre da Ópera de Viena durante a valsa final. Ninguém viu nada — exceto um reflexo dourado no espelho do camarote.",
    culprit:{ id:"vex", location:{city:"Berlim",country:"Alemanha"} },
    cityOrder:["Viena","Praga","Berlim","Moscou"],
    locations:{
      "Viena":[
        { id:"opera-viena", name:"Ópera Estatal", icon:"🎭", hint:"Camarote 12", hasClue:true, clueType:"positive",
          witness:{name:"MAESTRO WEBER",role:"Maestro",avatar:"W"},
          geoClue:"Ele embarcou no trem noturno para Praga, a cidade das cem torres.",
          idClue:"Consultava um relógio de ouro de bolso a cada três minutos, com vaidade doentia.", idTrait:"relógio de ouro" },
        { id:"cafe-central", name:"Café Central", icon:"☕", hint:"Mesa do fundo", hasClue:true, clueType:"positive",
          witness:{name:"FRAU SCHMIDT",role:"Garçonete",avatar:"S"},
          geoClue:"Gabou-se de que brindaria em Praga antes do fim da semana.",
          idClue:"Cabelos loiros penteados para trás, brilhantes de pomada.", idTrait:"cabelos loiros" },
        { id:"hotel-sacher", name:"Hotel Sacher", icon:"🏨", hint:"Hóspede do 4º andar", hasClue:true, clueType:"positive",
          witness:{name:"CONCIERGE KLAUS",role:"Concierge",avatar:"K"},
          geoClue:"Um hóspede nervoso mencionou um voo noturno para Moscou. Cuidado: pode ser despiste.", noClue:"" },
        { id:"naschmarkt", name:"Naschmarkt", icon:"🍇", hint:"Feira matinal", hasClue:false,
          witness:{name:"VENDEDORA GRETA",role:"Feirante",avatar:"G"},
          noClue:"Muitos turistas elegantes, nenhum suspeito claro." },
        { id:"kunsthistorisches", name:"Kunsthistorisches", icon:"🖼️", hint:"Ala de joias", hasClue:false,
          witness:{name:"GUARDA FRANZ",role:"Vigilante",avatar:"F"},
          noClue:"Nada fora do comum entre os apreciadores de arte." }
      ],
      "Praga":[
        { id:"old-town", name:"Praça da Cidade Velha", icon:"🕰️", hint:"Relojoeiro", hasClue:true, clueType:"negative",
          witness:{name:"MESTRE DVORAK",role:"Relojoeiro",avatar:"D"},
          geoClue:"O relojoeiro apontou o próximo conserto: Berlim.",
          negClue:"Assinou o recibo com uma caneta simples; NENHUM anel de sinete no dedo.", negTrait:"anel de sinete" },
        { id:"charles-bridge", name:"Ponte Carlos", icon:"🌉", hint:"Amanhecer", hasClue:true, clueType:"negative",
          witness:{name:"PINTOR JAN",role:"Artista",avatar:"J"},
          geoClue:"Disse que a 'última apresentação' seria em Berlim.",
          negClue:"Rosto liso, sem barba. Um ilusionista cuida da imagem.", negTrait:"barba" },
        { id:"prague-castle", name:"Castelo de Praga", icon:"🏰", hint:"Pátio externo", hasClue:false,
          witness:{name:"GUARDA PETR",role:"Sentinela",avatar:"P"},
          noClue:"Ninguém suspeito entre os madrugadores." },
        { id:"taverna-strana", name:"Taverna Malá Strana", icon:"🍺", hint:"Noite", hasClue:false,
          witness:{name:"TABERNEIRA LENA",role:"Taberneira",avatar:"L"},
          noClue:"Um loiro elegante bebeu sozinho, mas não disse para onde ia." }
      ],
      "Berlim":[
        { id:"hotel-adlon", name:"Hotel Adlon", icon:"🏨", hint:"Suíte presidencial", hasClue:true, clueType:"positive",
          witness:{name:"GERENTE URSULA",role:"Gerente",avatar:"U"},
          geoClue:"Ele não pretende sair de Berlim. 'A valsa termina aqui', disse.",
          idClue:"Sobre os cabelos loiros, um chapéu panamá de aba curta, inconfundível.", idTrait:"chapéu panamá" },
        { id:"filharmonica", name:"Filarmônica", icon:"🎼", hint:"Ensaio noturno", hasClue:true, clueType:"positive",
          witness:{name:"VIOLINISTA HANS",role:"Músico",avatar:"H"},
          geoClue:"Comprou dois ingressos para a estreia de Berlim. Ele fica na cidade.",
          idClue:"O sotaque alemão entregava sua origem, mesmo falando francês.", idTrait:"sotaque alemão" },
        { id:"checkpoint", name:"Checkpoint Charlie", icon:"🛂", hint:"Travessia", hasClue:false,
          witness:{name:"OFICIAL KLEIN",role:"Fiscal",avatar:"K"},
          noClue:"Nenhum loiro de chapéu cruzou o posto hoje." },
        { id:"museum-island", name:"Ilha dos Museus", icon:"🏛️", hint:"Corredores", hasClue:false,
          witness:{name:"GUIA ANKE",role:"Guia",avatar:"A"},
          noClue:"Visitantes comuns, nenhum truque à vista." }
      ],
      "Moscou":[
        { id:"bolshoi", name:"Teatro Bolshoi", icon:"🎭", hint:"Isca", hasClue:true, clueType:"positive",
          witness:{name:"BAILARINA OLGA",role:"Bailarina",avatar:"O"},
          geoClue:"ERA UMA ISCA! O contato riu: 'o loiro está dançando a valsa em Berlim'.", noClue:"" },
        { id:"red-square", name:"Praça Vermelha", icon:"🏛️", hint:"Despiste", hasClue:true, clueType:"positive",
          witness:{name:"VENDEDOR BORIS",role:"Ambulante",avatar:"B"},
          geoClue:"O impostor confessou: o ovo será vendido em Berlim.", noClue:"" },
        { id:"kremlin", name:"Kremlin", icon:"🏰", hint:"Pista fria", hasClue:false,
          witness:{name:"GUARDA IVAN",role:"Sentinela",avatar:"I"},
          noClue:"Nada. A pista era fria desde o início." },
        { id:"arbat", name:"Rua Arbat", icon:"🎨", hint:"Boato pago", hasClue:false,
          witness:{name:"ARTISTA MIKHAIL",role:"Pintor",avatar:"M"},
          noClue:"Pagaram para espalhar o boato de Moscou. Destino real: Berlim." }
      ]
    }
  };
})();