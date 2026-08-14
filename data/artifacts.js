/**
 * NEXUS DATA — CATÁLOGO DE ARTEFATOS (16)
 * A origem de cada artefato define a cidade inicial do roubo.
 * objectClues = pistas observáveis deixadas na cena (amarram o objeto ao caso).
 */
const NEXUS_ARTIFACTS = [
  { id:"mascara-inca", name:"Máscara Dourada Inca", icon:"🎭", image:"../img/artefato-mascara-inca.jpg", origin:"Cusco", culture:"Inca", era:"séc. XV",
    desc:"Máscara funerária de ouro batido com olhos de turquesa.", objectClues:["fios de ouro arrancados do altar","veludo do mostruário rasgado"] },
  { id:"olho-horus", name:"Olho de Hórus de Esmeralda", icon:"👁️", image:"../img/artefato-olho-horus.jpg", origin:"Cairo", culture:"Egípcia", era:"séc. XIII a.C.",
    desc:"Amuleto de esmeralda polida do templo de Karnak.", objectClues:["areia fina do cofre no parapeito","resíduo de incenso de mirra"] },
  { id:"ovo-faberge", name:"Ovo Fabergé 'Cisne Imperial'", icon:"🦢", image:"../img/artefato-ovo-faberge.jpg", origin:"São Petersburgo", culture:"Russa", era:"1906",
    desc:"Ovo de esmalte azul-turquesa com cisne de platina.", objectClues:["pena de cisne sintética no estojo","marcas de luva no veludo azul"] },
  { id:"rosa-negra", name:"Broche de Ônix 'La Rosa Negra'", icon:"🌹", image:"../img/artefato-broche-onix.jpg", origin:"Buenos Aires", culture:"Argentina", era:"1920",
    desc:"Broche de ônix com rubi central, lenda do tango.", objectClues:["perfume de gardênia no camarim","partitura de tango rasgada"] },
  { id:"dragao-jade", name:"Adaga de Jade do Dragão", icon:"🐉", image:"../img/artefato-dragao-jade.jpg", origin:"Pequim", culture:"Chinesa", era:"dinastia Ming",
    desc:"Adaga cerimonial de jade com guarda de ouro.", objectClues:["lascas de jade no vitral","chá de jasmim derramado"] },
  { id:"idolo-obsidiana", name:"Ídolo de Obsidiana Asteca", icon:"🗿", image:"../img/artefato-idolo-obsidiana.jpg", origin:"Cidade do México", culture:"Asteca", era:"séc. XIV",
    desc:"Ídolo de obsidiana negra do templo de Tenochtitlán.", objectClues:["pó de obsidiana no pedestal","pétalas de cempásua"] },
  { id:"coroa-lauros", name:"Coroa de Louros de Ouro", icon:"👑", image:"../img/artefato-coroa-lauros.jpg", origin:"Atenas", culture:"Grega", era:"séc. IV a.C.",
    desc:"Coroa de louros em ouro maciço de um general ateniense.", objectClues:["folha de oliveira seca no cofre","azeite antigo na fechadura"] },
  { id:"codice-atlantico", name:"Fólio do Códice Atlântico", icon:"📜", image:"../img/artefato-codice.jpg", origin:"Paris", culture:"Italiana", era:"1490",
    desc:"Fólio de Da Vinci com estudos de máquinas voadoras.", objectClues:["tinta ferrogálica no vidro","espelho para ler o texto invertido"] },
  { id:"graal", name:"Cálice do Graal", icon:"🏆", image:"../img/artefato-graal.jpg", origin:"Londres", culture:"Medieval", era:"séc. XII",
    desc:"Cálice de prata dourada da capela templária.", objectClues:["cera de vela litúrgica","vinho de missa derramado"] },
  { id:"sino-kyoto", name:"Sino de Bronze de Kyoto", icon:"🔔", image:"../img/artefato-sino-kyoto.jpg", origin:"Kyoto", culture:"Japonesa", era:"séc. VIII",
    desc:"Sino de templo com sutra gravado.", objectClues:["resina de pinho queimado","corda de sino cortada a faca"] },
  { id:"escaravelho", name:"Escaravelho de Lapislázuli", icon:"🪲", image:"../img/artefato-escaravelho.jpg", origin:"Luxor", culture:"Egípcia", era:"séc. X a.C.",
    desc:"Escaravelho de lapislázuli do Vale dos Reis.", objectClues:["linho de múmia no nicho","sal do deserto na tampa"] },
  { id:"stradivarius", name:"Stradivarius 'O Diabo Mudo'", icon:"🎻", image:"../img/artefato-stradivarius.jpg", origin:"Viena", culture:"Italiana", era:"1714",
    desc:"Violino que só 'canta' em mãos dignas.", objectClues:["breu âmbar no estojo","cavalo de crina solta"] },
  { id:"ampulheta", name:"Ampulheta de Âmbar Báltica", icon:"⏳", image:"../img/artefato-ampulheta.jpg", origin:"Berlim", culture:"Báltica", era:"séc. XVII",
    desc:"Ampulheta de âmbar com areia de ouro.", objectClues:["grãos de âmbar no tapete","cheiro de resina báltica"] },
  { id:"turbante", name:"Turbante do Marajá", icon:"💎", image:"../img/artefato-turbante.jpg", origin:"Mumbai", culture:"Indiana", era:"séc. XIX",
    desc:"Turbante cravejado com o diamante 'Luz de Punjab'.", objectClues:["seda rosa de Karnataka","pó de diamante no cofre"] },
  { id:"icone-nicolau", name:"Ícone de São Nicolau", icon:"🖼️", image:"../img/artefato-icone.jpg", origin:"Moscou", culture:"Russa", era:"séc. XVI",
    desc:"Ícone dourado com têmpera de ovo e folha de ouro.", objectClues:["têmpera descascada na moldura","cheiro de incenso de mosteiro"] },
  { id:"colar-ming", name:"Colar de Pérolas Ming", icon:"📿", image:"../img/artefato-colar-ming.jpg", origin:"Xangai", culture:"Chinesa", era:"séc. XV",
    desc:"Colar de pérolas do rio Yangtzé da corte Ming.", objectClues:["fio de seda torcido no mostruário","pérola solta no ralo"] }
];
window.NEXUS_ARTIFACTS = NEXUS_ARTIFACTS;