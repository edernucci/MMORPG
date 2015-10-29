class Player {
	x = {}
	absX = {}
	y = {}
	absY = {}
	dir: number
	alive = {}
	maxhp = {}
	money = {}
	currhp: number
	playerName = {}
	canvasXnull = {}
	canvasYnull = {}
	goAttack: boolean
	fighting: boolean
	strength: number
	lastStrike: number
	hitSpeed: number
	playerAttacksEnemyID = {}
	id = {}
	constructor(startX, startY, pName, hp, id?) {
		this.x = startX;
		this.absX = this.x;
		this.y = startY;
		this.absY = this.y;
		this.dir = 2;
		this.alive = true;
		this.maxhp = 100;
		this.money = 0;
		this.currhp = hp;
		this.playerName = pName;
		this.canvasXnull = 0;
		this.canvasYnull = 0;
		this.goAttack = false;
		this.fighting = false;
		this.strength = 50;
		this.lastStrike = 0;
		this.hitSpeed = 500;
		this.playerAttacksEnemyID = null;
		this.id = id;
	}

	getX = () => {
		return this.x
	}

	getAbsX = () => {
		return this.absX;
	}

	getY = () => {
		return this.y;
	}

	getAbsY = () => {
		return this.absY;
	}

	xpForLevel = (level) => {
		return level * level * level;
	}

	getID = () => {
		return this.id;
	}

	getName = () => {
		return this.playerName;
	}

	getDir = () => {
		return this.dir;
	}

	getCanvasXnull = () => {
		return this.canvasXnull;
	}

	getCanvasYnull = () => {
		return this.canvasYnull;
	}

	getStrength = () => {
		return this.strength;
	}

	getEnemyID = () => {
		return this.playerAttacksEnemyID;
	}

	getLastStrike = () => {
		return this.lastStrike;
	}

	getHitSpeed = () => {
		return this.hitSpeed;
	}

	getCurrHP = () => {
		return this.currhp;
	}

	getHurt = (amount) => {
		this.currhp -= amount;
		if (this.currhp < 0) {
			this.currhp = 0;
			this.alive = false;
		}
	}

	isAlive = () => {
		return this.alive;
	}

	setLastStrike = (time) => {
		this.lastStrike = time;
	}

	setID = (id) => {
		this.id = id;
	}

	isGoingToFight = () => {
		return (this.goAttack || this.fighting);
	}

	isFighting = () => {
		return this.fighting;
	}

	setEnemyID = (id) => {
		this.playerAttacksEnemyID = id;
	}

	setX = (newX) => {
		this.x = newX;
	}

	setAbsX = (newX) => {
		this.absX = newX;
	}

	setY = (newY) => {
		this.y = newY;
	}

	setAbsY = (newY) => {
		this.absY = newY;
	}

	setDirection = (direction) => {
		this.dir = direction;
	}

	setCanvasXnull = (x) => {
		this.canvasXnull = x;
	}

	setCanvasYnull = (y) => {
		this.canvasYnull = y;
	}

	setGoAttackTrue = () => {
		this.goAttack = true;
	}

	setGoAttackFalse = () => {
		this.goAttack = false;
		this.fighting = false;
	}

	inFight = () => {
		this.fighting = true;
	}

	readyToHit = () => {
		return (this.fighting && (Date.now() - this.lastStrike > this.hitSpeed));
	}

	takeItem = (type, change) => {
		if (type == 0) {
			this.currhp += change;
		}
		else if (type == 1) {
			this.money += change;
		}
	}
}

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;
