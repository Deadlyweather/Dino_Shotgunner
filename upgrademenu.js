class UpgradeMenu {
    constructor(player) {
        this.player = player;
        this.isOpen = false;
        
        this.width = 1000;
        this.height = 700;
    }

draw(ctx) {
    if (!this.isOpen) return;
    ctx.save();

    const x = (ctx.canvas.width - 1000) / 2; 
    const y = (ctx.canvas.height - 700) / 2;

    

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

    
    ctx.restore();

}

   

}