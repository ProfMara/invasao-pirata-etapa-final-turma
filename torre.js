class Torre{
    constructor(x,y,largura, altura){
        var parado = {isStatic:true};
        this.body = Bodies.rectangle(x,y,largura, altura, parado);
        World.add(world, this.body);
        this.imagem = loadImage("torre.png");
        this.largura = largura;
        this.altura = altura;
    }
    show(){
        push ();
        imageMode (CENTER);
        var pos = this.body.position;
        image (this.imagem, pos.x, pos.y, this.largura-100, this.altura-100);
        pop ()
    }

}