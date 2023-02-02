import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("TicTacToe", function () {
	enum State {
		Active,
		Won,
		Tie,
		PlayerIsNotReady,
		Declined
	}

	async function deployFixture() {
		const [owner, otherAccount] = await ethers.getSigners();

		const TicTacToe = await ethers.getContractFactory("TicTacToe");
		const ttt = await TicTacToe.deploy();

		return { owner, otherAccount, ttt };
	}

	describe("Deployment", function () {
		it("Deploy", async function () {
			const { owner, otherAccount, ttt } = await loadFixture(deployFixture);
			expect(await ttt.totalGamesCount()).to.equal(0);
		});
	});

	describe("Play", function () {
		it("Player1 won", async function () {
			const { owner, otherAccount, ttt } = await loadFixture(deployFixture);

			await expect(await ttt.connect(owner).invite(otherAccount.address)).to.emit(ttt, "Start").withArgs(owner.address, otherAccount.address, 0);
			await expect(await ttt.connect(otherAccount).acceptInvitation(0)).to.emit(ttt, "AcceptInvitation").withArgs(otherAccount.address, 0);

			// get from events
			const gameId = 0;

			expect(await ttt.totalGamesCount()).to.equal(1);
			expect(await ttt.winCount(owner.address)).to.equal(0);

			expect(await ttt.getGameField(gameId)).to.eql([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

			await expect(await ttt.connect(owner).play(gameId, 0, 0)).to.emit(ttt, "Turn").withArgs(owner.address, gameId, 0, 0);

			expect(await ttt.getGameField(gameId)).to.eql([[1, 0, 0], [0, 0, 0], [0, 0, 0]]);

			await expect(await ttt.connect(otherAccount).play(gameId, 1, 0)).to.emit(ttt, "Turn").withArgs(otherAccount.address, gameId, 1, 0);

			expect(await ttt.getGameField(gameId)).to.eql([[1, 0, 0], [2, 0, 0], [0, 0, 0]]);

			// Check not otherAccount's turn
			await expect(ttt.connect(otherAccount).play(gameId, 2, 1)).to.be.revertedWith("Not your turn");

			await expect(await ttt.connect(owner).play(gameId, 0, 1)).to.emit(ttt, "Turn").withArgs(owner.address, gameId, 0, 1);

			expect(await ttt.getGameField(gameId)).to.eql([[1, 1, 0], [2, 0, 0], [0, 0, 0]]);

			await expect(await ttt.connect(otherAccount).play(gameId, 1, 1)).to.emit(ttt, "Turn").withArgs(otherAccount.address, gameId, 1, 1);

			expect(await ttt.getGameField(0)).to.eql([[1, 1, 0], [2, 2, 0], [0, 0, 0]]);

			const tx = await ttt.connect(owner).play(gameId, 0, 2);
			const receipt = await tx.wait();
			expect(receipt.events?.at(0)?.event).to.equal("Turn");
			expect(receipt.events?.at(1)?.event).to.equal("Won");

			expect(receipt.events?.at(1)?.args?._winner).to.equal(owner.address);

			expect(await ttt.getGameField(gameId)).to.eql([[1, 1, 1], [2, 2, 0], [0, 0, 0]]);

			const gameInfo = await ttt.getGameInfo(gameId);

			expect(gameInfo.state).to.eql(State.Won);
			expect(await ttt.winCount(owner.address)).to.equal(1);
		});

		it("Player2 won", async function () {
			const { owner, otherAccount, ttt } = await loadFixture(deployFixture);

			await expect(await ttt.connect(owner).invite(otherAccount.address)).to.emit(ttt, "Start").withArgs(owner.address, otherAccount.address, 0);
			await expect(await ttt.connect(otherAccount).acceptInvitation(0)).to.emit(ttt, "AcceptInvitation").withArgs(otherAccount.address, 0);

			// get from events
			const gameId = 0;

			expect(await ttt.totalGamesCount()).to.equal(1);
			expect(await ttt.winCount(owner.address)).to.equal(0);

			expect(await ttt.getGameField(gameId)).to.eql([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

			await expect(await ttt.connect(owner).play(gameId, 0, 0)).to.emit(ttt, "Turn").withArgs(owner.address, gameId, 0, 0);

			expect(await ttt.getGameField(gameId)).to.eql([[1, 0, 0], [0, 0, 0], [0, 0, 0]]);

			await expect(await ttt.connect(otherAccount).play(gameId, 1, 0)).to.emit(ttt, "Turn").withArgs(otherAccount.address, gameId, 1, 0);

			expect(await ttt.getGameField(gameId)).to.eql([[1, 0, 0], [2, 0, 0], [0, 0, 0]]);

			await expect(await ttt.connect(owner).play(gameId, 0, 1)).to.emit(ttt, "Turn").withArgs(owner.address, gameId, 0, 1);

			expect(await ttt.getGameField(gameId)).to.eql([[1, 1, 0], [2, 0, 0], [0, 0, 0]]);

			await expect(await ttt.connect(otherAccount).play(gameId, 1, 1)).to.emit(ttt, "Turn").withArgs(otherAccount.address, gameId, 1, 1);

			expect(await ttt.getGameField(0)).to.eql([[1, 1, 0], [2, 2, 0], [0, 0, 0]]);

			await expect(await ttt.connect(owner).play(gameId, 2, 2)).to.emit(ttt, "Turn").withArgs(owner.address, gameId, 2, 2);

			expect(await ttt.getGameField(gameId)).to.eql([[1, 1, 0], [2, 2, 0], [0, 0, 1]]);

			const tx = await ttt.connect(otherAccount).play(gameId, 1, 2);
			const receipt = await tx.wait();
			expect(receipt.events?.at(0)?.event).to.equal("Turn");
			expect(receipt.events?.at(1)?.event).to.equal("Won");
			expect(receipt.events?.at(1)?.args?._winner).to.equal(otherAccount.address);

			const gameInfo = await ttt.getGameInfo(gameId);

			expect(gameInfo.state).to.eql(State.Won);
			expect(await ttt.winCount(otherAccount.address)).to.equal(1);
		});

		it("Tie", async function () {
			const { owner, otherAccount, ttt } = await loadFixture(deployFixture);

			await ttt.connect(owner).invite(otherAccount.address);
			await ttt.connect(otherAccount).acceptInvitation(0);

			// get from events
			const gameId = 0;

			/*
			[[2, 1, 1],
			 [1, 1, 2],
			 [2, 2, 1]]
			*/

			await ttt.connect(owner).play(gameId, 0, 2);
			await ttt.connect(otherAccount).play(gameId, 0, 0);
			await ttt.connect(owner).play(gameId, 1, 0);
			await ttt.connect(otherAccount).play(gameId, 2, 0);
			await ttt.connect(owner).play(gameId, 1, 1);

			await ttt.connect(otherAccount).play(gameId, 2, 1);
			await ttt.connect(owner).play(gameId, 0, 1);
			await ttt.connect(otherAccount).play(gameId, 1, 2);
			await ttt.connect(owner).play(gameId, 2, 2);

			expect(await ttt.getGameField(gameId)).to.eql(
				[[2, 1, 1],
				[1, 1, 2],
				[2, 2, 1]]
			);

			expect(await (await ttt.getGameInfo(gameId)).state).to.eql(State.Tie);
		});

		it("Declined", async function () {
			const { owner, otherAccount, ttt } = await loadFixture(deployFixture);

			await ttt.connect(owner).invite(otherAccount.address);
			await expect(ttt.connect(otherAccount).decline(0)).to.emit(ttt, "Declined").withArgs(otherAccount.address, 0);

			await expect(ttt.connect(owner).play(0, 0, 0)).to.be.revertedWith("Game is not active");

			await ttt.connect(owner).invite(otherAccount.address);
			await expect(await ttt.connect(owner).decline(1)).to.emit(ttt, "Declined").withArgs(owner.address, 1);

			await expect(ttt.connect(owner).play(1, 0, 0)).to.be.revertedWith("Game is not active");
		});
	});
});