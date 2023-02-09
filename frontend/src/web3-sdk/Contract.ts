import { ethers } from "ethers";
import artifacts from "./TicTacToe.json";

const CONTRACT_ADDRESS_HARDHAT = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ADDRESS_GOERLI = "0x7c55B17b2567168FFf0D904b4B7c7B779a96ec5E";

export enum State {
	Active,
	Won,
	Tie,
	PlayerIsNotReady,
	Decline
}

export enum Cell {
	None,
	X,
	O
}

export type GameInfo = {
	players: string[2],
	state: State,
	turn: string,
	cells: Cell[][]
};

class Contract {
	public contract: ethers.Contract;
	public signer: ethers.JsonRpcSigner;

	constructor(signer: ethers.JsonRpcSigner) {
		switch (signer.provider._network.chainId.toString()) {
			case "31337": this.contract = new ethers.Contract(CONTRACT_ADDRESS_HARDHAT, artifacts.abi, signer); break;
			case "5": this.contract = new ethers.Contract(CONTRACT_ADDRESS_GOERLI, artifacts.abi, signer); break;
			default: this.contract = new ethers.Contract(CONTRACT_ADDRESS_HARDHAT, artifacts.abi, signer); window.alert("This network is not supported. Choose Goerli or Hardhat (localnode) and refresh page"); break;
		}
		this.signer = signer; 
	}

	// View methods

	async winCount(address: string) {
		return this.contract.winCount(address);
	}

	async getGameInfo(gameId: string | number) {
		return this.contract.getGameInfo(gameId) as Promise<GameInfo>;
	}

	async totalGamesCount() {
		return this.contract.totalGamesCount();
	}

	async getGameField(gameId: string | number) {
		return this.contract.getGameField(gameId) as Promise<Cell[][]>;
	}

	async whoseTurn(gameId: string | number) {
		return this.contract.whoseTurn(gameId);
	}

	async winner(gameId: string | number) {
		return this.contract.winner(gameId);
	}

	// Change methods

	async invite(opponent: string) {
		return this.contract.invite(opponent);
	}

	async acceptInvitation(gameId: string | number) {
		return this.contract.acceptInvitation(gameId);
	}

	async decline(gameId: string | number) {
		return this.contract.decline(gameId);
	}

	async play(gameId: string | number, x: number, y: number) {
		return this.contract.play(gameId, x, y);
	}
}

export default Contract;