# JS-CoronaApplication

This some serious gourmet code. Das seriöser Gourmetcode.

**Installationsanleitung**

Für die Installation dieses Projektes muss eine Internetverbindung verfügbar und node installiert sein.

Komplettes Projekt starten

1. Repository herunterladen beziehungsweise Dateien anderweitig entpacken
2. Terminal im Ordner „./frontend“ öffnen
3. „npm run project“ ausführen

Nur Frontend starten

1. Identisch zu Projekt starten
2. Identisch zu Projekt starten
3. „npm run dev“ ausführen

Nur Backend starten

1. Identisch zu Projekt starten
2. Terminal im Ordner „./backend“ öffnen
3. „node ./index.js“ ausführen

**Allgemeine Beschreibung**

Im Rahmen unseres Projektes möchten wir eine Onlineanmeldung für ein fiktives Corona-testzentrum schaffen. Dabei werden jedoch aufgrund von
Ressourceneinschränkungen nicht alle möglichen, sondern eher prioriersierte Anwendungsfälle berücksichtigt.

**Software, die wir verwenden:**

-   git
-   Github
-   node
-   npm
-   Frameworks
    -   react / NextJS
    -   Express
-   packages
    -   node-json-db
    -   tabler-icons-react
    -   cors
    -   body-parser
    -   dotenv
    -   uniqid
    -   (nodeMailer)
    -   (PDF-creator-Node)

**Farbschema**

https://coolors.co/e8e9f3-f05365-fabc2a-253d5b

**Schriftart**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,600;0,700;1,400&display=swap" rel="stylesheet" />
```

**Unser Seign wurde erstellt in:**

Figma

**Bekannte Bugs**

Wir wissen, dass es einen Skalierungsfehler bei Firefox gibt, durch den Elemente etwas verzerrt dargestellt dargestellt werden können.
Explizit bedeutet das für uns, dass die Inputfelderumrandungen nicht korrekt dargestellt werden, wenn man Firefox 97.0.1 in einer Skalierung
über 100% benutzt. In Chromium tritt dieser Bug nicht auf, andere Browser wurden nicht getestet.
