// CASO 04 — TANGO DE SANGUE (culpado: R. Moreno)
(function(){
  var D = window.NEXUS_DATABASE;
  D.cases["TANGO_SANGUE"] = {
    id:"TANGO_SANGUE", codename:"TANGO DE SANGUE",
    artifact:"Broche de Ônix 'La Rosa Negra'", artifactIcon:"🌹", artifactImage:"../img/artefato-broche-onix.jpg",
    initialProfile:"Homem de terno azul, cicatriz no rosto",
    timeLimitHours:36, difficulty:"EXTREMA",
    brief:"O Broche de Ônix 'La Rosa Negra' foi arrancado do Teatro Colón em plena milonga. O ladrão deixou um rastro de sangue no palco — mas desapareceu no tango.",
    culprit:{ id:"moreno", location:{city:"Nova York",country:"EUA"} },
    cityOrder:["Buenos Aires","Havana","Nova York","Rio de Janeiro"],
    locations:{
      "Buenos Aires":[
        { id:"teatro-colon", name:"Teatro Colón", icon:"🎭", hint:"Palco do crime", hasClue:true, clueType:"positive",
          witness:{name:"COREÓGRAFA LUCÍA",role:"Coreógrafa",avatar:"L"},
          geoClue:"Ele embarcou para Havana sob o nome de 'El Bailarín'.",
          idClue:"Um terno azul-marinho impecável, mesmo coberto pelo pó do palco.", idTrait:"terno azul" },
        { id:"cafe-tortoni", name:"Café Tortoni", icon:"☕", hint:"Mesa 7", hasClue:true, clueType:"negative",
          witness:{name:"GARÇOM DIEGO",role:"Garçom",avatar:"D"},
          geoClue:"Perguntou sobre o barco para Havana, onde 'o tango continua'.",
          negClue:"Nenhum perfume. Para um homem tão vaidoso, estranho.", negTrait:"perfume forte" },
        { id:"boca-caminito", name:"Caminito", icon:"🎨", hint:"Milonga de rua", hasClue:false,
          witness:{name:"BAILARINO TATO",role:"Bailarino",avatar:"T"},
          noClue:"Muitos dançarinos de terno, nenhum com pressa suspeita." },
        { id:"puerto-madero", name:"Puerto Madero", icon:"⚓", hint:"Docas", hasClue:false,
          witness:{name:"ESTIVADOR RAMÓN",role:"Estivador",avatar:"R"},
          noClue:"Movimento normal de carga. Nada de broches." }
      ],
      "Havana":[
        { id:"malecon", name:"Malecón", icon:"🌊", hint:"Muro do mar", hasClue:true, clueType:"negative",
          witness:{name:"PESCADOR CHANO",role:"Pescador",avatar:"C"},
          geoClue:"O tango continua em Nova York, sussurrou ele ao mar.",
          negClue:"Bem mais jovem do que diziam, e sem cabelos grisalhos. Fios negros penteados para trás.", negTrait:"cabelos grisalhos" },
        { id:"habana-vieja", name:"Habana Vieja", icon:"🏛️", hint:"Passaporte falso", hasClue:true, clueType:"positive",
          witness:{name:"FALSÁRIO PABLO",role:"Falsário",avatar:"P"},
          geoClue:"Comprou um passaporte falso com destino a Nova York.", noClue:"" },
        { id:"vedado-club", name:"Clube Vedado", icon:"🎺", hint:"Son cubano", hasClue:false,
          witness:{name:"TROMPETISTA NINO",role:"Músico",avatar:"N"},
          noClue:"Um argentino tenso assistiu ao show, mas não dançou." }
      ],
      "Nova York":[
        { id:"met-museum", name:"Metropolitan Museum", icon:"🏛️", hint:"Ala de joias", hasClue:true, clueType:"positive",
          witness:{name:"CURADORA SUSAN",role:"Curadora",avatar:"S"},
          geoClue:"Ele fica em Nova York. 'O último tango é meu', avisou.",
          idClue:"Uma cicatriz cruzava o rosto, mal disfarçada pela maquiagem.", idTrait:"cicatriz no rosto" },
        { id:"central-park", name:"Central Park", icon:"🌳", hint:"Encontro marcado", hasClue:true, clueType:"positive",
          witness:{name:"JOGADOR MARCUS",role:"Enxadrista",avatar:"M"},
          geoClue:"Marcou a venda no parque, ao meio-dia. Ele fica na cidade.",
          idClue:"Moveu as peças com a mão esquerda, anel brilhando ao sol.", idTrait:"mão esquerda" },
        { id:"brooklyn-bridge", name:"Ponte do Brooklyn", icon:"🌉", hint:"Travessia", hasClue:false,
          witness:{name:"FOTÓGRAFA ANN",role:"Fotógrafa",avatar:"A"},
          noClue:"Nenhum homem de terno azul cruzou a ponte hoje." },
        { id:"times-square", name:"Times Square", icon:"🌃", hint:"Multidão", hasClue:false,
          witness:{name:"VENDEDOR LOU",role:"Ambulante",avatar:"L"},
          noClue:"Multidão demais para notar uma cicatriz." }
      ],
      "Rio de Janeiro":[
        { id:"lapa-arcos", name:"Arcos da Lapa", icon:"🎭", hint:"Isca", hasClue:true, clueType:"positive",
          witness:{name:"MALANDRO ZÉ",role:"Boêmio",avatar:"Z"},
          geoClue:"ERA UMA ISCA! O corretor riu: 'o homem da cicatriz dança o último tango em Nova York'.", noClue:"" },
        { id:"maracana", name:"Maracanã", icon:"🏟️", hint:"Despiste", hasClue:true, clueType:"positive",
          witness:{name:"CAMBISTA RAFA",role:"Cambista",avatar:"R"},
          geoClue:"O impostor confessou: o broche será vendido em Nova York.", noClue:"" },
        { id:"cristo-rio", name:"Cristo Redentor", icon:"⛪", hint:"Pista fria", hasClue:false,
          witness:{name:"GUIA NEIDE",role:"Guia",avatar:"N"},
          noClue:"Nada. A pista era fria desde o início." }
      ]
    }
  };
})();