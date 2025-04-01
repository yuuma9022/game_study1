"use strict";　//　jsにはstrict（厳格）モードが存在し、厳格モードでは、細かなミスしたくないとき等に有用。
//ルールが多く、逆に非strictモードでは、宣言されていない変数への代入等の処理を自動的にやってくれる処理などが存在するが、
自動的な補助機能を使えなくすると考えてよい。よりプログラム作成者に責任が増すモード。

const FONT = "48px monospace";  // 作成し、中身は表示したい文字の形と大きさを書き込み 


let gFrame = 0; //fps用カウンターを作成
let gImgMap;  // 画像挿入用変数を作成
//let turn = 0; これは文字を左右に動かすための実験用変数

// 時間経過に伴うイベントを作成
function WmTimer(){


	//以下は　文字を左右の方向に動かして表示させるための処理
	//追加アレンジで、右端に文字が生き終わった場合、左端から再スタートするよう設定
 	// if(gFrame / 10 > 300){
	//	turn = 1;
	//}else if(gFrame / 10 == 0){
	//	turn = 0;
	//}
	//turnの値によって表示タイマーの値を変動させる
	//turn == 0 ? gFrame++ : gFrame--;

	gFrame++;

	const ca = document.getElementById("main") // mainという名前の要素を取得し、変数に代入
	const g = ca.getContext("2d");

	// キャンバス全体の表示する背景画像貼り付け処理x,y座標用の内容　
	for(let y = 0; y < 16; y++){
		for(let x = 0; x < 16; x++){
			//x=32px, y=32pxで対象の画像左上頂点から切り取り、はりつけていく処理
			g.drawImage( gImgMap, x * 32, y * 32);
		}
	}
	//一応、正方形になるように処理はしてあるが、ブラウザに表示される画像は、HTMLのcanvasデフォルト設定値である	幅300px、高さ150pxになっている。

	g.font = FONT;
	// mainに記載されている表示する文字と表示位置を設定(表示文字,x,y)	
	//これによってコマ送りに1秒間３０枚の画像が連続的に映し出され、文字が横移動しているように見える。

	//表示文字が右端に到達した場合、左端から文字が再表示されるようにする処理
	if(gFrame / 10 > 300){
		gFrame = -3820;
	}

	// 表示する文字内容と位置の設定
	g.fillText("HEllo World" + gFrame, gFrame / 10,64);
}


// このファイルが読み込まれた時点で必ず実行するイベント
window.onload = function(){
			gImgMap = new Image();  // クリック可能な表示領域の変数作成
			gImgMap.src = "img/map.png";　//作成した変数に、同階層（フォルダ）上にあるimg問ファイルの中のmap.pngを代入する
			setInterval(function(){WmTimer()},2);
//33ms(minisecond)感覚でWmTimer()のイベントを実行するよう設定(約30.3fps(frame per second))
}
					

// 20240316 可能であれば、本来なら正方形が表示されるはずが長方形になっているので、ブラウザ上におけるy軸の位置調整が必須
//次までにやっておくこと