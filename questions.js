// Událost naslouchající načtení stránky
window.addEventListener("load", function () {
  // Definice třídy EasyQuiz
  class EasyQuiz {
    constructor() {
      // Pole otázek pro lehký kvíz
      this.questions = [
        {
          question: "Kolik prstů má lidská noha?",
          options: ["5", "10", "20"],
          correctAnswer: "5",
        },
        {
          question: "Kolik je 15 - 5?",
          options: ["5", "10", "15"],
          correctAnswer: "10",
        },
        {
          question: "Chemický vzorec pro vodu je:",
          options: ["H2O2", "CO2", "H2O"],
          correctAnswer: "H2O",
        },
        {
          question: "Kolik stěn má pyramida?",
          options: ["3", "4", "5"],
          correctAnswer: "4",
        },
        {
          question: "Kdo napsal knihu 'Romeo a Julie'?",
          options: ["William Shakespeare", "George Orwell", "J.K. Rowling"],
          correctAnswer: "William Shakespeare",
        },
        {
          question: "Kolik strun má klasická kytara?",
          options: ["4", "5", "6"],
          correctAnswer: "6",
        },
        {
          question: "Jaká planeta je nejblíže ke Slunci?",
          options: ["Merkur", "Mars", "Venuše"],
          correctAnswer: "Merkur",
        },
        {
          question: "Na co píšeme perem?",
          options: ["Stůl", "Židle", "Papír"],
          correctAnswer: "Papír",
        },
        {
          question: "Kdo je autorem malby 'Mona Lisa'?",
          options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh"],
          correctAnswer: "Leonardo da Vinci",
        },
      ];
    }
  }

  // Definice třídy NormalQuiz
  class NormalQuiz {
    constructor() {
      // Pole otázek pro střední kvíz
      this.questions = [
        {
          question: "Jaký je počet planet ve Sluneční soustavě?",
          options: ["6", "8", "10"],
          correctAnswer: "8",
        },
        {
          question: "Které z těchto měst je známé svou hradní pevností, zapsanou na seznamu UNESCO?",
          options: ["Kutná Hora", "Český Krumlov", "Tábor"],
          correctAnswer: "Český Krumlov"
        },
        {
          question: "Kde se nachází Eiffelova věž?",
          options: ["Paříž", "Londýn", "New York"],
          correctAnswer: "Paříž",
        },
        {
          question: "Jaká je největší planeta ve sluneční soustavě?",
          options: ["Mars", "Venuše", "Jupiter"],
          correctAnswer: "Jupiter",
        },
        {
          question: "Kolik je hracích karet v balíčku?",
          options: ["48", "52", "56"],
          correctAnswer: "52",
        },
        {
          question: "Které z těchto míst leýí na mapě nejníže?",
          options: ["Austrálie", "Rusko", "Kanada"],
          correctAnswer: "Austrálie",
        },
        {
          question: "Kolik kontinentů je na Zemi?",
          options: ["5", "6", "7"],
          correctAnswer: "7",
        },
        {
          question: "Jaký je nejvyšší vrchol světa?",
          options: ["Mount Everest", "Sněžka", "Matterhorn"],
          correctAnswer: "Mount Everest",
        },
        {
          question: "Kde se nachází Velká čínská zeď?",
          options: ["Čína", "Indie", "USA"],
          correctAnswer: "Čína",
        },
        {
          question: "Jaký je největší oceán na světě?",
          options: ["Atlantský oceán", "Tichý oceán", "Indický oceán"],
          correctAnswer: "Tichý oceán",
        },
        {
          question: "Kolik je základních prvků v periodické tabulce?",
          options: ["92", "118", "63"],
          correctAnswer: "118",
        },
        {
          question: "Jaký je největší ostrov na světě?",
          options: ["Madagaskar", "Kuba", "Grónsko"],
          correctAnswer: "Grónsko",
        },
        {
          question: "Jaký je oficiální jazyk v Brazílii?",
          options: ["Portugalština", "Španělština", "Angličtina"],
          correctAnswer: "Portugalština",
        },
        {
          question: "Jaký je hlavní město Japonska?",
          options: ["Tokio", "Peking", "Seoul"],
          correctAnswer: "Tokio",
        },
        {
          question: "Který stát je největší na světě?",
          options: ["Rusko", "Kanada", "Čína"],
          correctAnswer: "Rusko",
        },
        {
          question: "Jak se nazývá nejdelší řeka na světě?",
          options: ["Nil", "Amazonka", "Mississippi"],
          correctAnswer: "Nil",
        },
        {
          question: "Který kontinent je známý svou pouští Sahara?",
          options: ["Afrika", "Austrálie", "Jižní Amerika"],
          correctAnswer: "Afrika",
        },
        {
          question: "Jaká je největší hora v Evropě?",
          options: ["Mont Blanc", "Elbrus", "Matterhorn"],
          correctAnswer: "Elbrus",
        },
      ];
    }
  }

  // Definice třídy HardQuiz
  class HardQuiz {
    constructor() {
      // Pole otázek pro těžký kvíz
      this.questions = [
        {
          question: "Kdo byl prvním prezidentem Spojených států amerických?",
          options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln"],
          correctAnswer: "George Washington"
        }
        {
          question: "Jak se nazývá největší oceán na světě?",
          options: ["Tichý oceán", "Atlantský oceán", "Indický oceán"],
          correctAnswer: "Tichý oceán"
        },
      {
          question: "Kde byla vyhlášena nezávislost Spojených států amerických?",
          options: ["New York", "Boston", "Philadelphia"],
          correctAnswer: "Philadelphia"
        },
        {
          question: "Kde se nachází Velká čínská zeď?",
          options: ["Čína", "Japonsko", "Indie"],
          correctAnswer: "Čína"
        },
        {
          question: "Jak se jmenuje největší kniha na světě?",
          options: ["Bible", "Encyklopedie", "Kniha moudrosti"],
          correctAnswer: "Bible"
        },
        {
          question: "Jaký druh zvířete je známý pro svou černou a bílou srst a je oblíbeným znakem v černobílých karikaturách?",
          options: ["Panda", "Kočka", "Medvěd"],
          correctAnswer: "Panda"
        },
        {
          question: "Jaký je hlavní náboženský text islámu?",
          options: ["Korán", "Bible", "Talmud"],
          correctAnswer: "Korán"
        },
        {
          question: "Kolik zubů má dospělý člověk obvykle v ústech?",
          options: ["28", "32", "36"],
          correctAnswer: "32"
        },
        {
          question: "Kdo napsal knihu 'Válka světů'?",
          options: ["H.G. Wells", "George Orwell", "Jules Verne"],
          correctAnswer: "H.G. Wells"
        },
        {
          question: "Jaký je nejdelší řeka v Americe?",
          options: ["Mississippi", "Amazonka", "Missouri"],
          correctAnswer: "Amazonka"
        },
        {
          question: "Která planeta je známá jako 'Večernice' nebo 'Ranní hvězda'?",
          options: ["Merkur", "Venuše", "Mars"],
          correctAnswer: "Venuše"
        },
        {
          question: "Kterým zvířetem je známý prales Amazonie?",
          options: ["Opice", "Jaguár", "Tukan"],
          correctAnswer: "Jaguár"
        },
        {
          question: "Jak se jmenuje největší druh levharta?",
          options: ["Lion", "Tiger", "Leopard"],
          correctAnswer: "Tiger"
        },
        {
          question: "Jaký je hlavní složení většiny sluneční soustavy?",
          options: ["Slunce a planety", "Slunce a komety", "Slunce a galaxie"],
          correctAnswer: "Slunce a planety"
        },
        {
          question: "Kolik základních druhů barvy vidí lidské oko?",
          options: ["2", "3", "4"],
          correctAnswer: "3"
        },
        {
          question: "Která planeta je známá jako 'Červená planeta'?",
          options: ["Merkur", "Venuše", "Mars"],
          correctAnswer: "Mars"
        },
      {
          question: "Který hmyz vytváří med?",
          options: ["Včela", "Motýl", "Mravenec"],
          correctAnswer: "Včela"
        },
        {
          question: "Kterým rokem skončila druhá světová válka?",
          options: ["1945", "1939", "1951"],
          correctAnswer: "1945"
        },
        {
          question: "Jaký druh zvířete je známý pro své dlouhé krkavce?",
          options: ["Žirafa", "Slon", "Klokan"],
          correctAnswer: "Žirafa"
        },
        {
          question: "Která zvířata obývají Austrálii a jsou známá pro svou vakuovou měchuřinu?",
          options: ["Klokani", "Kanguru", "Vombati"],
          correctAnswer: "Klokani"
        },
        {
          question: "Jak se jmenuje nejvyšší vrchol v Severní Americe?",
          options: ["Mount McKinley", "Mount Everest", "Mount Kilimanjaro"],
          correctAnswer: "Mount McKinley"
        },
        {
          question: "Jakým zvířetem je známý dánský spisovatel Hans Christian Andersen?",
          options: ["Labuť", "Malá mořská víla", "Pohádková kočka"],
          correctAnswer: "Malá mořská víla"
        },
        {
          question: "Kdo byl prvním člověkem na Měsíci?",
          options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin"],
          correctAnswer: "Neil Armstrong"
        },
        {
          question: "Kde se nachází Machu Picchu?",
          options: ["Peru", "Bolívie", "Kolumbie"],
          correctAnswer: "Peru"
        },
        {
          question: "Jak se jmenuje největší kontinent na Zemi?",
          options: ["Africký kontinent", "Jižní Amerika", "Asie"],
          correctAnswer: "Asie"
        },
        {
          question: "Kdo byl prezidentem USA během americké občanské války?",
          options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"],
          correctAnswer: "Abraham Lincoln"
        },
        {
          question: "Jak se jmenuje nejhlubší příkop na světě?",
          options: ["Tichý příkop", "Mariánský příkop", "Hluboký příkop"],
          correctAnswer: "Mariánský příkop"
        },
        {
          question: "Kdo napsal knihu 'Romeo a Julie'?",
          options: ["William Shakespeare", "Charles Dickens", "Jane Austen"],
          correctAnswer: "William Shakespeare"
        },
        {
          question: "Jak se nazývá největší poušť na světě?",
          options: ["Sahara", "Gobi", "Atacama"],
          correctAnswer: "Sahara"
        },
        {
          question: "Který prvek je nejběžnější v zemské kůře?",
          options: ["Kyslík", "Uhličitan vápenatý", "Hlinitan sodný"],
          correctAnswer: "Kyslík"
        },
        
      ];
    }
  }

  // Funkce pro zamíchání otázek v poli
  function shuffleQuestions(questions) {
    // Prochází otázky od konce k začátku
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      // Prohazuje otázky na pozicích i a j v poli
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    // Vrací pole otázek po zamíchání
    return questions;
  }

  // Podmínky pro kontrolu URL adresy a spuštění kvízu odpovídající obtížnosti
  if (window.location.href.includes("easy.html")) {
    startQuiz(new EasyQuiz());
  } else if (window.location.href.includes("normal.html")) {
    startQuiz(new NormalQuiz());
  } else if (window.location.href.includes("hard.html")) {
    startQuiz(new HardQuiz());
  }

});
