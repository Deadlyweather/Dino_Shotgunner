function checkGroundCollision(player, world, canvas) {
    // Canvaksen Y-akseli alkaa 0:sta (hahmon ylin osa) ja kasvaa alaspäin
    // Siksi "pienempi Y" on korkeammalla ja "suurempi Y" on matalammalla
    

    // Määritetään maanpinnan taso
    const groundLevel = canvas.height - world.height;

    // Lasketaan mihin kohti dinon jalat tulee
    const playerBottom = player.coordinates.y + player.size;

    if (playerBottom > groundLevel) {
        
        // Asetetaan dinon sijainti niin, että jalat ovat maan pinnalla
        player.coordinates.y = groundLevel - player.size
        // Pysäytetään tippmuminen
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
const playerRight = playerLeft + player.size; // Lisätään leveys!
const playerTop = player.coordinates.y;
const playerBottom = playerTop + player.size; // Lisätään korkeus!

   
    if (
        playerRight  >= objectLeft   && // Pelaajan oikea reuna osuu esteen vasempaan reunaan
        playerLeft   <= objectRight  && // Pelaajan vasen reuna osuu esteen oikeaan reunaan
        playerBottom >= objectTop    && // Pelaajan jalat koskettaa esteen huippua
        playerTop    <= objectBottom    // Pelaajan pää on korkeammalla kuin esteen pohja
    ) {
        console.log("törmäys");
        
    }
}


