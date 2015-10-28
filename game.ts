/// <reference path="Level.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="Enemy.ts"/>
/// <reference path="Npc.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/socket.io/socket.io.d.ts"/>

var util = require("util")
var express = require('express')
var app = express()
var port = 8000
var db = require('mongojs').connect('localhost/mongoapp', ['users'])

app.use(express.static(__dirname + '/public'));
var io: SocketIO.Server = require('socket.io').listen(app.listen(port));

/**************************************************
** GAME VARIABLES
**************************************************/
var players: Player[],
	enemies: Enemy[],
	npcs: Npc[],
	items,
	world,
	collisionMap,
	npcList,
	worldSize,
	tileSize;


class EventHandler {
	constructor() {
		io.sockets.on("connection", this.onSocketConnection);
	}
	onSocketConnection(client: SocketIO.Socket) {
		util.log("Player connected: " + client.id);

		// Listen for client disconnected
		client.on("disconnect", onClientDisconnect);

		// Listen for new player message
		client.on("player connected", onPlayerConnect);

		// Listen for move player message
		client.on("move player", onMovePlayer);

		// Listen for new messages
		client.on("new message", onNewMessage);

		// Listen for logout
		client.on("logout", onLogout);

		// Player going to fight
		client.on("start fight", onStartFight);

		// Player attacked enemy
		client.on("in fight", onFighting);

		// Player ended fight
		client.on("abort fight", onAbortFight);
	};
}

function onPlayerConnect(data) {
	var toClient = this;
	db.users.findOne({ playerName: data.playerName }, function(err, savedUser) {
		if (err || !savedUser) {
			console.log("User " + data.playername + " not in db");
			toClient.emit("no player");
			//return;
			var player = new Player(128, 192, data.playerName, 100);
			db.users.save(player, function(err2, savedUser2) {
				if (err2 || !savedUser2) {
					console.log("User not saved because of error" + err2);
				}
				else {
					console.log("User saved");
				}
			});
		}
		else {
			toClient.emit("validated");
			joinPlayer(toClient, data.playerName);
			console.log("User already in db");
		}
	});
};

function joinPlayer(client, playerName) {
	// Send existing players to client
	var existingEnemy;
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].isAlive()) {
			existingEnemy = enemies[i];
			client.emit("new enemy", { x: existingEnemy.getX(), y: existingEnemy.getY(), id: existingEnemy.getID(), type: existingEnemy.getType() });
		}
	};

	// Send existing items to client
	for (var i = 0; i < items.length; i++) {
		client.emit("new item", { x: items[i][0], y: items[i][1] });
	};

	// Send world-data to client
	client.emit("init map", { world: world, tileSize: tileSize, worldSize: worldSize });

	var existingNpc;
	// Send existing npcs to client
	for (var i = 0; i < npcs.length; i++) {
		existingNpc = npcs[i];
		client.emit("new npc", { x: existingNpc.getX(), y: existingNpc.getY(), id: existingNpc.getID(), quest: existingNpc.hasQuest(), questID: existingNpc.getQuestID() });
	};

	client.emit("init collisionMap", { collisionMap: collisionMap });

	var player = playerByName(playerName);

	// New Localplayer
	if (!player) {
		var existingPlayer;
		for (var i = 0; i < players.length; i++) {
			existingPlayer = players[i];
			client.emit("new remote player", existingPlayer);
		};

		// Create a new player
		player = new Player(320, 128, playerName, 100, client.id);

		// Add new player to the players array
		players.push(player);

		// Broadcast new player to connected socket clients
		client.broadcast.emit("new remote player", player);
		client.broadcast.emit("new message", { player: playerName, text: "joined the game", mode: "s" });
	}
	// Existing Localplayer
	else {
		// Update the old ID
		var oldID = player.getID();

		util.log("Player reconnected - id: " + oldID + " --> " + client.id);
		for (var j = 0; j < players.length; j++) {
			if (players[j].getID() == oldID) {
				players[j].setID(client.id);
			}
			else {
				client.broadcast.emit("new remote player", players[j]);
			}
		};
	}
	client.emit("create localplayer", player);
};

function onStartFight(data) {
	for (var j = 0; j < players.length; j++) {
		if (players[j].getID() == data.id) {
			players[j].setGoAttackTrue();
			players[j].setEnemyID(data.enemyID);
			break;
		}
	};
};

function onFighting(data) {
	for (var j = 0; j < players.length; j++) {
		if (players[j].getID() == data.id) {
			players[j].inFight();
			break;
		}
	};
	console.log("Player " + data.id + " fights enemy: " + data.enemyID);
	enemies[data.enemyID].setFightingTrue(data.id);
};

function onAbortFight(data) {
	for (var j = 0; j < players.length; j++) {
		if (players[j].getID() == data.id) {
			players[j].setGoAttackFalse();
		}
	};
};

var playerFightLoop = setInterval(function() {
	for (var i = 0; i < players.length; i++) {
		if (players[i].readyToHit()) {
			var enemy = enemies[players[i].getEnemyID()];
			players[i].setLastStrike(Date.now());
			var damage = calculateDamage(players[i].getStrength(), enemy.getDef());
			enemy.getHurt(damage);
			io.sockets.emit("enemy hurt", { enemyID: enemy.getID(), amount: damage });
			if (!enemy.isAlive()) {
				var tileX = enemy.getX() / 32;
				var tileY = enemy.getY() / 32;
				world[tileX][tileY] = 0;

				players[i].setGoAttackFalse();
				io.sockets.emit("enemy dead", { x: tileX, y: tileY, id: 0, enemyID: enemy.getID(), xp: enemy.getXP(), type: enemy.getType() });
				dropItem(tileX * 32, tileY * 32);
				break;
			}
		}
	}
}, 16);

var calculateDamage = function(att, def) {
	// Math.random() * (max - min + 1) + min;
	var damage = Math.floor((Math.random() * ((att - def) - (att - def - 8))) + (att - def - 8));
	if (damage < 0) damage = 0;
	console.log(att + " " + def + " " + damage);
	return damage;
}

var enemyFightLoop = setInterval(function() {
	for (var i = 0; i < enemies.length; i++) {
		if (!enemies[i].isAlive() && (Date.now() - enemies[i].getKilltime() > enemies[i].getRespawnTime())) {
			for (var j = 0; j < players.length; j++) {
				// If player stands on the tile, don't respawn yet (first is for passing tile, second - after || - is for right on the tile
				if ((players[j].getX() > enemies[i].getX() && players[j].getX() < enemies[i].getX() + 32 &&
					players[j].getY() > enemies[i].getY() && players[j].getY() < enemies[i].getY() + 32) ||
					(players[j].getX() == enemies[i].getX() && players[j].getY() == enemies[i].getY())) {
					break;
				}
				io.sockets.emit("respawn enemy", { id: enemies[i].getID(), x: enemies[i].getX() / 32, y: enemies[i].getY() / 32, type: 1 });
				enemies[i].setAlive()
				world[enemies[i].getX() / 32][enemies[i].getY() / 32] = 1;

				var item = getItem(enemies[i].getX(), enemies[i].getY());
				if (item) {
					io.sockets.emit("item taken", { x: enemies[i].getX(), y: enemies[i].getY(), type: item[2], id: null });
					removeItem(enemies[i].getX(), enemies[i].getY());
				}
			}
		}
		else if (enemies[i].readyToHit()) {
			for (var j = 0; j < players.length; j++) {
				if (players[j].getID() == enemies[i].fightingAgainst()) {
					io.sockets.emit("player hurt", { id: players[j].getID(), amount: enemies[i].getStrength() });
					players[j].getHurt(enemies[i].getStrength());
					enemies[i].setLastStrike(Date.now());
					if (!players[j].isAlive()) {
						io.sockets.emit("player dead", { id: players[j].getID() });
						//enemies[i].killedPlayer(players[j].getID());
						enemies[i].killedPlayer();
					}
				}
			};

		}
	};
}, 16);

function onLogout(data) {
	var removePlayer = playerById(data.id);
	this.broadcast.emit("new message", { player: removePlayer.getName(), text: "left the game", mode: "s" });
	players.splice(players.indexOf(removePlayer), 1);
	this.broadcast.emit("remove player", { id: data.id });
	console.log("Player " + data.id + " logged out");
};

// Socket client has disconnected
function onClientDisconnect() {
	//util.log("Player has disconnected: "+this.id);
	//this.emit("disconnect");
};

// Player has moved
function onMovePlayer(data) {
	// Find player in array
	var movePlayer = playerById(this.id);

	// Player not found
	if (!movePlayer) {
		util.log("Player not found: " + this.id);
		return;
	};

	// Check if player stepped on an item
	var item = getItem(movePlayer.getAbsX(), movePlayer.getAbsY());
	if (item) {
		io.sockets.emit("item taken", { x: item[0], y: item[1], type: item[2], change: item[3], id: data.id });
		movePlayer.takeItem(item[2], item[3]);
		removeItem(movePlayer.getAbsX(), movePlayer.getAbsY());
	}

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
	movePlayer.setAbsX(data.absX);
	movePlayer.setAbsY(data.absY);
	movePlayer.setDirection(data.dir);

	movePlayer.setCanvasXnull(data.canvasX);
	movePlayer.setCanvasYnull(data.canvasY);

	// Broadcast updated position to connected socket clients
	this.broadcast.emit("move player", { id: movePlayer.getID(), x: movePlayer.getAbsX(), y: movePlayer.getAbsY(), dir: movePlayer.getDir() });
};

function dropItem(x, y) {
	var itemChance = Math.round(Math.random() * 100);
	var itemType,
		itemChange;
	if (itemChance < 75) {
		if (itemChance < 40) {
			itemType = 0;
			itemChange = 20;
		}
		else {
			itemType = 1;
			itemChange = 40;
		}
		//TODO: item should be strong typed
		var item = [x, y, itemType, itemChange];
		items.push(item);
		io.sockets.emit("new item", { x: x, y: y, type: itemType });
		console.log("Item with type " + itemType + " dropped");
	}
};

function getItem(x, y) {
	for (var i = 0, max = items.length; i < max; i += 1) {
		if (items[i][0] == x && items[i][1] == y) {
			return items[i];
		}
	}
	return false;
};

function removeItem(x, y) {
	for (var i = 0, max = items.length; i < max; i += 1) {
		if (items[i][0] == x && items[i][1]) {
			items.splice(i, 1);
			break;
		}
	}
};

function onNewMessage(data) {
	var id = playerById(this.id);
	if (data.chatTo) {
		var chatTo = playerByName(data.chatTo);
		if (data.mode == "w" && chatTo) {
			io.sockets.connected[chatTo.getID()].emit("new message", { player: id.getName(), text: data.text, mode: data.mode });
		}
		else if (!chatTo) {
			io.sockets.connected[this.id].emit("new message", { player: "", text: "Player " + data.chatTo + " doesn't exist!", mode: "s" });
		}
	}
	else {
		this.broadcast.emit("new message", { player: id.getName(), text: data.text, mode: data.mode });
	}
}


/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id): Player {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].getID() == id)
			return players[i];
	};

	return null;
};

function playerByName(playerName): Player {
	var j;
	for (j = 0; j < players.length; j++) {
		if (players[j].getName() == playerName) {
			return players[j];
		}
	};
	return null;
};

// init
(() => {
	players = [];
	enemies = [];
	items = [];
	npcs = [];
	collisionMap = [];

	var level = new Level().init();

	world = level.getMap();
	worldSize = level.getWorldSize();
	tileSize = level.getTileSize();

	var enemyID = 0;
	for (var i = 0; i < worldSize; i++) {
		for (var h = 0; h < worldSize; h++) {
			if (world[i][h] == 1) {
				var newEnemy = new Enemy(i * tileSize, h * tileSize, enemyID, 0);
				enemies.push(newEnemy);
				enemyID++;
			}
		}
	}

	// Init npc array
	npcList = level.getNpcList();

	// Create empty collision map
	for (var x = 0; x < worldSize; x++) {
		collisionMap[x] = [];

		for (var y = 0; y < worldSize; y++) {
			if (world[x][y] == 0) {
				collisionMap[x][y] = 0;
			}
			else if (world[x][y] == 1) {
				collisionMap[x][y] = 1;
			}
			else {
				collisionMap[x][y] = 3;
			}
		}
	}

	// Fill collision map
	for (var i = 0; i < npcList.length; i += 1) {
		var newNpc = new Npc(npcList[i][1] * tileSize, npcList[i][2] * tileSize, npcList[i][3], npcList[i][5], npcList[i][6]);
		npcs.push(newNpc);
		collisionMap[npcList[i][1]][npcList[i][2]] = 2;
	}
	new EventHandler
})()