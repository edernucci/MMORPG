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
        // Draw enemy
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
