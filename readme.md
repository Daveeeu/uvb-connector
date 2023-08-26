# UVBConnector Dokumentáció
Az UVBConnector egy Node.js osztály, amely az Utánvét Ellenőr szolgáltatáshoz való kommunikációt valósítja meg. Ez lehetővé teszi az Utánvét Ellenőr API-ján keresztül utánvétes fizetési tranzakciók ellenőrzését és rögzítését.

## Telepítés
A következő lépésekkel telepítheted az UVBConnector-t a projektbe:

1. Telepítsd a axios csomagot a HTTP kérésekhez:
```bash
npm install axios
```
2. Másold be az UVBConnector osztályt a projektbe.
```javascript
const UVBConnector = require('UVBConnector'); // Az elérési útvonalat állítsd be a fájl helyére megfelelően
const publicApiKey = 'PUB_API_KEY'; // helyettesítsd a valós API kulccsal
const privateApiKey = 'PRIV_API_KEY'; // helyettesítsd a valós API kulccsal

const connector = new UVBConnector(publicApiKey, privateApiKey);
```
## Osztály: UVBConnector
Az UVBConnector osztály lehetővé teszi a következő műveletek elvégzését:

### Konstruktor
Létrehoz egy új UVBConnector példányt.

```javascript
const connector = new UVBConnector(publicApiKey, privateApiKey, production);
```
* **publicApiKey** (string): A nyilvános API kulcs az azonosításhoz.
* **privateApiKey** (string): A privát API kulcs az azonosításhoz.
* **production** (boolean, opcionális): Alapértelmezetten true. Ha false, a sandbox környezetet használja.

### Metódusok

**get(email)**
Ellenőrzi az Utánvét Ellenőr szolgáltatáson keresztül a megadott e-mail címet.

```javascript
try {
    const response = await connector.get('example@example.com');
    console.log(response);
} catch (error) {
    console.error(error.message);
}
```
* **email** (string): Az ellenőrizni kívánt e-mail cím.

**post(email, outcome)**
Rögzíti az Utánvét Ellenőr szolgáltatáson keresztül a tranzakció kimenetelét.

```javascript
try {
    const response = await connector.post('example@example.com', 'success');
    console.log(response);
} catch (error) {
    console.error(error.message);
}
```
* **email** (string): Az e-mail cím, amelyhez a tranzakció tartozik.
* **outcome** (string): A tranzakció kimenetele (pl. 'success', 'failure').

## Példák
Az alábbiakban példák találhatók a UVBConnector osztály használatára:

```javascript
const UVBConnector = require('UVBConnector');

const publicApiKey = 'PUB_API_KEY';
const privateApiKey = 'PRIV_API_KEY';

const connector = new UVBConnector(publicApiKey, privateApiKey);

(async () => {
    try {
        const response1 = await connector.get('example@example.com');
        console.log(response1);

        const response2 = await connector.post('example@example.com', 'success');
        console.log(response2);
    } catch (error) {
        console.error(error.message);
    }
})();
```
### Következtetés
Az UVBConnector osztály lehetővé teszi az egyszerű kommunikációt az Utánvét Ellenőr API-jával, lehetővé téve az utánvétes fizetési tranzakciók ellenőrzését és rögzítését a projektben.

### Készítő
Az UVBConnector osztályt készítette és dokumentálta a drdev.hu csapata.

* Discord: discord.gg/drdev
* E-mail: info@drdev.hu
* Weboldal: https://drdev.hu