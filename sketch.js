let trator;
let alimentos = [];
let contador = 0;
let tempo = 0;
let pontos = 0;
let jogando = true;

let bons = ["🌽", "🥔", "🌾", "🥕", "🥬"];
let maus = ["🍦", "🍫", "🍕", "🍔"];

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
  trator = {
    emoji: "🚜",
    largura: 50,
    x: width / 2,
    y: height - 40,
    vel: 7
  };
}

function draw() {
  background(200, 230, 255);

  if (jogando) {
    tempo++;
    let segundos = floor(tempo / 60);
    let resto = 20 - segundos;

    fill(0);
    textSize(18);
    text("Pontos: " + pontos, 70, 20);
    text("Tempo: " + resto + "s", width - 70, 20);

    contador++;
    if (contador >= 30) {
      let tipo = pegarAlimento();
      alimentos.push({
        tipo: tipo,
        x: random(20, width - 20),
        y: 0,
        vel: 3
      });
      contador = 0;
    }

    let novos = [];
    for (let i = 0; i < alimentos.length; i++) {
      let item = alimentos[i];
      item.y += item.vel;
      textSize(32);
      text(item.tipo, item.x, item.y);

      if (bateu(item, trator)) {
        if (eBom(item.tipo)) {
          pontos++;
        } else {
          jogando = false;
        }
      } else if (item.y <= height) {
        novos.push(item);
      }
    }
    alimentos = novos;

    desenharTrator();
    moverTrator();

    if (resto <= 0) jogando = false;
  } else {
    fill(0);
    textSize(28);
    text("Fim de jogo!", width / 2, height / 2 - 40);
    textSize(22);
    text("Pontos finais: " + pontos, width / 2, height / 2);
    text("Pressione R para jogar de novo", width / 2, height / 2 + 40);
  }
}

function keyPressed() {
  if (key === 'R' || key === 'r') {
    pontos = 0;
    tempo = 0;
    contador = 0;
    alimentos = [];
    jogando = true;
  }
}

function moverTrator() {
  if (keyIsDown(LEFT_ARROW)) trator.x -= trator.vel;
  if (keyIsDown(RIGHT_ARROW)) trator.x += trator.vel;
  if (trator.x < 0) trator.x = 0;
  if (trator.x > width - trator.largura) trator.x = width - trator.largura;
}

function desenharTrator() {
  textSize(40);
  text(trator.emoji, trator.x, trator.y);
}

function bateu(alimento, trator) {
  let vertical = alimento.y + 20 > trator.y;
  let horizontal = alimento.x > trator.x && alimento.x < trator.x + trator.largura;
  return vertical && horizontal;
}

function eBom(tipo) {
  for (let i = 0; i < bons.length; i++) {
    if (tipo === bons[i]) return true;
  }
  return false;
}

function pegarAlimento() {
  let todos = bons.concat(maus);
  let pos = floor(random(todos.length));
  return todos[pos];
}
