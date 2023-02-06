class Navio{
    constructor(x, y){
        this.raio = 80;
        this.body = Bodies.circle(x, y - 200,this.raio);
        World.add(world, this.body);
        //atribui a imagem
        this.imagem = loadImage("boat.png");
        //atribui a animação
        this.animacao = matrizQuadros;
        //atribui a rapidez da animação
        this.speed = 0;
    }
    animar(){
        //aumenta o valor de speed
        this.speed +=0.01;
    }



    mostrar(){
        var pos = this.body.position;
        var indice = Math.floor(this.speed % this.animacao.length)
        image(this.animacao[indice],pos.x, pos.y, this.raio*2, this.raio*2);
    }
}