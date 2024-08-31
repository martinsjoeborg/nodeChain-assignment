To start the server:

npm run node-1

To start the frontend, go into the "cli" folder and run "npm run dev" in the terminal.

Don't forget to run "npm i" in both the cli folder and the nodechain folder.

Endpoint to view the blockchain:

http://localhost:3001/api/v1/blockchain

Endpoint to add data to pendingList (record):

http://localhost:3001/api/v1/createTxn/broadcast,

for example with the format:

{
     "sender": "Martin Sjöborg",
     "recipient": "Donald Duck",
     "amount": "1000"
}

To transfer the block from pendinglist to the blockchain, go to:

http://localhost:3001/api/v1/blockchain/mine-block, (GET)

Now try again to get the full blockchain.
