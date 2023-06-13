$(document).ready(function() {
    
    var nightMode = localStorage.getItem('nightMode');

    if (nightMode === 'true') {
      enableNightMode();
    } else {
      disableNightMode()
    }
  
    $('#botao-noturno').click(function() {
      toggleNightMode();
    });
  
    function disableNightMode() {
      $('body').removeClass('dark-mode');
      $('#night-mode-toggle').text('Enable Night Mode');
      localStorage.setItem('nightMode', 'false');
      logoImage = document.getElementById('pan-logo');
      logoImage.src = '../assets/img/logoBancoPan.svg';
      logoAthena = document.getElementById('athena-logo');
      logoAthena.src = '../assets/img/logoProjeto.svg';
      voltarBotao = document.getElementById('voltar');
      voltarBotao.src = '../assets/img/voltar.svg';
    }

    function enableNightMode() {
      $('body').addClass('dark-mode');
      $('#night-mode-toggle').text('Disable Night Mode');
      localStorage.setItem('nightMode', 'true');
      logoImage = document.getElementById('pan-logo');
      logoImage.src = '../assets/img/logoPbranco1.svg';
      logoAthena = document.getElementById('athena-logo');
      logoAthena.src = '../assets/img/athenaLogoBranco.svg';
      voltarBotao = document.getElementById('voltar')
      voltarBotao.src = '../assets/img/voltarBranco.svg'
    }
    
  
    function toggleNightMode() {
      if ($('body').hasClass('dark-mode')) {
        disableNightMode();
      } else {
        enableNightMode();
      }
    }
  });