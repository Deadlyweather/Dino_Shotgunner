
class Bird {
    constructor(x, groundHeight, canvasHeight) {
        this.x = x; 
        this.y = 100; 
        this.vx = 0; 
        this.vy = 0;
        this.scale = 1.0; 
        this.time = 0;

        this.img = new Image();
        this.img.src = "Images/Bird.png";

        this.img.onload = () => {
            this.width = this.img.width * this.scale;
            this.height = this.img.height * this.scale;
       
            this.y = canvasHeight - groundHeight - this.height - 300;
        };
    }

    update(player) {
        if (!player) return;

        // Lasketaan koordinaatti erotukset
        let dx = player.coordinates.x - this.x;
        let dy = player.coordinates.y - this.y;

        // Lasketaan kulma linnun ja pelaajan välillä
        let angle = Math.atan2(dy, dx);


        // Lisätään linnun nopeutta, jotta se syöksyy pelaajaa päin
        // Cos laskee mihin suuntaan pitää mennä x-akselilla, sin taas laskee y-akselin
        this.vx += Math.cos(angle) * 2
        this.vy += Math.sin(angle) * 2
        

        // Otetaan vauhdista pois 5% molemmista suunnista, jotta nopeus ei kasva loputtomasti
        this.vx *= 0.95;
        this.vy *= 0.95;

        this.x += this.vx;
        this.y += this.vy;

       
    }

    draw(ctx, cameraX) {
      
       
        ctx.drawImage(this.img, this.x - cameraX, this.y, this.width, this.height);
        
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