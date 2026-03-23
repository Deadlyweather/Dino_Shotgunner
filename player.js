class Player{
    constructor(){
        this.hp = 100;
        this.hunger = 100;
        this.ammo = 10;
        this.needles = 5;
        this.saturation = 50;
        this.upgrades = 0;
        this.distance = 0;
    }

    takeDamage(amount){
        this.hp -= amount;

        if(this.hp < 0){
            this.hp = 0;
        }
    }

    eat(amount){
        this.hunger += amount;
        if(this.hunger > 100){
            this.hunger = 100;
        }
    }

    useAmmo(amount){
        this.ammo -= amount;
        if (this.ammo < 0){
            this.ammo = 0;
        }
    }
}