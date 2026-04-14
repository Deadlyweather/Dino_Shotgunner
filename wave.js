class Wave {
    constructor(ctx, player, world) {
        this.wave = 0
        this.player = player
        this.ctx = ctx
        this.world = world
        this.maxduration = 400
        this.maxspawnrate = 100
        this.spawnrate = 0
        this.duration = this.maxduration
        this.difficulty = 0
        this.scaling = 1

        this.enemies = []
    }

    update(ctx, player, cameraX, world) {
        this.duration -= 1;
        this.spawnrate -= 1

        if (this.spawnrate <= 0 ) {
            this.spawn(cameraX);
            this.spawnrate = this.maxspawnrate
        }

        if (this.duration <= 0) {
            this.spawn(cameraX);
            this.scale();
            this.Accelerate()
            this.duration = this.maxduration
        }

        for (let enemy of this.enemies) {
            enemy.update(player);
        }
    }

    draw(ctx, cameraX) {
        this.enemies.forEach(enemy => enemy.draw(ctx, cameraX));
    }

    scale() {
        this.difficulty += this.scaling
        this.maxduration += this.difficulty
        this.maxspawnrate -= this.difficulty
    }
    Accelerate() {
        if (World.time === 0.5) {
            this.scaling += 1
        }
    }

    spawn(cameraX) {
        this.duration = this.maxduration
        // spawn enemies
            let x = cameraX + this.ctx.canvas.width + Math.random() * 10000
            let y = this.world.height

            if (Math.random() < 0.4) {
                let bird = new Bird(x, y , this.ctx.canvas.height);
                this.enemies.push(bird);
            } else {
                let cactus = new Cactus(x, y, this.ctx.canvas.height)
                this.enemies.push(cactus)
            }
            

            
        this.wave++
    }
}

