import { useState } from "react";
import "./SendTxn.css"
import axios from "axios"

const SendTxn = () => {

    const [sender, setSender] = useState("");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");



    function sendTxn(e) {
        e.preventDefault();

        const txn = {
            sender: sender,
            recipient: recipient,
            amount: amount
        }

        axios.post('http://localhost:3001/api/v1/createTxn', txn)
    }

    return ( 
        <div>
            <form onSubmit={sendTxn}>
                From:
                <input type="text" value={sender} onChange={(e) => setSender(e.target.value)}/>
                <br />
                <br />
                To:
                <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)}/>
                <br />
                <br />
                Amount:
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                <br />
                <br />

                <button>Send</button>
            </form>
        </div>
     );
}
 
export default SendTxn;