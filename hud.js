class HUD {
    constructor(player){
        this.player = player;

        // Ladataan kuvat
        this.hpImage = new Image();
        this.hpImage.src = 'Images/hp.png';

        this.hungerImage = new Image();
        this.hungerImage.src = 'Images/hunger.png';

        this.ammoImage = new Image();
        this.ammoImage.src = 'Images/ammo.png';

        this.needlesImage = new Image();
        this.needlesImage.src = 'Images/needles.png';

        this.saturationImg = new Image();
        this.saturationImg.src = 'Images/saturation.png';

        this.upgradesImg = new Image();
        this.upgradesImg.src = 'Images/upgrades.png';
    }

    draw(ctx){

        

        ctx.drawImage(this.hpImage, 20, 20)
        ctx.fillText(this.player.hp, 60, 50);

        ctx.drawImage(this.hungerImage, 20, 60)
        ctx.fillText(this.player.hunger, 60, 90);

        ctx.drawImage(this.ammoImage, 20, 100);
        ctx.fillText(this.player.ammo, 60, 130);

        ctx.drawImage(this.needlesImage, 20, 140);
        ctx.fillText(this.player.needles, 60, 170);

        ctx.drawImage(this.saturationImg, 20, 180);
        ctx.fillText(this.player.saturation, 60, 210);

        ctx.drawImage(this.upgradesImg, 20, 220);
        ctx.fillText(this.player.upgrades, 60, 250);

        ctx.fillText('Distance traveled: ' + this.player.distance + 'm', 20, 290);

    }
}