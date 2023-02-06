class Canhao {
    constructor(x,y,l, a){
        this.x = x;
        this.y = y;
        this.largura = l;
        this.altura = a;
        this.angulo = 20;
        this.imgBase = loadImage("base.png");
        this.imgCanhao = loadImage("canhao.png");
    }
    show(){
        //se o jogador apertar a tecla DIREITA, aumente o angulo
        if (keyIsDown(RIGHT_ARROW) && this.angulo < 60){
            this.angulo+=1;
        }
        if (keyIsDown(LEFT_ARROW) && this.angulo > -15){
            this.angulo-=1;
        }


        push();
        translate(this.x, this.y)
        rotate(this.angulo)
        image(this.imgCanhao,0, 0,this.largura, this.altura);
        pop ();
        image (this.imgBase, 170,140,240,200)
    }
}