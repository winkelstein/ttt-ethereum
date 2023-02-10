# ttt-ethereum

Tic-Tac-Toe game based on Ethereum blockchain.

---

## Smart contract section

### Clone
```shell
git clone https://github.com/treug0lnik041/ttt-ethereum.git && cd ttt-ethereum/ && npm i
```

### Compile
```shell
npx hardhat compile
```
I strongly recommend you to install hh by using command below:
```shell
npm install --global hardhat-shorthand
```
and after that you can use 'hh' instead of 'npx hardhat' just like that:
```shell
hh compile
```

### Test
```shell
npx hardhat test
```
---

## Frontend section

## Network
In metamask you have to select network that you need.

Contract deployed to:
- [x] Localhost
- [x] Goerli testnet ([Etherscan page](https://goerli.etherscan.io/address/0x7c55B17b2567168FFf0D904b4B7c7B779a96ec5E))

### Localhost
In first terminal:
```shell
npx hardhat node
```

In second terminal:
```shell
npx hardhat run --network localhost scripts/deploy.ts
```

Don't forget to change network in your MetaMask to avoid losses.