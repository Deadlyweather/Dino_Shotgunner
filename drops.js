class Drops {
    constructor(x, y, item) {
        this.coordinates = { x: 0, y: 0 }
        this.velocity = { x: 0, y: 0 }
        this.magnet = { x: 0, y: 0 }

        this.gravity = 5

        this.rotation = 0

        this.item = item
        this.img = new Image() 

        if (item === "flesh") {
            this.img.src = "Images/Flesh.png"
        } else if (item === "Cactusflesh") {
            this.img.src = "Images/Cactus.flesh"
        }

        this.scale = 1
        this.eaten = false
    }

    update(player) {

    }

    eat(player) {
        this.eaten = true

        if (this.item === "flesh") {
            player.hp += player.vampirism
            player.saturation += player.gluttony
        }

        if (this.item === "cactusflesh") {
            player.needles += player.gluttony
        }

    }

    draw(ctx, cameraX) {
        
    }
}