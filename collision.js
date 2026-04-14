function checkGroundCollision(player, world, canvas) {
    // Canvaksen Y-akseli alkaa 0:sta (hahmon ylin osa) ja kasvaa alaspäin
    // Canvaksen X-akseli alkaa 0:sta (hahmon vasen osa) ja kasvaa oikealle
    

    
    const groundLevel = canvas.height - world.height;

    const hitbox = player.hitbox.collision
  
    const playerBottom = player.coordinates.y + (hitbox.y + hitbox.h) * player.size

    if (playerBottom > groundLevel) {
        
        // Asetetaan dinon sijainti niin, että jalat ovat maan pinnalla
        player.coordinates.y = groundLevel - (hitbox.y + hitbox.h) * player.size
        player.velocity.y *= -1;

        if (player.jumps < player.maxjumps) {
            player.jumps += player.maxjumps / 16
        }
        
       
        player.onGround = true;

    } else {
        player.onGround = false;
    }
}


function checkObjectCollision(player, obstacle) {
   
    const objectLeft = obstacle.x;
    const objectRight = objectLeft + obstacle.width;
    const objectTop = obstacle.y;
    const objectBottom = objectTop + obstacle.height;

    const hitbox = player.hitbox.collision
  
    const playerLeft = player.coordinates.x + hitbox.x * player.size;
    const playerRight = playerLeft + hitbox.w * player.size
    const playerTop = player.coordinates.y + hitbox.y * player.size;
    const playerBottom = playerTop + hitbox.h * player.size;

   
    if (
        playerRight >= objectLeft   && // Pelaajan oikea reuna osuu esteen vasempaan reunaan
        playerLeft  <= objectRight  && // Pelaajan vasen reuna osuu esteen oikeaan reunaan
        playerBottom >= objectTop    && // Pelaajan jalat osuu esteen huippuun
        playerTop <= objectBottom    // Pelaajan pää osuu esteen pohjaan
    ) {
        console.log("törmäys")
        return true;
        
    } return false;
}
