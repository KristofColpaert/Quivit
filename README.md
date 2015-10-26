#Real time sportwedstrijd

##Inleiding
Dit document is de leiddraad voor ons project. Hier kan je de verantwoording vinden voor alle technische keuzes alsook verdere randinformatie over het project.

###Team
We werken met vier personen aan dit project.
De taakverdeling luidt als volgt: **Kristof Colpaert** en **Martijn Loth** volgen backend en frontend en zullen aan beide domeinen bijdragen in het team. **Pieter-Jan Vandenbussche** volgt backend en **Bart Callant** volgt enkel frontend.
Verder helpen we elkaar bij moeilijkheden.

##Gebruikerseisen
###Algemene beschrijving
We streven ernaar om via onze applicatie real time weer te geven waar de spelers en de bal zich in een voetbalspel bevinden. Deze data wordt rechtstreeks getoond in een webinterface tijdens de wedstrijd en opgeslagen voor latere analyse. Op basis van de gegevens kunnen bijvoorbeeld ook heat maps opgesteld worden. 

De data wordt gegenereerd door een wisselwerking van beacons (verzenden BlueTooth-signalen) en Raspberry Pi's (ontvangen BlueTooth-signalen). Op basis van de signaalsterkte, kan gemeten worden hoe ver een bepaalde beacon zich bevindt van een Raspberry Pi. Door al deze gegevens te combineren, kunnen we exacte locaties van de beacons bepalen.

###Meerwaarde voor de gebruiker
1. De gebruiker beschikt over extra real time informatie tijdens de wedstrijd.
2. Tijdens of na de wedstrijd kunnen bepaalde fasen vanuit een ander standpunt herbekeken worden. Het systeem kan ook helpen bij het detecteren van doelpunten of buitenspelvallen.
3. De gebruiker kan de wedstrijd vanuit een ander perspectief bekijken. Hij kan het ook als een second screen-applicatie gebruiken tijdens de wedstrijd.
4. Het systeem beperkt zich niet tot enkel voetbalwedstrijden: het kan ook gebruikt worden voor basketbal, rugby, tennis of zelfs autoraces.

##Implementatie, methodiek en technologie

###Hardware
1. Raspberry Pi (2x)
2. BlueTooth-dongles voor Raspberry Pi (5x)
3. Estimote beacons (3x)

###Frontend
**Voor de frontend voorzien wij de volgende functionaliteit:**

1. Liveweergave van een voetbalmatch wanneer deze bezig is. Veld, spelers en bal zijn op voldoende wijze van elkaar te onderscheiden.
2. Detectie van een aantal situaties, waaronder buitenspelval en goals.
3. Achteraf kunnen wedstrijden opnieuw bekeken worden. Er kan genavigeerd worden naar een bepaald tijdstip uit de wedstrijden.
4. Er kunnnen rapporten opgesteld worden over een wedstrijd: heat maps en overzichten van cruciale fases (bijvoorbeeld de passen die leiden tot een goal).
5. Bovenstaande rapporten kunnen in een PDF gegoten worden.
6. Er is managementinterface voorzien waarin kan aangegeven worden welke speler gekoppeld is aan welke beacon en welke device de bal voorstelt.

**Voor de frontend voorzien wij de volgende technologieën:**

1. Een framework (allicht AngularJS)
2. CSS preprocessor (LESS of SASS)
3. Task runner (Gulp)
4. Frontend testing (Jasmine of Mocha)

###Backend
**Voor de backend voorzien wij de volgende functionaliteit:**

1. Herkennen van de beacons op het veld en het registreren van hun nabijheid aan de hand van hun signaalsterkte.
2. De signaalsterkte via een algoritme omzetten in nauwkeurige locatiebepalingen. 
3. Locatiebepalingen in combinatie met een timestamp op zeer regelmatige basis (meerdere keren per seconde) opslaan in de database.
4. Genereren van rapporten op basis van de opgeslagen data van een match (zie frontend).

**Voor de backend voorzien wij de volgende technologieën:**

1. Volledig asynchrone werking in Node.JS
2. Keuze voor een bepaald framework (Express)
3. Persistentie in een NoSQL-database (MongoDB)
4. Sockets voor multi-userintegratie (Socket.io)
5. Autorisatie en authenticatie (slechts mensen met een account mogen volgen)
6. Minstens één integratie en één unittest
7. Deployment op Azure

##Taken

Onderstaande lijst geeft een overzicht van alle taken die moeten worden uitgevoerd. Er wordt een onderscheid gemaakt tussen frontend, backend en debugging en deployment.

### Frontend

1. Ontwerp
      - Wireframes
      - Huisstijl (look and feel, kleurenpalet)
      - Logo
      - UI
2. Functionaliteit - managementinterface
      - Teams aanmaken (en kleuren toewijzen aan teams)
      - Overzicht erkende beacons binnen veld
      - Beacons toewijzen aan een team en een speler
      - Het opnemen/registreren van een match starten
      - Het opnemen/registreren van een belangrijke fase starten en stoppen
3. Functionaliteit - gebruikersinterface
      - Liveweergave van een match
      - Detectie buitenspelval
      - Detectie goal
      - Herbekijken match
      - Ontwikkelen heat map match
      - Ontwikkelen mogelijkheid om match (achteraf, niet live) terug te spoelen
      - Ontwikkelen mogelijkheid om match (achteraf, niet live) vertraagd te bekijken
      - Ontwikkelen mogelijkheid om match (achteraf, niet live) versneld te bekijken
      - Ontwikkelen mogelijkheid om match (achteraf, niet live) als een aaneenschakeling van belangrijke fases te bekijken

### Backend

1. Beacons
      - Klaarmaken hardware (beacons, Raspberry Pi's, BlueTooth)
      - Detectie van beacons
      - Meten van signaalsterkte van beacons (nauwkeurigheid is belangrijk)
      - Locatiebepaling van beacons aan de hand signaalsterktedata van verschillende Raspberry Pi's
2. Locatiebepalingen
      - Opslaan van locatiebepalingen in de database (meerdere keren per seconde)
3. Rapporten
      - Het genereren van een heat map van een match
      - Het genereren van een PDF met de heat map van een match
      - Het generenen van een rapport met belangrijke fases van een match (voor belangrijke fases: zie managementinterfaces bij frontend)
      - Het genereren van een PDF-rapport met belangrijke fases van een match

### Testing, debugging, commenting en deployment

1. Testen en debuggen van de applicatie
2. Documenteren van de applicatie
3. Deployment op een externe service

##Planning

###Frontend

| Taak                                                               | Personeel | Deadline |
|--------------------------------------------------------------------|-----------|----------|
| **Ontwerp**                                                        |           |          |
| Wireframes                                                         |           |          |
| Huisstijl                                                          |           |          |
| Logo                                                               |           |          |
| UI                                                                 |           |          |
| **Functionaliteit - managementinterface**                          |           |          |
| Teams aanmaken (kleuren)                                           |           |          |
| Overzicht erkende beacons in veld                                  |           |          |
| Beacon toewijzen aan team en speler                                |           |          |
| Start/stop registratie van een match                               |           |          |
| Start/stop registratie van een belangrijke fase                    |           |          |
| **Functionaliteit - gebruikersinterface**                          |           |          |
| Liveweergave van een match                                         |           |          |
| Detectie buitenspelval                                             |           |          |
| Detectie goal                                                      |           |          |
| Herbekijken match                                                  |           |          |
| Ontwikkelen heat map match                                         |           |          |
| Ontwikkelen mogelijkheid om match (achteraf) terug te spoelen      |           |          |
| Ontwikkelen mogelijkheid om match (achteraf) vertraagd te bekijken |           |          |
| Ontwikkelen mogelijkheid om match (achteraf) versneld te bekijken  |           |          |

##Realisatie volgens planning

##Toekomstplannen of mogelijke uibreidingen

##Succesfactoren

##Conclusie

