class Wave {
    constructor() {
        this.wave = 0
        this.maxduration = 15
        this.duration = this.maxduration
        this.difficulty = 0
        this.scaling = 0

        this.enemies = []
    }

    update() {
        duration -= 1
        if (duration <= 0) {
            this.start()
            this.scale()
        }
    }

    scale() {
        this.difficulty += this.scaling
        this.scaling += 1
        this.maxduration *= difficulty
    }

    start() {
        this.duration = this.maxduration
        // spawn enemies
    }
}

