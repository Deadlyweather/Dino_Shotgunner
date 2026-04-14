
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
        if (!player || !player.coordinates) return;

        // Lasketaan koordinaatti erotukset
        let dx = player.coordinates.x - this.x;
        let dy = player.coordinates.y - this.y;

        // Lasketaan kulma linnun ja pelaajan välillä
        let angle = Math.atan2(dy, dx);


        // Lisätään linnun nopeutta, jotta se syöksyy pelaajaa päin
        // Cos laskee mihin suuntaan pitää mennä x-akselilla, sin taas laskee y-akselin
        this.vx += Math.cos(angle) * 2
        this.vy += Math.sin(angle) * 2
        
        this.vx *= 0.999;
        this.vy *= 0.999;

        this.x += this.vx;
        this.y += this.vy;

       
    }

    draw(ctx, cameraX) {
      
       
        ctx.drawImage(this.img, this.x - cameraX, this.y, this.width, this.height);
        
    }
}

class Cactus {
    constructor(x, groundHeight, canvasHeight) {
        this.cooldown = 0;

        this.needleScale = 2;
        this.needles = []
        this.needlesImg = new Image();
        this.needlesImg.src = "Images/Needle projectile.png"

        this.grenadeImg = new Image()
        this.grenadeImg.src = "Images/Cactus grenade.png"

       this.launchgrenade = false;

        this.x = x; 
        this.scale = 0.50; 
        this.img = new Image();
        this.img.src = "Images/Cactus.png";

           this.img.onload = () => {
            this.width = this.img.width * this.scale;
            this.height = this.img.height * this.scale;
            
           
            this.y = canvasHeight - groundHeight - this.height 
        };

        this.needlesImg.onload = () => {
    this.needleWidth = this.needlesImg.width * this.needleScale;
    this.needleHeight = this.needlesImg.height * this.needleScale;
};
    }

draw(ctx, cameraX) {
  
    ctx.drawImage(this.img, this.x - cameraX, this.y, this.width, this.height);

    
    this.needles.forEach(needle => {

        let pic = needle.img || this.needlesImg;
        
        needle.drawProjectile(ctx, cameraX, pic, this.needleWidth, this.needleHeight);
    });
}

    update(player, projectiletype){

        
        

        this.cooldown++

        if(this.cooldown >= 180){
            let newNeedle = new Ammo(Math.PI, this, this.x, this.y, "projectile");
            let currentImg

            if (projectiletype === "grenade"){
                newNeedle.img = this.grenadeImg
                
            } else {
                newNeedle.img = this.needlesImg;
            }
            
            newNeedle.width = this.needleWidth;
            newNeedle.height = this.needleHeight;
            this.needles.push(newNeedle);
            this.cooldown = 0;
        }
        this.needles.forEach(needle =>  {
            
         
            needle.update()

            const hitbox = {
            x: needle.startX,
            y: needle.startY,
            width: needle.width,
            height: needle.height
        };
        
           if (needle.startY > 800 ){
                needle.isActive = false
            }
        

       
            if (player && checkObjectCollision(player, hitbox)){
                console.log("neula osui pelaajaan");
                needle.isActive = false;
           
                

                
                
            }
            });
            this.needles = this.needles.filter(needle => needle.isActive)
        }
    }

    
