Titel: textarbeit
Version: 0.6.11
Zweck: Routinen, um reine Texte (*.txt) zu bearbeiten
Pythonversion: Python3
Autor: Batt Bucher
email: batt.bucher.basel@bluewin.ch
---------------------------------------------------------

Das Modul 'textarbeit' bietet Routinen, um reine Texte (*.txt) zu bearbeiten.

ACHTUNG: Es werden nur reine Textdateien verarbeitet 
(Ich arbeite mit Linux!)

Folgende Funktionen stellt es zur Verfügung:

help(textarbeit) - gibt eine eine Hilfe zu jeder Funktion aus

Text2Liste(einDatei, ausDatei) - erstellt eine Liste aller Wörter
Liste_rein(einDatei, ausDatei) - entfernt Sonderzeichen
Liste_sortiert(einDatei, ausDatei): - gibt eine sortierte Liste aus
ListeohneDuplikate(einDatei, ausDatei) - entfernt alle Duplikate

ListeNachAnzahl(einDatei, ausDatei): - gibt eine Liste geordnet nach Anzahl aus
ListeWortAnzahl(einDatei, ausDatei): gibt eine alphabetische Liste mit Anzahl aus

ZahlPunktLoeschen(einDatei, ausDatei) - 123. Hallo wird Hallo

minus3Lz(einDatei, ausDatei) - macht aus 3 Leerzeichen 1
minus2Lz(einDatei, ausDatei) - macht aus 2 Leerzeichen 1
minusLzLinks(einDatei, ausDatei) - entfernt Leerzeichen links
minusLzRechts(einDatei, ausDatei) - entfernt Leerzeichen rechts

Anwendungsbeispiel:
import textarbeit
textarbeit.minus3Lz("/home/beat/texte.txt","/home/beat/texte2.txt")
textarbeit.Text2Liste("/home/beat/texte.txt","/home/beat/texte2.lst")

Weitere Funktionen werden nach ausgiebigen Tests hier eingebunden:
- Ersetzen von veralteten Ausdrücken
- Erstellung von weiteren Listen


