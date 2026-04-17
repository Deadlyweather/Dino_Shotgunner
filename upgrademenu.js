class UpgradeMenu {
    constructor(player) {
        this.player = player;
        this.isOpen = false;

        this.currentView = "hp_list";
        this.scrollY = 0;
        
        this.width = 1000;
        this.height = 700;

        this.lihaOpen = false;
        this.neulaOpen = false;

        this.hoveredItem = null;

  this.upgrades = {
    liha: [
        { id: "maxhp", name: "Max HP", cost: 10, amount: 0, currency: "meat", stats: { maxhp: 10, hp: 10, size: 0.1, agility: -1 } },
        { id: "vitality", name: "Vitality", cost: 100, amount: 0, currency: "meat", stats: { vitality: 1, metabolism: 10 } },
        { id: "defence", name: "Defence", cost: 250, amount: 0, currency: "meat", stats: { defence: 1 } },
        { id: "agility", name: "Agility", cost: 500, amount: 0, currency: "meat", stats: { agility: 1, metabolism: -10 } },
        { id: "strength", name: "Strength", cost: 500, amount: 0, currency: "meat", stats: { strenght: 1, metabolism: 10 } },
        { id: "maxsat", name: "Max Fud", cost: 1000, amount: 0, currency: "meat", stats: { maxsaturation: 10, saturation: 10, metabolism: -10 } },
        { id: "luck", name: "Luck", cost: 1500, amount: 0, currency: "meat", stats: { luck: 1 } },
        { id: "endurance", name: "Endurance", cost: 2500, amount: 0, currency: "meat", stats: { endurance: 1, defence: 1 } },
        { id: "wings", name: "Wings", cost: 3500, amount: 0, currency: "meat", stats: { jumps: 1 } },
        { id: "gluttony", name: "Gluttony", cost: 3500, amount: 0, currency: "meat", stats: { gluttony: 1 } },
        { id: "vampirism", name: "Vampirism", cost: 6666, amount: 0, currency: "meat", stats: { vampirism: 1 } }
    ],
   neula: [
   
    { id: "dmg", name: "Damage", cost: 20, amount: 0, currency: "needles", stats: { firepower: 1, firerateMax: 10, spread: 10, ammoCost: 1 } },
    { id: "firerate", name: "Fire Rate", cost: 50, amount: 0, currency: "needles", stats: { firerateMax: -10, loadMax: 10 } },
    { id: "reload", name: "Quick Load", cost: 50, amount: 0, currency: "needles", stats: { loadMax: -10, loadAmount: 1, range: -25 } },
    { id: "bullets", name: "Bullets", cost: 200, amount: 0, currency: "needles", stats: { volume: 1, spread: 10, usage: 1 } },
    { id: "ammo", name: "Ammo Box", cost: 500, amount: 0, currency: "needles", stats: { ammoCost: -1, maxammo: 1, loadMax: 400 } },
    { id: "range", name: "Range", cost: 750, amount: 0, currency: "needles", stats: { range: 50, loadMax: 10, ammoCost: 1 } },
    { id: "pierce", name: "Pierce", cost: 1000, amount: 0, currency: "needles", stats: { pierce: 1, firepower: -1 } },    
    { id: "automation", name: "Automation", cost: 2500, amount: 0, currency: "needles", stats: { autoload: 1, loadMax: 100, loadAmount: -1 } },
    { id: "compression", name: "Compression", cost: 2500, amount: 0, currency: "needles", stats: { spread: -10, usage: -1, firepower: 1, loadMax: 10, volume: -3, range: -50 } },
    { id: "smartammo", name: "Smart Ammo", cost: 2500, amount: 0, currency: "needles", stats: { usage: -1, ammoCost: -1 } },
    { id: "heftyammo", name: "Hefty Ammo", cost: 2500, amount: 0, currency: "needles", stats: { pierce: 1, firepower: 1, loadMax: 10, firerateMax: 10 } },
    { id: "inflatable", name: "Inflat. Mag", cost: 2500, amount: 0, currency: "needles", stats: { maxammo: 50, loadMax: 20 } },
    { id: "acceleration", name: "Acceleration", cost: 4500, amount: 0, currency: "needles", stats: { loadMax: -1000, loadAmount: 10, autoload: -1 } },
    { id: "sniper", name: "Sniper gun", cost: 7500, amount: 0, currency: "needles", stats: { range: 500, firepower: 5, loadMax: 1000, ammoCost: 10 } },
    { id: "supershotgun", name: "Super gun", cost: 9999, amount: 0, currency: "needles", stats: { firepower: 25, volume: 10, loadMax: 400, autoload: -1, usage: 5 } }
]
};

window.addEventListener("mousemove", (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    });

window.addEventListener("wheel", (e) => {
    if (!this.isOpen) return;

  
    this.scrollY -= e.deltaY;

 
    if (this.scrollY > 0) this.scrollY = 0;

   
    if (this.scrollY < -1000) this.scrollY = -1000; 
});

window.addEventListener("mousedown", (e) => {
    if (!this.isOpen) return; 


    const mouseX = e.clientX
    const mouseY = e.clientY 

    const menuX = (canvas.width - this.width) / 2;
    const menuY = (canvas.height - this.height) / 2;

    if (this.currentView === "hp_list") {
    
     
        this.upgrades.liha.forEach((item, index) => {
            let itemX = menuX + 50; 
            let itemY = menuY + 150 + index * 60 + this.scrollY;
            let itemWidth = 400; 
            let itemHeight = 40; 

            if (this.isInside(mouseX, mouseY, itemX, itemY - 20, itemWidth, itemHeight)) {
                this.useUpgrade(item);

               
            }
        });

       
        this.upgrades.neula.forEach((item, index) => {
            let itemX = menuX + 550; 
            let itemY = menuY + 150 + index * 60 + this.scrollY;
            let itemWidth = 400;
            let itemHeight = 40;

           
               if (this.isInside(mouseX, mouseY, itemX, itemY - 20, itemWidth, itemHeight)) {
                this.useUpgrade(item);

               
            }
        });
    }
});

    }

    useUpgrade(item){
        const currency = item.currency

        /*if (this.player[currency] < item.cost){
            return
        }*/ 
        this.player[currency] -= item.cost
     
        item.amount++
        this.player.upgrades++

        if (item.stats){

            for (let stat in item.stats){
                const changedValue = item.stats[stat];
                
                if (stat === "size" && this.player.size >= 4){
                    continue
                }

                if (stat === "defence"){
                    if (this.player.defence >= 99){
                        continue
                    }
                }

            

                this.player[stat] += changedValue
            }
    
        }
            
    }

    drawNeulaList(ctx, x, y){
    this.upgrades.neula.forEach((item, index) => {
        let itemY = y + 150 + index * 60 + this.scrollY;
        let itemX = x + 550;
        let itemXRight = x + 950;
       if (this.isInside(this.mouseX, this.mouseY, itemX, itemY - 20, 400, 40)){
            this.hoveredItem = item;
        }

        ctx.textAlign = "left";
        ctx.fillText(item.name, itemX, itemY);

       
        ctx.fillText("Cost: " + item.cost, x + 750, itemY)
        
        ctx.textAlign = "right";
        ctx.fillText(item.amount, itemXRight, itemY, item.cost); 
    })
    }

    drawLihaList(ctx, x, y) {
    this.upgrades.liha.forEach((item, index) => {
        let itemY = y + 150 + index * 60 + this.scrollY;
     

        if (this.isInside(this.mouseX, this.mouseY, x + 50, itemY - 20, 400, 40)){
            this.hoveredItem = item;
            
        
        }
      
        
        
        ctx.textAlign = "left";
        ctx.fillText(item.name, x + 50, itemY);

        ctx.fillText("Cost: " + item.cost, x + 250, itemY)
        
        ctx.textAlign = "right";
        ctx.fillText(item.amount, x + 450, itemY); 
    });
}

    isInside(pointX, pointY, boxX, boxY, width, height) {
    const vasenReuna = boxX;
    const oikeaReuna = boxX + width;
    const yläReuna = boxY;
    const alaReuna = boxY + height;

    // Tarkistetaan onko kursori boksin sisällä
    return pointX >= vasenReuna && pointX <= oikeaReuna &&
           pointY >= yläReuna && pointY <= alaReuna;
}

drawTooltip(ctx) {
        const item = this.hoveredItem;
        if (!item) return;

        ctx.save()
        const mouseXx = this.mouseX + 15
        const mouseYy = this.mouseY + 15
        const boxW = 340
        
        let statsCount = 0
        for (let s in item.stats){
            statsCount++
        } 
        const boxH = statsCount * 30 + 20

        ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
        ctx.fillRect(mouseXx, mouseYy, boxW, boxH);
        ctx.strokeStyle = "white";
        ctx.strokeRect(mouseXx, mouseYy, boxW, boxH);

        ctx.font = "14px arial";
        ctx.textAlign = "left";

        const positiveGoodStats = ["size", "maxammo", "vampirism","firepower", "volume", "range", "pierce", "maxhp", "hp", "vitality", "defence", "agility", "strenght", "luck", "endurance", "jumps", "gluttony", "vampirism", "loadAmount", "autoload", "maxsaturation", "saturation"];
        const NegativeGoodStats = ["metabolism", "firerateMax", "loadMax", "spread", "usage", "ammoCost"]
        let row = 0;
        for (let stat in item.stats) {
            const change = item.stats[stat]
            const current = this.player[stat]
            const next = current + change;

         
            let color;
            if (positiveGoodStats.includes(stat)) {
                if (change > 0) {
                    color = "#aaffaa";
                } else {
                    color = "#ffaaaa"; 
                }
            } else if (NegativeGoodStats.includes(stat)) {
                if (change < 0) {
                    color = "#aaffaa"; 
                } else {
                    color = "#ffaaaa";
                }
            }
            
            ctx.fillStyle = color;
           
           
     

    let text = stat + ": " + current + " -> " + next;


    let textX = mouseXx + 15;
    let textY = mouseYy + 30 + (row * 25);

    ctx.fillText(text, textX, textY);

    row++
        }
        ctx.restore();
    }
drawMainMenu(ctx, x, y){
    ctx.fillStyle = "darkred";
    ctx.fillRect(x, y, this.width / 2, this.height);

    ctx.fillStyle = "darkgreen";

    ctx.fillRect(x + this.width / 2, y, this.width / 2, this.height);


    ctx.beginPath();
    ctx.moveTo(x + this.width / 2, y); 
    ctx.lineTo(x + this.width / 2, y + this.height);

    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + this.width / 2, y - 100); 

    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x, y + 100); 

    ctx.lineTo(x + this.width, y + 100); 

    ctx.fillStyle = "black";
    ctx.font = "bold 30px arial";
    

   
    
    
    ctx.textAlign = "left"; 
    ctx.fillText("Liha: " + Math.floor(this.player.meat), x + this.width * 0.25, y + 60);

    ctx.stroke();
    ctx.textAlign = "left";
    ctx.fillText("Neula: " + Math.floor(this.player.needles), x + this.width * 0.75, y + 60);





    
    if (this.currentView === "regular"){
         ctx.stroke();
    ctx.fillText("boolet", x + this.width * 0.75, y + 180 );
    ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + this.width * 0.77 + 50, y + 150, 40, 40);
    ctx.fillText("+", x + this.width * 0.77 + 70, y + 180);

    ctx.stroke();
    ctx.fillText("hp", x + this.width * 0.25, y + 180 );
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + this.width * 0.25 + 50, y + 150, 40, 40);



    ctx.fillText("+", x + this.width * 0.25 + 70, y + 180);
    ctx.fillStyle = "black";
    }
}    

draw(ctx) {
    if (!this.isOpen) return;
    ctx.save();

    const x = (ctx.canvas.width - 1000) / 2; 
    const y = (ctx.canvas.height - 700) / 2;

    this.drawMainMenu(ctx, x, y);
    this.hoveredItem = null;

    if (this.currentView === "hp_list"){
        ctx.beginPath();
        ctx.rect(x, y + 100, this.width, this.height - 100); 
        ctx.clip();


        this.drawLihaList(ctx, x, y);
        this.drawNeulaList(ctx, x, y);
    }

    if(this.hoveredItem){
        this.drawTooltip(ctx);
    }
    

    
    ctx.restore();

}

   

}
