"use strict";

const CHRHEIGHT = 9;
const CHRWIDTH = 8;
const FONT = "12px monospace";
const FONTSTYLE = "#ffffff";//（白)
const HEIGHT = 120;
const WIDTH = 128;
const MAP_HEIGHT = 32;
const MAP_WIDTH = 32;
//背景画像のキャンバス上位置調整用変数を作成
const SCR_WIDTH = 8;
const SCR_HEIGHT = 8;
//ひとまず魔王城前スタート(x,yそれぞれ-1して調整済み)
const START_X = 15;
const START_Y = 17;
const SMOOTH = 0;
const TILECOLUMN = 4;
const TILEROW = 4;
const TILESIZE =8;
const WNDSTYLE = "rgba( 0, 0, 0, 0.75 )";

let gScreen;
let gFrame = 0;
let gHeight;
let gWidth;
let gImgMap;
let gImgPlayer;
//わかりやすくするために、定数による計算個所で変数作成（スタートポジションを背景サイズ何個分かで計算）
let gPlayerX = START_X * TILESIZE;
let gPlayerY = START_Y * TILESIZE;

const gFileMap = "img/map.png";
const gFiePlayer = "img/player.png";

//マップを作成
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


//描写メイン（詳細）メソッド
function DrawMain(){
    const g = gScreen.getContext("2d");

    
    let mx = Math.floor( gPlayerX / TILESIZE);
    let my = Math.floor( gPlayerY / TILESIZE);

    //背景初期位置貼り付け用ループ算術の内容変更(2024330 すごくわかりずらく、必要のない計算が何回か出ているので、あとで自分で計算する)
    for(let dy = -SCR_HEIGHT ; dy <= SCR_HEIGHT; dy++){
        //yについての計算方法が変更
        let ty = my + dy;
        let py = ( ty + MAP_HEIGHT ) % MAP_HEIGHT;
        for(let dx = -SCR_WIDTH ;dx <= SCR_WIDTH; dx++){
            //ｘについての計算方法が変更
            let tx = mx + dx;
            let px = ( tx + MAP_WIDTH ) % MAP_WIDTH;
            DrawTile( g,
                //魔王前+dxのx座標-魔王城前X座標で左上端から順に算出している
                tx * TILESIZE + WIDTH / 2 - gPlayerX,
                ty * TILESIZE + HEIGHT / 2 - gPlayerY,
                //自作マップがどの番号を示すかを取得（計算がややこし）
                gMap[ py * MAP_WIDTH + px ]);
        }
    }

    g.fillStyle = "#ff0000";
    g.fillRect(0, HEIGHT / 2 - 1, WIDTH, 2);
    g.fillRect(WIDTH / 2 - 1, 0, 2, HEIGHT);

    g.drawImage( gImgPlayer, CHRWIDTH, 0, CHRWIDTH, CHRHEIGHT,
                 WIDTH / 2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT);

    g.fillStyle = WNDSTYLE;
    g.fillRect( 20 , 103, 105, 15 );

    g.font = FONT;
    g.fillStyle = FONTSTYLE;
    g.fillText( "x=" + gPlayerX + " y=" + gPlayerY + " m=" + gMap[ my * MAP_WIDTH + mx], 25, 115 );
}


//背景画像描写メソッド
function DrawTile( g, x, y, idx){
    //（背景用画像のタイルナンバー/4列)*8ドット分
    const ix = ( idx % TILECOLUMN ) * TILESIZE;//背景画像切り取りスタートx座標位置計算
    const iy = Math.floor( idx / TILECOLUMN ) * TILESIZE;//背景画像切り取りスタートy座標位置計算
    g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE);
} 


//画像ロード用メソッド
function LoadImage(){
    gImgMap = new Image();
    gImgMap.src = gFileMap;
    gImgPlayer = new Image();
    gImgPlayer.src = gFiePlayer;
}


//描写メソッド
function WmPaint(){
    DrawMain();

    const ca = document.getElementById("main");
    const g  = ca.getContext("2d");

    g.drawImage(gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0, gWidth, gHeight);
}


//ウィンドウサイズ調整メソッド
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


//タイマー（FPS用）メソッド
function WmTimer(){
    gFrame++;
    WmPaint();
}


//キーボード操作メソッド
window.onkeydown = function(ev){
    let c = ev.keyCode;
    if(c == 37) gPlayerX--;
    if(c == 38) gPlayerY--;
    if(c == 39) gPlayerX++;
    if(c == 40) gPlayerY++;
    
    gPlayerX += ( MAP_WIDTH * TILESIZE );
    gPlayerX %= ( MAP_WIDTH * TILESIZE );
    gPlayerY += ( MAP_HEIGHT * TILESIZE );
    gPlayerY %= ( MAP_HEIGHT * TILESIZE );
}


//初期起動メソッド
window.onload = function(){

                    LoadImage();

                    gScreen = document.createElement("canvas");
                    gScreen.width = WIDTH;
                    gScreen.height = HEIGHT;

                    WmSize();
                    window.addEventListener("resize", function(){WmSize
                    ()});
                    setInterval(function(){WmTimer()}, 33);
                }

                //以前、どこまで解釈できているか、メモを見ても理解できなかったので、一応動画見ながら再解釈を進める。