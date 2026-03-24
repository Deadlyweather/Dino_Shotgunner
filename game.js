const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new Player();
const hud = new HUD(player);

function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hud.draw(ctx);
    player.draw(ctx);
    player.update()
    

    requestAnimationFrame(gameLoop);
}


gameLoop();