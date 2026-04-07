class Ammo {
    constructor(direction, owner, startX, startY) {
        this.direction = direction;
        this.owner = owner;
        this.startX = startX;
        this.startY = startY;
        this.range = owner.range;
        this.isActive = true;
        this.life = 1;
        this.size = 1;
        this.color = "yellow";
    }

    update() {
        if (this.life <= 0) {
            this.isActive = false;
            return;
        }
        this.life -= 1;
    }

    drawBullet(ctx) {
        if (!this.isActive) return;

        const endX = this.startX + Math.cos(this.direction) * this.range;
        const endY = this.startY + Math.sin(this.direction) * this.range;

        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
    }
}