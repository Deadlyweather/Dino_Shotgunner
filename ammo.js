class Ammo {
    constructor(direction, owner, startX, startY, type = "bullet") {
        this.direction = direction;
        this.owner = owner;
        this.startX = startX;
        this.startY = startY;
        this.type = type;
        this.range = owner.range;
        this.isActive = true;
        this.life = 1;
        this.size = 1;
        this.color = "yellow";
        this.radius = 0
    }

    update() {
        if (this.life <= 0) {
            this.isActive = false;
            return;
        }
        if (this.type === "bullet") {
            this.life -= 1
        }
        if (this.type === "chomp") {
            this.life += 0.5
        }
    }

    drawBullet(ctx) {
        if (this.type === "chomp") {
            this.drawChomp(ctx);
            return;
        }
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
    drawChomp(ctx) {
        if (!this.isActive) return;
        this.radius = 125 * this.owner.size
        this.size = 10 * this.owner.size
        this.color = `rgba(255, 0, 0, ${this.life})`;

        
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}