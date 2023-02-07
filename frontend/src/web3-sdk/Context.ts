import { createContext } from "react";
import Contract from "./Contract";

type IGameContext = {
	contract: {
		contract: Contract | undefined,
		setContract: React.Dispatch<React.SetStateAction<Contract | undefined>>
	},
	currentGameId: {
		currentGameId: string | undefined,
		setCurrentGameId: React.Dispatch<React.SetStateAction<string | undefined>>
	}
}

const GameContext = createContext<IGameContext | undefined>(undefined);
export default GameContext;