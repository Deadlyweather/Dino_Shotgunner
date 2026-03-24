class Player{
    constructor(){
        this.hp = 100;
        this.hunger = 100;
        this.ammo = 10;
        this.needles = 5;
        this.saturation = 50;
        this.upgrades = 0;
        this.distance = 0;
        
        // Debug
        this.coordinates = { x: 600, y: 400 }
        this.veloicity = { x: 0, y: 0 }
        this.gravity = { x: 0, y: 5 }

        // Physique

        this.size = 100

        // Grafiikat
        this.torso = new Image()
        this.torso.src = "Images/Dinosaur/Torso.png"

        this.head1 = new Image()
        this.head1.src = "Images/Dinosaur/Head1.png"

        this.head2 = new Image()
        this.head2.src = "Images/Dinosaur/Head2.png"

        this.hand1 = new Image()
        this.hand1.src = "Images/Dinosaur/Hand1.png"

        this.hand2 = new Image()
        this.hand2.src = "Images/Dinosaur/Hand2.png"

        this.leg1 = new Image()
        this.leg1.src = "Images/Dinosaur/Leg1.png"

        this.leg2 = new Image()
        this.leg2.src = "Images/Dinosaur/Leg2.png"
    }

    update() {
        this.coordinates.x += this.veloicity.x + this.gravity.x
        this.coordinates.y += this.veloicity.y + this.gravity.y


    }

    draw(ctx) {
        ctx.drawImage(this.torso, this.coordinates.x, this.coordinates.y, this.size, this.size);
        ctx.drawImage(this.head1, this.coordinates.x, this.coordinates.y, this.size, this.size);
        ctx.drawImage(this.head2, this.coordinates.x, this.coordinates.y, this.size, this.size);
        ctx.drawImage(this.hand1, this.coordinates.x, this.coordinates.y, this.size, this.size);
        ctx.drawImage(this.hand2, this.coordinates.x, this.coordinates.y, this.size, this.size);
        ctx.drawImage(this.leg1, this.coordinates.x, this.coordinates.y, this.size, this.size);
        ctx.drawImage(this.leg2, this.coordinates.x, this.coordinates.y, this.size, this.size);
    }

    takeDamage(amount){
        this.hp -= amount;

        if(this.hp < 0){
            this.hp = 0;
        }
    }

    eat(amount){
        this.hunger += amount;
        if(this.hunger > 100){
            this.hunger = 100;
        }
    }

    useAmmo(amount){
        this.ammo -= amount;
        if (this.ammo < 0){
            this.ammo = 0;
        }
    }
}