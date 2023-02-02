// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/// @title Abstract contract ITicTacToe
/// @author treug0lnik041 (telegram: @treug0lnik)
/// @dev Made for inheritance purposes only
abstract contract ITicTacToe {
    event Start(
        address indexed _player1,
        address indexed _player2,
        uint256 indexed _gameId
    );
    event AcceptInvitation(address indexed _player2, uint256 indexed _gameId);
    event Won(address indexed _winner, uint256 indexed _gameId);
    event Turn(
        address indexed _player,
        uint256 indexed _gameId,
        uint8 x,
        uint8 y
    );
    event Tie(uint256 indexed _gameId);
    event Declined(address indexed _declinedPlayer, uint256 indexed _gameId);

    enum Cell {
        None,
        X,
        O
    }

    enum State {
        Active,
        Won,
        Tie,
        PlayerIsNotReady,
        Declined
    }

    struct Game {
        address[2] players;
        State state;
        address turn;
        Cell[3][3] cells;
    }
}
