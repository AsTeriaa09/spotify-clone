// initializing the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progessbar');
let gif = document.getElementById('gif2');
let playButton = Array.from(document.getElementsByClassName('play-button'));
let previous = document.getElementById('prev');
let next = document.getElementById('next');
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName : 'wildflower', filePath:'songs/1.mp3',coverPath:'images/1.jpg'},
    {songName : 'anxiety', filePath:'songs/2.mp3',coverPath:'images/2.jpg'},
    {songName : 'everything inside', filePath:'songs/3.mp3',coverPath:'images/3.jpg'},
    {songName : 'love me', filePath:'songs/4.mp3',coverPath:'images/4.jpg'},
    {songName : 'kid i used to be', filePath:'songs/5.mp3',coverPath:'images/5.jpg'},
    {songName : 'shadow', filePath:'songs/6.mp3',coverPath:'images/6.jpg'},
]
// handle play/pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
});

// listen to events
audioElement.addEventListener('timeupdate',()=>{
    // Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration )* 100);
    progressBar.value=progress;
});
progressBar.addEventListener('change', ()=> {
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
});

const makeAllPlay=() => {
    playButton.forEach(element => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

}
playButton.forEach(element => {
    element.addEventListener('click',(e) => {
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-play');
        audioElement.src = `songs/${songIndex+1}.mp3`;

        masterSongName.innerHTML=songs[songIndex].songName;

        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
});

next.addEventListener('click',() => {
    if(songIndex >= 5){
        songIndex=0;
    }else{
        songIndex += 1;
    }

    masterSongName.innerHTML=songs[songIndex].songName;

    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
previous.addEventListener('click',() => {
    if(songIndex <= 0){
        songIndex=0;
    }else{
        songIndex -= 1;
    }

    masterSongName.innerHTML=songs[songIndex].songName;

    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

