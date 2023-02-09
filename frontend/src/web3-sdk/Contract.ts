import { ethers } from "ethers";
import artifacts from "./artifact.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
		this.contract = new ethers.Contract(CONTRACT_ADDRESS, artifacts.abi, signer);
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