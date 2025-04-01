"use strict";


var TUG = TUG || {};
TUG.GR = {};


TUG.mCurrentFrame = 0;
//内部タイマー調整用FPS設定値を作成
TUG.mFPS = 60;
//縦幅定数値を作成
TUG.mHeight = 120;
//横幅定数値を作成
TUG.mWidth = 128;



TUG.onTimer = function(){}


TUG.init = function(){
    //表示用キャンバス基本設定
    TUG.GR.mCanvas = document.createElement( "canvas" );
    TUG.GR.mCanvas.width = TUG.mWidth;
    TUG.GR.mCanvas.height = TUG.mHeight
    TUG.GR.mG = TUG.GR.mCanvas.getContext( "2d" );
    requestAnimationFrame( TUG.wmTimer );
}


TUG.Sign = function( val ){
    if( val == 0 ){
        return( 0 );
    }
    if(val < 0 ){
        return( -1 );
    }
    return( 1 );
}


TUG.wmTimer = function(){
    //スタート設定値に何も入っていない場合
    if( !TUG.mCurrentStart ){
        TUG.mCurrentStart = performance.now();
    }

    //ゲーム用現FPSの計算
    let d = Math.floor(( performance.now() - TUG.mCurrentStart ) * TUG.mFPS / 1000 ) - TUG.mCurrentFrame;
    //計算値がかなり遅い場合
    if( d > 0 ){
        TUG.onTimer(d);
        TUG.mCurrentFrame += d;
    }
    requestAnimationFrame( TUG.wmTimer );
}