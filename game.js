const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new Player();
const hud = new HUD(player);
const world = new World()
const debug = new Debug();


const upgradeMenu = new UpgradeMenu(player);


function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let cameraX = player.coordinates.x + player.size / 2 - canvas.width / 2;

    if (cameraX < 0) {
        cameraX = 0;
    }

    world.draw(ctx, cameraX);
    world.update(ctx, cameraX);

    hud.draw(ctx);

    player.draw(ctx, cameraX);
    player.update()

    checkGroundCollision(player, world, canvas, ctx);
    
    player.walk()
    player.jump()
    player.aim()

    upgradeMenu.draw(ctx);

    debug.draw(ctx);

    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'u') { 
        upgradeMenu.isOpen = !upgradeMenu.isOpen;
    }
});


gameLoop();