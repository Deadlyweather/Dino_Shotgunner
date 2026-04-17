class Drops {
    constructor(x, y, item) {
        this.coordinates = { x: x, y: y }
        this.velocity = { x: 0, y: 0 }
        this.magnet = { x: 0, y: 0 }

        this.gravity = 0

        this.rotation = 0

        this.item = item
        this.img = new Image() 

        if (item === "flesh") {
            this.img.src = "Images/Flesh.png"
        } else if (item === "Cactusflesh") {
            this.img.src = "Images/Cactus.flesh.png"
        }

        this.img.onload = () => {
            this.width = this.img.width;
            this.height = this.img.height;
        }

        this.scale = 0.5
        this.eaten = false

    }

    update(player) {
        if (this.eaten) return

        // gravity
        this.velocity.y += this.gravity

        // liike
        this.coordinates.x += this.velocity.x
        this.coordinates.y += this.velocity.y

        // friction
        this.velocity.x *= 0.98
    }

    eat(player) {
        this.eaten = true

        if (this.item === "flesh") {
            player.hp += player.vampirism
            player.saturation += player.gluttony
        }

        if (this.item === "Cactusflesh") {
            player.needles += player.gluttony
        }

        

    }

    draw(ctx, cameraX) {

        if (this.eaten) return

        ctx.drawImage(
            this.img,
            this.coordinates.x - cameraX,
            this.coordinates.y,
            this.width * this.scale,
            this.height * this.scale
        )
    }
}