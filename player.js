const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
    spaceHeld: false,
    m1: false,
    m2: false
};

const mouse = {
    x: 0,
    y: 0
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("mousedown", (e) => {
    if (e.button === 2) keys.m2 = true;
});

window.addEventListener("mouseup", (e) => {
    if (e.button === 2) keys.m2 = false;
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

class Player {
    constructor() {
        this.maxhp = 100;
        this.hp = this.maxhp;
        this.maxhunger = 100;
        this.hunger = this.maxhunger;
        this.maxammo = 10;
        this.ammo = this.maxammo;
        this.needles = 5;
        this.maxsaturation = 100;
        this.saturation = this.maxsaturation;

        this.bitePhase = "idle";
        this.biteProgress = 0;

        this.speed = 1;
        this.direction = "right";

        this.jumpPower = 1;
        this.jumps = Infinity;
        this.maxjumps = Infinity;

        this.upgrades = 0;
        this.distance = 0;

        this.coordinates = { x: 600, y: 400 };
        this.velocity = { x: 0, y: 0 };
        this.gravity = { x: 0, y: 5 };

        this.size = 1;

        // --- PARTS ---

        this.torso = new Image();
        this.torso.src = "Images/Dinosaur/Torso.png";
        this.torso.point = { x: 0, y: 0 };
        this.torso.rotation = 0;
        this.torso.scale = 1;
        this.torso.offset = { x: 0, y: 0 };

        this.head1 = new Image();
        this.head1.src = "Images/Dinosaur/Head1.png";
        this.head1.point = { x: 0, y: 40 };
        this.head1.rotation = 0;
        this.head1.scale = 1;
        this.head1.offset = { x: 58, y: -8 };

        this.head2 = new Image();
        this.head2.src = "Images/Dinosaur/Head2.png";
        this.head2.point = { x: 0, y: 0 };
        this.head2.rotation = 0;
        this.head2.scale = 1;
        this.head2.offset = { x: 60, y: 25 };

        this.hand1  = new Image();
        this.hand1.src = "Images/Dinosaur/Hand1.png";
        this.hand1.point = { x: 0, y: 0 };
        this.hand1.rotation = 0;
        this.hand1.scale = 1;
        this.hand1.offset = { x: 10, y: 15 };

        this.hand2 = new Image();
        this.hand2.src = "Images/Dinosaur/Hand2.png";
        this.hand2.point = { x: 0, y: 0 };
        this.hand2.rotation = 0;
        this.hand2.scale = 1;
        this.hand2.offset = { x: 60, y: 70 };

        this.leg1 = new Image();
        this.leg1.src = "Images/Dinosaur/Leg1.png";
        this.leg1.point = { x: 60, y: 40 };
        this.leg1.rotation = 0;
        this.leg1.scale = 1;
        this.leg1.offset = { x: -37.5, y: 10 };

        this.leg2 = new Image();
        this.leg2.src = "Images/Dinosaur/Leg2.png";
        this.leg2.point = { x: 20, y: 0 };
        this.leg2.rotation = 0;
        this.leg2.scale = 1;
        this.leg2.offset = { x: 30, y: 70 };

        this.shotgun = new Image();
        this.shotgun.src = "Images/Shotgun.png";
        this.shotgun.point = { x: 50, y: 7.5 };
        this.shotgun.rotation = 0;
        this.shotgun.scale = 1;
        this.shotgun.offset = { x: -25, y: 100 };
    }

    update() {
        this.velocity.x /= this.size * 2;
        this.velocity.y /= this.size * 2;

        this.coordinates.x += this.velocity.x;
        this.coordinates.y += this.velocity.y + this.gravity.y;
    }

    draw(ctx, cameraX) {
        this.rotate(ctx, this.leg1, this.coordinates.x - cameraX, this.coordinates.y);
        this.rotate(ctx, this.leg2, this.coordinates.x - cameraX, this.coordinates.y);

        this.modification(ctx, this.leg1, x, y);
        this.modification(ctx - cameraX, this.leg2, x, y);

        this.rotate(ctx, this.hand1, this.coordinates.x - cameraX, this.coordinates.y);
        this.rotate(ctx, this.hand2, this.coordinates.x - cameraX, this.coordinates.y);

        this.modification(ctx, this.hand2, x, y);
        this.modification(ctx - cameraX, this.shotgun, x, y);
        this.modification(ctx, this.hand1, x - cameraX, y);

        this.rotate(ctx, this.shotgun, this.coordinates.x - cameraX + this.size - this.size * 0.85  , this.coordinates.y + this.size * 0.35  );
    }

    modification(ctx, part, x, y) {
        ctx.save();

        const offsetX = (part.offset?.x || 0) * this.size;
        const offsetY = (part.offset?.y || 0) * this.size;

        const finalScale = this.size * part.scale;

        ctx.translate(x + offsetX, y + offsetY);

        ctx.translate(part.point.x * finalScale, part.point.y * finalScale);

        ctx.rotate(part.rotation);

        ctx.drawImage(
            part,
            -part.point.x * finalScale,
            -part.point.y * finalScale,
            part.width * finalScale,
            part.height * finalScale
        );

        ctx.restore();
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp < 0) this.hp = 0;
    }

    eat(amount) {
        this.hunger += amount;
        if (this.hunger > 100) this.hunger = 100;
    }

    bite() {
        const maxRotation = Math.PI / 4;
        const speed = 0.3;

        if (keys.m2) {
            this.bitePhase = "in";
        }

        if (this.bitePhase === "in") {
            this.biteProgress += speed;

            if (this.biteProgress >= 1) {
                this.biteProgress = 1;
                this.bitePhase = "out";
            }

            this.head1.rotation = -maxRotation * this.biteProgress;
            this.head2.rotation = maxRotation * this.biteProgress;

        } else if (this.bitePhase === "out") {
            this.biteProgress -= speed;

            if (this.biteProgress <= 0) {
                this.biteProgress = -0.4;
                this.bitePhase = "idle";
            }

            this.head1.rotation = -maxRotation * this.biteProgress;
            this.head2.rotation = maxRotation * this.biteProgress;

        } else {
            this.head1.rotation += (0 - this.head1.rotation) * 0.1;
            this.head2.rotation += (0 - this.head2.rotation) * 0.1;
        }
    }

    useAmmo(amount) {
        this.ammo -= amount;
        if (this.ammo < 0) this.ammo = 0;
    }

    walk() {
        if (keys.a && keys.d) return;

        const speed = 0.1 * this.speed;

        if (this.leg1.rotation > Math.PI) {
            this.leg1.rotation -= 2 * Math.PI;
        }
        if (this.leg1.rotation < -Math.PI) {
            this.leg1.rotation += 2 * Math.PI;
        }

        if (this.leg2.rotation > Math.PI) {
            this.leg2.rotation -= 2 * Math.PI;
        }
        if (this.leg2.rotation < -Math.PI) {
            this.leg2.rotation += 2 * Math.PI;
        }

        if (keys.a) {
            this.coordinates.x -= this.speed;
            this.velocity.x -= this.speed;

            this.leg1.rotation -= speed;
            this.leg2.rotation = this.leg1.rotation + Math.PI;
            
        } else if (keys.d) {
            this.coordinates.x += this.speed;
            this.velocity.x += this.speed;

            this.leg1.rotation += speed;
            this.leg2.rotation = this.leg1.rotation + Math.PI;
        } else {
            this.leg1.rotation *= 0.95;
            this.leg2.rotation *= 0.95;
        }
    }

    aim() {
        const x = this.coordinates.x + this.shotgun.offset.x + this.shotgun.point.x;
        const y = this.coordinates.y + this.shotgun.offset.y + this.shotgun.point.y;

        const dx = mouse.x - x;
        const dy = mouse.y - y;

        this.shotgun.rotation = Math.atan2(dy, dx);
    }

    jump() {
        if (this.jumps > 0 && keys.space) {
            this.jumps--;
            this.velocity.y = -this.jumpPower * 100;

            const targetRotation = Math.PI * 1.5;
            const step = targetRotation * 0.25;

            this.leg1.rotation += step;
            if (this.leg1.rotation < -targetRotation) this.leg1.rotation = -targetRotation;

            this.leg2.rotation -= step;
            if (this.leg2.rotation > targetRotation) this.leg2.rotation = targetRotation;

            keys.space = false;
        }
    }
}