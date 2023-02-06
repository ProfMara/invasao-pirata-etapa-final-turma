class Bala{
    constructor(x,y){
        this.body = Bodies.circle(x, y, 30, parado);
        //adicionar no mundo
        World.add(world, this.body);
        this.imagem = loadImage ("bala.png");
        this.trajetoria = [];
    }

    atirar(){
        var angulo = canhao.angulo - 28;
        angulo *= 3.14/180;
        var v = p5.Vector.fromAngle(angulo);
        v.mult(90/3.14)
        Matter.Body.setStatic(this.body, false) 
        Matter.Body.setVelocity(this.body, {x:v.x, y:v.y});
    }


    mostrar(){
        var pos = this.body.position;
        var posicao = [pos.x, pos.y];
        this.trajetoria.push(posicao);
        for(var i = 0; i < this.trajetoria.length; i++){
            image (this.imagem, this.trajetoria[i][0], this.trajetoria[i][1], 5, 5)
        }
        image (this.imagem, pos.x, pos.y, 30,30);
    }
   
}