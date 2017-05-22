// nos traemos clases desde el DOM con el querySelector
// Get our elemnts
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen')

// creando las functions 
function togglePlayer() {
    //si el video esta en play, al dar click lo pauso y viceversa
    const method = video.paused ? 'play' : 'pause';
    video[method]();

    //otra forma de llamar a la funcion
    /*if(video.paused) {
        video.play();
        console.log('%c video play ', 'background: orange;')
    } else {
        console.log('%c video pause ', 'color: orange; background: black;')
        video.pause();
        
    }*/
}

// para modificar el boton a play o pause segun corresponda
function updateButton () {
    const icon = video.paused ? '►︎' : '▌▌';
    toggle.textContent = icon;
    console.log('%c update the button ', 'background: orange;')
}

// para adelantar 25 segundos o atras 10 el video
function skip() {    
    console.log('%c listen skip ', 'background: black; color: yellow;')
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip);
}

//para actualizar el volumen
function handleRangeUpdate () {
    //console.log('%c listening event volumen: ', 'background: blue; color: white ;')
    video[this.name] = this.value
    console.log(this.value)
}
// para actualizar la barra de progreso
function handelProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`;
}
//para adelantar o atrasar desde la barra de progreso
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    
}

function handleFullscreen () {
    console.log(video.webkitRequestFullScreen)
    if(video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    }
}


// determinado los listener
// Hook up the event listener
video.addEventListener('click', togglePlayer)
toggle.addEventListener('click' , togglePlayer)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handelProgress)
skipButtons.forEach(function(button) {
    button.addEventListener('click', skip)
})
ranges.forEach(function(range){ 
    range.addEventListener('change', handleRangeUpdate)
})
ranges.forEach(function(range){ 
    range.addEventListener('mousemove', handleRangeUpdate)
})

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', handleFullscreen)