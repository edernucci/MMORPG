var Player = (function () {
    function Player(startX, startY, pName, hp, id) {
        this.x = {};
        this.absX = {};
        this.y = {};
        this.absY = {};
        this.alive = {};
        this.maxhp = {};
        this.money = {};
        this.currhp = {};
        this.playerName = {};
        this.canvasXnull = {};
        this.canvasYnull = {};
        this.playerAttacksEnemyID = {};
        this.id = {};
        this.getX = function () {
            return this.x;
        };
        this.getAbsX = function () {
            return this.absX;
        };
        this.getY = function () {
            return this.y;
        };
        this.getAbsY = function () {
            return this.absY;
        };
        this.xpForLevel = function (level) {
            return level * level * level;
        };
        this.getID = function () {
            return this.id;
        };
        this.getName = function () {
            return this.playerName;
        };
        this.getRestart = function () {
            return this.restart;
        };
        this.getDir = function () {
            return this.dir;
        };
        this.getCanvasXnull = function () {
            return this.canvasXnull;
        };
        this.getCanvasYnull = function () {
            return this.canvasYnull;
        };
        this.getStrength = function () {
            return this.strength;
        };
        this.getEnemyID = function () {
            return this.playerAttacksEnemyID;
        };
        this.getLastStrike = function () {
            return this.lastStrike;
        };
        this.getHitSpeed = function () {
            return this.hitSpeed;
        };
        this.getCurrHP = function () {
            return this.currhp;
        };
        this.getHurt = function (amount) {
            this.currhp -= amount;
            if (this.currhp < 0) {
                this.currhp = 0;
                this.alive = false;
            }
        };
        this.isAlive = function () {
            return this.alive;
        };
        this.setLastStrike = function (time) {
            this.lastStrike = time;
        };
        this.setID = function (id) {
            this.id = id;
        };
        this.isGoingToFight = function () {
            return (this.goAttack || this.fighting);
        };
        this.isFighting = function () {
            return this.fighting;
        };
        this.setEnemyID = function (id) {
            this.playerAttacksEnemyID = id;
        };
        this.setX = function (newX) {
            this.x = newX;
        };
        this.setAbsX = function (newX) {
            this.absX = newX;
        };
        this.setY = function (newY) {
            this.y = newY;
        };
        this.setAbsY = function (newY) {
            this.absY = newY;
        };
        this.setRestart = function (bool) {
            this.restart = bool;
        };
        this.setDirection = function (direction) {
            this.dir = direction;
        };
        this.setCanvasXnull = function (x) {
            this.canvasXnull = x;
        };
        this.setCanvasYnull = function (y) {
            this.canvasYnull = y;
        };
        this.setGoAttackTrue = function () {
            this.goAttack = true;
        };
        this.setGoAttackFalse = function () {
            this.goAttack = false;
            this.fighting = false;
        };
        this.inFight = function () {
            this.fighting = true;
        };
        this.readyToHit = function () {
            return (this.fighting && (Date.now() - this.lastStrike > this.hitSpeed));
        };
        this.takeItem = function (type, change) {
            if (type == 0) {
                this.currhp += change;
            }
            else if (type == 1) {
                this.money += change;
            }
        };
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
    return Player;
})();
exports.Player = Player;
var Level = (function () {
    function Level() {
        var _this = this;
        this.world = [[]];
        this.tileSize = 32;
        this.map = [[2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2],
            [2, 2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2],
            [2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2],
            [2, 3, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2],
            [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 3, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 3, 2, 2],
            [2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
            [2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3],
            [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3],
            [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 3],
            [2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2],
            [2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2],
            [2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2],
            [2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]];
        this.npcs = [
            ["Egon der Schankwirt", 7, 5, 0, 0, true, 0],
            ["Hugo der Ritter", 7, 8, 1, 0, false, null],
            ["Rupert der Kräutermixer", 8, 6, 0, 0, true, 2]
        ];
        this.changeTo = function (num) {
            for (var x = 0; x < _this.map.length; x++) {
                _this.world[x] = [];
                for (var y = 0; y < _this.map.length; y++) {
                    _this.world[x][y] = 0;
                }
            }
            for (var y = 0; y < _this.map.length; y++) {
                for (var x = 0; x < _this.map.length; x++) {
                    _this.world[x][y] = _this.map[y][x];
                }
            }
        };
        this.init = function () {
            var level = this;
            level.changeTo(1);
            return this;
        };
        this.getMap = function () {
            return this.world;
        };
        this.getNpcList = function () {
            return this.npcs;
        };
        this.getWorldSize = function () {
            return this.map.length;
        };
        this.getTileSize = function () {
            return this.tileSize;
        };
    }
    return Level;
})();
exports.Level = Level;
var Enemy = (function () {
    function Enemy(startX, startY, ID, type) {
        var _this = this;
        this.alive = {};
        this.playerAttacksEnemyID = {};
        this.id = {};
        this.getX = function () {
            return _this.x;
        };
        this.getY = function () {
            return _this.y;
        };
        this.getID = function () {
            return _this.id;
        };
        this.getDef = function () {
            return _this.def;
        };
        this.getCurrHP = function () {
            return _this.currhp;
        };
        this.getStrength = function () {
            return _this.strength;
        };
        this.getRespawnTime = function () {
            return _this.respawnTime;
        };
        this.getHitSpeed = function () {
            return _this.hitSpeed;
        };
        this.getHurt = function (amount) {
            _this.currhp -= amount;
            if (_this.currhp < 0) {
                _this.alive = false;
                _this.currhp = 0;
                _this.killTime = Date.now();
                _this.fighting = false;
                _this.fightingPlayers = [];
            }
        };
        this.getType = function () {
            return _this.type;
        };
        this.getLastStrike = function () {
            return _this.lastStrike;
        };
        this.isFighting = function () {
            return _this.fighting;
        };
        this.readyToHit = function () {
            return (_this.fighting && (Date.now() - _this.lastStrike > _this.hitSpeed));
        };
        this.killedPlayer = function () {
            _this.fightingPlayers.shift();
            _this.fighting = false;
        };
        this.fightingAgainst = function () {
            return _this.fightingPlayers[0];
        };
        this.getKilltime = function () {
            return _this.killTime;
        };
        this.getXP = function () {
            return _this.xp;
        };
        this.setLastStrike = function (time) {
            _this.lastStrike = time;
        };
        this.setX = function (newX) {
            _this.x = newX;
        };
        this.setY = function (newY) {
            _this.y = newY;
        };
        this.setAlive = function () {
            _this.alive = true;
            _this.currhp = _this.maxhp;
        };
        this.setFightingTrue = function (playerID) {
            _this.fighting = true;
            _this.fightingPlayers.push(playerID);
        };
        this.setFightingFalse = function () {
            _this.fighting = false;
        };
        this.isAlive = function () {
            return _this.alive;
        };
        this.x = startX;
        this.y = startY;
        this.maxhp = 100;
        this.currhp = this.maxhp;
        this.strength = 5;
        this.id = ID;
        this.level = 1;
        this.killTime = 0;
        this.alive = true;
        this.xp = 4;
        this.type = type;
        this.baseXP = 39;
        this.def = 10;
        this.hitSpeed = 900;
        this.respawnTime = 3000;
        this.fighting = false;
        this.fightingPlayers = [];
        this.lastStrike = 0;
        this.size = 32;
    }
    return Enemy;
})();
exports.Enemy = Enemy;
var Npc = (function () {
    function Npc(startX, startY, ID, hasQuest, qID) {
        var _this = this;
        this.getX = function () {
            return _this.x;
        };
        this.getY = function () {
            return _this.y;
        };
        this.getID = function () {
            return _this.id;
        };
        this.hasQuest = function () {
            return _this.quest;
        };
        this.getQuestID = function () {
            return _this.questID;
        };
        this.setX = function (newX) {
            _this.x = newX;
        };
        this.setY = function (newY) {
            _this.y = newY;
        };
        this.draw = function (ctx) {
            ctx.fillRect(_this.x, _this.y, _this.size, _this.size);
        };
        this.x = startX,
            this.y = startY,
            this.id = ID,
            this.quest = hasQuest,
            this.questID = qID,
            this.size = 32;
    }
    return Npc;
})();
exports.Npc = Npc;
/// <reference path="Level.ts"/>
/// <reference path="Player.ts"/>
/// <reference path="Enemy.ts"/>
/// <reference path="Npc.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/socket.io/socket.io.d.ts"/>
var util = require("util");
var express = require('express');
var app = express();
var port = 8000;
var db = require('mongojs').connect('localhost/mongoapp', ['users']);
app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));
var players, towers, enemies, npcs, items, world, collisionMap, npcList, worldSize, tileSize;
var EventHandler = (function () {
    function EventHandler() {
        io.sockets.on("connection", this.onSocketConnection);
    }
    EventHandler.prototype.onSocketConnection = function (client) {
        util.log("Player connected: " + client.id);
        client.on("disconnect", onClientDisconnect);
        client.on("player connected", onPlayerConnect);
        client.on("move player", onMovePlayer);
        client.on("new message", onNewMessage);
        client.on("logout", onLogout);
        client.on("start fight", onStartFight);
        client.on("in fight", onFighting);
        client.on("abort fight", onAbortFight);
    };
    ;
    return EventHandler;
})();
function onPlayerConnect(data) {
    var toClient = this;
    db.users.findOne({ playerName: data.playerName }, function (err, savedUser) {
        if (err || !savedUser) {
            console.log("User " + data.playername + " not in db");
            toClient.emit("no player");
            var player = new Player(128, 192, data.playerName, 100);
            db.users.save(player, function (err2, savedUser2) {
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
}
;
function joinPlayer(client, playerName) {
    var existingEnemy;
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].isAlive()) {
            existingEnemy = enemies[i];
            client.emit("new enemy", { x: existingEnemy.getX(), y: existingEnemy.getY(), id: existingEnemy.getID(), type: existingEnemy.getType() });
        }
    }
    ;
    for (var i = 0; i < items.length; i++) {
        client.emit("new item", { x: items[i][0], y: items[i][1] });
    }
    ;
    client.emit("init map", { world: world, tileSize: tileSize, worldSize: worldSize });
    var existingNpc;
    for (var i = 0; i < npcs.length; i++) {
        existingNpc = npcs[i];
        client.emit("new npc", { x: existingNpc.getX(), y: existingNpc.getY(), id: existingNpc.getID(), quest: existingNpc.hasQuest(), questID: existingNpc.getQuestID() });
    }
    ;
    client.emit("init collisionMap", { collisionMap: collisionMap });
    var player = playerByName(playerName);
    if (!player) {
        var existingPlayer;
        for (var i = 0; i < players.length; i++) {
            existingPlayer = players[i];
            client.emit("new remote player", existingPlayer);
        }
        ;
        player = new Player(320, 128, playerName, 100, client.id);
        players.push(player);
        client.broadcast.emit("new remote player", player);
        client.broadcast.emit("new message", { player: playerName, text: "joined the game", mode: "s" });
    }
    else {
        var oldID = player.getID();
        util.log("Player reconnected - id: " + oldID + " --> " + client.id);
        for (var j = 0; j < players.length; j++) {
            if (players[j].getID() == oldID) {
                players[j].setID(client.id);
            }
            else {
                client.broadcast.emit("new remote player", players[j]);
            }
        }
        ;
    }
    client.emit("create localplayer", player);
}
;
function onStartFight(data) {
    for (var j = 0; j < players.length; j++) {
        if (players[j].getID() == data.id) {
            players[j].setGoAttackTrue();
            players[j].setEnemyID(data.enemyID);
            break;
        }
    }
    ;
}
;
function onFighting(data) {
    for (var j = 0; j < players.length; j++) {
        if (players[j].getID() == data.id) {
            players[j].inFight();
            break;
        }
    }
    ;
    console.log("Player " + data.id + " fights enemy: " + data.enemyID);
    enemies[data.enemyID].setFightingTrue(data.id);
}
;
function onAbortFight(data) {
    for (var j = 0; j < players.length; j++) {
        if (players[j].getID() == data.id) {
            players[j].setGoAttackFalse();
        }
    }
    ;
}
;
var playerFightLoop = setInterval(function () {
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
var calculateDamage = function (att, def) {
    var damage = Math.floor((Math.random() * ((att - def) - (att - def - 8))) + (att - def - 8));
    if (damage < 0)
        damage = 0;
    console.log(att + " " + def + " " + damage);
    return damage;
};
var enemyFightLoop = setInterval(function () {
    for (var i = 0; i < enemies.length; i++) {
        if (!enemies[i].isAlive() && (Date.now() - enemies[i].getKilltime() > enemies[i].getRespawnTime())) {
            for (var j = 0; j < players.length; j++) {
                if ((players[j].getX() > enemies[i].getX() && players[j].getX() < enemies[i].getX() + 32 &&
                    players[j].getY() > enemies[i].getY() && players[j].getY() < enemies[i].getY() + 32) ||
                    (players[j].getX() == enemies[i].getX() && players[j].getY() == enemies[i].getY())) {
                    break;
                }
                io.sockets.emit("respawn enemy", { id: enemies[i].getID(), x: enemies[i].getX() / 32, y: enemies[i].getY() / 32, type: 1 });
                enemies[i].setAlive();
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
                        enemies[i].killedPlayer();
                    }
                }
            }
            ;
        }
    }
    ;
}, 16);
function onLogout(data) {
    var removePlayer = playerById(data.id);
    this.broadcast.emit("new message", { player: removePlayer.getName(), text: "left the game", mode: "s" });
    players.splice(players.indexOf(removePlayer), 1);
    this.broadcast.emit("remove player", { id: data.id });
    console.log("Player " + data.id + " logged out");
}
;
function onClientDisconnect() {
}
;
function onMovePlayer(data) {
    var movePlayer = playerById(this.id);
    if (!movePlayer) {
        util.log("Player not found: " + this.id);
        return;
    }
    ;
    var item = getItem(movePlayer.getAbsX(), movePlayer.getAbsY());
    if (item) {
        io.sockets.emit("item taken", { x: item[0], y: item[1], type: item[2], change: item[3], id: data.id });
        movePlayer.takeItem(item[2], item[3]);
        removeItem(movePlayer.getAbsX(), movePlayer.getAbsY());
    }
    movePlayer.setX(data.x);
    movePlayer.setY(data.y);
    movePlayer.setAbsX(data.absX);
    movePlayer.setAbsY(data.absY);
    movePlayer.setDirection(data.dir);
    movePlayer.setCanvasXnull(data.canvasX);
    movePlayer.setCanvasYnull(data.canvasY);
    this.broadcast.emit("move player", { id: movePlayer.getID(), x: movePlayer.getAbsX(), y: movePlayer.getAbsY(), dir: movePlayer.getDir() });
}
;
function dropItem(x, y) {
    var itemChance = Math.round(Math.random() * 100);
    var itemType, itemChange;
    if (itemChance < 75) {
        if (itemChance < 40) {
            itemType = 0;
            itemChange = 20;
        }
        else {
            itemType = 1;
            itemChange = 40;
        }
        var item = [x, y, itemType, itemChange];
        items.push(item);
        io.sockets.emit("new item", { x: x, y: y, type: itemType });
        console.log("Item with type " + itemType + " dropped");
    }
}
;
function getItem(x, y) {
    for (var i = 0, max = items.length; i < max; i += 1) {
        if (items[i][0] == x && items[i][1] == y) {
            return items[i];
        }
    }
    return false;
}
;
function removeItem(x, y) {
    for (var i = 0, max = items.length; i < max; i += 1) {
        if (items[i][0] == x && items[i][1]) {
            items.splice(i, 1);
            break;
        }
    }
}
;
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
function playerById(id) {
    var i;
    for (i = 0; i < players.length; i++) {
        if (players[i].getID() == id)
            return players[i];
    }
    ;
    return null;
}
;
function playerByName(playerName) {
    var j;
    for (j = 0; j < players.length; j++) {
        if (players[j].getName() == playerName) {
            return players[j];
        }
    }
    ;
    return null;
}
;
(function () {
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
    npcList = level.getNpcList();
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
    for (var i = 0; i < npcList.length; i += 1) {
        var newNpc = new Npc(npcList[i][1] * tileSize, npcList[i][2] * tileSize, npcList[i][3], npcList[i][5], npcList[i][6]);
        npcs.push(newNpc);
        collisionMap[npcList[i][1]][npcList[i][2]] = 2;
    }
    new EventHandler;
})();
