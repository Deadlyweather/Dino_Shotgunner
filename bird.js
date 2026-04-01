class Bird {
    constructor(x, groundHeight, canvasHeight) {
        
        this.width = 100;
        this.height = 200;
        

        this.x = x; 
        this.y = canvasHeight - groundHeight - this.height - 300;

        this.img = new Image();
        this.img.src = "Images/Bird.png";
    }

    update(){
       
            this.x -= 10;
            console.log("Lintu lentää vasemmalle")
        
    }

    draw(ctx, cameraX) {
        ctx.save();
        ctx.fillStyle = "green";
        ctx.drawImage(this.img, this.x - cameraX, this.y, this.width, this.height)
     
        ctx.restore();
    }
}