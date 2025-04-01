"use strict";


var TUG = TUG || {}


TUG.mCurrentFrame = 0;


TUG.onTimer = function(){}


TUG.init = function(){
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
    TUG.mCurrentFrame++;
    TUG.onTimer();
    requestAnimationFrame( TUG.wmTimer );
}