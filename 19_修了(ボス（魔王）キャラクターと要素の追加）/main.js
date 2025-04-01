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
let gCursor = 0;
let gMessage1 = null;
let gMessage2 = null;
let gEnemyType;
let gImgMap;
let gImgPlayer;
let gImgMonster;
//ボスキャラ用変数作成
let gImgBoss;
let gItem = 0;
let gPhase = 0;
let gPlayerX = START_X * TILESIZE + TILESIZE / 2;
let gPlayerY = START_Y * TILESIZE + TILESIZE / 2;

const gFileMap = "img/map.png";
const gFiePlayer = "img/player.png";
const gFileMonster = "img/monster.png";
//ボスキャラの画像ソース格納用変数作成
const gFileBoss = "img/boss.png";

const gEncounter = [ 0, 0, 0, 1, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0 ];

//敵の名前用配列作成
const gMonsterName = [ "スライム", "うさぎ", "ナイト", "ドラゴン", "魔王" ];


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


//戦闘行動用メソッド
function Action(){
    
    gPhase++;

    //フェーズが戦闘中である場合
    if( gPhase == 3 ){
        SetMessage( "敵のこうげき！", 999 + "のダメージ！" );
        //死亡フェーズへ移行 ？？なぜか消されている
        // gPhase = 7;
        return;
    }

    //戦う選択時
    if( gCursor == 0 ){
        SetMessage( "あなたのこうげき！", 333 + "のダメージ！" );
        //敵キャラ討伐フェーズ～へ移行
        gPhase = 5;
        return;
    }

    //逃げる成功時に実行
    if( Math.random() < 0.5 ){
        SetMessage( "あなたは逃げ出した", null ); 
        gPhase = 6;
        return;
    }

    //逃げる失敗時に実行
    SetMessage( "あなたは逃げ出した", "しかし、回り込まれた！"  );
}


//経験値加算用メソッド
function AddExp( val ){

    gEx += val;
    while( gLv * ( gLv + 1 ) * 2 <= gEx ){
        gLv++;
        gMHP += 4 + Math.floor( Math.random() * 3 );
    }
}

//敵出現メソッド
function AppearEnemy( t ){
    //戦闘画面フェーズへ移行
    gPhase = 1;
    //敵がどのキャラになるかを設定
    gEnemyType = t;
    SetMessage( "敵が現れた！", null);
}


//戦闘コマンドメソッド
function CommandFight(){
    //戦闘コマンド選択フェーズへ移行
    gPhase = 2;
    gCursor = 0;
    SetMessage( "　戦う", "　逃げる" );
}

function DrawFight( g ){

    g.fillStyle = "#000000";
    g.fillRect( 0, 0, WIDTH,HEIGHT );

    //敵が生存しているフェーズの場合
    if( gPhase <= 5 ){
        // ボスの場合実行
        if( IsBoss() ){
            g.drawImage( gImgBoss, WIDTH / 2 - gImgBoss.width / 2, HEIGHT / 2 - gImgBoss.height / 2 );
        }else{//ボス以外
            let w = gImgMonster.width / 4;
            let h = gImgMonster.height;
            g.drawImage( gImgMonster, gEnemyType * w, 0, w, h, Math.floor(WIDTH / 2 - w / 2), Math.floor( HEIGHT / 2 - h / 2 ), w, h);
        }
    }

    DrawStatus( g );
    DrawMessage( g );

    if( gPhase == 2 ){
        g.fillText( "⇒", 6, 96 + 14 * gCursor );
    }
}


//マップ描写用メソッドの名前変更
function DrawField( g )
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

    g.fillStyle = WNDSTYLE;
    g.fillRect( 2, 2, 44, 37 );

    DrawStatus( g );
    DrawMessage( g );
}


function DrawMain(){
    const g = gScreen.getContext("2d");

    if( gPhase == 0 ){
        DrawField( g );
    }else{
        DrawFight( g );
    }
}


//メッセージ描画メソッド
function DrawMessage( g ){

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


//ボスキャラメソッド
function IsBoss(){
    return( gEnemyType == gMonsterName.length - 1 );
}


function LoadImage(){
    gImgMap = new Image();
    gImgMap.src = gFileMap;
    gImgPlayer = new Image();
    gImgPlayer.src = gFiePlayer;
    gImgMonster = new Image();
    gImgMonster.src = gFileMonster;
    //ボスキャラ画像の実装
    gImgBoss = new Image();
    gImgBoss.src = gFileBoss;
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

    //メッセージ1要素がない場合は、マップ上のキャラクター位置を固定
    if( gMoveX != 0 || gMoveY != 0 || gMessage1){
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
            //HP回復処理
            gHP = gMHP;
            SetMessage("魔王を倒してください",null);
        }

        //村
        if( m == 10 || m == 11 ){
            //HP回復処理
            gHP = gMHP;
            SetMessage("西の果てにも","村があります");
        }

        //家
        if( m == 12 ){
            //HP回復処理
            gHP = gMHP;
            SetMessage("カギは、","洞窟にあります");
        }

        //洞窟
        if( m == 13 ){
            //アイテムの追加
            gItem = 1;
            SetMessage("カギを手に入れた",null);
        }

        //扉
        if( m == 14){
            //アイテム未所持時、扉は開かない
            if( gItem == 0 ){
                gPlayerY -= TILESIZE;
                SetMessage("カギが必要です",null );
            }else{
                SetMessage = "扉が開いた",null;
            }
        }

        //魔王(ボス)
        if( m == 15){
            //敵遭遇メソッド実行
            AppearEnemy (gMonsterName.length - 1);
        }

        if( Math.random() * 4 < gEncounter[ m ] ){
            // 敵遭遇メソッド実行
            AppearEnemy ( 0 );
        }
    }


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

    //敵と遭遇時
    if( gPhase == 1 ){
        CommandFight();
        return;
    }

    //戦闘フェーズ（コマンド選択）時
    if( gPhase == 2 ){
        if( c == 13 || c == 90 ){
            Action();
        //エンターキーもしくはzキー以外のキーを押した場合
        }else{
            gCursor = 1 - gCursor;
        }
        return;
    }

    //戦闘フェーズ（戦闘中）時
    if( gPhase == 3 ){
        Action();
        return;
    }

    // 戦闘進行終了フェーズの場合
    if( gPhase == 4 ){
        CommandFight();
        return;
    }

    //敵キャラ討伐時フェーズの場合
    if( gPhase == 5 ){
        gPhase = 6;
        AddExp( gEnemyType + 1 );
        SetMessage( "敵をやっつけた！", null );
        return;
    }

    //討伐完了フェーズの場合
    if( gPhase == 6 ){
        //敵キャラがボスかつ戦うを選択していた場合に実行
        if( IsBoss() && gCursor == 0 ){
            SetMessage( "魔王を倒し", "世界に平和が訪れた" );
            return;
        }
        gPhase = 0;
    }

    //死亡フェーズの場合
    if( gPhase == 7 ){
        gPhase = 8;
        SetMessage( "あなたは死亡した", null );
        return;
    }

    //ゲームオーバーフェーズの場合
    if( gPhase == 8 ){
        SetMessage( "ゲームオーバー", nnull );
        return;
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