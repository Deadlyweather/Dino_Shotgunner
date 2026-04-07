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

        // Draw firepoint
        this.drawShotgunSpecial(ctx);
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
    // Haulikko special debug
    drawShotgunSpecial(ctx) {
        const part = this.player.shotgun;
        const centerX = this.player.coordinates.x + (part.offset?.x || 0) * this.player.size + part.point.x * this.player.size * part.scale;
        const centerY = this.player.coordinates.y + (part.offset?.y || 0) * this.player.size + part.point.y * this.player.size * part.scale;

        const angle = part.rotation;

        // Draw firepoint as a circle
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(centerX + Math.cos(angle) * part.firepoint * this.player.size * part.scale, centerY + Math.sin(angle) * part.firepoint * this.player.size * part.scale, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw spread area
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "orange";
        ctx.beginPath();
        const fireX = centerX + Math.cos(angle) * part.firepoint * this.player.size * part.scale;
        const fireY = centerY + Math.sin(angle) * part.firepoint * this.player.size * part.scale;
        ctx.arc(fireX, fireY, this.player.range, angle - (this.player.spread / 2) * (Math.PI / 180), angle + (this.player.spread / 2) * (Math.PI / 180));
        ctx.lineTo(fireX, fireY);
        ctx.fill();
        ctx.restore();
    }
}