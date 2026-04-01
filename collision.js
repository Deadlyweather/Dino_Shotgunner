function checkGroundCollision(player, world, canvas) {
    // Canvaksen Y-akseli alkaa 0:sta (hahmon ylin osa) ja kasvaa alaspäin
    // Canvaksen X-akseli alkaa 0:sta (hahmon vasen osa) ja kasvaa oikealle
    

    
    const groundLevel = canvas.height - world.height;

  
    const playerBottom = player.coordinates.y + player.size;

    if (playerBottom > groundLevel) {
        
        // Asetetaan dinon sijainti niin, että jalat ovat maan pinnalla
        player.coordinates.y = groundLevel - player.size
        player.velocity.y = 0;

       
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

  
    const playerLeft = player.coordinates.x;
    const playerRight = playerLeft + player.size; 
    const playerTop = player.coordinates.y;
    const playerBottom = playerTop + player.size;

   
    if (
        playerRight >= objectLeft   && // Pelaajan oikea reuna osuu esteen vasempaan reunaan
        playerLeft  <= objectRight  && // Pelaajan vasen reuna osuu esteen oikeaan reunaan
        playerBottom >= objectTop    && // Pelaajan jalat osuu esteen huippuun
        playerTop <= objectBottom    // Pelaajan pää osuu esteen pohjaan
    ) {
        console.log("törmäys");
        
    }
}


