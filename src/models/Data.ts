import { RoundData } from "index";
import { Document, model, Schema } from "mongoose";

export type TData = {
	email: string;
	age: number;
	name: string;
	gameTime: number;
	maxRound: number;
	rounds: TRound[];
};

export type TRound = {
	round: number;
	timeToComplete: number;
	firstTry: boolean;
	isSpecial: boolean;
	color_combination: string[];
	allData: RoundData[];
};

export interface IData extends TData, Document {}

const dataSchema: Schema = new Schema({
	email: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	gameTime: {
		type: Number,
		required: true,
	},
	maxRound: {
		type: Number,
		required: true,
	},
	rounds: {
		type: Array,
		required: true,
	},
});

const Data = model<IData>("Data", dataSchema);

export default Data;
