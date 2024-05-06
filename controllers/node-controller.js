const { NodeChain } = require('../utilities/config');
//const fetch = require('node-fetch');
const axios = require('axios');

exports.broadcastNode = async (req, res) => {
  const urlToAdd = req.body.nodeUrl;

  if (NodeChain.networkNodes.indexOf(urlToAdd) === -1) {
    NodeChain.networkNodes.push(urlToAdd);
  }

  NodeChain.networkNodes.forEach(async (url) => {
    const body = { nodeUrl: urlToAdd };

    await axios.post(`${url}/api/v1/node/register-node`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  });
  
  const body = { nodes: [...NodeChain.networkNodes, NodeChain.nodeUrl] };

  await axios.post(`${urlToAdd}/api/v1/node/register-nodes`, body, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  res.status(201).json({ success: true, data: 'New node added to the network.' });
};

exports.addNode = (req, res) => {
  const url = req.body.nodeUrl;
  console.log('register-node', url);

  if (NodeChain.networkNodes.indexOf(url) === -1 && NodeChain.nodeUrl !== url) {
    NodeChain.networkNodes.push(url);
  }

  res.status(201).json({ success: true, data: `Node ${req.body.nodeUrl} is added` });
};

exports.addNodes = (req, res) => {
  const allNodes = req.body.nodes;

  allNodes.forEach((url) => {
    if (NodeChain.networkNodes.indexOf(url) === -1 && NodeChain.nodeUrl !== url) {
      NodeChain.networkNodes.push(url);
    }
  });

  res.status(201).json({ success: true, data: 'Nodes are added' });
};