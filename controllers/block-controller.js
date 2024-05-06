const { NodeChain } = require('../utilities/config');

exports.block = (req, res) => {
  const block = req.body.block;
  const lastBlock = NodeChain.getLastBlock();
  const hashIsCorrect = lastBlock.hash === block.previousHash;
  const hasCorrectIndex = lastBlock.index + 1 === block.index;

  if (hashIsCorrect && hasCorrectIndex)  {
    NodeChain.chain.push(block);
    NodeChain.pendingList = [];
    res.status(201).json({ success: true, data: block });
  } else {
    res.status(400).json(
        { 
          success: false,
          errorMessage: 'Declined block'
        }
    ); 
  }
};