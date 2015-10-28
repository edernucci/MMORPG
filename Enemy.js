var Enemy = (function () {
    function Enemy(startX, startY, ID, typ) {
        var _this = this;
        this.x = {};
        this.y = {};
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
            //if(fightingPlayers.length == 0) {
            _this.fighting = false;
            //}
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
        this.type = typ;
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
// Export the Enemy class so you can use it in
// other files by using require("Enemy").Enemy
exports.Enemy = Enemy;
