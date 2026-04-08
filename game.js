const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = new Player();
const hud = new HUD(player);
const world = new World()
const debug = new Debug();

let menuOpen = false;


const upgradeMenu = new UpgradeMenu(player);

const fps = 60
const frameDuration = 1000 / fps;
let lastFrameTime = 0;


function gameLoop(){
    const now = performance.now();
    if (now - lastFrameTime < frameDuration) {
        requestAnimationFrame(gameLoop);
        return;
    }
    lastFrameTime = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let cameraX = player.coordinates.x + player.size / 2 

    if (cameraX < 0) {
        cameraX = 0;
    }

    

    world.draw(ctx, cameraX);
    hud.draw(ctx);
    player.draw(ctx, cameraX);

    if(!upgradeMenu.isOpen){
        player.update()
        world.update(ctx, cameraX);
       

         world.obstacles.forEach(obstacle =>{
        checkObjectCollision(player, obstacle, cameraX);
    });

    player.walk()
    player.jump()
    player.aim()
    player.shoot()
    player.reload()
    player.bite()
    player.slam()
    world.runMeter(player)

    checkGroundCollision(player, world, canvas, ctx);


    }
    
    
    console.log(menuOpen);
    upgradeMenu.draw(ctx);

    debug.draw(ctx);

    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'u') { 
        upgradeMenu.isOpen = !upgradeMenu.isOpen;

        if(upgradeMenu.isOpen && menuOpen === false){
            menuOpen = true
        }

        if(!upgradeMenu.isOpen && menuOpen === true){
            menuOpen = false
        }

     
    }
});


gameLoop();