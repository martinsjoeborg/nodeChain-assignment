const { NodeChain } = require('../utilities/config');
const axios = require('axios');

exports.getBlockchain = (req, res) => {
  res.status(200).json({ success: true, data: NodeChain });
};

exports.mineBlock = async (req, res) => {
  const previousBlock = NodeChain.getLastBlock();
  const previousHash = previousBlock.hash;
  const data = {
    data: NodeChain.pendingList,
    index: previousBlock.index + 1,
  };
  const nonce = NodeChain.proofOfWork(previousHash, data);
  const hash = NodeChain.createHash(previousHash, data, nonce);

  const block = NodeChain.createBlock(nonce, previousHash, hash);

  NodeChain.networkNodes.forEach(async (url) => {
    await axios.post(`${url}/api/v1/block`, { block: block });
  });

  res.status(200).json({
    success: true,
    data: block,
  });
};