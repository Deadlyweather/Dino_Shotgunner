class World {
    constructor() {
        this.height = 200;
        this.time = 0; // 0-1, päivä sykli
        this.sun = { size: 50, color: "yellow" };
        this.moon = { size: 50, color: "cyan" };

        // Grafiikka
        this.ground = new Image();
        this.ground.src = "Images/Sand.png";
        this.tileWidth = 200;

        this.distance = 800;
    }

    update() {
        this.time += 0.001;
        if (this.time > 1) this.time -= 1;
    }

    draw(ctx) {
        const t = Math.cos(this.time * Math.PI * 2) * 0.5 + 0.5;

        const dayColorTop = [135, 206, 235];
        const nightColorTop = [50, 50, 100];

        const nightColorBottom = [30, 30, 60];
        const dayColorBottom = [255, 140, 0];

        const sunIntensity = Math.sin(this.time * Math.PI * 2);
        const orangeFactor = Math.max(0, sunIntensity);

        const topR = Math.floor(nightColorTop[0] * (1-t) + dayColorTop[0] * t);
        const topG = Math.floor(nightColorTop[1] * (1-t) + dayColorTop[1] * t);
        const topB = Math.floor(nightColorTop[2] * (1-t) + dayColorTop[2] * t);

        const bottomR = Math.floor(nightColorBottom[0] * (1-t) + dayColorBottom[0] * orangeFactor);
        const bottomG = Math.floor(nightColorBottom[1] * (1-t) + dayColorBottom[1] * orangeFactor);
        const bottomB = Math.floor(nightColorBottom[2] * (1-t) + dayColorBottom[2] * orangeFactor);

        const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, `rgb(${topR},${topG},${topB})`);
        gradient.addColorStop(0.7, `rgb(${topR},${topG},${topB})`);
        gradient.addColorStop(1, `rgb(${bottomR},${bottomG},${bottomB})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);



        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 1.25;

        const sunX = centerX + this.distance * 1.25 * Math.cos(this.time * Math.PI * 2 - Math.PI / 2);
        const sunY = centerY + this.distance * Math.sin(this.time * Math.PI * 2 - Math.PI / 2);

        ctx.save();
        ctx.shadowBlur = 50;
        ctx.shadowColor = this.sun.color;
        ctx.beginPath();
        ctx.arc(sunX, sunY, this.sun.size, 0, Math.PI * 2);
        ctx.fillStyle = this.sun.color;
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.shadowBlur = 50;
        ctx.shadowColor = "white";
        ctx.beginPath();
        ctx.arc(sunX, sunY, this.sun.size * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();

        const moonX = centerX - this.distance * 1.25 * Math.cos(this.time * Math.PI * 2 - Math.PI / 2);
        const moonY = centerY - this.distance * Math.sin(this.time * Math.PI * 2 - Math.PI / 2);

        ctx.save();
        ctx.shadowBlur = 50;
        ctx.shadowColor = this.moon.color;
        ctx.beginPath();
        ctx.arc(moonX, moonY, this.moon.size, 0, Math.PI * 2);
        ctx.fillStyle = this.moon.color;
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.shadowBlur = 50;
        ctx.shadowColor = "white";
        ctx.beginPath();
        ctx.arc(moonX, moonY, this.moon.size * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();

        const tilesNeeded = Math.ceil(ctx.canvas.width / this.tileWidth);
        for (let i = 0; i < tilesNeeded; i++) {
            const x = i * this.tileWidth;
            const y = ctx.canvas.height - this.height;
            ctx.drawImage(this.ground, x, y, this.tileWidth, this.height);
        }
    }
}