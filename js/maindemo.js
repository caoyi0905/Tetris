var canvas,ctxt;
var grid=new Array(20);//每个格子是否有方块
var Tetris=new Array();//每种类型的俄罗斯方块
var curTetris,nxtTetris;//当前的俄罗斯方块
var squareWidth;
var fps=500;
var gameover=0;
const colorType=["grey","grey","rgb(26,104,143)","rgb(212,88,78)","rgb(246,204,61)","rgb(134,196,116)","rgb(134,196,116)"];
const color=[0,1,2,3,4,5,6,0,0,0,1,1,1,3,4,4,4,5,6];
const trans=[7,10,2,13,14,17,18,8,9,0,11,12,1,3,15,16,4,5,6];
window.onload=function(){
	canvas=document.getElementById("canvas");
	ctxt=canvas.getContext('2d');
	canvas.width=400;
	canvas.height=500;
	squareWidth=canvas.height/20;
	init();
	window.addEventListener("keydown",function(e){
		if(gameover) return ;
		var keyID=e.which||e.keyCode;
		if(keyID==65||keyID==37){//zuo
			if(curTetris.y>0&&!isover(curTetris,0,1))
				curTetris.y--;
		}
		else if(keyID==68||keyID==39){//you
			if(!isover(curTetris,0,-1))
				curTetris.y++;
		}
		else if(keyID==32||keyID==87||keyID==38){//shang
			curTetris.type=trans[curTetris.type];
			while(curTetris.y+Tetris[curTetris.type].width>=10) curTetris.y--;
		}
		else if(keyID==83||keyID==40){//xia
			change();
			judge();
		}
		Draw();
	},false);
	donghua();
}
function init(){
	for(var i=0;i<20;i++){
		grid[i]=new Array(10);
		for(var j=0;j<10;j++){
			grid[i][j]={
				isGrid	:	0,
				type	:	0,
			}
		}
	}
	initTetrisType();
	curTetris=createTetris();
	nxtTetris=createTetris();
}
function initTetrisType(){
	Tetris.push({				//0
		x		:	[0,1,1,1],
		y		:	[0,0,1,2],
		width	:	2
	})
	Tetris.push({				//1
		x		:	[1,1,1,0],
		y		:	[0,1,2,2],
		width	:	2
	})
	Tetris.push({				//2
		x		:	[0,1,1,0],
		y		:	[0,0,1,1],
		width	:	1
	})
	Tetris.push({				//3
		x		:	[0,1,2,3],
		y		:	[0,0,0,0],
		width	:	0
	})
	Tetris.push({				//4
		x		:	[1,1,0,1],
		y		:	[0,1,1,2],
		width	:	2
	})
	Tetris.push({				//5
		x		:	[0,0,1,1],
		y		:	[0,1,1,2],
		width	:	2
	})
	Tetris.push({				//6
		x		:	[1,0,1,0],
		y		:	[0,1,1,2],
		width	:	2
	})
	Tetris.push({				//7
		x		:	[0,0,1,2],
		y		:	[0,1,0,0],
		width	:	1
	})
	Tetris.push({				//8
		x		:	[0,0,0,1],
		y		:	[0,1,2,2],
		width	:	2
	})
	Tetris.push({				//9
		x		:	[0,1,2,2],
		y		:	[1,1,0,1],
		width	:	1
	})
	Tetris.push({				//10
		x		:	[0,1,2,2],
		y		:	[0,0,0,1],
		width	:	1
	})
	Tetris.push({				//11
		x		:	[0,0,0,1],
		y		:	[0,1,2,0],
		width	:	2
	})
	Tetris.push({				//12
		x		:	[0,0,1,2],
		y		:	[0,1,1,1],
		width	:	1
	})
	Tetris.push({				//13
		x		:	[0,0,0,0],
		y		:	[0,1,2,3],
		width	:	3
	})
	Tetris.push({				//14
		x		:	[0,1,1,2],
		y		:	[0,0,1,0],
		width	:	1
	})
	Tetris.push({				//15
		x		:	[0,0,0,1],
		y		:	[0,1,2,1],
		width	:	2
	})
	Tetris.push({				//16
		x		:	[0,1,1,2],
		y		:	[1,0,1,1],
		width	:	1
	})
	Tetris.push({				//17
		x		:	[0,1,1,2],
		y		:	[1,0,1,0],
		width	:	1
	})
	Tetris.push({				//18
		x		:	[0,1,1,2],
		y		:	[0,0,1,1],
		width	:	1
	})
}
function donghua(){
	change();
	judge();
	Draw();
	if(gameover) return ;
	setTimeout("donghua();",fps);
}
var tt=0;
function isover(curTetris,xx,yy){
	for(var i=0;i<4;i++){
		var x=curTetris.x+Tetris[curTetris.type].x[i]-xx;
		var y=curTetris.y+Tetris[curTetris.type].y[i]-yy;
		if(y<0||y>=10) return 1;
		if(x<0) continue;
		if(grid[x][y].isGrid) return 1;
	}
	return 0;
}
function createTetris(){
	var newType=Math.ceil(Math.random()*7);
	return {
		type	:	newType,
		x		:	-1,
		y		:	Math.floor((10-Tetris[newType].width)/2),
	}
}
function jishu(){
	var ans=0;
	for(var k=0;k<20;k++){
			for(var j=0;j<10;j++){
				if(grid[k][j].isGrid) ans++;
			}
	}
	return ans;
}
function change(){
	var flag=isBottom(curTetris.x+1,curTetris.y,curTetris.type);
	if(flag==1){
		console.log("qian"+jishu())
		for(var i=0;i<4;i++){
			var x=curTetris.x+Tetris[curTetris.type].x[i];
			var y=curTetris.y+Tetris[curTetris.type].y[i];
			console.log("zhong1  "+jishu())
			console.log(x,y)
			grid[x][y]={
				isGrid	:	1,
				type	:	curTetris.type,
			}
			
			console.log("zhong2  "+jishu()+'\n')
		
		}
		console.log("hou"+jishu())
		curTetris=nxtTetris;
		nxtTetris=createTetris();
		if(isover(curTetris,0,0)){
			if(gameover==0){
				//alert(1)
				for(var i=0;i<20;i++)
					for(var j=0;j<10;j++)
						grid[i][j].isGrid=0;
				Draw();
			}
		//	gameover=1;
		}
	}else{
		curTetris.x++;
	}
}
function isBottom(x,y,type){
	var flag=0;
	for(var k=0;k<4;k++){
		var i=x+Tetris[type].x[k],j=y+Tetris[type].y[k];
		if(i<0||i>=20||j<0||j>=10||grid[i][j].isGrid){
			flag=1;
			break;
		}
	}
	return flag;
}
function judge(){
	for(var i=0;i<20;i++){
		var flag=1;
		for(var j=0;j<10;j++)
			if(grid[i][j].isGrid==0){
				flag=0;
				break;
			}
		if(flag==1){
			for(var k=i;k>0;k--){
				grid[k]=grid[k-1];
			}
			for(var k=0;k<10;k++){
				grid[0][k]={
					isGrid	:	0,
					type	:	0,
				}
			}
		}
	}
}
function Draw(){
	ctxt.clearRect(0,0,canvas.width,canvas.height);
	ctxt.lineWidth=squareWidth/15;
	//绘制之前方块
	var ss=0;
	for(var i=0;i<20;i++){
		for(var j=0;j<10;j++){
			var x=j*squareWidth,y=i*squareWidth;
			
			if(grid[i][j].isGrid){
				ctxt.fillStyle=colorType[color[grid[i][j].type]];
				ctxt.strokeStyle='white';
				ctxt.fillRect(x,y,squareWidth,squareWidth);
				ctxt.strokeRect(x,y,squareWidth,squareWidth);
				ctxt.closePath();
			}else{
				ctxt.fillStyle=colorType[color[grid[i][j].type]];
				ctxt.strokeStyle='gray';
				ctxt.strokeRect(x,y,squareWidth,squareWidth);
				ctxt.closePath();
			}
			ctxt.beginPath();
			ctxt.strokeStyle='white';
			ctxt.strokeRect(x,y,squareWidth,squareWidth);
			ctxt.closePath();
		}
	}
	//绘制当前方块
	for(var i=0;i<4;i++){
		var x=(curTetris.y+Tetris[curTetris.type].y[i])*squareWidth;
		var y=(curTetris.x+Tetris[curTetris.type].x[i])*squareWidth;
		ctxt.beginPath();
		ctxt.fillStyle=colorType[color[curTetris.type]];
		ctxt.strokeStyle='white';
		ctxt.fillRect(x,y,squareWidth,squareWidth);
		ctxt.strokeRect(x,y,squareWidth,squareWidth);
		ctxt.closePath();
	}
	//绘制下一个方块
	for(var i=0;i<4;i++){
		var x=(12+Tetris[nxtTetris.type].y[i])*squareWidth;
		var y=(1+Tetris[nxtTetris.type].x[i])*squareWidth;
		ctxt.beginPath();
		ctxt.fillStyle=colorType[color[nxtTetris.type]];
		ctxt.strokeStyle='white';
		ctxt.fillRect(x,y,squareWidth,squareWidth);
		ctxt.strokeRect(x,y,squareWidth,squareWidth);
		ctxt.closePath();
	}
	ctxt.beginPath();
	ctxt.strokeStyle='black';
	ctxt.lineWidth=1;
	ctxt.moveTo(10*squareWidth,0);
	ctxt.lineTo(10*squareWidth,canvas.height);
	ctxt.stroke();
	ctxt.closePath();
}
