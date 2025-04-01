"use strict";//strict(厳格)モードを使用


//文字フォント用の変数を作成（cssの設定）
const FONT = "48px monospace";
//高さ変数の作成
const HEIGHT = 120;
//横幅変数の作成
const WIDTH = 128;

//仮想画面用変数
let gScreen;
//fps計算用の画面変数
let gFrame = 0;
//表示させる画面用の変数
let gImgMap;

//以下、背景画像と文字表示設定用のメソッド（イベント）
function DrawMain(){
	//html上にjavascriptで図を2D描写（"webgl"にすると、3D描写になる）
	const g = gScreen.getContext("2d");

	// 以下、キャンバス上に張り付ける画像の設定
	for(let y = 0; y < 32; y++){
		for(let x= 0; x < 64; x++){
			g.drawImage(gImgMap, x*32,y*32);
		}
	}

	//文字の大きさとデザイン設定
	g.font = FONT;
	//表示させる文字の内容とx,y座標の表示位置設定
	g.fillText("Hello world" + gFrame, gFrame / 10 , 64);
}


function WmPaint(){
	//DrawMainの実行
	DrawMain();
	
	//mainという名前のキャンバス要素を変数に代入して作成
	const ca = document.getElementById("main");
	const g = ca.getContext("2d");

	g.drawImage(gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0, ca.width, ca.height);
}


function WmSize(){
	//mainという名前の要素を取得し代入した変数を作成
	const ca = document.getElementById("main");
	//キャンバスの横幅を、ウィンドウ画面表示の横幅と同じ値に設定
	ca.width = window.innerWidth;
	//キャンバスの高さを、ウィンドウ画面表示の高さと同じ値に設定
	ca.height = window.innerHeight;
}


//fps設定値到達時に実行されるイメソッド
function WmTimer(){
	//fps計算用変数の+1
	gFrame++;
	//WmPainメソッドの実行
	WmPaint();
}


//以下、このファイルが読み込まれた時点で実行するイベント
window.onload = function(){
	gImgMap = new Image();
	//キャンバスに張り付ける内容の準備として、画像を入れられるように変数を変更
	gImgMap.src = "img/map.png";
	//同じフォルダのimgファイルの中にあるmap.pngファイルを読み込んで変数に代入
	gScreen = document.createElement("canvas");
	gScreen.width = WIDTH;
	gScreen.height = HEIGHT;
	//Wmsizeイベントの実行
	WmSize();
	//ブラウザ画面の大きさを変更した際は、毎回WmSizeイベントを実行するように設定
	window.addEventListener("resize", function(){WmSize()});
	//文字表示設定速度は約30fpsに設定
	setInterval( function(){WmTimer()}, 33);
}

// jsでは、下記のエラーがよく出ているので、自分が見落としやすいポイントの一つとして理解しておく
//  Uncaught SyntaxError: Invalid or unexpected token 
// Uncaught Syntax Error = 文法に誤りがある
// Unexpected token = 予期しない記号
// ほとんどは文保形式が間違っている場合に表示されるとのこと

//2024/03/17　一応プログラムは組んだが、コメントの作用？スペースの問題？記号の間違いのどれかによって実行不可能になっているため、後日修正実行予定。
//→修正完了