let now_playing = document.querySelector(".nowPlaying");
let track_art = document.querySelector(".trackArt");
let track_name = document.querySelector(".trackName");
let track_artist = document.querySelector(".trackArtist");

let playPause_btn = document.querySelector(".playPauseTrack");
let next_btn = document.querySelector(".nextTrack");
let prev_btn = document.querySelector(".prevTrack");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".curr_time");
var total_duration = document.querySelector(".total-duration")

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
        {
           name:"Sweet_In_The_Middle",
           artist: "Davido ft._Naira_Marley_X_Zlatan_Ibile_X_Wurld ",
           image: "image url",
           path:"[Waploaded]_Davido_-_Sweet_In_The_Middle_ft._Naira_Marley_X_Zlatan_Ibile_X_Wurld-1574343329.mp3" 
        },
        {
           name:"Thotiana_Remix",
           artist: "Young_Ma ",
           image: "image url",
           path:"Young_MA_-_Thotiana_Remix_.mp3" 
        },
        {
           name:"Swalla",
           artist: "Jason Derulo ft Nicki Minaj - Ty Dolla $ign",
           image: "image url",
           path:"Swalla - Jason Derulo ft Nicki Minaj - Ty Dolla $ign - Easy Fitness Dance - Baile - Coreo Choreo.mp3" 
        },
        {
           name:"Cassanova",
           artist: "Nasty C",
           image: "image url",
           path:"13 Nasty C - Casanova.mp3" 
        },
        {
           name:"My life",
           artist: "NF",
           image: "image url",
           path:"Dup(01)NF - My Life (Audio).mp3" 
        },
        {
           name:"NO NAME",
           artist: "NF",
           image: "image url",
           path:"Dup(01)NF_-_NO_NAME(240p).mp3" 
        },
        {
           name:"WHY",
           artist: "NF",
           image: "image url",
           path:"Dup(01)NFWhy_.mp3" 
        },
        {
           name:"I Don't Care",
           artist: "Ed Sheeran",
           image: "image url",
           path:"Ed Sheeran - I Don't Care (Lyrics) Ft. Justin Bieber.mp3" 
        },
        {
           name:"Hate_Me",
           artist: "Ellie_Goulding",
           image: "image url",
           path:"Ellie_Goulding_Juice_WRLD_-_Hate_Me_talkglitz.tv.mp3" 
        },
        {
           name:"Rap_God",
           artist: "Eminem",
           image: "image url",
           path:"Eminem_Rap_God.mp3" 
        },
        {
           name:"Falling",
           artist: "--",
           image: "image url",
           path:"Falling mp3.mp3" 
        },
        {
           name:"Heartbeats (filous & MOUNT Remix)",
           artist: "filous - José González",
           image: "image url",
           path:"filous - José González - Heartbeats (filous & MOUNT Remix).mp3" 
        },
        {
           name:"King",
           artist: "Fireboy_DML",
           image: "image url",
           path:"Fireboy_DML_King_9jaflaver.com_.mp3" 
        },
        {
           name:"Flight Facilities (Extended Version)",
           artist: "Two Bodies feat. Emma Louise",
           image: "image url",
           path:"Flight Facilities - Two Bodies feat. Emma Louise (Extended Version).mp3" 
        },
        {
           name:"Joker_x_Bdash",
           artist: "Joker_x_Bdash",
           image: "image url",
           path:"Joker_x_Bdash(256kbps).mp3" 
        },
        {
           name:"Yummy",
           artist: "Justin_Bieber",
           image: "image url",
           path:"Justin_Bieber_-_Yummy.mp3" 
        },
        {
           name:"Rapture (Official Audio)",
           artist: "Koffee",
           image: "image url",
           path:"Koffee - Rapture (Official Audio).mp3" 
        },
        {
           name:"Gucci Gang",
           artist: "Lil Pump",
           image: "image url",
           path:"Lil Pump - 'Gucci Gang' (Official Music Video)-1.mp3" 
        },
        {
           name:" Monalisa (Remix)",
           artist: "Lyta[feat. Davido]",
           image: "image url",
           path:"Lyta - Monalisa (Remix) [feat. Davido] (NetNaija.com).mp3" 
        },
        {
           name:"Like_I_Do",
           artist: "Fireboy_DML",
           image: "image url",
           path:"Fireboy_DML_Like_I_Do_9jaflaver.com_.mp3" 
        },
]


function loadTrack(track_index) {
    // clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // update details of the track
    track_art.style.backgroundImage = 
    "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // interval of 1000ms
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);

    // apply a random background color
    random_bg_color();
}

function random_bg_color(){
    // get a random number between 64 to 256
    // (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    // construct a color with the given values
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    // set the background to the new values
    document.body.style.background = bgColor;
    
}

// function to reset all values to their default
function resetValues(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// config the player btns
function playPauseTrack() {
    // switch btwn playing and pausing
    // depending on the curent state
    if(!isPlaying){playTrack()}
   else{ PauseTrack()};
        
   
}

function playTrack(){
    // play the loaded track
    curr_track.play();
    isPlaying = true;

    // replace icon with the pause icon
    playPause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function PauseTrack(){
    // pause the loaded track
    curr_track.pause();
    isPlaying = false;

      // replace icon with the play icon
      playPause_btn.innerHTML  = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack(){
    // go back to the first track if the
    //  current one is the last in the track list
    if(track_index < track_list.length - 1){
        track_index += 1;
    }else{
        track_index = 0;
    }

    // load and play the new track
    loadTrack(track_index);
    playTrack();
   
}

function prevTrack(){
    // go back to last track if the
    // current one is first in  the track list
    if(track_index > 0){
        track_index -= 1;
    }
    else{
        track_index = track_list.length - 1;
    }
     // load and play the new track
     loadTrack(track_index);
     playTrack();
}

function seekTo(){
    seekto = curr_track.duration * (seek_slider.value / 100);

    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;

}

function seekUpdate(){
    let seekPosition = 0;
    // check if the current track is a legible number;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationSeconds * 60);


        // add a zero to  the single digit time values
       if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds;}
       if(durationSeconds < 10) {durationSeconds = "0" + durationSeconds;}
       if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes;}
       if(durationMinutes < 10) {durationMinutes = "0" + durationMinutes;}

      // display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// starting the player
// load the first track in the track list
loadTrack(track_index);
seekUpdate();