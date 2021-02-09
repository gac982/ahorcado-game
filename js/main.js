  // variables
  const palabrasSustantivos = ["javascript","abrelatas", "disposicion", "parlante", "aire", "mesa"];
  const palabraAdivinar = palabrasSustantivos[_.random(0, palabrasSustantivos.length -1)];
  let letrasJugador = [];
  let letrasAJugar = 5;
  const palabra = document.querySelector('#palabra');
  const oportunidades = document.querySelector('#oportunidades');
  const nuevaLetra = document.querySelector('#letra-nueva');
  // funciones

  oportunidades.textContent = letrasAJugar;
  function jugador(evento) {
      // generamos el evento de ingreso de letras con la letra enter
          if(evento.code === 'Enter') {
              // guardamos la letra en una variable para luego usarla mas adelante y las ponemos todas en minusculas
              const nuevaLetraJugador = nuevaLetra.value.toLowerCase();
              // realizamos unna condicional donde indicamos si la letra que vamos a colocar esta dentro de la palabra que vamos a adivinar
              if(palabraAdivinar.includes(nuevaLetraJugador)) {
                  // la incluimos dentro del array que estamos formando
                  letrasJugador = letrasJugador.concat(nuevaLetraJugador);
                  // borramos el input para continuar ingresando letras
                  nuevaLetra.value = '';
                  // en caso contrario
              } else {
                  // le restamos una oportunidad de las ya indicadas
                  letrasAJugar = letrasAJugar - 1;
                  // borramos lo que teniamos
                  oportunidades.textContent = '';
                  // y volvemos a dibujar lo que llevamos
                  oportunidades.textContent = letrasAJugar;
              }
              // Dibujamos el juego de nuevo
              render();
          }
  }

  function adivinar() {
      // para edivinar la letra tomamos la palabra y la comvertimos en un array para entonces poder mapearla
      return palabraAdivinar.split('').map(function(letra) {
          // si la letra ingresada por el jugador esta en la palabra al azar
          if (letrasJugador.includes(letra)) {
              // dibujamos la letra
              return letra
          } else {
              // en caso contrario devolvemmos un simple guion
              return '_';
          }
          // volvemos a convertir todo el array en un string para poder dibujarlo en el html
      }).join(' ');
  }

  function perdido() {
      // si las oportunidades llegan a 0 has perdido
      return letrasAJugar === 0;
  }
  function ganado() {
      // si en la palabra a adivinar no encontramos guiones has ganado
      return !adivinar().includes('_');
  }

  function render() {
      // limpiamos la palabra anterior
      palabra.textContent = '';
      // dibujamos la palabra a adivinar
      const palabraGuionizada = adivinar();
      // insertamos
      palabra.textContent = palabraGuionizada;
      // comprobamos si ha ganado
      if(ganado()) {
          alert('Felicidades Has Ganado');
          // refrescamos la pagina para seguir jugando
          location.reload(true);
      }
      // comprobamos si has perdido
      if(perdido()) {
          alert('Has Perdido Vuelve a intentarlo');
          // refrescamos la pagina para seguir jugando
          location.reload(true);
      }
  }

  // eventos
  nuevaLetra.addEventListener('keydown', jugador);

  // inicio
  render();