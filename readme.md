# Kursprojekt - Bookster
Deadline: 16:a juni 17:00.

I denna uppgift är grupper valfria men får som mest bestå av 2 deltagare och ska meddelas via discord senaste 8e:e Juni, gäller ej om man väljer att göra uppgiften själv. Det rekommenderas att åtminstone diskutera uppgiften med annan kursdeltagare under arbetstgång även om man jobbar själv.

Den 15:e juni reserveras för individuella samtal med undervisande lärare. Tillfället kommer bestå av en kortare muntlig redovisning av projektet, instruktioner längre ner (under muntlig redovisning).


## Avgränsningar

- Även om responsive design vore att önska är det väldigt svårt att genomföra för den tänkta designen, därav ingår **inte** responsive design i denna uppgift. 

# Beskrivning

Denna uppgift går ut på att skapa en frontendlösning till en backend som innehåller information om böcker och dess användare. API:et innehåller både administratörer och vanliga användare, men går även att använda som icke-authentiserad användare med viss begränsning.

I mappen ["wireframes"](wireframes/) så finner du ett par wireframes som dokumenterar varje sidas upplägg. Observera att alla **ej** behöver implementeras, se betygskriterina för krav, vidare ska  synliga tjänster i wireframes ingå i slutresultatet även om den färdiga designen varierar i font, styling, placering m.m..

**Observera** Valet av ramverk är friviligt men uppgiften ska lösas med antingen React, Vue eller Angular, och typescript ska användas. 

# Tekniska krav

- Minst 10 komponenter **ska** användas för att lösa implementationen.
  - I Angular krävs det minst 7 komponenter.
- Varje kodfil ska innehålla en kortare beskrivning över filens syfte. Se exempel i jwtUtil i server koden [(server/src/util/jwtUtil.js)](server/src/util/jwtUtil.js) och tänkta förbättringar.
  - För grupper är det viktigt att filen signeras med "author" som i exemplet ovan (jwtUtil).
  - Abstrakta komponenter med "uppenbart" syfte behöver ej kommenteras. Vid osäkerhet, kommentera ändå.
- Typescript typer ska defineras, att använda any som parameter och return typ är inte tillåtet.

# Förbered data

I [server/src/config](server/src/config/) så finns det två filer users och books som innehåller förbered data om API:et. Det går bra att fylla på detta vid behov, följ då det format som används i filen.

Observera att ingen data sparas om server startas om, alla förändringar sparas endast i serverns RAM minnet.

# API:et

Du installerar och startar API:et genom att ladda ner och öppna upp server mappen i detta repo och sedan skriver **"npm install & npm run dev"**.

```
git clone https://github.com/mu22-mobilitetstjanster/typescript-framework-assignment
cd typescript-framework-assignment
cd server
npm install
npm run dev
```

API:et använder per default port 3000, men det går att ändra i [src/server.js](server/src/server.js)

## Endpoints
Beroende på behörighet så har användare olika tillgång till API:et. 

- Gäst -> Ej authentiserad.
- Authentiserad -> Har tillgång till ett JWT access token
- Admin -> Användare med högre behörighet än authentiserad användare
<hr>

### 1. Som gäst-, authentiserad- och administratöranvändare
<details>
  <summary>GET /library/books</summary>

  <p>Responsen är en lista över böckerna och ett verisonsnummer.</p>
  <hr>
</details>

<details>
  <summary>
    GET /library/books/search?q=query 
  </summary>
  <p>Query paramtern motsvarar en sökt boktitel. Observera att den skickas som en del av URL:n, /library/books/search?q=., ex. /library/books/search?q=night <-- söker bok med "night" i titeln</p>
  <br>
  <p>Responsen är en lista med matchade böcker och ett verisonsnummer.</p>
  <p>Vid tom "titel" så skickas alla böcker tillbaks som svar.</p>
  <hr>
</details>

<details>
  <summary>
    POST /auth/login
    { "username", "password" }
  </summary>
  <p>Username och password motsvarar giltiga inloggningsuppgifter.</p>

  <p>Vid lyckat inlogg så ges ett JWT token tillbaka som är giltigt i 45 minuter.</p>

  <p>Kan ge 403 om username eller password inte skickas med.</p>
  <p>Kan ge 403 om användaren inte anger giltiga uppgifter.</p>
  <p>Kan ge 403 om användaren inte finns i databasen.</p>
  <hr>
</details>

<details>
  <summary>
    POST /auth/register
    { "username", "password"}
  </summary>
  <p>Username är unikt och kan endast förekomma en gång.</p>

  <p>Vid lyckad registering så ges ett 201 statuskod tillbaka för att indikera att kontot är skapat.</p>

  <p>Kan ge 403 om username eller password inte skickas med.</p>
  <p>Kan ge 403 om användaruppgifterna redan finns.</p>
  <hr>
</details>
<hr>

### 2. Som authentiserad- och administratöranvändare
Samtliga anrop ger:
- 403 om authorized headern inte finns
- 403 om jwt inte kan verifieras
  
<details>
  <summary>
    GET /library/profile
  </summary>

  <p>Hämtar nuvarande profil för inloggad användare, info hämtas från jwt token:et. Här går det även att se köpta produkter.</p>
  <hr>
</details>

<details>
  <summary>
    POST /library/user/books
    { "title", "quantity" }
  </summary>
  <p>"title" är case sensitive.</p>
  <p>"quantity" godtas endast om antal böcker finns i databasen.</p>
  <br>
  <p>Responsen är en lista över alla böcker och ett verisonsnummer.</p>
  <br>
  <p>Vid avsaknad av paramterar ges 403.</p>
</details>
  <hr>
<hr>

### 3. Som administratöranvändare
Samtliga anrop ger:
- 401 om användaren inte har behörighet

<details>
  <summary>
  POST /admin/books { "Author", "Title", "Quantity"}
  </summary>

  <p>Ger statuskod 201 när en bok har lagts till.</p>
  <hr>
</details>

<details>
  <summary>
  PUT /admin/books { "previous", "current" }
  </summary>
  <p>Previous är en bok representerad med titel { "title" }</p>
  <p>Current är den nya boken representerad med den data som önskas uppdateras {"?title", "?author", "?quantity"}</p>
  <em>? = optional.</em>
  <br>
  <p>Ger statuskod 201 när en bok har uppdaterats.</p>
  <hr>
</details>

<details>
  <summary>
  DELETE /admin/books { "Title" }
  </summary>

  <p>Ger statuskod 200 när en bok har tagits bort</p>

  <p>Ger statuskod 404 om boken inte hittades</p>
  <hr>
</details>

<details>
  <summary>
  GET /admin/users
  </summary>

  <p>Ger en lista över alla användare</p>
  <hr>
</details>

<details>
  <summary>
  PUT /admin/users {"username"}
  </summary>
  <p>Tilldelar administratör status till användaren med angivet username. <em>Username är case sensitive.</em></p>
  <br>
  <p>Ger 200 om användare gick att uppdatera.</p>
  <p>Ger 403 om användarnamnet inte går att hitta.</p>
  <hr>
</details>

<details>
  <summary>
  DELETE /admin/users {"username"}
  </summary>
  <p>Username är case sensitive.</p>

  <p>Ger 200 om användare gick att ta bort.</p>

  <p>Ger 403 om användarnamnet inte går att hitta</p>
  <hr>
</details>
<hr>

# Bedömning

Bedömning sker via muntlig redovisning och inlämnat projektarbete.

## Muntlig redovisning
Torsdag den 15:e juni kommer samtliga deltagare genomgå en muntlig redovisning med undervisande lärare. Observera att ett länk till arbetets källkod **måste** skickas till undervisande lärare **senast** kl 12:00 onsdag den 14:e juni. Källkoden används som underlag i samtalet och förväntas inte vara klar eller felfri.

Du förbereder dig genom att aktivt delta i projektarbetet. I redovisningen kommer du förväntas svara på frågor kring kodens struktur och syfte, samt hur den kan vidarutvecklas.

<em>Det är okej att på förhand välja två filer som man helst redovisar, meddela då detta i början av samtalet. Dessa filer måste då innehålla minst 40 rader kod, styling och template ej inkluderat.</em>


### För grupparbeten
Observera att du främst kommer behöva besvara frågor kring kod som du har dokumenterat, med denna andledning så är det viktigt att du signerar filer som du har dokumenterat. Detta göras genom att ange "Author" som i exempelet [(server/src/util/jwtUtil.js)](server/src/util/jwtUtil.js).

## Inlämning
Via awesomo skicka in följande
- Länk till github repository med källkoden för projektet.

## Betygskriterier
API-koden får ej modifieras utan att först konsultera ansvarig lärare. Vidare så ligger koden **inte** under open source distrubition så om du vill vidarutveckla på koden erhålls tillstånd från publiceraren av koden.

### Godkänt
För betyget godkänt ska de tekniska kraven i uppgiften vara uppfyllda. Vidare ska studerande presentera en godtagbar förståelse för flödet och strukturen i inlämnad källkod. **Minst** 5 av de 8 wireframe:sen ska ha en snarlikt  implementation varav övriga tre är åtminstone visuellt implementerad (utan fungerande tjänster (knappar, länkar m.m.)).

### Väl godkänt
För betyget väl godkänt ska betyget godkänt uppfyllas. Vidare ska studerande redovisa en utvecklande förståelse för skriven kod, visas genom att kunna diskutera brister och fördelar i programmet. Dessutom ska **minst** 7 av de 8 wireframe:sen ha en snarlik implementation varav den siste är åtminstone visuellt implementerad.

## Återkoppling
Sker via awesomo senast 2 veckor efter avslutad kurs i samband med kursbetyget.

--- 
<small>Varför inte börja med en kopp kaffe? </small> :coffee:



