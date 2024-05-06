const sha256 = require('sha256');
const { v4: uuidv4 } = require('uuid');

function Blockchain() {
  this.chain = [];
  this.pendingList = [];
  this.nodeUrl = process.argv[3];
  this.networkNodes = [];

  this.createBlock(1, 'Genisis', 'Genisis');
}

Blockchain.prototype.createBlock = function (nonce, previousHash, hash) {
  const block = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    data: this.pendingList,
    nonce: nonce,
    hash: hash,
    previousHash: previousHash,
  };

  this.pendingList = [];
  this.chain.push(block);

  return block;
};

Blockchain.prototype.getLastBlock = function () {
  return this.chain.at(-1);
};

Blockchain.prototype.addTxn = function (sender, recipient, amount) {
  const txn = {
    sender,
    recipient,
    amount,
    transactionId: uuidv4().split('-').join('')
  };

  return txn;
};

Blockchain.prototype.addTxnToPendingList = function (txn) {
  this.pendingList.push(txn);
  return this.getLastBlock().index + 1;
};

Blockchain.prototype.createHash = function (prevHash, data, nonce) {
  const stringToHash = prevHash + JSON.stringify(data) + nonce.toString();
  const hash = sha256(stringToHash);
  return hash;
};

Blockchain.prototype.proofOfWork = function (prevHash, data) {
  let nonce = 0;
  let hash = this.createHash(prevHash, data, nonce);

  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = this.createHash(prevHash, data, nonce);
  }

  return nonce;
};

Blockchain.prototype.validateChain = function (blockChain) {
  let isValid = true;

  for (i = 1; i < blockChain.length; i++) {
    const block = blockChain[i];
    const previousBlock = blockChain[i - 1];
    const hash = this.createHash(previousBlock.hash, { data: block.data, index: block.index }, block.nonce);

    if (hash !== block.hash) {
      isValid = false;
    }

    if (block.previousHash !== previousBlock.hash) {
      isValid = false;
    }
  }

  const genesisBlock = blockChain.at(0);
  const isGenesisNonceValid = genesisBlock.nonce === 1;
  const isGenesisHashValid = genesisBlock.hash === 'Genisis';
  const isGenesisPreviousHashValid = genesisBlock.previousHash === 'Genisis';
  const hasNoData = genesisBlock.data.length === 0;

  if (!isGenesisNonceValid || !isGenesisHashValid || !isGenesisPreviousHashValid || !hasNoData) {
    isValid = false;
  }

  return isValid;
};

module.exports = Blockchain;