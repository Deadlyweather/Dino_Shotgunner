
class Bird {
    constructor(x, groundHeight, canvasHeight) {
        this.x = x; 
        
       
        this.img = new Image();
        this.img.src = "Images/Bird.png";

       
        this.scale = 1.0; 

    
        
      
        this.width = this.img.width * this.scale;
        this.height = this.img.height * this.scale;
            
            
        this.y = canvasHeight - groundHeight - this.height - 300;
       
    }

    update() {
        console.log("lentäm")
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
     
        

      

        this.width = this.img.width * this.scale;
        this.height = this.img.height * this.scale;
        



        



        this.y = canvasHeight - groundHeight - this.height
    }

    draw(ctx, cameraX) {
        ctx.drawImage(this.img, this.x - cameraX, this.y, this.width, this.height)
         
    }

    update(){

    }
}