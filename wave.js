class Wave {
    constructor(ctx, player) {
        this.wave = 0
        this.player = player
        this.ctx = ctx
        this.maxduration = 15
        this.duration = this.maxduration
        this.difficulty = 0
        this.scaling = 1

        this.enemies = []
    }

    update(player) {
        this.duration -= 1;

        if (this.duration <= 0) {
            this.start();
            this.scale();
            this.Accelerate()
        }

        for (let enemy of this.enemies) {
            enemy.update(this.player);
        }
    }

    scale() {
        this.difficulty += this.scaling
        this.maxduration *= this.difficulty
    }
    Accelerate() {
        if (World.time === 0.5) {
            this.scaling += 1
        }
    }

    start() {
        this.duration = this.maxduration
        // spawn enemies
            for (let i = 0; i < this.wave + 1; i++) {
            let x = Math.random() * 1300 + Math.random() * 1000
            let y = Math.random() * 1300

            let bird = new Bird(x, y, this.ctx);
            this.enemies.push(bird);
        }

        this.wave++;
    }
}

