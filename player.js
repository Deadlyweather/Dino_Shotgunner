const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    spaceHeld: false
}

window.addEventListener("keydown", (e) => {
    if (e.key === "w") keys.w = true;
    if (e.key === "a") keys.a = true;
    if (e.key === "s") keys.s = true;
    if (e.key === "d") keys.d = true;

    if (e.key === " ") {
        if (!keys.spaceHeld) {
            keys.space = true;
            keys.spaceHeld = true;
        }
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key === "w") keys.w = false;
    if (e.key === "a") keys.a = false;
    if (e.key === "s") keys.s = false;
    if (e.key === "d") keys.d = false;

    if (e.key === " ") {
        keys.spaceHeld = false;
    }
});

class Player{
    constructor(){
        this.maxhp = 100;
        this.hp = this.maxhp;
        this.maxhunger = 100;
        this.hunger = this.maxhunger;
        this.maxammo = 10
        this.ammo = this.maxammo;
        this.needles = 5;
        this.maxsaturation = 100;
        this.saturation = this.maxsaturation;

        this.speed = 100
        this.direction = "right"

        this.jumpPower = 100
        this.jumps = Infinity
        this.maxjumps = Infinity
    
        this.upgrades = 0;
        this.distance = 0;
        
        // Debug
        this.coordinates = { x: 600, y: 400 }
        this.velocity = { x: 0, y: 0 }
        this.gravity = { x: 0, y: 10 }

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
        this.velocity.x /= this.size * 0.0105;
        this.velocity.y /= this.size * 0.0125

        this.coordinates.x += this.velocity.x
        this.coordinates.y += this.velocity.y + this.gravity.y;
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

    walk() {
        if (keys.a === true && keys.d === true) {
            return
        }
        if (keys.a === true) {
                this.coordinates.x -= this.speed / 100
                this.velocity.x -= this.speed / 200
            }
        if (keys.d === true) {
            this.coordinates.x += this.speed / 100
            this.velocity.x += this.speed / 200
        }
    }

    jump() {
        if (this.jumps > 0 && keys.space) {
            this.jumps -= 1;
            this.velocity.y = -this.jumpPower * 1;

            keys.space = false;
        }
    }
}

