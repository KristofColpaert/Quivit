#Real time sportwedstrijd

##Inleiding
Dit document is de leiddraad voor ons project. Hier kan je de verantwoording vinden voor alle technische keuzes alsook verdere randinformatie over het project.

###Team
We werken met vier personen aan dit project.
De taakverdeling luidt als volgt: @KristofColpaert
**Kristof Colpaert** en **Martijn Loth** volgen backend en frontend en zullen aan beide domeinen bijdragen in het team. **Pieter-Jan Vandenbussche** volgt backend en **Bart Callant** volgt enkel frontend.
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
Voor de frontend voorzien wij de volgende functionaliteit:

1. Liveweergave van een voetbalmatch wanneer deze bezig is. Veld, spelers en bal zijn op voldoende wijze van elkaar te onderscheiden.
2. Detectie van een aantal situaties, waaronder buitenspelval en goals.
3. Achteraf kunnen wedstrijden opnieuw bekeken worden. Er kan genavigeerd worden naar een bepaald tijdstip uit de wedstrijden.
4. Er kunnnen rapporten opgesteld worden over een wedstrijd: heat maps en overzichten van cruciale fases (bijvoorbeeld de passen die leiden tot een goal).
5. Bovenstaande rapporten kunnen in een PDF gegoten worden.
6. Er is managementinterface voorzien waarin kan aangegeven worden welke speler gekoppeld is aan welke beacon en welke device de bal voorstelt.

###Backend
Voor de backend voorzien wij de volgende functionaliteit:

##Planning

##Realisatie volgens planning

##Toekomstplannen of mogelijke uibreidingen

##Succesfactoren

##Conclusie

