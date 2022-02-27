# JS-CoronaApplication

This some serious gourmet code.
Das seriöser Gourmetcode.

**Allgemeine Beschreibung**

Im Rahmen unseres Projektes möchten wir eine Onlineanmeldung für ein fiktives Corona-testzentrum schaffen. Dabei werden jedoch aufgrund von Ressourceneinschränkungen nicht alle möglichen, sondern eher prioriersierte Anwendungsfälle berücksichtigt.

**Das werden wir mit Sicherheit machen:**

1. Als Anwender möchte ich mich zum Corona Test anmelden.
   1. **UseCase-Nummer**: JS_BABOIS+A_1
   2. **Beschreibung**:
      - Ausgangssituation: Der Anwender ruft das Frontend auf.
      - Ziel: Für den Anwender soll eine Website geschaffen werden,
        die es ermöglicht alle notwendigen Daten (TODO: definieren) einzutragen und an die Verwaltung, bzw. ein entsprechendes Backend zu schicken.
      - Scope: Die so geschafften Termine werden nicht bestimmten Uhrzeiten zugewiesen, sondern man trägt sich für einen Tag ein, an dem man dann kommen muss. Der Tag darf beliebig viele Einträge haben.
   3. **Stakeholder**: Testzentrumsbetreiber, Verwaltung
   4. **Beteiligte**: Testpersonen, Backend, Frontend
   5. **Ablauf**:
      1. User besucht die Website -> sieht Startseite
      2. User ruft Formular auf
      3. User gibt persönliche Daten ein
      4. User sendet Daten ab
2. Als Anwender möchte ich eine übersichtliche Startseite mit Informationen zum Testcenter und testen haben
   1. **UseCase-Nummer**: JS_BABOIS+A_2
   2. **Beschreibung**:
      - Ausgangssituation: Der Anwender ruft das Frontend auf.
      - Ziel: Der User wird über gegebene Besonderheiten des Testzentums informiert und kann gegebenenfalls die weiteren Unterseiten anwählen.
      - Scope: Es wird keine live-neuigkeiten geben.
   3. **Stakeholder**: Testzentrumsbetreiber, Verwaltung
   4. **Beteiligte**: Testpersonen, Frontend, Backend
   5. **Ablauf**:
      1. User besucht Website
      2. User bekommt Informationen angezeigt
3. Als Verwaltung will ich eine Anmeldemaske für die Verwaltungswebsite haben.
   1. **UseCase-Nummer**: JS_BABOIS+A_3
   2. **Beschreibung**:
      - Ausgangssituation:Verwaltung besucht Website
      - Ziel: Verhindern, dass unberechtigte Personen auf die sensiblen Daten zugreifen können.
      - Scope: keine Multifaktorauthentufizierung, nur Benutzername & Passwort 
   3. **Stakeholder**: Testzentrzumsverwalter, Testpersonen
   4. **Beteiligte**: Frontend, Backend, Verwaltungspersonal
   5. **Ablauf**:
      1. User ruft Anmeldewebsite auf
      2. User gibt Anmeldeinformationen an
      3. User wird zu Website weitergeleitet
4. Als Verwaltung möchte ich eine Übersicht über alle Anmeldungen sehen können.
   1. **UseCase-Nummer**: JS_BABOIS+A_4
   2. **Beschreibung**:
      - Ausgangssituation: Das Verwaltungspersonal möchte die Daten für den heutigen Tag sehen.
      - Ziel: Eine verbesserte Routine für das Personal durch übersichtliche Informationen, Durchsuchen der Datensätze um Anmeldungen zu finden
      - Scope: Kein Löschen von Datensätzen, kein Anlegen von Datensätzen, kein generieren von QR-Codes. Keine Anwesenheitseintragung
   3. **Stakeholder**: Testzentrumsbetreiber, Verwaltung
   4. **Beteiligte**: Backend, Testpersonen, Frontend
   5. **Ablauf**:
      1. Verwaltungspersonal besucht Website
      2. Alle Anmeldungen und mögliche Filter werden angezeigt
5. Als Verwaltung möchte ich nach einer Anmeldung suchen können.
  1. **UseCase-Nummer**: JS_BABOIS+A_5
   2. **Beschreibung**:
      - Ausgangssituation: User befindet sich auf Website und möchte nach Anmeldung suchen
      - Ziel: Zeitersparnisse durch automatisierte Suchfunktion 
      - Scope: Man kann nach jeglichen Informationen die der Kunde eingegeben hat filtern (TODO, wie oben: definieren)
   3. **Stakeholder**: Testzentrumsbetreiber, Verwaltung
   4. **Beteiligte**: Testpersonen, Frontend
   5. **Ablauf**:
      1. Verwaltungspersonal benutzt filter
      2. Die Filter werden aktiviert und die sichtbare Auswahl an Elementen wird reduziert

**Das sind Erweiterungsmöglichkeiten (in Priorisierungsreihenfolge):**

5. Als Verwaltung möchte ich Testergebnisse eintragen können.
6. Als Anwender möchte ich, dass mein Testergebnis zu einem Dokument verarbeitet wird.
7. Als Anwender möchte ich mein verarbeitetes Testergebnis per Email zugeschickt bekommen.
8. Als Anwender möchte ich eine Anmeldebestätigung per Email zugeschickt bekommen, damit ich weiß ob mein Termin ordnungsgemäß eingetragen wurde.

Nicht priorisiert:

9. Als Verwaltung will ich Statistiken darüber haben, wie viele Coronafälle bereits mit welchem Kunden und mit welchem Ergebnis stattfanden.
10. Anlegen von Datensätzen im Frontend für Verwaltung
11. Eine API für synchronisierte PLZ / Stadt einsetzung, sowie Straßenvorschläge

**Software, die wir verwenden:**

- git
- Github
- node 
- npm
- Frameworks
  - react / NextJS
  - Express
  - node-json-db
  - nodeMailer
  - PDF-creator-Node

**Farbschema**

https://coolors.co/e8e9f3-f05365-fabc2a-253d5b

**Schriftart**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,600;0,700;1,400&display=swap"
  rel="stylesheet"
/>
```

**Unser Seign wurde erstellt in:**

Figma


**Bekannte Bugs**

Wir wissen, dass es einen Skalierungsfehler bei Firefox gibt, durch den Elemente etwas verzerrt dargestellt dargestellt werden können. Explizit bedeutet das für uns, dass die Inputfelderumrandungen nicht korrekt dargestellt werden, wenn man Firefox 97.0.1 in einer Skalierung über 100% benutzt. In Chromium tritt dieser Bug nicht auf, andere Browser wurden nicht getestet.