//Utileza as teclas W e S para movimentar a Raquete.
//CONFIG SONS
let raquetadaSom;
let pontosSom;
let trilhaSonoraSom;

function preload(){
  trilhaSonoraSom = loadSound("trilha.mp3")
  raquetadaSom = loadSound("raquetada.mp3")
  pontosSom = loadSound("Pontos.mp3")  
}
  
//VARIAVEIS PLACAR
let meusPontos = 0;
let oponentePontos = 0;

//VARIAVEIS POSICAO & TAMANHO BOLINHA =
let xBolinha = 300;
let yBolinha = 150;
let diametro = 25;
let raio = diametro / 2;

//VARIAVEIS VELOCIDADE ATRIBUIDA EIXO X E Y DA BOLINHA = 
let velocidadeXBolinha = 5; //altere a velocidade da bolinha no eixo X
let velocidadeYBolinha = 5; //altere a velocidade da bolinha no eixo Y

//VARIAVEIS RAQUETE =
let xRaquete = 10;
let yRaquete = 100;
let comprimentoRaquete = 15;
let alturaRaquete = 100;

//VARIAVEIS RAQUETE OPONENTE =
let xRaqueteOponente = 575;
let yRaqueteOponente = 100;
let velocidadeYOponente = 0;
let chanceDeErrar = 1;

let colidiu = false;

function setup() {
  createCanvas(600, 300);
//direitos autorais tirado de = "https://www.youtube.com/watch?v=4O9uqQBWdzE"
  trilhaSonoraSom.loop();   
// Abaixo modulo para definir volume padrão altere dentro dos parenteses() 0 para sem volume, 1 para volume max =
  trilhaSonoraSom.setVolume(0.01); // Definir volume padrão
  raquetadaSom.setVolume(0.1); //Definir volume padrão
  pontosSom.setVolume(0.1); // Definir volume padrão
  
}

//DRAW =
function draw() {
  background(85, 37, 130); //Define a cor roxa dos Lakers para o fundo

//DESENHA A REDE
  strokeWeight(3);
  stroke(255);
  line(width/2, 0, width/2, height);
  
//DESENHA A MESA DE PING PONG
  fill(253, 185, 39); //Define a cor amarelo dourado dos Lakers
  rect(width/4, height/4, width/2, height/2);
  
//DESENHA LOGOTIPO T.C.A
  fill(253, 185, 39); //Define a cor amarelo dourado dos Lakers
  stroke(85, 37, 130);
  ellipse(width/2, height/2, 80, 80); //Desenha o círculo externo
  fill(85, 37, 130); //Define a cor roxa dos Lakers para o círculo interno
  ellipse(width/2, height/2, 50, 50); //Desenha o círculo interno
  fill(255, 255, 255);
  textSize(15);
  textAlign(CENTER, CENTER);
  stroke(50)
  text("B.C", width/2, height/2); //Modifique o texto do círculo interno

//DESENHO DA QUADRA =
  VerificacolisaoRaquete(xRaquete, yRaquete);
  VerificacolisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  
//DRAW BOLINHA = 
  mostraBolinha();
  velocidadeDaBolinha();
  verificaColisaoBorda();
  
//DRAW RAQUETE =
  mostraRaquete(xRaquete, yRaquete);
  controleRaquete();
  verificaColisaoRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  
//PLACAR DO JOGO =
  placarDoJogo();
  marcadorDePonto();
  verificaBolinhaPresaNasRaquetes();
    
}
//REFATORACAO
// define a cor da borda dos retângulos como roxo    
    function placarDoJogo(){
    stroke(0); 
    textAlign(CENTER);
    textSize(20);

// retângulo dos meus pontos
    fill(253, 185, 39); //define a cor do retângulo como amarelo ouro
    rect(130, 14, 40, 20, 5);
  
//texto dos meus pontos
    fill(255, 255, 255); //define a cor do texto como branco
    text(meusPontos, 150, 26);

//retângulo dos pontos do oponente
    fill(85, 37, 130); //define a cor do retângulo como roxo escuro
    rect(430, 14, 40, 20, 5);
  
//texto dos pontos do oponente
    fill(255, 255, 255); //define a cor do texto como branco
    text(oponentePontos, 450, 26);
  
//adicionando sombra e brilho
    noStroke();
    fill(0, 0); //define a cor da sombra como preto com transparência
    rect(130, 9, 40, 20, 5);
    rect(430, 9, 40, 20, 5);
    fill(0, 0, 0, 0); //define a cor do brilho como branco com transparência
    rect(130, 9, 40, 20, 5);
    rect(430, 9, 40, 20, 5);
}

function marcadorDePonto(){
    if (xBolinha > 589){
    meusPontos += 1;
  }
    if (xBolinha < 11){
    oponentePontos += 1;
  }
}

//BOLINHA DO JOGO
function mostraBolinha(){
    fill(255);
    circle(xBolinha,yBolinha,diametro);
}

function velocidadeDaBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
    if (xBolinha + raio > width || 
        xBolinha - raio < 0){
        velocidadeXBolinha *= -1;
        pontosSom.play();
  }
    if (yBolinha + raio > height || 
        yBolinha - raio < 0){
        velocidadeYBolinha *= -1;
 }
} 

//RAQUETE =
function mostraRaquete(x,y){
    fill(253, 185, 39);
    rect(x, y, comprimentoRaquete, alturaRaquete);
}

function controleRaquete(){
    if(keyIsDown(87) && yRaquete > 0){
    yRaquete -= 4;
  }
    if(keyIsDown(83) && yRaquete < 
    height - alturaRaquete){
    yRaquete += 4;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + comprimentoRaquete && 
      yBolinha - raio < yRaquete + alturaRaquete &&
      yBolinha + raio > yRaquete){
      velocidadeXBolinha *= -1;
      raquetadaSom.play();
 }
}

function VerificacolisaoRaquete(x, y){
    colidiu =
    collideRectCircle(x, y, comprimentoRaquete, alturaRaquete,             xBolinha, yBolinha, raio);
  
    if (colidiu){
    velocidadeXBolinha *= -1;
    raquetadaSom.play();
  }
}

function movimentaRaqueteOponente(){
    velocidadeYOponente = yBolinha - yRaqueteOponente -
    comprimentoRaquete / 2
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar
    calculaChanceDeErrar()    
}
function calculaChanceDeErrar(){
  if (oponentePontos >= meusPontos){
      chanceDeErrar += 1;
  
  if (chanceDeErrar >= 39){
      chanceDeErrar = 50
      }  
} else {
  chanceDeErrar -= 1
  if (chanceDeErrar <= 0){
    chanceDeErrar = 0;
  }
 }
}

function verificaBolinhaPresaNasRaquetes(){
  // verifica se a bola está presa atrás da raquete do jogador
  if (xBolinha + raio < xRaquete + comprimentoRaquete && yBolinha > yRaquete && yBolinha < yRaquete + alturaRaquete) {
    velocidadeXBolinha *= -1; // inverte a direção horizontal da bola
    xBolinha = xRaquete + comprimentoRaquete + raio; // posiciona a bola fora da raquete
    raquetadaSom.play(); // toca o som da raquetada
  }
  
  // verifica se a bola está presa atrás da raquete do oponente
  if (xBolinha - raio > xRaqueteOponente && yBolinha > yRaqueteOponente && yBolinha < yRaqueteOponente + alturaRaquete) {
    velocidadeXBolinha *= -1; // inverte a direção horizontal da bola
    xBolinha = xRaqueteOponente - raio; // posiciona a bola fora da raquete
    raquetadaSom.play(); // toca o som da raquetada
  }
  
// verifica se a bola saiu da tela
  if (xBolinha < -raio || xBolinha > width + raio) {
    if (xBolinha < - raio) {
      oponentePontos += 1;
    } else {
      meusPontos += 1;
    }
    pontosSom.play(); // toca o som de pontuação
    xBolinha = width/2; // reposiciona a bola no centro da tela
    yBolinha = height/2;
    velocidadeXBolinha *= -1; // inverte a direção horizontal da bola
    velocidadeYBolinha *= -1; // inverte a direção vertical da bola
  }
}

