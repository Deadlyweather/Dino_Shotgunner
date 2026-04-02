class Debug {
    constructor() {
        this.showImages = true;
        this.player = player;

        window.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() === "§") {
                this.showImages = !this.showImages;
            }
        });
    }

    draw(ctx) {
        if (!this.showImages) return;

        const parts = [
            /* piilotus alue 
                this.player.head2,
                this.player.head1
                this.player.torso,
                this.player.hand2,
                
                this.player.hand1,
                this.player.leg1,
                this.player.leg2,
            */
            this.player.shotgun,
            
            
        ];

        parts.forEach(part => {
            this.drawPart(ctx, part, this.player.coordinates.x, this.player.coordinates.y);
        });
    }

    drawPart(ctx, part, x, y) {
        const offsetX = (part.offset?.x || 0) * this.player.size;
        const offsetY = (part.offset?.y || 0) * this.player.size;
        const finalScale = this.player.size * part.scale;

        const w = part.width || part.naturalWidth || 0;
        const h = part.height || part.naturalHeight || 0;

        ctx.save();

        ctx.translate(x + offsetX, y + offsetY);

        ctx.translate(part.point.x * finalScale, part.point.y * finalScale);

        ctx.rotate(part.rotation);

        ctx.scale(finalScale, finalScale);

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2 / finalScale;
        ctx.strokeRect(
            -part.point.x,
            -part.point.y,
            w,
            h
        );

        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(0, 0, 4 / finalScale, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "lime";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(40 / finalScale, 0);
        ctx.stroke();

        ctx.restore();
    }
}