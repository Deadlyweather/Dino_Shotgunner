class Wave {
    constructor(ctx, player, world) {
        this.wave = 0
        this.player = player
        this.ctx = ctx
        this.world = world
        this.maxduration = 400
        this.maxspawnrate = 100
        this.spawnrate = 0
        this.duration = this.maxduration
        this.difficulty = 0
        this.scaling = 1

        this.enemies = []
    
    }

    update(ctx, player, cameraX, world) {
        this.duration -= 1;
        this.spawnrate -= 1

        
           this.enemies = this.enemies.filter(enemy => enemy.alive)

          this.enemies.forEach(enemy => {
            enemy.distancetoPlayer = Math.abs(enemy.x - player.coordinates.x)
           })

           this.enemies.sort((a, b) => a.distancetoPlayer - b.distancetoPlayer);
        
        if (this.spawnrate <= 0 ) {
            this.spawn(cameraX);
            this.spawnrate = this.maxspawnrate
        }

        if (this.duration <= 0) {
            this.spawn(cameraX);
            this.scale();
            this.Accelerate()
            this.duration = this.maxduration
        }

             for (let enemy of this.enemies) {
                // Tarkista maan collision vihollisille
                checkGroundCollisionForEnemy(enemy, this.world, this.ctx.canvas);

                // Tarkista vihollisten hyökkäys pelaajaan
                if (checkEnemyAttackCollision(player, enemy)){
                    player.takeDamage(enemy.damage)
                }

                // Tarkista pelaajan hyökkäys vihollisiin
                 player.PlayerProjectiles.forEach(projectile => {
                if (!projectile.shotTargets.includes(enemy) && projectile.isActive && checkProjectileCollisionWithEnemy(projectile, enemy)) {
                    projectile.shotTargets.push(enemy)
                    enemy.takeDamage(projectile.damage);

                    console.log("Ammus osui vihuun etäisyydellä: " + enemy.distancetoPlayer);
               
              
                    
                    // AOE-iskut (chomp) eivät deaktivoidu ensimmäisestä osumasta
                    if (projectile.type !== "chomp") {
                        if (projectile.pierce > 0) {
                           
                            projectile.pierce--; 
                            console.log("Pierceä jäljellä " , projectile.pierce , "Ammus ID ", projectile.id, "Vihun id:", enemy.id);
                        } else {
                            // Jos pierce loppuu, tuhotaan ammus
                            projectile.isActive = false;
                        }
                    }
                }
            });

            if (enemy instanceof Cactus){
                //ampuu neuloja
                //enemy.update(player, "needle")

                //ampuu naatteja
                enemy.update(player, "grenade")
             
                
            } else {
                enemy.update(player);
            }
          
        }
    }

    draw(ctx, cameraX) {
        this.enemies.forEach(enemy => enemy.draw(ctx, cameraX));
    }

    scale() {
        this.difficulty += this.scaling
        this.maxduration += this.difficulty
        this.maxspawnrate -= this.difficulty
    }
    Accelerate() {
        if (World.time === 0.5) {
            this.scaling += 1
        }
    }

    spawn(cameraX) {
        this.duration = this.maxduration
        // spawn enemies
            let x = cameraX + this.ctx.canvas.width + Math.random() * 10000
            let y = this.world.height

            if (Math.random() < 0.4) {
                let bird = new Bird(x, y , this.ctx.canvas.height);
                this.enemies.push(bird);
            } else {
                let cactus = new Cactus(x, y, this.ctx.canvas.height)
                this.enemies.push(cactus)
            }
           
            

            
        this.wave++
    }
}

