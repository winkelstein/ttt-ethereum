// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./ITicTacToe.sol";

/// @title TicTacToe smart contract
/// @author treug0lnik041 (telegram: @treug0lnik)
/// @notice Smart contract for tic-tac-toe game
/// @dev Should inherit from ITicTacToe
contract TicTacToe is ITicTacToe {
    Game[] internal games;
    mapping(address => uint256) internal _winCount;

    modifier toBePlayer(uint256 _gameId) {
        Game storage _game = games[_gameId];
        require(
            msg.sender == _game.players[0] || msg.sender == _game.players[1],
            "You are not invided to this game"
        );
        _;
    }

    modifier checkTurn(uint256 _gameId) {
        require(games[_gameId].turn == msg.sender, "Not your turn");
        _;
    }

    modifier ready(uint256 _gameId) {
        State state = games[_gameId].state;
        require(state == State.Active, "Game is not active");
        _;
    }

    constructor() {}

    /// @notice win count
    /// @param _winner specifies address of account you need to check
    /// @return _winCount is just a number representes win count of _winner address
    function winCount(address _winner) external view returns (uint256) {
        return _winCount[_winner];
    }

    /// @notice Get information about any game by _gameId
    /// @param _gameId specifies index of game in games array
    /// @return game from games array with all information about it: players, state, last turn and game field
    function getGameInfo(uint256 _gameId) external view returns (Game memory) {
        return games[_gameId];
    }

    /// @notice Returns total game count
    /// @dev Returned value can be used if you want to look at some game. View only
    /// @return Length of games private variable
    function totalGamesCount() external view returns (uint256) {
        return games.length;
    }

    /// @notice Returns game field as an two-dimensional array
    /// @dev It should be used simply for drawing field on the sceen. View only
    /// @param _gameId specifies index of game in games array
    /// @return cells where 0 is none, 1 for player1 (X), 2 for player2 (O)
    function getGameField(uint256 _gameId)
        public
        view
        returns (Cell[3][3] memory)
    {
        return games[_gameId].cells;
    }

    /// @notice create new game and invite user _opponent to it
    /// @dev emits Start event but could be declined. Client should listen all events and gets _gameId from it
    /// @param _opponent should be account address of your opponent
    function invite(address _opponent) external {
        require(_opponent != address(0), "Opponent cannot be address of 0");
        Cell[3][3] memory _cells;
        Game memory _game = Game(
            [msg.sender, _opponent],
            State.PlayerIsNotReady,
            msg.sender,
            _cells
        );
        games.push(_game);
        emit Start(msg.sender, _opponent, games.length - 1);
    }

    /// @notice acceptes invitation from another user
    /// @dev emits AcceptInvitation event
    /// @param _gameId specifies index of game in games array
    function acceptInvitation(uint256 _gameId) external {
        Game storage _game = games[_gameId];
        require(
            msg.sender == _game.players[1],
            "You are not invited to this game"
        );
        emit AcceptInvitation(msg.sender, _gameId);
        _game.state = State.Active;
    }

    /// @notice Decline game
    /// @dev This function can decline if game state is active or player is not ready. Emits Declined event
    /// @param _gameId specifies index of game in games array
    function decline(uint256 _gameId) external toBePlayer(_gameId) {
        Game storage _game = games[_gameId];
        require(
            _game.state == State.Active ||
                _game.state == State.PlayerIsNotReady,
            "Game is already over"
        );
        _game.state = State.Declined;
        emit Declined(msg.sender, _gameId);
    }

    /// @notice Make your turn
    /// @dev Also checks if some of players get winning trio or tie. Emits Turn event and Won or Tie event if they need
    /// @param _gameId specifies index of game in games array
    /// @param x specifies x coordinate (must be less than 3)
    /// @param y specifies y coordinate (must be less than 3)
    function play(
        uint256 _gameId,
        uint8 x,
        uint8 y
    ) external toBePlayer(_gameId) ready(_gameId) checkTurn(_gameId) {
        Game storage _game = games[_gameId];
        require(x < 3 && y < 3, "Wrong coordinates");
        require(_game.cells[x][y] == Cell.None, "This cell is not empty");

        if (_game.players[0] == msg.sender) {
            _game.cells[x][y] = Cell.X;
            _game.turn = _game.players[1];
        } else {
            _game.cells[x][y] = Cell.O;
            _game.turn = _game.players[0];
        }

        emit Turn(msg.sender, _gameId, x, y);
        if (isWinningTrio(_game.cells)) {
            _game.state = State.Won;
            emit Won(msg.sender, _gameId);
            _winCount[msg.sender]++;
        } else if (isTie(_game.cells)) {
            _game.state = State.Tie;
            emit Tie(_gameId);
        }
    }

    // internals

    /// @notice Check if game has a wining trio
    /// @param _cells from your game
    /// @return isWinningTrio is true if there is one and false if there is not
    function isWinningTrio(Cell[3][3] memory _cells)
        internal
        pure
        returns (bool)
    {
        // Same row/column
        for (uint8 i = 0; i < 3; i++) {
            if (
                (_cells[i][0] == _cells[i][1] &&
                    _cells[i][0] == _cells[i][2] &&
                    _cells[i][0] != Cell.None) ||
                (_cells[0][i] == _cells[1][i] &&
                    _cells[0][i] == _cells[2][i] &&
                    _cells[0][i] != Cell.None)
            ) {
                return true;
            }
        }

        // Diagonal
        if (
            (_cells[0][0] == _cells[1][1] &&
                _cells[0][0] == _cells[2][2] &&
                _cells[0][0] != Cell.None) ||
            (_cells[0][2] == _cells[1][1] &&
                _cells[0][2] == _cells[2][0] &&
                _cells[0][2] != Cell.None)
        ) {
            return true;
        }

        return false;
    }

    /// @notice Check if game is tie
    /// @param _cells from your game
    /// @return isTie is true is there is true and false if there is not
    function isTie(Cell[3][3] memory _cells) internal pure returns (bool) {
        for (uint8 i = 0; i < 3; i++) {
            for (uint8 j = 0; j < 3; j++) {
                if (_cells[i][j] == Cell.None) {
                    return false;
                }
            }
        }
        return true;
    }
}
