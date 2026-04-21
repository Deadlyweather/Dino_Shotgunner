const powerupimages = {
    shroom: new Image(),
    creditcard: new Image(),
    bolt: new Image(),
    lemon: new Image(),
    food: new Image(),
    shotgunshell: new Image(),


    
}

powerupimages.shroom.src = "Images/Shroom.png"
powerupimages.creditcard.src = "Images/Credit card.png"
powerupimages.bolt.src = "Images/Bolt.png"
powerupimages.lemon.src = "Images/Lemon.png"
powerupimages.food.src = "Images/Food.png"
powerupimages.shotgunshell.src = "Images/Shotgun.Shell.png"

class Powerups {

    constructor(x, y, type){
        this.x = x
        this.y = y  
        this.type = type 
        this.nextPowerupAt = 500;
        this.img = powerupimages[type]

        this.scale = 0.5


        this.eaten = false

        

        this.items = ["shroom", "creditcard", "bolt", "lemon", "food", "shotgunshell"]
    }

    pickUp(player){
       if (checkObjectCollision(player, this)) {
        this.applyEffect(player);
        this.eaten = true;
        return true;
    }
    return false
    }


applyEffect(player){
    switch(this.type) {
        case "lemon":
            player.invincibletimer = 180;
            break
        case "shotgunshell":
            player.ammo = player.maxammo
            break
        case"food":
            player.saturation = player.maxsaturation
            break;
        case "shroom":
            player.agility *= 1.1
            player.vampirism *= 1.1
            player.gluttony *= 1.1
            break;
        case "creditcard":
            player.meat *= 2
            break;
        
            case "bolt":
            player.firepower *= 1.1
            break;
    }
}    


spawnPowerup(playerX, powerupList){

        const randomIndex = Math.floor(Math.random() * this.items.length);
        const selectedItem = this.items[randomIndex];

      
        const spawnX = playerX + 1000;
       const spawnY = (canvas.height - world.height - world.height2) - powerupimages[selectedItem].height * this.scale;

        const newPowerup = new Powerups(spawnX, spawnY, selectedItem);
        
      
        powerupList.push(newPowerup);
        this.nextPowerupAt += 500

    
}
draw(ctx, cameraX) {
        if (this.img){

        
        ctx.drawImage(
            this.img, 
            this.x - cameraX, 
            this.y, 
            this.img.width * this.scale, 
            this.img.height * this.scale
        );}
}


}