"use strict";

const CHRHEIGHT = 9;
const CHRWIDTH = 8;
const FONT = "12px monospace";
const FONTSTYLE = "#ffffff";//（白)
const HEIGHT = 120;
const WIDTH = 128;
//fps約30に設定用の変数を作成
const INTERVAL = 33;
const MAP_HEIGHT = 32;
const MAP_WIDTH = 32;
const SCR_WIDTH = 8;
const SCR_HEIGHT = 8;
const START_X = 15;
const START_Y = 17;
//スクロール？？変数の作成
const SCROLL = 4;
const SMOOTH = 0;
const TILECOLUMN = 4;
const TILEROW = 4;
const TILESIZE =8;
const WNDSTYLE = "rgba( 0, 0, 0, 0.75 )";

const gKey = new Uint8Array( 0x100 );

let gScreen;
let gFrame = 0;
let gAngle = 0;
let gHeight;
let gWidth;
let gMoveX = 0;
let gMoveY = 0;
//表示メッセージ用変数を作成
let gMessage = null;
let gImgMap;
let gImgPlayer;
let gPlayerX = START_X * TILESIZE + TILESIZE / 2;
let gPlayerY = START_Y * TILESIZE + TILESIZE / 2;

const gFileMap = "img/map.png";
const gFiePlayer = "img/player.png";


const gMap = [
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 3, 6, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 3, 3, 6, 6, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 6, 3, 0, 0, 0, 3, 3, 0, 6, 6, 6, 0, 0, 0,
0, 0, 3, 3, 6, 6, 6, 7, 7, 2, 2, 2, 7, 7, 2, 2, 2, 7, 7, 6, 3, 3, 3, 6, 6, 3, 6,13, 6, 0, 0, 0,
0, 3, 3,10,11, 3, 3, 6, 7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 7, 6, 6, 6, 6, 6, 3, 0, 6, 6, 6, 0, 0, 0,
0, 0, 3, 3, 3, 0, 3, 3, 3, 7, 7, 2, 2, 2, 2, 7, 7, 1, 1, 6, 6, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 7, 7, 7, 7, 2, 7, 6, 3, 1, 3, 6, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 7, 2, 7, 6, 3, 1, 3, 3, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 0, 3, 3, 3, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 3,12, 3, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 7, 7, 6, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 6, 6, 6, 6, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 3, 3, 3, 6, 6, 6, 3, 3, 3, 1, 1, 1, 1, 1, 3, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 8, 9, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 1, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,
7,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0,
7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7,
];


function DrawMain(){
    const g = gScreen.getContext("2d");

    let mx = Math.floor( gPlayerX / TILESIZE);
    let my = Math.floor( gPlayerY / TILESIZE);

    for(let dy = -SCR_HEIGHT ; dy <= SCR_HEIGHT; dy++){
        let ty = my + dy;
        let py = ( ty + MAP_HEIGHT ) % MAP_HEIGHT;
        for(let dx = -SCR_WIDTH ;dx <= SCR_WIDTH; dx++){
            let tx = mx + dx;
            let px = ( tx + MAP_WIDTH ) % MAP_WIDTH;
            DrawTile( g,
                tx * TILESIZE + WIDTH / 2 - gPlayerX,
                ty * TILESIZE + HEIGHT / 2 - gPlayerY,
                gMap[ py * MAP_WIDTH + px ]);
        }
    }

    g.drawImage( gImgPlayer,
        ( gFrame >> 4 & 1 ) * CHRWIDTH, gAngle * CHRHEIGHT, CHRWIDTH, CHRHEIGHT,
        WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT);

    //メッセージ描画メソッドの実行
    DrawMassage( g );
    
    g.fillStyle = WNDSTYLE;
    g.fillRect( 20 , 103, 105, 15 );

    g.font = FONT;
    g.fillStyle = FONTSTYLE;
    g.fillText( "x=" + gPlayerX + " y=" + gPlayerY + " m=" + gMap[ my * MAP_WIDTH + mx], 25, 115 );
}


//メッセージ描画メソッド
function DrawMassage( g ){
    //メッセージ用バック画面のcss設定
    g.fillStyle = WNDSTYLE;
    //メッセージ描写用ボックスを指定の箇所に設置
    g.fillRect( 4, 84, 120, 30);

    //描写文字のcss設定
    g.font = FONT;
    g.fillStyle = FONTSTYLE;

    //メッセージを指定の箇所に描写
    g.fillText( gMessage, 6, 96 );
}



function DrawTile( g, x, y, idx){
    const ix = ( idx % TILECOLUMN ) * TILESIZE;
    const iy = Math.floor( idx / TILECOLUMN ) * TILESIZE;
    g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE);
} 


function LoadImage(){
    gImgMap = new Image();
    gImgMap.src = gFileMap;
    gImgPlayer = new Image();
    gImgPlayer.src = gFiePlayer;
}

// IE対応用メソッド
function Sign( val ){

    return val == 0 ? 0 : val <  0 ? -1 : 1;
    // if( val == 0 ){
    //     return( 0 );
    // }else if( val < 0 ){
    //     return( -1 );
    // }else{
    //     return( 1 );
    // }
}


function TickField(){

    if( gMoveX != 0 || gMoveY != 0){
    }else if( gKey [ 37 ] ){
        gMoveX = -TILESIZE;
        gAngle = 1;
    }else if( gKey [ 38 ] ){
        gMoveY = -TILESIZE;
        gAngle = 3;
    }else if( gKey [ 39 ] ){
        gMoveX = TILESIZE;
        gAngle = 2;
    }else if( gKey [ 40 ] ){
        gMoveY = TILESIZE;
        gAngle = 0;
    };

   
    let mx = Math.floor( ( gPlayerX + gMoveX ) / TILESIZE );
    let my = Math.floor( ( gPlayerY + gMoveY ) / TILESIZE );
    mx += MAP_WIDTH;
    mx %= MAP_WIDTH;
    my += MAP_HEIGHT;
    my %= MAP_HEIGHT;
    let m = gMap[ my * MAP_WIDTH + mx ];

     if( m < 3 ){
        gMoveX = 0;
        gMoveY = 0;
     }

     if( m == 8 || m == 9){
        gMessage = "魔王を倒してください";
     }

     if( m == 10 || m == 11){
        gMessage = "西の果てにも村があります";
     }


     //歩く速度を早くするよう調整
    gPlayerX += Sign( gMoveX ) * SCROLL;
    gPlayerY += Sign( gMoveY ) * SCROLL;
    gMoveX -= Sign( gMoveX ) * SCROLL;
    gMoveY -= Sign( gMoveY ) * SCROLL;


    gPlayerX += ( MAP_WIDTH * TILESIZE );
    gPlayerX %= ( MAP_WIDTH * TILESIZE );
    gPlayerY += ( MAP_HEIGHT * TILESIZE );
    gPlayerY %= ( MAP_HEIGHT * TILESIZE );


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

    g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH;

    gWidth = ca.width;
    gHeight = ca.height;

    if(gWidth / WIDTH < gHeight / HEIGHT){
        gHeight = gWidth * WIDTH / HEIGHT;
    }else{
        gWidth = gHeight * WIDTH / HEIGHT;
    }
}



function WmTimer(){
    gFrame++;
    TickField();
    WmPaint();
}


window.onkeydown = function(ev){
    let c = ev.keyCode;
    gKey[ c ] = 1;
}


window.onkeyup = function(ev){
    gKey[ ev.keyCode ] = 0;
}


window.onload = function(){

                    LoadImage();

                    gScreen = document.createElement("canvas");
                    gScreen.width = WIDTH;
                    gScreen.height = HEIGHT;

                    WmSize();
                    window.addEventListener("resize", function(){WmSize
                    ()});
                    setInterval(function(){WmTimer()}, INTERVAL);
                }