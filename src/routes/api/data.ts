import { Router, Response, Request } from "express";
import { DataPayload, RoundData, UserInfo } from "index";
import Data, { TData, TRound } from "../../models/Data";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
	try {
		const { rounds, user }: DataPayload = req.body;
		console.log(req.body);

		if (!rounds) {
			res.status(400).json({
				message: "can't do this",
			});
			return;
		}
		if (!user || !user.email || !user.age || !user.name) {
			res.status(400).json({
				message: "can't do this",
			});
			return;
		}
		console.log(`received data from ${user.email}`);

		const data = treatData(rounds, user);
		const newData = new Data(data);
		await newData.save();
		res.json({
			message: "success",
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
});

function treatData(rounds: RoundData[], user: UserInfo) {
	const rounds_reached = getMaxRounds(rounds);
	//group rounds by round number
	const rounds_by_round = groupByRound(rounds);
	let gameTime = 0;
	const rounds_data: TRound[] = [];
	for (let i = 1; i < rounds_reached + 1; i++) {
		const round = rounds_by_round[i];
		if (!round) {
			continue;
		}
		gameTime += round.reduce((acc: number, round: RoundData) => {
			return acc + round.timeToComplete;
		}, 0);
		const round_data: TRound = {
			round: i,
			timeToComplete: round.reduce((acc: number, round: RoundData) => {
				return acc + round.timeToComplete;
			}, 0),
			//check if round was completed on first try
			firstTry: round.reduce((acc: boolean, round: RoundData) => {
				return acc && round.completed;
			}, true),
			isSpecial: round.reduce((acc: boolean, round: RoundData) => {
				return acc && round.isSpecial;
			}, true),
			color_combination: round.reduce((acc: string[], round: RoundData) => {
				return round.color_combination;
			}, []),
			allData: round,
		};
		rounds_data.push(round_data);
	}
	const data: TData = {
		email: user.email,
		age: user.age,
		name: user.name,
		maxRound: rounds_reached,
		gameTime,
		rounds: rounds_data,
	};
	console.log(data);

	return data;
}

function getMaxRounds(rounds: RoundData[]) {
	return rounds.reduce((acc, round) => {
		if (round.round > acc) {
			return round.round;
		}
		return acc;
	}, 0);
}
function groupByRound(rounds: RoundData[]) {
	return rounds.reduce((acc: any, round) => {
		if (acc[round.round]) {
			acc[round.round].push(round);
		} else {
			acc[round.round] = [round];
		}
		return acc;
	}, {});
}

export default router;
