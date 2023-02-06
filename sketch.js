const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world, ground;
var solo, parado;
var cenario;
var torre, torreIMG;

//cria uma matriz
var matrizBalas = [];

var navio;

//guardará cada quadro da animação
var matrizQuadros = [];
var matrizQuadrosQuebrado = [];
//guarda a folha com as quatro imagens
var spriteSheetQuebrado, spriteSheet;
//terá os dados de cada quadro da animação
var dadosAnimacao, dadosAnimacaoQuebrado;

function preload(){
    //carrega a imagem do fundo
    cenario = loadImage("fundo.gif");
    //carrega a imagem de spritesheet
    spriteSheet = loadImage("./boat/boat.png");
    //carrega os dados JSON
    dadosAnimacao = loadJSON("./boat/boat.json");

    //imagem do barco quebrado
    spriteSheetQuebrado = loadImage("./boat/brokenBoat.png");
    //carrega os dados JSON
    dadosAnimacaoQuebrado = loadJSON("./boat/brokenBoat.json");
}

function setup() {
    canvas = createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;

    var frames = dadosAnimacao.frames;

    for(var i = 0; i < frames.length; i++){
        var pos = frames[i].position;
        var quadro = spriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        matrizQuadros.push(quadro);
    }
    var framesQ = dadosAnimacaoQuebrado.frames;

    for(var i = 0; i < framesQ.length; i++){
        var pos = framesQ[i].position;
        var quadro = spriteSheetQuebrado.get(pos.x, pos.y, pos.w, pos.h);
        matrizQuadrosQuebrado.push(quadro);
    }

    parado = { isStatic: true };

    solo = Bodies.rectangle(width/2, height-2, width, 2, parado);
    World.add(world, solo);


    angleMode(DEGREES);
    torre = new Torre(160, 350,250,410);
    canhao = new Canhao(185,135,200,120);
    bala = new Bala (canhao.x, canhao.y);


    rectMode(CENTER);
    imageMode (CENTER);
}

function draw() {
    Engine.update(engine);
    background("cyan");
    image(cenario, width/2, height/2, width, height)

    fill("green");
    rect(solo.position.x, solo.position.y, width, 10);
    torre.show();

    for(var i = 0; i < matrizBalas.length; i++){
        if( matrizBalas[i] !== undefined ){
            matrizBalas[i].mostrar();
            colisao(i);
            if( matrizBalas[i].body.position.x >= width ){
                World.remove(world, matrizBalas[i].body);
                matrizBalas.splice(i,1);
            }
            else if(matrizBalas[i].body.position.y >= height-50){
                World.remove(world, matrizBalas[i].body);
                matrizBalas.splice(i,1);
            }
        }        
    }

    bala.mostrar();
    canhao.show();
    //chamar a função criarBarcos para ter vários barcos
    //diferentes
    criarBarcos();
}
function keyPressed(){
    if(keyCode == 32){
        bala = new Bala(canhao.x, canhao.y);    
        bala.atirar();
        matrizBalas.push(bala);
    }
}
//cria a matriz
var barcos = [];
function criarBarcos(){
    //vê se tem barcos na matriz
    if(barcos.length>0){
        //vê se o barco está próximo da torre
        if(barcos[barcos.length-1].body.position.x<900){
            //cria barco
            var barco = new Navio(width, height-50);
            barcos.push(barco);
        }
        //repete comando para mostrar todos os barcos
        for(var i = 0; i < barcos.length ; i++){
            barcos[i].mostrar();
            barcos[i].animar();
            //define a velocidade do corpo do barco
            Body.setVelocity(barcos[i].body, {x:-2, y:0})
        }
    }else{
        //se não tem barcos, cria o barco
        var barco = new Navio(width, height-50);
        //e coloca na matriz
        barcos.push(barco);
    }
}


function gameOver(){

    swal({
        title: `FIM DE JOGO!!!`,
        text: "Obrigado por jogar!",
        imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
        imageSize: "150x150",
        confirmButtonText: "Jogar Novamente"
    },
     function(isConfirm) {
        if (isConfirm) {
            location.reload();
        }
    })
}