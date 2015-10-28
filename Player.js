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
// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;
