class Npc {
	x: number
	y: number
	id: number
	quest: number
	questID: number
	size: number
	constructor(startX: number, startY: number, ID: number, hasQuest: number, qID: number) {
		this.x = startX,
		this.y = startY,
		this.id = ID,
		this.quest = hasQuest,
		this.questID = qID,
		this.size = 32
	}
	getX = () => {
		return this.x
	}
	getY = () => {
		return this.y
	}

	getID = () => {
		return this.id
	}

	hasQuest = () => {
		return this.quest
	}

	getQuestID = () => {
		return this.questID
	}

	setX = (newX) => {
		this.x = newX
	}

	setY = (newY) => {
		this.y = newY
	}

	// Draw enemy
	draw = (ctx) => {
		ctx.fillRect(this.x, this.y, this.size, this.size)
	}
}

exports.Npc = Npc
