const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const subtituloStrong = document.querySelector('.app__title-strong');
const botoes = document.querySelectorAll('.app__card-button');
const pausePlayImagem = document.querySelector('.app__card-primary-butto-icon');

const tempoTela = document.querySelector('#timer');
const startPause = document.querySelector('#start-pause');
const alternarMusica = document.querySelector('#alternar-musica');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundo = 1500;
let intervaloId = null;

musica.loop = true;

alternarMusica.addEventListener('change', ()=>{
  musica.paused ? musica.play() : musica.pause();
})

focoBtn.addEventListener('click', ()=>{
  tempoDecorridoEmSegundo = 1500;
  alterarContexto('foco');
  focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', ()=>{
  tempoDecorridoEmSegundo = 300;
  alterarContexto('descanso-curto');
  curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click', ()=>{
  tempoDecorridoEmSegundo = 900;
  alterarContexto('descanso-longo');
  longoBtn.classList.add('active');
});

function alterarContexto(contexto){
  mostrarTempo();
  html.setAttribute('data-contexto',contexto);
  banner.setAttribute('src',`/imagens/${contexto}.png`);
  botoes.forEach(function(contexto){
    contexto.classList.remove('active');
  });

  switch (contexto) {
    case "foco":
      titulo.innerHTML  = `Otimize sua produtividade, <br> <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;

    case "descanso-curto":
      titulo.innerHTML  = `Que tal dar uma respirada? <br> <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;

      case "descanso-longo":
        titulo.innerHTML  = `Hora de voltar à superfìcie <br> <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
    default:
      break;
  }
}

const contagemRegressiva= () => {
  if ( tempoDecorridoEmSegundo<=0 ){
    audioTempoFinalizado.play();
    alert('tempo finalizado');
    zerar();
    return;
  }
  tempoDecorridoEmSegundo -= 1;
  mostrarTempo();
}

startPause.addEventListener('click', iniciaPausa);

function iniciaPausa(){
  if(intervaloId){
    audioPausa.play();
    zerar();
    return;
  }
  audioPlay.play();
  pausePlayImagem.setAttribute('src',`/imagens/pause.png`);
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBtn.textContent = 'Pausar';
  
}

function zerar(){
  clearInterval(intervaloId);
  iniciarOuPausarBtn.textContent = 'Começar';
  pausePlayImagem.setAttribute('src',`/imagens/play_arrow.png`);
  intervaloId = null;
}

function mostrarTempo(){
  const tempo = new Date(tempoDecorridoEmSegundo * 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-br',{minute: '2-digit',second: '2-digit'});
  tempoTela.innerHTML = `${tempoFormatado}`;
}
mostrarTempo();