const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    spaceHeld: false
}

const mouse = {
    x: 0,
    y: 0
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

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

        this.jumpPower = 800
        this.jumps = Infinity
        this.maxjumps = Infinity
    
        this.upgrades = 0;
        this.distance = 0;
        
        // Debug
        this.coordinates = { x: 600, y: 400 }
        this.velocity = { x: 0, y: 0 }
        this.gravity = { x: 0, y: 1 }

        // Physique

        this.size = 400

        // Grafiikat
        this.torso = new Image()
        this.torso.src = "Images/Dinosaur/Torso.png"
        this.torso.point = { x: this.size/2, y: this.size/2 }
        this.torso.rotation = 0

        this.head1 = new Image()
        this.head1.src = "Images/Dinosaur/Head1.png"
        this.head1.point = { x: this.size/2, y: this.size/2 }
        this.head1.rotation = 0

        this.head2 = new Image()
        this.head2.src = "Images/Dinosaur/Head2.png"
        this.head2.point = { x: this.size/2, y: this.size/2 }
        this.head2.rotation = 0

        this.hand1 = new Image()
        this.hand1.src = "Images/Dinosaur/Hand1.png"
        this.hand1.point = { x: this.size/2, y: this.size/2 }
        this.hand1.rotation = 0

        this.hand2 = new Image()
        this.hand2.src = "Images/Dinosaur/Hand2.png"
        this.hand2.point = { x: this.size/2, y: this.size/2 }
        this.hand2.rotation = 0

        this.leg1 = new Image()
        this.leg1.src = "Images/Dinosaur/Leg1.png"
        this.leg1.point = { x: this.size/2, y: this.size/3 }
        this.leg1.rotation = 0

        this.leg2 = new Image()
        this.leg2.src = "Images/Dinosaur/Leg2.png"
        this.leg2.point = { x: this.size/2, y: this.size/3 }
        this.leg2.rotation = 0

        this.shotgun = new Image()
        this.shotgun.src = "Images/Shotgun.png"
        this.shotgun.point = { x: this.size / 4 , y: this.size/4   }
        this.shotgun.rotation = 0
    }

    update() {
        this.velocity.x /= this.size * 0.0125;
        this.velocity.y /= this.size * 0.0125

        this.coordinates.x += this.velocity.x
        this.coordinates.y += this.velocity.y + this.gravity.y;
    }

    draw(ctx) {
        this.rotate(ctx, this.leg1, this.coordinates.x, this.coordinates.y);
        this.rotate(ctx, this.leg2, this.coordinates.x, this.coordinates.y);

        this.rotate(ctx, this.torso, this.coordinates.x, this.coordinates.y);

        this.rotate(ctx, this.hand1, this.coordinates.x, this.coordinates.y);
        this.rotate(ctx, this.hand2, this.coordinates.x, this.coordinates.y);

        this.rotate(ctx, this.head1, this.coordinates.x, this.coordinates.y);
        this.rotate(ctx, this.head2, this.coordinates.x, this.coordinates.y);

        this.rotate(ctx, this.shotgun, this.coordinates.x + this.size - this.size * 0.85  , this.coordinates.y + this.size * 0.35  );
    }

    rotate(ctx, part, x, y) {
        ctx.save();
        ctx.translate(x + part.point.x, y + part.point.y);
        ctx.rotate(part.rotation);
        ctx.drawImage(part, -part.point.x, -part.point.y, this.size, this.size);
        ctx.restore();
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
            this.leg1.rotation -= Math.random() * 0.5 + 0.2
            this.leg2.rotation -= Math.random() * 0.5 + 0.2
        } else if (keys.d === true) {
            this.coordinates.x += this.speed / 100
            this.velocity.x += this.speed / 200
            this.leg1.rotation += Math.random() * 0.1 + 0.2
            this.leg2.rotation += Math.random() * 0.1 + 0.2
        } else {
            this.leg1.rotation += (0 - this.leg1.rotation) * 0.1
            this.leg2.rotation += (0 - this.leg2.rotation) * 0.1
        }
    }

    aim() {
        const centerX = this.coordinates.x + this.size / 2;
        const centerY = this.coordinates.y + this.size / 2;

        const dx = mouse.x - centerX;
        const dy = mouse.y - centerY;

        const angle = Math.atan2(dy, dx);

        this.shotgun.rotation = angle;
    }

    jump() {
        if (this.jumps > 0 && keys.space) {
            this.jumps -= 1;
            this.velocity.y = -this.jumpPower * 1;

            const targetRotation = Math.PI;
            const step = targetRotation * 0.95;

            this.leg1.rotation = this.leg1.rotation + step;
            if (this.leg1.rotation < -targetRotation) this.leg1.rotation = -targetRotation;

            this.leg2.rotation = this.leg2.rotation - step;
            if (this.leg2.rotation > targetRotation) this.leg2.rotation = targetRotation;

            keys.space = false;
        }
    }
}

