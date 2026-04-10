
class Bird {
    constructor(x, groundHeight, canvasHeight) {
        this.x = x; 
        
       
        this.img = new Image();
        this.img.src = "Images/Bird.png";

        this.img.onload = () => {
            this.width = this.img.width * this.scale;
            this.height = this.img.height * this.scale;
            
           
            this.y = canvasHeight - groundHeight - this.height - 300;
        };

       
        this.scale = 1.0; 

    this.vy = 0; 
    this.time = 0;

    
       
       
    }

update() {
    // Linnun oma kello sinin aaltoa varten
    this.time += 0.1;

    // Lisätään sinin tekemä aalto velocityyn
    let yMovement = Math.sin(this.time) * 0.7;
    this.vy += yMovement;

    // Vähennetään velocitystä 10% joka kerta, jotta lintu ei syöksy alas
    this.vy = this.vy * 0.9

    
    this.y += this.vy; 

    console.log("lentää")

  
    this.x -= 10;
}

    draw(ctx) {
        ctx.drawImage(this.img, this.x , this.y, this.width, this.height)
    
    
        
    }
}

class Cactus {
    constructor(x, groundHeight, canvasHeight) {
        this.x = x; 
        this.scale = 0.50; 
        this.img = new Image();
        this.img.src = "Images/Cactus.png";

           this.img.onload = () => {
            this.width = this.img.width * this.scale;
            this.height = this.img.height * this.scale;
            
           
            this.y = canvasHeight - groundHeight - this.height 
        };
    }

    draw(ctx, cameraX) {
        ctx.drawImage(this.img, this.x - cameraX, this.y, this.width, this.height)
         
    }

    update(){

    }
}