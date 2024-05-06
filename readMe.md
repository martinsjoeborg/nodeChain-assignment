För att starta någon av servrarna: 

npm run node-1,
npm run node-2,
npm run node-3

För att starta frontenden, gå in i "cli" mappen och kör "npm run dev" i terminalen

Glöm inte att köra "npm i" i både cli mappen och nodechain mappen.

Endpoints för att se blockkedjan från alla noder men är inte synkroniserade (get):

http://localhost:3001/api/v1/blockchain,
http://localhost:3002/api/v1/blockchain,
http://localhost:3003/api/v1/blockchain,

Endpoint för att lägga till data i pendingList (post):

http://localhost:3001/api/v1/createTxn/broadcast,

tex med formatet:

{
    "sender": "Martin Sjöborg",
    "recipient": "Kalle Anka",
    "amount": "1000"
}

Endpoint för att mine'a ett nytt block (get):

http://localhost:3001/api/v1/blockchain/mine-block

Endpoint för att lägga till en ny nod i nätverket (post):

http://localhost:3001/api/v1/node,

tex med formatet:

{
    "nodeUrl": "http://localhost:3003"
}

Endpoint för att ge den nya noden den korrekta kopian av längsta befintliga kedja (get):

http://localhost:3003/api/v1/consensus, använd den port till den nyligen tillagda noden.