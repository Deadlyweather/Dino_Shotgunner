

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new Player();
const hud = new HUD(player);
const world = new World()


const upgradeMenu = new UpgradeMenu(player);


function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    world.draw(ctx)
    world.update()

    hud.draw(ctx);

    player.draw(ctx);
    player.update()

    checkGroundCollision(player, world, canvas, ctx);
    
    player.walk()
    player.jump()
    player.aim()

    upgradeMenu.draw(ctx);


    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'u') { 
        upgradeMenu.isOpen = !upgradeMenu.isOpen;
    }
});


gameLoop();