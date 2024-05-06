const { NodeChain  } = require('../utilities/config');
const axios  = require('axios');

exports.addTxn = (req, res) => {
    const txn = req.body;
    const index = NodeChain.addTxnToPendingList(txn);

    console.log(index);
    
    res.status(200).json({ success: true, data: 'Transaction added.' });
  };

exports.broadcastTxn = (req, res) => {
    const txn = NodeChain.addTxn(req.body.sender, req.body.recipient, req.body.amount);
    NodeChain.addTxnToPendingList(txn);

    NodeChain.networkNodes.forEach(async (url) => {
      await axios.post(`${url}/api/v1/createTxn`, txn);
  });

  res.status(201).json({ success: true, data: 'Transaction added and updated.' });
};
