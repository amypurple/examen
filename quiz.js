const HTMLnumero = document.getElementById("numero");
const HTMLpoints = document.getElementById("points");
const HTMLtotal = document.getElementById("total");
const HTMLquestion = document.getElementById("question");
const HTMLchoix = document.getElementById("choix");
const HTMLminutes = document.getElementById("minutes");
const HTMLsecondes = document.getElementById("secondes");

var points = 0;
var numero = 0;
var total = 0; 
var temps = 0; // temps en secondes

var horloge;

var clickable = true;
var quiz = true;

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function updateClock() {
    HTMLminutes.innerHTML = Math.floor(temps/60);
    HTMLsecondes.innerHTML = pad(temps % 60,2);
}

function startQuiz() {
    quiz = true;
    numero = -1;
    points = 0;
    total = data.length;
    temps = 600;
    updateClock();
    horloge = setInterval(()=> {
        temps--;
        updateClock();
        if (temps == 0) {
            quiz = false;
            clickable = false;
            stopClock();
            alert("Temps Écoulé");
        }
    }, 1000);
    HTMLtotal.innerHTML = total;
    loadNextQuestion();
}

function stopClock() {
    clearInterval(horloge);
}

function loadNextQuestion() {
    numero++;
    if (numero<total) {
        HTMLnumero.innerHTML = (numero+1)+".";
        HTMLpoints.innerHTML = points;
        HTMLquestion.innerHTML = data[numero].question;

        let choix = data[numero].choix;
        let reponse = data[numero].reponse;

        HTMLchoix.innerHTML = "";

        let i;
        for (i=0;i<choix.length;i++) {
            let div = document.createElement("div");
            div.id = "choix"+(i+1);
            div.innerHTML = choix[i];
            div.classList.add("choix");
            div.classList.add("light");
            if (reponse == i+1) {    
                div.addEventListener("click", (e) => {
                    if (clickable && quiz)
                    {
                        e.currentTarget.classList.add("good");
                        removeLightsEffect();                        
                        points++;
                        HTMLpoints.innerHTML = points;
                        clickable = false;
                    } else {
                        if (quiz) loadNextQuestion();
                    }
                });
            } else {
                div.addEventListener("click", (e) => {
                    if (clickable && quiz)
                    {
                        e.currentTarget.classList.add("bad");
                        reveal();
                        clickable = false;
                    } else {
                        if (quiz) loadNextQuestion();
                    }
                });
            }
            HTMLchoix.appendChild(div);
        }

        clickable = true;
    } else {
        stopClock();
        alert("Quiz Terminé");
    }
}

function removeLightsEffect() {
    let i;
    let choix;
    for (i=0;i<data[numero].choix.length;i++) {
        choix = document.getElementById("choix"+(i+1));
        choix.classList.remove("light");
    }
}

function reveal() {
    let bonChoix = document.getElementById("choix"+(data[numero].reponse));
    bonChoix.classList.add("good");
    removeLightsEffect();
}

var data = [
    {
        "question":"Vrai ou faux ? La phase de conception permet de spécifier dans les grandes lignes comment l'application Web doit se comporter tel que perçu par l'utilisateur",
        "choix": [
            "Vrai",
            "Faux"
        ],
        "reponse": 1
    },
    {
        "question":"Que signifie « modéliser » un logiciel",
        "choix":[
            "Réalisation des tests de validation d’un logiciel",
            "Représentation à l’aide de différents diagrammes",
            "Écriture de l’algorithme d’un logiciel",
            "Modification d’un logiciel existant",
            "Toutes ces réponses"],
        "reponse": 2
    },
    {
        "question":"Qu'est ce que le contexte d'un système ou logiciel",
        "choix": ["Les systèmes en relation avec le système","Les relations du logiciel","C’est l’environnement direct du logiciel","Les cas d'utilisation du système","Aucune de ces réponses"],
        "reponse": 3
    },
    {
        "question":"Quel est la relation entre deux cas d'utilisation qui indique que le second cas d'utilisation est toujours exécuté",
        "choix": [
            "Exclude",
            "Include",
            "Extend",
            "Association",
            "Aucune de ces réponses"
        ],
        "reponse": 2
    },
    {
        "question":"Qui suis-je ? Je suis considéré comme un référentiel partagé par un prestataire de service et l’équipe interne.",
        "choix": [
            "Cahier de production",
            "Diagramme de cas d'utilisation",
            "UML",
            "Cahier des charges",
            "Aucune de ces réponses"
        ],
        "reponse": 4
    },
    {
        "question":"Qui suis-je ? Une collection d’activité pour produire un résultat pour un client ou un marché.",
        "choix":[
            "Un cas d'utilisation",
            "Diagramme de classe",
            "Business Process Modeling Notation",
            "Processus métier",
            "Aucune de ces réponses"
        ],
        "reponse": 4
    },
    {
        "question":"Qu'est ce que UML",
        "choix": [
            "Un langage de modélisation",
            "Un langage de développement objet",
            "Une démarche de définition de logiciel",
            "Une méthode de gestion de projet",
            "Aucune de ces réponses"
        ],
        "reponse": 1
    },
    {
        "question" : "De combien de diagrammes se compose UML",
        "choix" : [
            "4 + 1 diagrammes",
            "9 diagrammes",
            "Une vingtaine de diagrammes",
            "14 diagrammes",
            "Aucune des ces réponses"
        ],
        "reponse" : 4
    },
    {
        "question" : "Dans quel axe de la phase conception que nous découpons les données en entités-relations",
        "choix" : [
            "Travail",
            "Fonctions",
            "Information",
            "Architecture de l'intreface",
            "Aucune de ces réponses"
        ],
        "reponse" : 3
    },
    {
        "question" : "Dans quel phase est surtout utilisée le diagramme de cas d'utilisation",
        "choix" : [
            "Phase Analyse",
            "Phase Conception",
            "Phase Réalisation",
            "Phase déploiement",
            "Aucune des ces réponses"
        ],
        "reponse" : 1
    },
    {
        "question"  :"Qu'allez-vous trouver dans le diagramme de cas d'utilisation d'une application Web",
        "choix" : [
            "object d'information",
            "logiciel à utiliser",
            "les fonctions de l'application",
            "toutes ces réponses"
        ],
        "reponse" : 3
    },
    {
        "question" : "Quel langage sert de squelette de l'application sur un fureteur?",
        "choix" : [
            "HTML",
            "C#",
            "CSS",
            "Javascript",
            "Aucune de ces réponses"
        ],
        "reponse" : 1
    },
    {
        "question" : "Quel démarche préconise UML?",
        "choix" : [
            "En cascade",
            "Agile",
            "Démarche à petits pas",
            "Waterfall",
            "Aucune de ces réponses"
        ],
        "reponse" : 5
    },
    {
        "question" : "Qui suis-je ? un ensemble organisé de ressources (matériels, logiciels, applications) qui permet de collecter, regrouper, classifier, traiter et diffuser de l'information dans un environnement donné",
        "choix": [
            "Système d'information",
            "Système informatique",
            "Le Web",
            "Un processus",
            "Aucune de ces réponses"
        ],
        "reponse" : 2
    },
    {
        "question" : "Quelle rôle dans la conception des sites Web a comme fonction de nous permettre de mesurer le succès notre site Web ?",
        "choix" : [
            "Le devOps",
            "L'assurance qualité",
            "Le représentant d'affaires",
            "Le designer Web",
            "Aucune de ces réponses"
        ],
        "reponse" : 3
    },
    {
        "question" : "Quel outil sur le Web nous permet d'être connu par nos clients ?Immersive Reader",
        "choix" : [
            "L'hébergement",
            "L'infonuagique",
            "Les moteurs de recherche (Google, Bing, ...)",
            "Les systèmes de nom de domaines (DNS)",
            "Toutes ces réponses"
        ],
        "reponse":3
    },
    {
        "question":"Quel est la composante utilisée pour afficher une page en HTML sur l’ordinateur d’un usager ?Immersive Reader",
        "choix" : [
            "Une base de données",
            "Un fureteur",
            "Un serveur",
            "Le langage Javascript",
            "Aucune de ces réponses"    
        ],
        "reponse" : 2
    },
    {
        "question" : "Quel modèle se retrouve entre le modèle mental de l’utilisateur et le modèle de l’implantation de votre application ?Immersive Reader",
        "choix" : [
            "Le modèle de cas d'utilisation",
            "Le modèle d'information de la base de donnée",
            "Le modèle de l'interface",
            "Le fureteur",
            "Aucune de ces réponses"
        ],
        "reponse" : 3
    }
];

startQuiz();