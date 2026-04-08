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

        this.upgrades = {
    liha: [
        { id: "hp", name: "Max HP", amount: 0, cost: 10 },
        { id: "regen", name: "HP Regen", amount: 0, cost: 20 },
        { id: "armor", name: "Armor", amount: 0, cost: 50 },
        
    ],
    neula: [
        { id: "dmg", name: "Damage", amount: 0, cost: 15 },
        { id: "speed", name: "Reload", amount: 0, cost: 25 },
        { id: "ammo", name: "More Ammo", amount: 0, cost: 25 },
    ]
};

window.addEventListener("wheel", (e) => {
    if (!this.isOpen) return;

  
    this.scrollY -= e.deltaY;

 
    if (this.scrollY > 0) this.scrollY = 0;

   
    if (this.scrollY < -500) this.scrollY = -500; 
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
                item.amount++;
                this.player.upgrades++
               if(item.id ==="hp"){
                this.player.maxhp += 10;
               }
               
            }
        });

       
        this.upgrades.neula.forEach((item, index) => {
            let itemX = menuX + 550; 
            let itemY = menuY + 150 + index * 60 + this.scrollY;
            let itemWidth = 400;
            let itemHeight = 40;

           
            if (this.isInside(mouseX, mouseY, itemX, itemY - 20, itemWidth, itemHeight)) {
                item.amount++;
                this.player.upgrades++

                if(item.id === "ammo"){
                    this.player.ammo++;
                }
               
            }
        });
    }
});

    }

    drawNeulaList(ctx, x, y){
    this.upgrades.neula.forEach((item, index) => {
        let itemY = y + 150 + index * 60 + this.scrollY;
        let itemX = x + 550;
        let itemXRight = x + 950;

        
        
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

    ctx.stroke();
    ctx.fillStyle = "black"
    ctx.font = "bold 30px  arial";
    ctx.textAlign = "center";
    ctx.fillText("Liha", x + this.width * 0.25, y + 60 );

    ctx.stroke();
    ctx.fillText("Neula", x + this.width * 0.75, y + 60 );




    
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

    if (this.currentView === "hp_list"){
        ctx.beginPath();
        ctx.rect(x, y + 100, this.width, this.height - 100); 
        ctx.clip();


        this.drawLihaList(ctx, x, y);
        this.drawNeulaList(ctx, x, y);
    }
    

    
    ctx.restore();

}

   

}