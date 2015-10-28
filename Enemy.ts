class Enemy {
	x: number
	y: number
	dir: number
	alive = {}
	maxhp: number
	currhp: number
	fighting: boolean
	strength: number
	lastStrike: number
	hitSpeed: number
	playerAttacksEnemyID = {}
	id = {}
	level: number
	killTime: number
	xp: number
	type
	baseXP: number
	def: number
	respawnTime: number
	fightingPlayers
	size: number
	constructor(startX, startY, ID, type) {
		this.x = startX
		this.y = startY
		this.maxhp = 100
		this.currhp = this.maxhp
		this.strength = 5
		this.id = ID
		this.level = 1
		this.killTime = 0
		this.alive = true
		this.xp = 4
		this.type = type
		this.baseXP = 39
		this.def = 10
		this.hitSpeed = 900
		this.respawnTime = 3000
		this.fighting = false
		this.fightingPlayers = []
		this.lastStrike = 0
		this.size = 32
	}

	getX = (): number => {
		return this.x;
	}

	getY = () => {
		return this.y;
	}

	getID = () => {
		return this.id;
	}

	getDef = () => {
		return this.def;
	}

	getCurrHP = () => {
		return this.currhp;
	}

	getStrength = () => {
		return this.strength;
	}

	getRespawnTime = () => {
		return this.respawnTime;
	}

	getHitSpeed = () => {
		return this.hitSpeed;
	}

	getHurt = (amount: number) => {
		this.currhp -= amount;
		if (this.currhp < 0) {
			this.alive = false;
			this.currhp = 0;
			this.killTime = Date.now();
			this.fighting = false;
			this.fightingPlayers = [];
		}
	}

	getType = () => {
		return this.type;
	}

	getLastStrike = () => {
		return this.lastStrike;
	}

	isFighting = () => {
		return this.fighting;
	}

	readyToHit = () => {
		return (this.fighting && (Date.now() - this.lastStrike > this.hitSpeed));
	}

	killedPlayer = () => {
		this.fightingPlayers.shift();
		//if(fightingPlayers.length == 0) {
		this.fighting = false;
		//}
	}

	fightingAgainst = () => {
		return this.fightingPlayers[0];
	}

	getKilltime = () => {
		return this.killTime;
	}

	getXP = () => {
		return this.xp;
	}

	setLastStrike = (time) => {
		this.lastStrike = time;
	}

	setX = (newX) => {
		this.x = newX;
	}

	setY = (newY) => {
		this.y = newY;
	}

	setAlive = () => {
		this.alive = true;
		this.currhp = this.maxhp;
	}

	setFightingTrue = (playerID) => {
		this.fighting = true;
		this.fightingPlayers.push(playerID);
	}

	setFightingFalse = () => {
		this.fighting = false;
	}

	isAlive = () => {
		return this.alive;
	}
}

// Export the Enemy class so you can use it in
// other files by using require("Enemy").Enemy
exports.Enemy = Enemy;
