const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const player = new Player();
const hud = new HUD(player);
const world = new World()
const wave = new Wave(ctx, player, world)
const debug = new Debug(player, wave);



let menuOpen = false;

const deathaudio = new Audio("Audio/Player.death.wav")

// music

const themes = [
    new Audio("Audio/Banger.wav"),
    new Audio("Audio/Pablo.wav"),
    new Audio("Audio/Mii.wav"),
    new Audio("Audio/Npc music.wav"),
    new Audio("Audio/France.wav"),
    new Audio("Audio/Arse.wav"),
    new Audio("Audio/Feddy.wav"),
    new Audio("Audio/Sunshine.wav"),
    new Audio("Audio/Moonshine.wav"),
    new Audio("Audio/Piracy.wav"),
    new Audio("Audio/Slander.wav"),
]

const audioCtx = new AudioContext()

let currentIndex = 0
let currentTrack = null

function playTrack(index) {
    if (currentTrack) {
        currentTrack.pause()
        currentTrack.currentTime = 0
    }

    currentTrack = themes[index]


    currentTrack.play()

    // Vaihto
    currentTrack.onended = () => {
        currentIndex = (currentIndex + 1) % themes.length
        playTrack(currentIndex)
    }
}

playTrack(0)

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
    let cameraX = player.coordinates.x + player.size / 2 - canvas.width / 2;

    if (cameraX < 0) {
        cameraX = 0;
    }

    

    world.draw(ctx, cameraX);
    wave.draw(ctx, cameraX);
    hud.draw(ctx);
    player.draw(ctx, cameraX);

    drops.forEach(drop => {
        drop.update(player);
        drop.draw(ctx, cameraX);
    });

    drops = drops.filter(drop => !drop.eaten);

    if(!upgradeMenu.isOpen && player.alive){
        player.update()
        world.update(ctx, cameraX, player);
       

         world.obstacles.forEach(obstacle =>{
        checkObjectCollision(player, obstacle, cameraX);
    });

    player.walk()
    player.jump()
    player.aim(cameraX)
    player.shoot()
    player.reload()
    player.bite()
    player.slam()
    player.glide()

    wave.update(ctx, player, cameraX, world)
    
    world.runMeter(player)

    checkGroundCollision(player, world, canvas, ctx);


    } else if (!player.alive) {
        if (!player.deathstart){
            player.deathstart = true;
            deathaudio.play();
            setTimeout(() => location.reload(), 3000);

        }
    }
    
    upgradeMenu.draw(ctx);

    debug.draw(ctx, cameraX);

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
