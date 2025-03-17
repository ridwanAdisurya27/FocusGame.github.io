// Data Station
const Array_paten= [1,2,3,4,5,6,7,8,9];
let array = [];
let num_now = 9;
let score = 0;
let time = 30;
let IntervalID;
var game_condition = false;
const audioContext = new(window.AudioContext || window.webkitAudioContext)()

// Undisplayed program

function Random(){
    while (array.length > 0) {
        array.pop();
    }
    console.log("array kosong " + array);
    while(array.length <= 8) {
        let rand = Array_paten[Math.floor(Math.random()*Array_paten.length)];
        if(array.includes(rand) == false){
            array.push(rand);
        }
    }
    $("div .grid").each(function(index){
        $(this).text(array[index]);
    })
}

$("#start").one("click", function() {
    game_condition = true;
    $(this).css("display","none");
    time_countdown();
    document.getElementById("audio_sfx").play();
})

// Aside Left Function
// Score Function

// Main Function
// time Function
var music = $("#audio_sfx").get(0);
const time_paten = 30;
let isTimeRunning = false;

function Time_count(time){
    let time_now = (time/30)*100;
    if(time_now > 100){
        time_now = 100;
    }
    $(".timer").css("width",`${time_now}%`);
    $(".timer-container h3").eq(0).text(time);
    console.log("waktu tinggal : " + time);
}

async function time_countdown() {
    if(isTimeRunning) return;
    isTimeRunning = true;
    while(time >= 0){
        Time_count(time);
        await new Promise(resolve => setTimeout(resolve, 1000));
        time--;
    }

    isTimeRunning = false;
    console.log("Waktu Habis");
    music.pause();
    alert("Waktu Habis");
}


// Audio Function
async function loadAudio(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
}

async function playAudio(url) {
    const buffer = await loadAudio(url);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
}

let grid_left = 9;
function Checker(num){
    grid_left--;
    if(grid_left == 0){
        score += 20
        $(".score-container p").eq(0).text(score);
        Random();
        var rand = Array_paten[Math.floor(Math.random()*Array_paten.length)];
        $(".score-container p").eq(1).text(rand);
        num_now = rand;
        grid_left = 9;
        return;
    }
    if(num > 9){
        num_now = 1;
    } else {
        num_now = num;
    }
    return;
}

$(".grid").on("click", function() {
    let num = $(this).text();
    if(!game_condition){return ;}
    if(num == num_now){
        $(this).css("animation","pulse-right 1s linear");
        setTimeout(() => {
            $(this).css("animation","pulse 1s linear");
        }, 1000)
        $(this).text("");
        score += 10;
        $(".score-container p").eq(0).text(score);
        // Timer Settings
        if(time < 30){
            time++;
        }
        Time_count(time);
        if(!isTimeRunning){
            time_countdown();
        }
        // Sound Settings
        playAudio("./Asset/Sound/ding-sound-effect_1.mp3");
        // Change arrow settings
        Checker(num_now+1);
    } else {
        $(this).css("animation", "pulse-false 1s linear");
        setTimeout(() => {
            $(this).css("animation","pulse 1s linear");
        }, 1000)
        playAudio("./Asset/Sound/false-sound.mp3");
    }
})


// aside right function
let spin = 0;
$("#social-btn").on("click", function () {
    let pos = (spin == 0) ? 0:120;
    if(spin == 0){
        $("#social-btn").css("animation","roll-up 1s linear")
        console.log("roll-up");
        let id = null;
        clearInterval(id);
        id = setInterval(show, 5);
        function show(){
            if(pos == 120){
                clearInterval(id);
            } else {
                pos+=4;
                $(".social-container a").eq(0).css("top",`-${pos}px`);
                $(".social-container a").eq(1).css("top",`-${pos}px`);
                $(".social-container a").eq(2).css("top",`-${pos/2}px`);
                $(".social-container a").eq(3).css("top",`-${pos/2}px`);
                $(".social-container a").eq(0).css("left",`${pos/4}px`);
                $(".social-container a").eq(1).css("left",`-${pos/4}px`);
                $(".social-container a").eq(2).css("left",`${pos/4}px`);
                $(".social-container a").eq(3).css("left",`-${pos/4}px`);
            }
        }
        spin = 1;
    } else {
        $("#social-btn").css("animation","roll-down 1s linear");
        let id = null;
        clearInterval(id);
        id = setInterval(show, 5);
        function show(){
            if(pos == 0){
                clearInterval(id);
            } else {
                pos-=4;
                $(".social-container a").eq(0).css("top",`-${pos}px`);
                $(".social-container a").eq(1).css("top",`-${pos}px`);
                $(".social-container a").eq(2).css("top",`-${pos/2}px`);
                $(".social-container a").eq(3).css("top",`-${pos/2}px`);
                $(".social-container a").eq(0).css("left",`${pos/4}px`);
                $(".social-container a").eq(1).css("left",`-${pos/4}px`);
                $(".social-container a").eq(2).css("left",`${pos/4}px`);
                $(".social-container a").eq(3).css("left",`-${pos/4}px`);
            }
        }
        console.log("roll-down");
        spin = 0;
    }
})