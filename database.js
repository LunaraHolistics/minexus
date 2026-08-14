/**
 * NEXUS DATABASE v5.0 — NÚCLEO (limpo, sem espaços extras)
 * cities + routes + suspects | casos vêm de cases/*.js (manifesto abaixo)
 */
const NEXUS_DATABASE = {
  version:"5.0",

  cities: {
   "Cusco":{country:"Peru",tz:"UTC-5",lat:-13.5319,lon:-71.9675,photo:"../img/cidade-cusco.jpg",keywords:["cusco","peru","peruano","inca"]},
   "Lima":{country:"Peru",tz:"UTC-5",lat:-12.0464,lon:-77.0428,photo:"../img/cidade-lima.jpg",keywords:["lima","peru","peruano"]},
   "Tóquio":{country:"Japão",tz:"UTC+9",lat:35.6762,lon:139.6503,photo:"../img/cidade-toquio.jpg",keywords:["japão","japonês","cerejeiras","oriente","sol nasce","yen","iene","tokyo","kyoto","nippon"]},
   "Kyoto":{country:"Japão",tz:"UTC+9",lat:35.0116,lon:135.7681,photo:"../img/cidade-kyoto.jpg",keywords:["japão","japonês","cerejeiras","oriente","yen","iene","tokyo","kyoto"]},
   "Paris":{country:"França",tz:"UTC+1",lat:48.8566,lon:2.3522,photo:"../img/cidade-paris.jpg",keywords:["frança","paris","francês","europeu","eiffel","louvre","senne","charles de gaulle"]},
   "Rio de Janeiro":{country:"Brasil",tz:"UTC-3",lat:-22.9068,lon:-43.1729,photo:"../img/cidade-rio.jpg",keywords:["rio","rio de janeiro","brasil","brasileiro","lapa","maracanã"]},
   "Cairo":{country:"Egito",tz:"UTC+2",lat:30.0444,lon:31.2357,photo:"../img/cidade-cairo.jpg",keywords:["cairo","egito","egípcio","nile","nilo","faraó"]},
   "Luxor":{country:"Egito",tz:"UTC+2",lat:25.6872,lon:32.6396,photo:"../img/cidade-luxor.jpg",keywords:["luxor","egito","egípcio","karnak"]},
   "Londres":{country:"Reino Unido",tz:"UTC+0",lat:51.5074,lon:-0.1278,photo:"../img/cidade-londres.jpg",keywords:["londres","inglaterra","britânico","reino unido","tâmisa","big ben"]},
   "Atenas":{country:"Grécia",tz:"UTC+2",lat:37.9838,lon:23.7275,photo:"../img/cidade-atenas.jpg",keywords:["atenas","grécia","grego","acrópole"]},
   "Viena":{country:"Áustria",tz:"UTC+1",lat:48.2082,lon:16.3738,photo:"../img/cidade-viena.jpg",keywords:["viena","áustria","austríaco","valsa"]},
   "Praga":{country:"República Tcheca",tz:"UTC+1",lat:50.0755,lon:14.4378,photo:"../img/cidade-praga.jpg",keywords:["praga","tcheca","tcheco","boêmia","moldava"]},
   "Berlim":{country:"Alemanha",tz:"UTC+1",lat:52.52,lon:13.405,photo:"../img/cidade-berlim.jpg",keywords:["berlim","alemanha","alemão","brandemburgo"]},
   "Moscou":{country:"Rússia",tz:"UTC+3",lat:55.7558,lon:37.6173,photo:"../img/cidade-moscou.jpg",keywords:["moscou","rússia","russo","kremlin"]},
   "Buenos Aires":{country:"Argentina",tz:"UTC-3",lat:-34.6037,lon:-58.3816,photo:"../img/cidade-buenos-aires.jpg",keywords:["buenos aires","argentina","argentino","tango","portenho"]},
   "Havana":{country:"Cuba",tz:"UTC-5",lat:23.1136,lon:-82.3666,photo:"../img/cidade-havana.jpg",keywords:["havana","cuba","cubano","malecón"]},
   "Nova York":{country:"EUA",tz:"UTC-5",lat:40.7128,lon:-74.006,photo:"../img/cidade-nova-york.jpg",keywords:["nova york","new york","eua","americano","manhattan","brooklyn"]},
   "São Petersburgo":{country:"Rússia",tz:"UTC+3",lat:59.9311,lon:30.3609,photo:"../img/cidade-sao-petersburgo.jpg",keywords:["petersburgo","rússia","russo","hermitage"]},
   "Pequim":{country:"China",tz:"UTC+8",lat:39.9042,lon:116.4074,photo:"../img/cidade-pequim.jpg",keywords:["pequim","china","chinês","beijing"]},
   "Xangai":{country:"China",tz:"UTC+8",lat:31.2304,lon:121.4737,photo:"../img/cidade-xangai.jpg",keywords:["xangai","china","chinês","shanghai"]},
   "Mumbai":{country:"Índia",tz:"UTC+5:30",lat:19.076,lon:72.8777,photo:"../img/cidade-mumbai.jpg",keywords:["mumbai","índia","indiano","bombaim"]},
   "Cidade do México":{country:"México",tz:"UTC-6",lat:19.4326,lon:-99.1332,photo:"../img/cidade-mexico.jpg",keywords:["méxico","mexicano","asteca"]},
   "Estocolmo":{country:"Suécia",tz:"UTC+1",lat:59.3293,lon:18.0686,photo:"../img/cidade-estocolmo.jpg",keywords:["estocolmo","suécia","sueco"]},
   "Roma":{country:"Itália",tz:"UTC+1",lat:41.9028,lon:12.4964,photo:"../img/cidade-roma.jpg",keywords:["roma","itália","italiano","coliseu"]},
   "Kiev":{country:"Ucrânia",tz:"UTC+2",lat:50.4501,lon:30.5234,photo:"../img/cidade-kiev.jpg",keywords:["kiev","ucrania","ucraniano"]},
   "Zurique":{country:"Suíça",tz:"UTC+1",lat:47.3769,lon:8.5417,photo:"../img/cidade-zurique.jpg",keywords:["zurique","suíça","suico","alpes"]},
   "Bruxelas":{country:"Bélgica",tz:"UTC+1",lat:50.8503,lon:4.3517,photo:"../img/cidade-bruxelas.jpg",keywords:["bruxelas","bélgica","belga"]}
  },

  routes: {
    Cusco_Lima:{distance:1100,car:18,flight:1.5,flightWait:2},
    Lima_Tóquio:{distance:15500,car:null,flight:18,flightWait:3,connection:"Los Angeles"},
    Tóquio_Paris:{distance:9700,car:null,flight:12,flightWait:3,connection:"Dubai"},
    Paris_Rio_de_Janeiro:{distance:9200,car:null,flight:11,flightWait:3},
    Cusco_Tóquio:{distance:16200,car:null,flight:20,flightWait:3,connection:"Lima"},
    Cusco_Paris:{distance:10300,car:null,flight:13,flightWait:3,connection:"Lima"},
    Paris_Berlim:{distance:880,car:10,flight:1.5,flightWait:2},
    Paris_Londres:{distance:340,car:6,flight:1,flightWait:2},
    Tóquio_Kyoto:{distance:480,car:6,flight:1,flightWait:1},
    Cairo_Luxor:{distance:650,car:9,flight:1,flightWait:2},
    Cairo_Londres:{distance:3500,car:null,flight:5,flightWait:3},
    Luxor_Londres:{distance:3900,car:null,flight:5.5,flightWait:3,connection:"Cairo"},
    Cairo_Atenas:{distance:1100,car:null,flight:2,flightWait:3},
    Atenas_Londres:{distance:2400,car:null,flight:4,flightWait:3},
    Luxor_Atenas:{distance:1300,car:null,flight:2.5,flightWait:3},
    Viena_Praga:{distance:290,car:4,flight:1,flightWait:2},
    Praga_Berlim:{distance:350,car:4.5,flight:1,flightWait:2},
    Berlim_Moscou:{distance:1600,car:null,flight:2.5,flightWait:3},
    Viena_Moscou:{distance:1650,car:null,flight:2.5,flightWait:3},
    Praga_Moscou:{distance:1650,car:null,flight:2.5,flightWait:3},
    Viena_Berlim:{distance:520,car:6,flight:1,flightWait:2},
    Buenos_Aires_Havana:{distance:7600,car:null,flight:9,flightWait:3,connection:"Panamá"},
    Havana_Nova_York:{distance:2100,car:null,flight:3.5,flightWait:3},
    Buenos_Aires_Rio_de_Janeiro:{distance:1950,car:null,flight:3,flightWait:2},
    Havana_Rio_de_Janeiro:{distance:8200,car:null,flight:10,flightWait:3},
    Rio_de_Janeiro_Nova_York:{distance:7700,car:null,flight:9.5,flightWait:3}
  },

  suspects: [
    {id:"chronos",name:"Dr. Chronos",alias:"O Colecionador do Tempo",initial:"D",nationality:"Francesa",age:"48 anos",portrait:"../img/suspeito-chronos.jpg",home:{city:"Paris",country:"França"},quote:"O tempo, afinal, não esteve ao meu lado.",traits:["chapéu panamá","sotaque francês","anel de sinete","mão esquerda","cabelos grisalhos","terno azul"]},
    {id:"fontaine",name:"M. Fontaine",alias:"O Diplomata",initial:"F",nationality:"Belga",age:"43 anos",portrait:"../img/suspeito-fontaine.jpg",home:{city:"Bruxelas",country:"Bélgica"},quote:"Diplomatas não mentem; apenas embelezam a verdade.",traits:["chapéu panamá","sotaque francês","anel de sinete","cabelos loiros","relógio de ouro"]},
    {id:"fantasma",name:"El Fantasma",alias:"O Ladrão de Havana",initial:"F",nationality:"Cubana",age:"41 anos",portrait:"../img/suspeito-fantasma.jpg",home:{city:"Havana",country:"Cuba"},quote:"Da próxima vez, não deixarei rastros.",traits:["chapéu panamá","sotaque francês","anel de sinete","cabelos negros","cicatriz no rosto","perfume forte"]},
    {id:"silhouette",name:"A. Silhouette",alias:"A Sombra de Praga",initial:"S",nationality:"Tcheca",age:"52 anos",portrait:"../img/suspeito-silhouette.jpg",home:{city:"Praga",country:"República Tcheca"},quote:"As sombras me aguardam. Sempre aguardam.",traits:["chapéu panamá","sotaque francês","anel de sinete","cabelos grisalhos","terno escuro","luvas de couro"]},
    {id:"vex",name:"Victor Vex",alias:"O Ilusionista",initial:"V",nationality:"Alemã",age:"39 anos",portrait:"../img/suspeito-vex.jpg",home:{city:"Berlim",country:"Alemanha"},quote:"Vocês nunca viram o truque verdadeiro.",traits:["chapéu panamá","sotaque francês","cabelos loiros","óculos escuros","relógio de ouro","sotaque alemão"]},
    {id:"zorya",name:"Madame Zorya",alias:"A Cigana de Kiev",initial:"Z",nationality:"Ucraniana",age:"45 anos",portrait:"../img/suspeito-zorya.jpg",home:{city:"Kiev",country:"Ucrânia"},quote:"As cartas já previam esta cela.",traits:["sotaque francês","anel de sinete","cabelos negros","perfume forte"]},
    {id:"lotus",name:"Iron Lotus",alias:"A Espiã de Xangai",initial:"L",nationality:"Chinesa",age:"37 anos",portrait:"../img/suspeito-lotus.jpg",home:{city:"Xangai",country:"China"},quote:"Profissionalmente falando... bem jogado.",traits:["sotaque francês","anel de sinete","mão esquerda","perfume forte"]},
    {id:"kage",name:"Kage Ryū",alias:"O Camaleão de Kyoto",initial:"K",nationality:"Japonesa",age:"44 anos",portrait:"../img/suspeito-kage.jpg",home:{city:"Kyoto",country:"Japão"},quote:"Você capturou apenas uma das minhas faces.",traits:["chapéu panamá","anel de sinete","óculos escuros","luvas de couro"]},
    {id:"corvo",name:"O Corvo",alias:"Desconhecido",initial:"C",nationality:"Russa",age:"55 anos",portrait:"../img/suspeito-corvo.jpg",home:{city:"Moscou",country:"Rússia"},quote:"...",traits:["anel de sinete","cabelos grisalhos","barba","cicatriz no rosto"]},
    {id:"caruso",name:"G. Caruso",alias:"O Maestro",initial:"G",nationality:"Italiana",age:"50 anos",portrait:"../img/suspeito-caruso.jpg",home:{city:"Roma",country:"Itália"},quote:"Todo crime é uma ópera em um ato.",traits:["chapéu panamá","anel de sinete","cabelos grisalhos","charuto"]},
    {id:"blackwood",name:"J. Blackwood",alias:"O Lord",initial:"J",nationality:"Britânica",age:"58 anos",portrait:"../img/suspeito-blackwood.jpg",home:{city:"Londres",country:"Reino Unido"},quote:"Um cavalheiro nunca se atrasa.",traits:["anel de sinete","cabelos grisalhos","barba","terno escuro"]},
    {id:"moreno",name:"R. Moreno",alias:"O Fantasma de Buenos Aires",initial:"M",nationality:"Argentina",age:"46 anos",portrait:"../img/suspeito-moreno.jpg",home:{city:"Buenos Aires",country:"Argentina"},quote:"O tango ensina a escapar por entre os passos.",traits:["terno azul","cicatriz no rosto","mão esquerda","barba"]},
    {id:"nefertari",name:"Layla Nefertari",alias:"A Sacerdotisa",initial:"N",nationality:"Egípcia",age:"35 anos",portrait:"../img/suspeito-nefertari.jpg",home:{city:"Cairo",country:"Egito"},quote:"O Nilo guarda o que é meu.",traits:["perfume forte","cabelos negros","cicatriz no rosto"]},
    {id:"schneider",name:"H. Schneider",alias:"O Relojoeiro",initial:"H",nationality:"Suíça",age:"47 anos",portrait:"../img/suspeito-schneider.jpg",home:{city:"Zurique",country:"Suíça"},quote:"Cada segundo tem o seu preço.",traits:["óculos escuros","cabelos loiros","relógio de ouro","charuto"]},
    {id:"volkov",name:"D. Volkov",alias:"O Mercador",initial:"V",nationality:"Russa",age:"51 anos",portrait:"../img/suspeito-volkov.jpg",home:{city:"Moscou",country:"Rússia"},quote:"Tudo está à venda. Inclusive álibis.",traits:["cicatriz no rosto","mão esquerda","terno escuro","barba"]},
    {id:"andersson",name:"K. Andersson",alias:"A Herdeira",initial:"K",nationality:"Sueca",age:"40 anos",portrait:"../img/suspeito-andersson.jpg",home:{city:"Estocolmo",country:"Suécia"},quote:"Herdei o gosto pelo que não me pertence.",traits:["cabelos loiros","terno azul","relógio de ouro"]}
  ],

  cases: {} // preenchido por cases/*.js
};
window.NEXUS_DATABASE = NEXUS_DATABASE;

// MANIFESTO — novo caso = 1 linha aqui + 1 arquivo em cases/
(function(){
  var CASE_FILES = [
   "caso-01-sombria-aurora.js",
   "caso-02-sombras-do-nilo.js",
   "caso-03-valsa-do-crepusculo.js",
   "caso-04-tango-de-sangue.js"
  ];
  for (var i = 0; i < CASE_FILES.length; i++){
    document.write('<script src="../cases/' + CASE_FILES[i] + '"><\/script>');
  }
})();