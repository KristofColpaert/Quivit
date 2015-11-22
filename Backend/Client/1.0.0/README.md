#Client 1.0.0

Voor deze versie van de clientsoftware starten we opnieuw vanaf nul. Het concept verandert drastisch:
* Bij de 0-versies gingen we ervan uit dat Raspberry Pi's signalen opvangen die door beacons worden uitgezonden. Aan de hand van de sterkte van die signalen, zou dan kunnen bepaald worden op welke afstand een beacon zich bevindt. Door middel van trilateration zouden verschillende afstanden herleid kunnen worden tot een positie in een cartesiaans assenstelsel.
  * Een belangrijk probleem was hier de nauwkeurigheid: de Raspberry Pi's waren niet in staat om een nauwkeurig en consistent resultaat te produceren. Er werden verschillende filters toegepast om dit probleem te verhelpen, maar uiteindelijk bleek geen van de oplossingen volledig te voldoen aan onze verwachtingen.
* Bij de 1-versies werken we met de Estimote Indoor Location SDK. Deze komt van huis uit met een aantal degelijk noise reduction filters en zou daardoor een beter resultaat moeten opleveren. Aangezien deze SDK enkel geschikt is voor iPhone, werd een iPhone-app ontwikkeld die x- en y-waarden doorstuurt naar een server die deze data verwerkt.
