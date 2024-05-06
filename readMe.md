För att starta någon av servern: 

npm run node-1

För att starta frontenden, gå in i "cli" mappen och kör "npm run dev" i terminalen.

Glöm inte att köra "npm i" i både cli mappen och nodechain mappen.

Endpoints för att se blockkedjan:

http://localhost:3001/api/v1/blockchain

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