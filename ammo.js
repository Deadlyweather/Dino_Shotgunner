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
        this.size = type === "chomp" ? 4 : 1;
        this.color = type === "chomp" ? "rgba(255, 0, 0, 1)" : "yellow";
        this.radius = type === "chomp" ? (owner.head1?.firepoint || owner.range * 0.25) : 0;

        if (this.type === "projectile") {

        this.vx = -10; 
        this.vy = -20; 
    }
    }

    update() {
        if (this.life <= 0) {
            this.isActive = false;
            return;
        }
        if (this.type === "bullet") {
            this.life -= 1;
        }
        if (this.type === "chomp") {
            this.life -= 1
        }
        if (this.type === "projectile") {
            this.startX += this.vx;
            this.startY += this.vy;
            
            // Lisätään painovoima
            this.vy += 0.5;
            
        }
    }

    drawBullet(ctx, cameraX = 0) {
        if (this.type === "chomp") {
            this.drawChomp(ctx, cameraX);
            return;
        }
        if (!this.isActive) return;

        const startX = this.startX - cameraX;
        const startY = this.startY;
        const endX = startX + Math.cos(this.direction) * this.range;
        const endY = startY + Math.sin(this.direction) * this.range;

        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
    }
    drawChomp(ctx, cameraX = 0) {
        // pika AOE
        if (!this.isActive) return;
        this.color = "rgb(255, 255, 255)";
        this.radius = this.owner.size * this.owner.head1.scale * (50 + this.owner.strenght)
        
        ctx.save();
        ctx.globalAlpha = 0.3
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.startX - cameraX, this.startY, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    drawProjectile(ctx, cameraX, image, width, height) {
    if (!this.isActive) return;
    
    if (image) {
        ctx.drawImage(image, this.startX - cameraX, this.startY, width, height);
    }
}
}
