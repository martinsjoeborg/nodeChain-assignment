import "./GetBlocks.css"
import axios from "axios";
import { useState } from "react";

const GetBlocks = () => {

    const [blockchain, setBlockchain] = useState([]);

    async function getBlockchain() {

        await axios.get('http://localhost:3001/api/v1/blockchain')
            .then(response => {

                setBlockchain(response.data.data.chain);
            })
            .catch(error => {
                console.error(error);
            });
    }


    const blockchainMapping = blockchain.map((block) => {
        return (
          <ul className="blockchain-ul" key={block.index}>
            <h3>Block: {block.index}</h3>
            <li>Timestamp: {block.timestamp}</li>
            <li>Nonce: {block.nonce}</li>
            <li>Hash: {block.hash}</li>
            <li>Previous Hash: {block.previousHash}</li>
            <h4>Data:</h4>
            <div>
              {!block.data ? <p>No data</p> : 
                <ul>
                  {block.data.map((tnx) => (
                    <div key={tnx.transactionId}>
                      <li>Sender: {tnx.sender}</li>
                      <li>Recipient: {tnx.recipient}</li>
                      <li>Amount: {tnx.amount} NodeCoin</li>
                      <br />
                    </div>
                  ))}
                </ul>
              }
            </div>
          </ul>
        );
      });

    return ( 
        <div className="container-getBlocks">
            <button onClick={getBlockchain}>Get full chain</button>

            <div className="blockchain-list">{blockchainMapping}</div>

        </div>
     );
}
 
export default GetBlocks;