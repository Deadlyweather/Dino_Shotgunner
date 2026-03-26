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