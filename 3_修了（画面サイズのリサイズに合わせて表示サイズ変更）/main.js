"use strict";

const FONT = "48px monospace";
const HEIGHT = 120;
const WIDTH = 128;
const SMOOTH = 0;

let gScreen;
let gFrame = 0;
let gHeight;
let gWidth;
let gImgMap;

function DrawMain(){
    const g = gScreen.getContext("2d");

    for(let y = 0 ;y < 32; y++){
        for(let x = 0 ;x < 64; x++){
            g.drawImage(gImgMap, x*32, y*32);
        }
    }

    g.font = FONT;
    g.fillText("Hello world" + gFrame, gFrame /10, 64);

}



function WmPaint(){
    DrawMain();

    const ca = document.getElementById("main");
    const g  = ca.getContext("2d");

    g.drawImage(gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0, gWidth, gHeight);
}


function WmSize(){
    const ca = document.getElementById("main");
    ca.width = window.innerWidth;
    ca.height = window.innerHeight;
    const g  = ca.getContext("2d");

    //ドット画像の拡大を調整し、ピンボケを防止
    g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH;

    gWidth = ca.width;
    gHeight = ca.height;

    //ゲーム画面サイズよりも元の設定サイズより小さくなった場合の縮小調整処理
    if(gWidth / WIDTH < gHeight / HEIGHT){
        gHeight = gWidth * WIDTH / HEIGHT;
    }else{
        gWidth = gHeight * WIDTH / HEIGHT;
    }
}



function WmTimer(){
    gFrame++;
    WmPaint();
}

window.onload = function(){
                    gImgMap = new Image();
                    gImgMap.src = "img/map.png";

                    gScreen = document.createElement("canvas");
                    gScreen.width = WIDTH;
                    gScreen.height = HEIGHT;

                    WmSize();
                    window.addEventListener("resize", function(){WmSize
                    ()});
                    setInterval(function(){WmTimer()}, 33);
                }