const { NodeChain } = require('../utilities/config');
const axios = require('axios');

exports.synchronize = (req, res) => {
  const currentChainLength = NodeChain.chain.length;
  let maxLength = currentChainLength;
  let longestChain = null;
  let pendingList = null;

  const promises = NodeChain.networkNodes.map((node) => {
    console.log('Node: ', node);

    return axios(`${node}/api/v1/blockchain`).then((data) => {
      console.log('Data from axios: ', data);

      if (data.data.data.chain.length > maxLength) {
        maxLength = data.data.data.chain.length;
        longestChain = data.data.data.chain;
        pendingList = data.data.data.pendingList;
      }

      if (!longestChain || (longestChain && !NodeChain.validateChain(longestChain))) {
        console.log('No replacement needed');
      } else {
        NodeChain.chain = longestChain;
        NodeChain.pendingList = pendingList;
      }
    });
  });

  Promise.all(promises)
    .then(() => {
      res.status(200).json({ success: true, data: NodeChain });
    })
    .catch((error) => {
      // handle error
      console.error(error);
    });
};