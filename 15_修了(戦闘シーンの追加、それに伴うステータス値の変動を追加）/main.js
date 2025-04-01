"use strict";

const CHRHEIGHT = 9;
const CHRWIDTH = 8;
const FONT = "12px monospace";
const FONTSTYLE = "#ffffff";//（白)
const HEIGHT = 120;
const WIDTH = 128;
const INTERVAL = 33;
const MAP_HEIGHT = 32;
const MAP_WIDTH = 32;
const SCR_WIDTH = 8;
const SCR_HEIGHT = 8;
const START_X = 15;
const START_Y = 17;
//スタート時のHP、MHP
const START_HP = 20;
const SCROLL = 1;
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
let gEx = 0;
let gHP = START_HP;
let gMHP = START_HP;
let gLv = 1;
let gMessage1 = null;
let gMessage2 = null;
let gImgMap;
let gImgPlayer;
let gImgMonster;
//アイテム要素変数の作成
let gItem = 0;
//戦闘フェーズ用変数作成
let gPhase = 0;
let gPlayerX = START_X * TILESIZE + TILESIZE / 2;
let gPlayerY = START_Y * TILESIZE + TILESIZE / 2;

const gFileMap = "img/map.png";
const gFiePlayer = "img/player.png";
//敵キャラクター画像のソース追加
const gFileMonster = "img/monster.png";

//敵遭遇用変数配列の作成
const gEncounter = [ 0, 0, 0, 1, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0 ];


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


//戦闘画面描写メソッド
function DrawFight( g ){
    //背景黒？
    g.fillStyle = "#000000";
    //背景画面の設置
    g.fillRect( 0, 0, WIDTH,HEIGHT );

    //敵の描写
    g.drawImage( gImgMonster, WIDTH / 2, HEIGHT / 2);
}


//マップ描写用メソッド
function DrawMap( g )
{
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

}


function DrawMain(){
    const g = gScreen.getContext("2d");

    //戦闘シーンかどうか判断して、描写する画面を選択
    if( gPhase == 0 ){
        DrawMap( g );
    }else{
        DrawFight( g );
    }

    g.fillStyle = WNDSTYLE;
    g.fillRect( 2, 2, 44, 37 );


    DrawStatus( g );
    DrawMassage( g );
    
    // g.fillStyle = WNDSTYLE;
    // g.fillRect( 20 , 103, 105, 15 );

    // g.font = FONT;
    // g.fillStyle = FONTSTYLE;
    // g.fillText( "x=" + gPlayerX + " y=" + gPlayerY + " m=" + gMap[ my * MAP_WIDTH + mx], 25, 115 );
}


//メッセージ描画メソッド
function DrawMassage( g ){

    if( !gMessage1 ){
        return;
    }

    g.fillStyle = WNDSTYLE;
    g.fillRect( 4, 84, 120, 30);


    g.font = FONT;
    g.fillStyle = FONTSTYLE;
    g.fillText( gMessage1, 6, 96 );

    if( gMessage2 ){
        g.fillText( gMessage2, 6, 110 );
    }
}

//ステータス値描写メソッド
function DrawStatus( g ){
    g.font = FONT;
    g.fillStyle = FONTSTYLE;
    g.fillText( "Lv" + gLv, 4, 13);
    g.fillText( "HP" + gHP, 4, 25);
    g.fillText( "Ex" + gEx, 4, 37);
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
    //敵モンスター画像の取得
    gImgMonster = new Image();
    gImgMonster.src = gFileMonster;
}

//メッセージ設定用メソッド
function SetMessage( v1, v2 ){
    gMessage1 = v1;
    gMessage2 = v2;
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

     //マス移動を行った際に発動
     if( Math.abs( gMoveX ) + Math.abs( gMoveY ) == SCROLL ){
     
        //魔王城
        if( m == 8 || m == 9 ){
            SetMessage("魔王を倒してください",null);
        }

        //村
        if( m == 10 || m == 11 ){
            SetMessage("西の果てにも","村があります");
        }

        //家
        if( m == 12 ){
            SetMessage("カギは、","洞窟にあります");
        }

        //洞窟
        if( m == 13 ){
            SetMessage("カギを手に入れた",null);
        }

        //扉
        if( m == 14){
            //1マス上へ移動させる
            gPlayerY -= TILESIZE;
            SetMessage("カギが必要です",null );
            // SetMessage = "扉が開いた",null;
        }

        //魔王
        if( m == 15){
            SetMessage("魔王を倒し","世界に平和が訪れた");
        }

        //タイルの種類によって遭遇のしやすさを変更したランダム遭遇用文字表示
        if( Math.random() * 4 < gEncounter[ m ] ){
            //表示画面を戦闘画面に移行
            gPhase = 1;
            SetMessage("敵が現れた！",null);
        }
    }


    //歩く速度の調整
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

    if( gKey[ c ] != 0 ){
        return;
    }
    gKey[ c ] = 1;

    //戦闘シーン経由によるステータス値の調整
    if( gPhase == 1 ){
        gPhase = 0;
        gHP -= 5;
        gEx ++;
    }

    gMessage1 = null;
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