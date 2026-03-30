class Cactus {
    constructor(x, groundHeight, canvasHeight) {
        
        this.width = 50;
        this.height = 100;
        

        this.x = x; 
        this.y = canvasHeight - groundHeight - this.height;

        this.img = new Image();
        this.img.src = "Images/Cactus.png";
    }

    draw(ctx, cameraX) {
        ctx.save();
        ctx.fillStyle = "green";
        ctx.drawImage(this.img, this.x - cameraX, this.y, this.width, this.height)
     
        ctx.restore();
    }
}