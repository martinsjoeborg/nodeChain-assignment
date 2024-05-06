import "./GetOneBlock.css"
import { useState } from "react";
import axios from "axios";


const GetOneBlock = () => {

    const[block, setBlock] = useState(null);
    const [nonce, setNonce] = useState("");

    async function getBlockchain(e) {
        e.preventDefault();

        await axios.get('http://localhost:3001/api/v1/blockchain')
            .then(response => {
                let array = response.data.data.chain;

                for (let i = 0; i < array.length; i++) {
                    if ((array[i].nonce).toString() === nonce) {
                        setBlock(array[i]);
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
        
        
    }

    return ( 
        <div>
            <form onSubmit={getBlockchain}>
                <p>Enter nonce to get block</p>
                <input type="text" value={nonce} onChange={(e) => setNonce(e.target.value)}/>
                <button>Get Block</button>
            </form>

            <div className="block-content">
                {block === null ? 
                    <></> : 
                    <div>
                        <p>Block: {block.index}</p>
                        <p>Timestamp: {block.timestamp}</p>
                        <p>Nonce: {block.nonce}</p>
                        <p>Hash: {block.hash}</p>
                        <p>Previous Hash: {block.previousHash}</p>
                        <ul>
                            <h4 className="block-data-title">Data: </h4>
                            {block.data.map(tnx => {
                            return <div key={tnx.transactionId}>
                            <li>Sender: {tnx.sender}</li>
                            <li>Recipient: {tnx.recipient}</li>
                            <li>Amount: {tnx.amount} NodeCoin</li>
                            <br />
                            </div>
                        })}
                        </ul>
                        
                    </div>
                }
            </div>
        </div>
     );
}
 
export default GetOneBlock;