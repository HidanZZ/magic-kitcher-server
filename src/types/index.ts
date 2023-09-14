export type BeanData = {
	distanceToCenter: number;
	color: Color;
};
export type RoundData = {
	color_combination: Color[];
	beans: BeanData[];
	round: number;
	completed: boolean;
	isSpecial: boolean;
	timeToComplete: number;
};

export enum BeanColor {
	YELLOW = "YELLOW",
	ORANGE = "ORANGE",
	RED = "RED",
	PURPLE = "PURPLE",
	BLUE = "BLUE",
	GREEN = "GREEN",
	BROWN = "BROWN",
	WHITE = "WHITE",
	GRAY = "GRAY",
	BLACK = "BLACK",
}

export type Color =
	| BeanColor.BLACK
	| BeanColor.BLUE
	| BeanColor.BROWN
	| BeanColor.GRAY
	| BeanColor.GREEN
	| BeanColor.ORANGE
	| BeanColor.PURPLE
	| BeanColor.RED
	| BeanColor.WHITE
	| BeanColor.YELLOW;

export type DataPayload = {
	rounds: RoundData[];
	user: UserInfo;
};

export type UserInfo = {
	email: string;
	age: number;
	gender: string;
	name: string;
	session_id: string;
};
