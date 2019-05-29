

		////////////////////////////////////////////////////////////////
		//            Dynamic Mathematical Notation Symbols           //
		//                                                            //
		//                          Created By:                       //
		//                    Christopher S. Francis                  //
		//                August 2016 through...                      //
		//                                                            //
		////////////////////////////////////////////////////////////////


		/*
		 * While developing some educational video games for a hobby the problem was
		 * encountered that LaTEX only worked for the first problem, and reloading the 
		 * page everytime seemed as if it would cause problems with tracking the game
		 * statistics and jumps in the animations. So this project was begun, it draws 
		 * the mathematical notation to an HTML canvas element in a way that can readily 
		 * be applied in JavaScript code that generates random math problems on the fly.
		 */

		 
		 
		 

//////////////////////////////////////////////  PARENT OBJECTS  ////////////////////////////////////////////////////////////////


function Symbol(x, y, size, setting, color){
	this.x = x; 												//top-left corner
	this.y = y; 												//top-left corner
	this.size = size; 											// ~roughly corresponds to font size in adjacent text~
	this.setting = setting;										//HTML canvas element to draw to
	this.color = color; 										//color it will be displayed in
	this.u = this.x + this.size; 								//lower-right corner
	this.v = this.y + this.size; 								//lower-right corner
	this.m = (this.v - this.y) / 2; 							//veritical mid-point
	
	this.border = function(){									//put a border around the sybmol(s)
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		sketch.beginPath();
		sketch.moveTo(this.x, this.y);
		sketch.lineTo(this.u, this.y);
		sketch.lineTo(this.u, this.v);
		sketch.lineTo(this.x, this.v);
		sketch.lineTo(this.x, this.y);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
	}//end border()

	this.clear = function(){									//image needs drawn to get size, clears it immediately when used inside another one
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		sketch.beginPath();
		sketch.clearRect(this.x, this.y, this.u - this.x, this.v - this.y);
		sketch.closePath();
	}//end clear()
}//end Symbol






function BinarySymbol(x, y, size, setting, pre, post, color){
	Symbol.call(this, x, y, size, setting, color);
	this.pre = pre;										//symbol on the left
	this.post = post;									//symbol on the right
	
	this.setPlace = function(){
		this.pre.x = this.x;
		this.pre.y = this.y;
		this.pre.size = this.size;
		this.pre.setting = this.setting
		this.pre.color = this.color;
		this.post.y = this.y;
		this.post.size = this.size;
		this.post.setting = this.setting;
		this.post.color = this.color;
	}//end setPlace()
	
	this.setUV = function(){
		this.u = this.post.u;							//override default u value
		if(this.pre.v > this.post.v){					//override default v value
			this.v = this.pre.v;
		}
		else{
			this.v = this.post.v;
		}
	}//end setUV()
	
	this.setM = function(){								//align both parts to a common midpoint
		if(this.pre.m > this.post.m){
			this.m = this.pre.m;
			this.post.y = this.post.y + (this.pre.m - this.post.m);
			this.y1 = this.y + (this.pre.m - this.ver / 2);
			this.pre.clear();
			this.post.clear();
			this.pre.image();
			this.post.image();
		}
		else{
			this.m = this.post.m;
			this.pre.y = this.pre.y + (this.post.m - this.pre.m);
			this.y1 = this.y + (this.post.m - this.ver / 2);
			this.pre.clear();
			this.post.clear();
			this.pre.image();
			this.post.image();
		}
	}//end setM()
	
}//end BinarySymbol








/////////////////////////////////////////////////////  NUMBERS AND VARIABLES  /////////////////////////////////////////////////////

function Term(x, y, size, setting, thing, color){
	Symbol.call(this, x, y, size, setting, color);
	this.thing = thing;											//the value of the number...
	
	this.image = function(){
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		sketch.beginPath();
		sketch.font = this.font1;
		sketch.fillStyle = this.color;
		sketch.fillText(this.thing, this.x, this.y + this.ver);
		sketch.stroke();
		sketch.closePath();
		this.wide = this.thing.length;
		this.u = this.x + this.wide * this.hor;						//override the default u value
		this.v = this.y + this.ver;									//override the default v value
		this.m = (this.v - this.y) / 2;								//override the default m value
	}//end image()
}//end Term








function Fraction(x, y, size, setting, numerator, denominator, color){
	Symbol.call(this, x, y, size, setting, color);
	this.adjustedSize = this.size * 0.6;
	this.numerator = numerator;
	this.denominator = denominator;

	this.setPlace = function(){
		this.numerator.x = this.x;
		this.numerator.y = this.y;
		this.numerator.size = this.adjustedSize;
		this.numerator.setting = this.setting;
		this.numerator.color = this.color;
		this.denominator.x = this.x;
		this.denominator.y = this.y + 1.3 * this.adjustedSize;
		this.denominator.size = this.adjustedSize;
		this.denominator.setting = this.setting;
		this.denominator.color = this.color;
	}//end setPlace()

	this.image = function(){
		this.setPlace();
		this.hor = this.adjustedSize * 0.75;
		this.ver = this.adjustedSize;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.numerator.image();
		this.numerator.clear();
		this.denominator.image();
		this.denominator.clear();
		let nWide = this.numerator.u - this.numerator.x;
		let dWide = this.denominator.u - this.denominator.x;
		this.start = Math.abs(nWide - dWide);
		if(nWide < dWide){												//select furthest left
			this.denominator.x = this.x;
			this.numerator.x = this.x + this.start / 2;
		}
		else if(nWide > dWide){
			this.numerator.x = this.x;
			this.denominator.x = this.x + this.start / 2;
		}
		else{
			this.numerator.x = this.x;
			this.denominator.x = this.x;
		}
		this.numerator.image();
		this.denominator.image();
		if(nWide < dWide){												//detrmine the rightmost side
			this.u = this.denominator.u;
		}
		else{
			this.u = this.numerator.u;
		}
			//Fraction bar
		sketch.beginPath();
		sketch.moveTo(this.x, this.y + this.ver * 1.2);
		sketch.lineTo(this.u, this.y + this.ver * 1.2);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.v = this.y + 2.5 * this.ver;								//override the default u value
		this.u = this.u + this.hor / 2;									//override the default v value
		this.m = (this.v - this.y) / 2 - this.ver / 3;					//alignment looked odd if mid-point was in middle
	}//end image()
}//end Fraction







function Subscript(x, y, size, setting, base, script, color){
	Symbol.call(this, x, y, size, setting, color);
	this.base = base;
	this.script = script;

	this.setPlace = function(){
		this.base.x = this.x;
		this.base.y = this.y;
		this.base.size = this.size;
		this.base.setting = this.setting;
		this.base.color = this.color;
		this.script.y = this.base.y + 5 * this.size / 8;
		this.script.size = this.size / 2;
		this.script.setting = this.setting;
		this.script.color = this.color;
	}//end setPlace()

	this.image = function(){
		this.setPlace();
		this.hor = 0.75 * this.size;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontSize2 = this.ver / 2 + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		this.font2 = this.fontSize2 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.base.image();
		this.script.x = this.base.u;
		this.script.image();
		this.u = this.script.u;
		if(this.base.v > (this.y + 1.5 * this.ver)){
			this.v = this.base.v;
		}
		else{
			this.v = this.y + 1.5 * this.ver;
		}
		this.m = (this.v - this.y) / 2 - 0.25 * this.ver;						//move midpoint down slightly 
	}//end image()
}//ens Subscript







function Negation(x, y, size, setting, thing, type, color){
	Symbol.call(this, x, y, size, setting, color);
	this.thing = thing;
	this.type = type;   //1 is -, 2 is ~, (need 3 to be horizontal L or 7 thing)
	
	this.setPlace = function(){
		this.thing.x = this.x + this.size * 0.75;
		this.thing.y = this.y;
		this.thing.size = this.size;
		this.thing.setting = this.setting;
		this.thing.color = this.color;
	}//end setPlace()

	this.image = function(){
		if(this.type == 1){
			this.setPlace();
			this.hor = this.size * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			this.thing.image();
			if(this.thing.m > this.ver / 2){
				this.m = this.thing.m;
				this.y1 = this.y + (this.thing.m - this.ver / 2);
				this.thing.clear();
				this.thing.image();
			}
			else{
				this.thing.y = this.thing.y + (this.ver / 2 - this.thing.m);
				this.y1 = this.y + (this.thing.m - this.ver / 2);
				this.thing.clear();
				this.thing.image();
			}
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("-", this.x, this.y1 + this.ver);
			sketch.stroke();
			sketch.closePath();
			this.u = this.thing.u;
			this.v = this.thing.v;
			this.m = this.thing.m;
		}//end type 1
		else{
			this.setPlace();
			this.hor = this.size * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			this.thing.image();
			if(this.thing.m > this.ver / 2){
				this.m = this.thing.m;
				this.y1 = this.y + (this.thing.m - this.ver / 2);
				this.thing.clear();
				this.thing.image();
			}
			else{
				this.thing.y = this.thing.y + (this.ver / 2 - this.thing.m);
				this.y1 = this.y + (this.thing.m - this.ver / 2);
				this.thing.clear();
				this.thing.image();
			}
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("~", this.x, this.y + this.ver);
			sketch.stroke();
			sketch.closePath();
			this.u = this.thing.u;
			this.v = this.thing.v;
			this.m = this.thing.m;
		}//end type 2
	}//end image()
}//end Negation








function Complex(x, y, size, setting, real, imaginary, type, color){
	Symbol.call(this, x, y, size, setting, color);
	this.type = type;										//type 1 is plus (a + bi), type 2 is minus (a - bi)
	this.real = real;
	this.imaginary = imaginary;

	this.setPlace = function(){
		this.real.x = this.x;
		this.real.y = this.y;
		this.real.size = this.size;
		this.real.setting = this.setting;
		this.real.color = this.color;
		this.imaginary.y = this.y;
		this.imaginary.size = this.size;
		this.imaginary.setting = this.setting;
		this.imaginary.color = this.color;
	}

	this.image = function(){
		if(this.type == 1){
			this.setPlace();
			this.hor = this.size * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Segoe Script";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			this.real.image();
			this.imaginary.x = this.real.u + this.hor;
			this.imaginary.image();
			if(this.real.m > this.imaginary.m){
				this.m = this.real.m;
				this.imaginary.y = this.imaginary.y + (this.real.m - this.imaginary.m);
				this.y1 = this.y + (this.real.m - this.ver / 2);
				this.real.clear();
				this.imaginary.clear();
				this.real.image();
				this.imaginary.image();
			}
			else{
				this.m = this.imaginary.m;
				this.real.y = this.real.y + (this.imaginary.m - this.real.m);
				this.y1 = this.y+(this.imaginary.m - this.ver / 2);
				this.real.clear();
				this.imaginary.clear();
				this.real.image();
				this.imaginary.image();
			}
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("+", this.real.u, this.y1 + this.ver);
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
				//make this italic
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("i", this.imaginary.u, this.y1 + this.ver);
			sketch.stroke();
			sketch.closePath();
			this.u = this.imaginary.u + this.hor;
			if(this.real.v > this.imaginary.v){
				this.v = this.real.v;
			}
			else{
				this.v = this.imaginary.v;
			}
			this.m = (this.v - this.y) / 2;
		}//end type 1
		else{
			this.setPlace();
			this.hor = this.size * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Segoe Script";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			this.real.image();
			this.imaginary.x = this.real.u + this.hor;
			this.imaginary.image();
			if(this.real.m > this.imaginary.m){
				this.m = this.real.m;
				this.imaginary.y = this.imaginary.y + (this.real.m - this.imaginary.m);
				this.y1 = this.y + (this.real.m - this.ver / 2);
				this.real.clear();
				this.imaginary.clear();
				this.real.image();
				this.imaginary.image();
			}
			else{
				this.m = this.imaginary.m;
				this.real.y = this.real.y + (this.imaginary.m - this.real.m);
				this.y1 = this.y + (this.imaginary.m - this.ver / 2);
				this.real.clear();
				this.imaginary.clear();
				this.real.image();
				this.imaginary.image();
			}
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("-", this.real.u, this.y1 + this.ver);
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("i", this.imaginary.u, this.y1 + this.ver);
			sketch.stroke();
			sketch.closePath();
			this.u = this.imaginary.u + this.hor;
			if(this.real.v > this.imaginary.v){
				this.v = this.real.v;
			}
			else{
				this.v = this.imaginary.v;
			}
			this.m = (this.v - this.y) / 2;
		}//end type 2
	}//end image()
}//end Complex












function Bar(x, y, size, setting, variable, color){
	Symbol.call(this, x, y, size, setting, color);
	this.variable = variable;
	
	this.setPlace = function(){
		this.variable.x = this.x + (this.size * 0.75) / 4;
		this.variable.y = this.y;
		this.variable.size = this.size;
		this.variable.setting = this.setting;
		this.variable.color = this.color;
	}

	this.image = function(){
		this.setPlace();
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.variable.image();
		sketch.beginPath();
		sketch.moveTo(this.x, this.y + this.ver / 8);
		sketch.lineTo(this.variable.u, this.y + this.ver / 8);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.u = this.variable.u;
		if(this.variable.v > (this.y + this.ver)){
			this.v = this.variable.v;
		}
		else{
			this.v = this.y + this.ver;
		}
		this.m = (this.v - this.y) / 2;
	}//end image()
}//end Bar







function Hat(x, y, size, setting, variable, color){
	Symbol.call(this, x, y, size, setting, color);
	this.variable = variable;

	this.setPlace = function(){
		this.variable.x = this.x;
		this.variable.y = this.y;
		this.variable.size = this.size;
		this.variable.setting = this.setting;
		this.variable.color = this.color;
	}

	this.image = function(){
		this.setPlace();
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.variable.image();
		sketch.beginPath();
		sketch.moveTo(this.x, this.y + this.ver / 4);
		sketch.lineTo(this.x + this.hor / 4, this.y);
		sketch.lineTo(this.x + this.hor / 2, this.y + this.ver / 4);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.u = this.variable.u;
		if(this.variable.v > (this.y + this.ver)){
			this.v = this.variable.v;
		}
		else{
			this.v = this.y + this.ver;
		}
		this.m = (this.v - this.y) / 2;
	}//end image()
}//end Hat






function Vector(x, y, size, setting, variable, color){
	Symbol.call(this, x, y, size, setting, color);
	this.variable = variable;

	this.setPlace = function(){
		this.variable.x = this.x;
		this.variable.y = this.y;
		this.variable.size = this.size;
		this.variable.setting = this.setting;
		this.variable.color = this.color;
	}

	this.image = function(){
		this.setPlace();
		this.hor = this.size*0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		this.variable.image();
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		sketch.beginPath();
		sketch.moveTo(this.x, this.y + this.ver / 8);
		sketch.lineTo(this.variable.u, this.y + this.ver / 8);
		sketch.moveTo(this.x + 0.75 * (this.variable.u - this.variable.x), this.y);
		sketch.lineTo(this.variable.u, this.y + this.ver / 8);
		sketch.lineTo(this.x + 0.75 * (this.variable.u - this.variable.x), this.y + this.ver / 4);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.u = this.variable.u;
		if(this.variable.v > (this.y + this.ver)){
			this.v = this.variable.v;
		}
		else{
			this.v = this.y + this.ver;
		}
		this.m = (this.v - this.y) / 2;
	}//end image()
}//end Vector







function InfinitySymbol(x, y, size, setting, type, color){
	Symbol.call(this, x, y, size, setting, color);
	this.type = type;											//type 1 is positive, type 2 is negative

	this.image = function(){
		if(this.type == 1){
			this.hor = (this.size * 0.75) * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
				//front-top
			sketch.beginPath();
			sketch.arc(this.x + 3 * this.hor / 4, (this.y + this.ver / 4) + 3 * this.ver / 4, 5 * this.hor / 8,3.6 , 5.825);
			sketch.stroke();
			sketch.closePath();
				//front-bottom
			sketch.beginPath();
			sketch.arc(this.x + 3 * this.hor / 4, (this.y + this.ver / 4) + 5 * this.ver / 16, 5 * this.hor / 8, 0.475, 2.65);
			sketch.stroke();
			sketch.closePath();
				//back-bottom
			sketch.beginPath();
			sketch.arc(this.x + 1.85 * this.hor,(this.y + this.ver / 4) + 5 * this.ver / 16, 5 * this.hor / 8, 0.475, 2.65);
			sketch.stroke();
			sketch.closePath();
				//back-top
			sketch.beginPath();
			sketch.arc(this.x + 1.85 * this.hor, (this.y + this.ver / 4) + 3 * this.ver / 4, 5 * this.hor / 8, 3.6, 5.825);
			sketch.stroke();
			sketch.closePath();
			this.u = this.x + 2.75 * this.hor;
			this.v = this.y + this.ver;
			this.m = (this.v - this.y) / 2;
		}//end type 1
		else{
			this.hor = (this.size * 0.75) * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("-", this.x, (this.y + this.ver / 4) + 3 * this.ver / 4);
			sketch.stroke();
			sketch.closePath();
				//front-top
			sketch.beginPath();
			sketch.arc(this.x + 5 * this.hor / 4, (this.y + this.ver / 4) + 3 * this.ver / 4, 5 * this.hor / 8, 3.6, 5.825);
			sketch.stroke();
			sketch.closePath();
				//front-bottom
			sketch.beginPath();
			sketch.arc(this.x + 5 * this.hor / 4, (this.y + this.ver / 4) + 5 * this.ver / 16, 5 * this.hor / 8, 0.475, 2.65);
			sketch.stroke();
			sketch.closePath();
				//back-bottom
			sketch.beginPath();
			sketch.arc(this.x + 2.35 * this.hor, (this.y + this.ver / 4) + 5 * this.ver / 16, 5 * this.hor / 8, 0.475, 2.65);
			sketch.stroke();
			sketch.closePath();
				//back-top
			sketch.beginPath();
			sketch.arc(this.x + 2.35 * this.hor, (this.y + this.ver / 4) + 3 * this.ver / 4, 5 * this.hor / 8, 3.6, 5.825);
			sketch.stroke();
			sketch.closePath();
			this.u = this.x + 3.5 * this.hor;
			this.v = this.y + this.ver;
			this.m = (this.v - this.y) / 2;
		}//end type 2
	}//end image()
}//end InfinitySymbol









		


function NullSet(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image = function(){
		this.hor = this.size * 0.75;
		this.ver =this.size;
		this.fontSize1 = this.ver / 3;
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize + " " + this.fontFamily;
		let scene =document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		sketch.beginPath();
		sketch.arc(this.x + this.hor / 2, this.y + this.ver / 2, this.hor / 2, 0, 6.29);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.x, this.y + this.ver);
		sketch.lineTo(this.x + this.hor, this.y);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.u = this.x + this.hor;
		this.v = this.y + this.ver;
		this.m = (this.v - this.y) / 2;
	}//end image()
}//end NullSet







function SampleSpace(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image = function(){
		this.hor = this.size;
		this.ver = this.size;
		this.fontSize1 = this.ver / 3;
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		sketch.beginPath();
		sketch.arc(x + this.hor / 2, y + this.ver / 3, this.hor / 3, 1.57, 5.5);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.arc(x + this.hor / 2, y + 255 * this.ver / 256, this.hor / 3, 4.71 ,2.2);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.x + 23 * this.hor / 32, this.y + 7 * this.ver / 32);
		sketch.lineTo(this.x + 25 * this.hor / 32, this.y);
		sketch.moveTo(this.x + this.hor / 4, this.y + 23 * this.ver / 16);
		sketch.lineTo(this.x + 5 * this.hor / 16, this.y + 9 * this.ver / 8);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.u = this.x + this.hor;
		this.v = this.y + 1.4 * this.ver;
		this.m = (this.v - this.y) / 2;
	}//end image()
}//end SampleSpace











/////////////////////////////////////////////////////  STANDARD NUMERICAL SETS  ////////////////////////////////////////////

function RealNumbers(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image = function(){
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver / 3;
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		sketch.beginPath();
		sketch.moveTo(this.x, this.y);
		sketch.lineTo(this.x, this.y + this.ver);
		sketch.lineTo(this.x + this.hor / 6, this.y + this.ver);
		sketch.lineTo(this.x + this.hor / 6, this.y);
		sketch.moveTo(this.x, this.y);
		sketch.lineTo(this.x + 2 * this.hor / 3, this.y);
		sketch.moveTo(this.x + this.hor / 6, this.y + this.ver / 3);
		sketch.lineTo(this.x + 2 * this.hor / 3, this.y + this.ver / 3);
		sketch.moveTo(this.x + 2 * this.hor / 3, this.y);
		sketch.lineTo(this.x + 2 * this.hor / 3, this.y + this.ver / 3);
		sketch.moveTo(this.x + this.hor / 2, this.y + this.ver / 3);
		sketch.lineTo(this.x + this.hor - this.hor / 6, this.y + this.ver);
		sketch.lineTo(this.x + this.hor, this.y + this.ver);
		sketch.lineTo(this.x + this.hor / 2 + this.hor / 6, this.y + this.ver / 3);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.arc(this.x + 2 * this.hor / 3, this.y + this.ver / 6, this.ver / 6, 4.71, 1.57);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.u = this.x + this.hor;
		this.v = this.y + this.ver;
		this.m = (this.v - this.y) / 2;
	}//end image()
}//end RealNumbers







function NaturalNumbers(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image = function(){
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver / 3;
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		sketch.beginPath();
		sketch.moveTo(this.x, this.y + this.ver);
		sketch.lineTo(this.x, this.y);
		sketch.lineTo(this.x + this.hor - this.hor / 6, this.y + this.ver);
		sketch.lineTo(this.x + this.hor, this.y + this.ver);
		sketch.lineTo(this.x + this.hor, this.y);
		sketch.moveTo(this.x, this.y);
		sketch.lineTo(this.x + this.hor / 6, this.y);
		sketch.lineTo(this.x + this.hor, this.y + this.ver);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.u = this.x + this.hor;
		this.v = this.y + this.ver;
		this.m = (this.v - this.y) / 2;
	}//end image()
}//end NaturualNumbers








function Integers(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image = function(){
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver / 3;
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		sketch.beginPath();
		sketch.moveTo(this.x, this.y);
		sketch.lineTo(this.x + this.hor, this.y);
		sketch.lineTo(this.x + this.hor / 6, this.y + this.ver);
		sketch.lineTo(this.x + this.hor, this.y + this.ver);
		sketch.moveTo(this.x + this.hor - this.hor / 6, this.y);
		sketch.lineTo(this.x, this.y + this.ver);
		sketch.lineTo(this.x + this.hor / 6, this.y + this.ver);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.u = this.x + this.hor;
		this.v = this.y + this.ver;
		this.m = (this.v - this.y) / 2;
	}//end image()
}//end Integers








function RationalNumbers(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image = function(){
		this.hor = this.size;
		this.ver = this.size;
		this.fontSize1 = this.ver / 3;
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		sketch.beginPath();
		sketch.arc(this.x + this.hor / 2, this.y + this.ver / 2, this.hor / 2, 0, 6.29);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.x + this.hor / 6, this.y + this.ver / 8);
		sketch.lineTo(this.x + this.hor / 6, this.y + 7 * this.ver / 8);
		sketch.moveTo(this.x + 5 * this.hor / 6, this.y + this.ver / 8);
		sketch.lineTo(this.x + 5 * this.hor / 6, this.y + 7 * this.ver / 8);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.arc(this.x + this.hor / 2, this.y + 1.85 * this.ver, this.hor, 4.4, 5.1);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.arc(this.x + 25 * this.hor / 32, this.y + 159 * this.ver / 128, this.hor / 3, 5, 6.1);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.u = this.x + 1.3 * this.hor;
		this.v = this.y + 1.2 * this.ver;
		this.m = (this.v - this.y) / 2;
	}//end image()
}//end RationalNumbers








function ComplexNumbers(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image = function(){
		this.hor = this.size;
		this.ver = this.size;
		this.fontSize1 = this.ver / 3;
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		sketch.beginPath();
		sketch.arc(this.x + this.hor / 2, this.y + this.ver / 2, this.hor / 2, 1, 5.3);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.x + this.hor / 6, this.y + this.ver / 8);
		sketch.lineTo(this.x + this.hor / 6, this.y + 7 * this.ver / 8);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.u = this.x + this.hor;
		this.v = this.y + this.ver;
		this.m = (this.v - this.y) / 2;
	}//end image()
}//end ComplexNumbers














//////////////////////////////////////////////////   UNITARY OPERATORS  ////////////////////////////////////////////////////////


function Root(x, y, size, setting, radicand, color){
	Symbol.call(this, x, y, size, setting, color);
	this.radicand = radicand;
	this.index = 2;											//default to square root

	this.setPlace = function(){
		this.radicand.x = this.x + this.size;
		this.radicand.y = this.y;
		this.radicand.size = this.size;
		this.radicand.setting = this.setting;
		this.radicand.color = this.color;
	}//end setPlace()

	this.image = function(){
		this.setPlace();
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontSize2 = this.ver / 2 + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		this.font2 = this.fontSize2 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.radicand.image();
		this.tall = this.radicand.v - this.y;
			//draw the radical symbol
		sketch.beginPath();
		sketch.moveTo(this.x, this.y + this.tall / 2);
		sketch.lineTo(this.x + 0.3 * this.hor, this.y + this.tall / 2);
		sketch.lineTo(this.x + 0.6 * this.hor, this.y + this.tall);
		sketch.lineTo(this.x + this.hor, this.y);
		sketch.lineTo(this.radicand.u + this.hor / 2, this.y);
		sketch.lineTo(this.radicand.u + this.hor, this.y + this.tall / 3);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		if(this.index != 2){
			sketch.beginPath();
			sketch.font = this.font2;
			sketch.fillStyle = this.color;
			sketch.fillText(this.index, this.x + 0.2 * this.hor, this.y + this.ver / 4);
			sketch.stroke();
			sketch.closePath();
		}
		this.u = this.radicand.u + 3 * this.hor / 2;
		this.v = this.y + this.tall;
		this.m = (this.v - this.y) / 2;
	}//end image()
}//end Root











function Factorial(x, y, size, setting, number, color){
	Symbol.call(this, x, y, size, setting, color);
	this.number = number;
	
	this.setPlace = function(){
		this.number.x = this.x;
		this.number.y = this.y;
		this.number.size = this.size;
		this.number.setting = this.setting;
		this.number.color = this.color;
	}

	this.image = function(){
		this.setPlace();
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.number.image();
		if(this.number.m > this.ver / 2){
			this.m = this.number.m;
			this.y1 = this.y + (this.number.m - this.ver / 2);
			this.number.clear();
			this.number.image();
		}
		else{
			this.m = this.ver / 2;
			this.number.y = this.number.y + (this.ver / 2 - this.number.m);
			this.y1 = this.y;
			this.number.clear();
			this.number.image();
		}
		sketch.beginPath();
		sketch.font = this.font1;
		sketch.fillStyle = this.color;
		sketch.fillText("!", this.number.u, this.y1 + this.ver);
		sketch.stroke();
		sketch.closePath();
		this.u = this.number.u+this.hor;
		if(this.number.v > (this.y + this.ver)){
			this.v = this.number.v;
			this.m = this.number.m;
		}
		else{
			this.v = this.y + this.ver;
			this.m = (this.v - this.y) / 2;
		}
	}//end image()
}//end Factorial






function Superscript(x, y, size, setting, base, script, color){
	Symbol.call(this, x, y, size, setting, color);
	this.base = base;
	this.script = script;

	this.setPlace = function(){
		this.base.x = this.x;
		this.base.y = this.y;
		this.base.size = this.size;
		this.base.setting = this.setting;
		this.base.color = this.color;
		this.script.y = this.base.y;
		this.script.size = this.size / 2;
		this.script.setting = this.setting;
		this.script.color = this.color;
	}

	this.image=function(){
		this.setPlace();
		this.hor = 0.75 * this.size;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontSize2 = this.ver / 2 + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		this.font2 = this.fontSize2 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.base.image();
		this.script.x = this.base.u;
		this.script.image();
		this.u = this.script.u;
		if(this.base.v > (this.y + 1.5 * this.ver)){
			this.v = this.base.v;
		}
		else{
			this.v = this.y + 1.3 * this.ver;
		}
	}//end image()
}//end Superscript









		
		




/////////////////////////////////////////////////////////   BINARY OPERATORS  ////////////////////////////////////////////////

function Addition(x, y, size, setting, pre, post, color){
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image = function(){
		this.setPlace();
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.pre.image();
		this.post.x = this.pre.u + this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.font = this.font1;
		sketch.fillStyle = this.color;
		sketch.fillText("+", this.pre.u, this.y1 + this.ver);
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end Addition









function Subtraction(x, y, size, setting, pre, post, color){
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image = function(){
		this.setPlace();
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.pre.image();
		this.post.x = this.pre.u + this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.font = this.font1;
		sketch.fillStyle = this.color;
		sketch.fillText("-", this.pre.u, this.y1 + this.ver);
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end Subtraction









function Multiplication(x, y, size, setting, factor1, factor2, type, color){
	Symbol.call(this, x, y, size, setting, color);
	this.factor1 = factor1;
	this.factor2 = factor2;
	this.type = type;	//1 is cross symbol, 2 is dot symbol, 3 is parenthesis, 4 is juxtaposition
	
	this.setPlace = function(){
		this.factor1.x = this.x;
		this.factor1.y = this.y;
		this.factor1.size = this.size;
		this.factor1.setting = this.setting;
		this.factor1.color = this.color;
		this.factor2.y = this.y;
		this.factor2.size = this.size;
		this.factor2.setting = this.setting;
		this.factor2.color = this.color;
	}//end setPlace()

	this.image = function(){
		if(this.type == 1){
			this.setPlace();
			this.hor = this.size * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			this.factor1.image();
			this.factor2.x = this.factor1.u + 1.4 * this.hor;
			this.factor2.image()
			if(this.factor1.m > this.factor2.m){
				this.m = this.factor1.m;
				this.factor2.y = this.factor2.y + (this.factor1.m - this.factor2.m);
				this.y1 = this.y + (this.factor1.m - this.ver/2);
				this.factor1.clear();
				this.factor2.clear();
				this.factor1.image();
				this.factor2.image();
			}
			else{
				this.m = this.factor2.m;
				this.factor1.y = this.factor1.y + (this.factor2.m - this.factor1.m);
				this.y1 = this.y + (this.factor2.m - this.ver / 2);
				this.factor1.clear();
				this.factor2.clear();
				this.factor1.image();
				this.factor2.image();
			}
			sketch.beginPath();
			sketch.moveTo(this.factor1.u, this.y1 + this.ver / 3);
			sketch.lineTo(this.factor1.u + this.hor, this.y1 + this.ver);
			sketch.moveTo(this.factor1.u, this.y1 + this.ver);
			sketch.lineTo(this.factor1.u + this.hor, this.y1 + this.ver / 3);
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.closePath();
			this.u = this.factor2.u;
			if(this.factor1.v > this.factor2.v){
				this.v = this.factor1.v;
			}
			else{
				this.v = this.factor2.v;
			}
		}//end type 1
		else if(this.type == 2){
			let counter = 0;
			this.setPlace();
			this.hor = this.size * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			this.factor1.image();
			this.factor2.x = this.factor1.u + 1.3 * this.hor;
			this.factor2.image();
			if(this.factor1.m > this.factor2.m){
				this.m = this.factor1.m;
				this.factor2.y = this.factor2.y + (this.factor1.m - this.factor2.m);
				this.y1 = this.y + (this.factor1.m - this.ver / 2);
				this.factor1.clear();
				this.factor2.clear();
				this.factor1.image();
				this.factor2.image();
			}
			else{
				this.m = this.factor2.m;
				this.factor1.y = this.factor1.y + (this.factor2.m - this.factor1.m);
				this.y1 = this.y + (this.factor2.m - this.ver / 2);
				this.factor1.clear();
				this.factor2.clear();
				this.factor1.image();
				this.factor2.image();
			}
			sketch.beginPath();
			while(counter <= this.hor / 4){
				sketch.arc(this.factor1.u + this.hor / 2, this.y1 + 2 * this.ver / 3, counter, 0, 6.29);
				counter += 0.3;
			}
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.closePath();
			this.u = this.factor2.u;
			if(this.factor1.v > this.factor2.v){
				this.v = this.factor1.v;
			}
			else{
				this.v = this.factor2.v;
			}
		}//end type 2
		else if(this.type == 3){
			this.setPlace();
			this.hor = this.size * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			this.factor1.x = this.x + 0.8 * this.hor;
			this.factor1.image();
			this.factor2.x = this.factor1.u + 1.8 * this.hor;
			this.factor2.image();
			if(this.factor1.m > this.factor2.m){
				this.m = this.factor1.m;
				this.factor2.y = this.factor2.y + (this.factor1.m - this.factor2.m);
				this.y1 = this.y + (this.factor1.m - this.ver / 2);
				this.factor1.clear();
				this.factor2.clear();
				this.factor1.image();
				this.factor2.image();
			}
			else{
				this.m = this.factor2.m;
				this.factor1.y = this.factor1.y + (this.factor2.m - this.factor1.m);
				this.y1 = this.y + (this.factor2.m - this.ver / 2);
				this.factor1.clear();
				this.factor2.clear();
				this.factor1.image();
				this.factor2.image();
			}
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("(", this.x, this.y1 + this.ver)
			sketch.fillText(")", this.factor1.u, this.y1 + this.ver);
			sketch.fillText("(", this.factor1.u + this.hor, this.y1 + this.ver);
			sketch.fillText(")", this.factor2.u, this.y1 + this.ver);
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.closePath();
			this.u = this.factor2.u + 0.8 * this.hor;
			if(this.factor1.v > this.factor2.v){
				this.v = this.factor1.v + this.ver / 4;
			}
			else{
				this.v = this.factor2.v + this.ver / 4;
			}
		}//end type 3
		else{
			this.setPlace();
			this.size = size;
			this.hor = this.size * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			factor1.image();
			factor2.x = this.factor1.u;
			factor2.image();
			if(this.factor1.m > this.factor2.m){
				this.m = this.factor1.m;
				this.factor2.y = this.factor2.y + (this.factor1.m - this.factor2.m);
				this.y1 = this.y + (this.factor1.m - this.ver / 2);
				this.factor1.clear();
				this.factor2.clear();
				this.factor1.image();
				this.factor2.image();
			}
			else{
				this.m = this.factor2.m;
				this.factor1.y = this.factor1.y + (this.factor2.m - this.factor1.m);
				this.y1 = this.y + (this.factor2.m - this.ver / 2);
				this.factor1.clear();
				this.factor2.clear();
				this.factor1.image();
				this.factor2.image();
			}
			this.u = this.factor2.u;
			if(this.factor1.v > this.factor2.v){
				this.v = this.factor1.v;
			}
			else{
				this.v = this.factor2.v;
			}
		}//end type 4
	}//end image()
}//end Multiplication









function Division(x, y, size, setting, dividend, divisor, type, color){
	Symbol.call(this, x, y, size, setting, color);
	this.dividend = dividend;
	this.divisor = divisor;
	this.type = type;	//1 is linear symbol, 2 is divide symbol, 3 is Fraction
	
	this.setPlace = function(){
		this.dividend.x = this.x;
		this.dividend.y = this.y;
		this.dividend.size = this.size;
		this.dividend.setting = this.setting;
		this.dividend.color = this.color;
		this.divisor.x = this.x;
		this.divisor.y = this.y;
		this.divisor.size = this.size;
		this.divisor.setting = this.setting;
		this.divisor.color = this.color;
	}

	this.image = function(){
		if(this.type == 1){
			let counter = 0;
			this.setPlace();
			this.hor = this.size * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			this.dividend.x = this.x;
			this.dividend.image();
			this.divisor.x = this.dividend.u + 2 * this.hor;
			this.divisor.image();
			if(this.divisor.m > this.dividend.m){
				this.m = this.divisor.m;
				this.dividend.y = this.dividend.y + (this.divisor.m - this.dividend.m);
				this.y1 = this.y + (this.divisor.m - this.ver / 2);
				this.divisor.clear();
				this.dividend.clear();
				this.divisor.image();
				this.dividend.image();
			}
			else{
				this.m = this.dividend.m;
				this.divisor.y = this.divisor.y + (this.dividend.m - this.divisor.m);
				this.y1 = this.y + (this.dividend.m - this.ver / 2);
				this.divisor.clear();
				this.dividend.clear();
				this.divisor.image();
				this.dividend.image();
			}
			sketch.beginPath();
			sketch.moveTo(this.dividend.u, this.y1 + this.ver / 2);
			sketch.lineTo(this.dividend.u + 1.5 * this.hor, this.y1 + this.ver / 2);
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			counter = 0;
			while(counter <= this.hor / 8){
				sketch.arc(this.dividend.u + 0.75 * this.hor, this.y1 + this.ver / 4, counter, 0, 6.29);
				counter++;
			}
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			counter = 0;
			while(counter <= this.hor / 8){
				sketch.arc(this.dividend.u + 0.75 * this.hor, this.y1 + 3 * this.ver / 4, counter, 0, 6.29);
				counter++;
			}
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.closePath();
			this.u = this.dividend.u;
			if(this.divisor.v > this.dividend.v){
				this.v = this.divisor.v;
			}
			else{
				this.v = this.dividend.v;
			}
		}//end type 1
		else if(this.type == 2){
			this.setPlace();
			this.hor = this.size * 0.75;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			this.divisor.x = this.x;
			this.divisor.image();
			this.dividend.x = this.divisor.u + this.hor;
			this.dividend.image();
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			sketch.beginPath();
			sketch.arc(this.divisor.u - 0.75*this.hor, this.y + this.ver / 2, 1.1 * this.hor, 5.6, 0.8);
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.beginPath();
			sketch.moveTo(this.divisor.u + 0.15 * this.hor, this.y);
			sketch.lineTo(this.dividend.u, this.y);
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.closePath();
			this.u = this.dividend.u;
			if(this.divisor.v > this.dividend.v){
				this.v = this.divisor.v;
			}
			else{
				this.v = this.dividend.v;
			}
		}//end type 2
		else{
			let divide = new Fraction(this.x, this.y, this.size, this.setting, this.dividend, this.divisor, this.color);
			divide.image();
			this.u = divide.u;
			this.v = divide.v
			this.m = divide.m;
		}//end type 3
	}//end image()
}//end Division
















/////////////////////////////////////////////////////////  COMPARISON OPERATORS  ///////////////////////////////////////////////

function Same(x, y, size, setting, pre, post, color){
		//equal sign
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image = function(){
		this.setPlace();
		this.hor = this.size*0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver+"px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.pre.image();
		this.post.x = this.pre.u + this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.font = this.font1;
		sketch.fillStyle = this.color;
		sketch.fillText("=", this.pre.u, this.y1 + this.ver);
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end Same









function Greater(x, y, size, setting, pre, post, color){
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image = function(){
		this.setPlace();
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.pre.image();
		this.post.x = this.pre.u + this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.font = this.font1;
		sketch.fillStyle = this.color;
		sketch.fillText(">", this.pre.u, this.y1 + this.ver);
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end Greater








function GreaterOrEqual(x, y, size, setting, pre, post, color){
		//can probably modify this to be child of Greater and add line to image
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image = function(){
		this.setPlace();
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.pre.image();
		this.post.x = this.pre.u + this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.font = this.font1;
		sketch.fillStyle = this.color;
		sketch.fillText(">", this.pre.u, this.y1 + this.ver);
		sketch.stroke();
		sketch.closePath();
			//the line under the greater symbol
		sketch.beginPath();
		sketch.moveTo(this.pre.u, this.y1 + this.ver);
		sketch.lineTo(this.pre.u + 0.75 * this.hor, this.y1 + this.ver);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end GreaterOrEqual












function Less(x, y, size, setting, pre, post, color){
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);
	
	this.image = function(){
		this.setPlace();
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.pre.image();
		this.post.x = this.pre.u + this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.font = this.font1;
		sketch.fillStyle = this.color;
		sketch.fillText("<", this.pre.u, this.y1 + this.ver);
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end Less










function LessOrEqual(x, y, size, setting, pre, post, color){
		//can probably make this a child of Less and just add line to image
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image = function(){
		this.setPlace();
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.pre.image();
		this.post.x = this.pre.u + this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.font = this.font1;
		sketch.fillStyle = this.color;
		sketch.fillText("<", this.pre.u, this.y1 + this.ver);
		sketch.stroke();
		sketch.closePath();
			//the line under the less than symbol
		sketch.beginPath();
		sketch.moveTo(this.pre.u + 0.1 * this.hor, this.y1 + this.ver);
		sketch.lineTo(this.pre.u + 0.75 * this.hor, this.y1 + this.ver);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end LessOrEqual









function NotSame(x, y, size, setting, pre, post, color){
		//can probably make this a child of same and just add the slash
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image = function(){
		this.setPlace();
		this.hor = this.size * 0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.pre.image();
		this.post.x = this.pre.u + this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.font = this.font1;
		sketch.fillStyle = this.color;
		sketch.fillText("=", this.pre.u, this.y1 + this.ver);
		sketch.stroke();
		sketch.closePath();
			//the line through the equal sign
		sketch.beginPath();
		sketch.moveTo(this.pre.u + 0.1 * this.hor, this.y1 + this.ver);
		sketch.lineTo(this.pre.u + 0.75 * this.hor, this.y1 + this.ver / 3);
		sketch.strokeStyle = this.color;
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end NotSame









function ApproximatelySame(x, y, size, setting, pre, post, color){
		//approximately equal sign
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image = function(){
		this.setPlace();
		this.hor = this.size*0.75;
		this.ver = this.size;
		this.fontSize1 = this.ver + "px";
		this.fontFamily = "Times New Roman";
		this.font1 = this.fontSize1 + " " + this.fontFamily;
		let scene = document.getElementById(this.setting);
		let sketch = scene.getContext("2d");
		this.pre.image();
		this.post.x = this.pre.u + 1.3 * this.hor;
		this.post.image();
		this.setM();
			//top front
		sketch.beginPath();
		sketch.arc(this.pre.u + 0.2 * this.hor, this.y1 + 15 * this.ver / 16, this.hor / 2, 4, 5.2);
		sketch.stroke();
		sketch.closePath();
			//bottom front
		sketch.beginPath();
		sketch.arc(this.pre.u + 0.2 * this.hor, this.y1 + 35 * this.ver / 32, this.hor / 2, 4, 5.2);
		sketch.stroke();
		sketch.closePath();
			//top back
		sketch.beginPath();
		sketch.arc(this.pre.u + 0.2 * this.hor + this.hor / 2, this.y1 + 9 * this.ver / 32, this.hor / 2, 0.8, 2.13);
		sketch.stroke();
		sketch.closePath();
			//bottom back
		sketch.beginPath();
		sketch.arc(this.pre.u + 0.2 * this.hor + this.hor / 2, this.y1 + 14 * this.ver / 32, this.hor / 2, 0.8, 2.13);
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end ApproximatelySame




		/////////////////////////////////////////////////////////////////////////////////////////
		///////////////// ADDRESSED INLINE READABLE WHITE SPACE UP TO HERE //////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////






function Equivalent(x, y, size, setting, pre, post, color){
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image=function(){
		this.setPlace();
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver+"px";
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize1+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		this.pre.image();
		this.post.x=this.pre.u+1.3*this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.moveTo(this.pre.u,this.y1+this.ver);
		sketch.lineTo(this.pre.u+this.hor,this.y1+this.ver);
		sketch.moveTo(this.pre.u,this.y1+3*this.ver/4);
		sketch.lineTo(this.pre.u+this.hor,this.y1+3*this.ver/4);
		sketch.moveTo(this.pre.u,this.y1+this.ver/2);
		sketch.lineTo(this.pre.u+this.hor,this.y1+this.ver/2);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end Equivalent







function Congruent(x, y, size, setting, pre, post, color){
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);
	
	this.image=function(){
		this.setPlace();
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver+"px";
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize1+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		this.pre.image();
		this.post.x=this.pre.u+2*this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.arc(this.pre.u+0.5*this.hor,this.y1+11*this.ver/16,this.hor/2,3.8,5.5)
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.arc(this.pre.u+1.25*this.hor,this.y1+3*this.ver/16,this.hor/2,0.5,2.5)
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.pre.u,this.y1+this.ver);
		sketch.lineTo(this.pre.u+1.75*this.hor,this.y1+this.ver);
		sketch.moveTo(this.pre.u,this.y1+3*this.ver/4);
		sketch.lineTo(this.pre.u+1.75*this.hor,this.y1+3*this.ver/4);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end Congruent








function Proportional(x, y, size, setting, pre, post, color){
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image=function(){
		this.setPlace();
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver+"px";
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize1+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		this.pre.image();
		this.post.x=this.pre.u+1.5*this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.moveTo(this.pre.u+1.1*this.hor,this.y1+this.ver/2);
		sketch.arc(this.pre.u+0.3*this.hor,this.y1+2*this.ver/3,this.hor/3,0.9,5.4);
		sketch.lineTo(this.pre.u+1.1*this.hor,this.y1+5*this.ver/6);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.setUV();
	}//end image()
}//end Proportional









////////////////////////////////////////////////  CALCULUS AND FUNCTIONS  /////////////////////////////////////////////////////

function Limit(x, y, size, setting, number, variable, func, type, color){
	Symbol.call(this, x, y, size, setting, color);
	this.type=type;	//type 1 is regular, type 2 is left, type 3 is right
	this.number=number;
	this.func=func;
	this.variable=variable;

	this.setPlace=function(){
		this.number.x=this.x+1.25*(this.size*0.75);
		this.number.y=this.y+3*this.size/4;
		this.number.size=this.size/2;
		this.number.setting=this.setting;
		this.number.color=this.color;
		this.func.x=this.x+2.75*(this.size*0.75);
		this.func.y=this.y;
		this.func.size=this.size;
		this.func.setting=this.setting;
		this.func.color=this.color;
		this.variable.x=this.x;
		this.variable.y=this.y+3*this.size/4;
		this.variable.size=this.size/2;
		this.variable.setting=this.setting;
		this.variable.color=this.color;
	}//end setPlace()

	this.image=function(){
		if(this.type==1)
		{
			this.setPlace();
			this.hor=this.size/2;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontSize2=this.ver/2+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			this.font2=this.fontSize2+" "+this.fontFamily;
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			this.func.image();
			this.variable.image();
			this.number.image();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("(",this.x+3*this.hor,this.y+7*this.ver/8)
			sketch.fillText(")",this.func.u,this.y+7*this.ver/8);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("lim",this.x,this.y+3*this.ver/4);
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.moveTo(this.x+13*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+25*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+17*this.hor/16,this.y+this.ver);
			sketch.moveTo(this.x+25*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+17*this.hor/16,this.y+5*this.ver/4);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			this.u=this.func.u+this.hor;
			if((this.y+1.4*this.ver)>this.func.v){
				this.v=this.y+1.4*this.ver;
			}
			else{
				this.v=this.func.v;
			}
			this.m=(this.v-this.y)/2-0.2*this.ver;
		}//end type 1
		else if(this.type==2){
			this.setPlace();
			this.hor=this.size/2;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontSize2=this.ver/2+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			this.font2=this.fontSize2+" "+this.fontFamily;
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			this.func.image();
			this.variable.image();
			this.number.image();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("(",this.x+3*this.hor,this.y+7*this.ver/8)
			sketch.fillText(")",this.func.u,this.y+7*this.ver/8);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("lim",this.x,this.y+3*this.ver/4);
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.moveTo(this.x+13*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+25*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+17*this.hor/16,this.y+this.ver);
			sketch.moveTo(this.x+25*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+17*this.hor/16,this.y+5*this.ver/4);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.moveTo(this.x+13*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+25*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+17*this.hor/16,this.y+this.ver);
			sketch.moveTo(this.x+25*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+17*this.hor/16,this.y+5*this.ver/4);
			sketch.moveTo(this.x+2.5*this.hor,this.y+this.ver);
			sketch.lineTo(this.x+3*this.hor,this.y+this.ver);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			this.u=this.func.u+this.hor;
			if((this.y+1.4*this.ver)>this.func.v){
				this.v=this.y+1.4*this.ver-0.2*this.ver;
			}
			else{
				this.v=this.func.v;
			}
			this.m=(this.v-this.y)/2;
		}//end type 2
		else{
			this.setPlace();
			this.hor=this.size/2;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontSize2=this.ver/2+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			this.font2=this.fontSize2+" "+this.fontFamily;
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			this.func.image();
			this.variable.image();
			this.number.image();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("(",this.x+3*this.hor,this.y+7*this.ver/8)
			sketch.fillText(")",this.func.u,this.y+7*this.ver/8);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("lim",this.x,this.y+3*this.ver/4);
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.moveTo(this.x+13*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+25*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+17*this.hor/16,this.y+this.ver);
			sketch.moveTo(this.x+25*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+17*this.hor/16,this.y+5*this.ver/4);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.moveTo(this.x+13*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+25*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+17*this.hor/16,this.y+this.ver);
			sketch.moveTo(this.x+25*this.hor/16,this.y+9*this.ver/8);
			sketch.lineTo(this.x+17*this.hor/16,this.y+5*this.ver/4);
			sketch.moveTo(this.x+2.5*this.hor,this.y+this.ver);
			sketch.lineTo(this.x+3*this.hor,this.y+this.ver);
			sketch.moveTo(this.x+2.75*this.hor,this.y+0.875*this.ver);
			sketch.lineTo(this.x+2.75*this.hor,this.y+1.125*this.ver);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			this.u=this.func.u+this.hor;
			if((this.y+1.4*this.ver)>this.func.v){
				this.v=this.y+1.4*this.ver;
			}
			else{
				this.v=this.func.v;
			}
			this.m=(this.v-this.y)/2-0.2*this.ver;
		}//end type 3
	}//end image()
}//end Limit








function Summation(x, y, size, setting, begin, end, func, color){
	Symbol.call(this, x, y, size, setting, color);
	this.begin=begin;
	this.func=func;
	this.end=end;

	this.setPlace=function(){
		this.begin.x=this.x+this.size*0.75;
		this.begin.y=this.y+15*this.size/8;
		this.begin.size=this.size/2;
		this.begin.setting=this.setting;
		this.begin.color=this.color;
		this.end.x=this.x+(this.size*0.75)/2;
		this.end.y=this.y-3*this.size/32;
		this.end.size=this.size/2;
		this.end.setting=this.setting;
		this.end.color=this.color;
		this.func.x=this.x+2*(this.size*0.75);
		this.func.y=this.y+this.size/2;
		this.func.size=this.size;
		this.func.setting=this.setting;
		this.func.color=this.color;
	}//end setPlace()

	this.image=function(){
		this.setPlace();
		this.hor=this.size/2;
		this.ver=this.size;
		this.fontSize1=this.ver+"px";
		this.fontSize2=this.ver/2+"px";
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize1+" "+this.fontFamily;
		this.font2=this.fontSize2+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		this.func.image();
		this.end.image();
		this.begin.image();
		sketch.beginPath();
		sketch.font=this.font1;
		sketch.fillStyle=this.color;
		sketch.fillText("(",this.x+2*this.hor,this.y+11*this.ver/8)
		sketch.fillText(")",this.func.u,this.y+11*this.ver/8);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.font=this.font2;
		sketch.fillStyle=this.color;
		sketch.fillText("i =",this.x,this.y+19*this.ver/8)
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.x+2*this.hor,this.y+25*this.ver/16);
		sketch.lineTo(this.x+2*this.hor,this.y+15*this.ver/8);
		sketch.lineTo(this.x,this.y+15*this.ver/8);
		sketch.lineTo(this.x+1.3*this.hor,this.y+this.ver);
		sketch.lineTo(this.x,this.y+this.ver/2);
		sketch.lineTo(this.x+2*this.hor,this.y+this.ver/2);
		sketch.lineTo(this.x+2*this.hor,this.y+9*this.ver/16);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.func.u+this.hor;
		if((this.y+2.5*this.ver)>this.func.v){
			this.v=this.y+2.5*this.ver;
		}
		else{
			this.v=this.func.v;
		}
		this.m=(this.v-this.y)/2-0.25*this.ver;
	}//end image()
}//end Summation









function Integral(x, y, size, setting, begin, end, func, variable, type, color){
	Symbol.call(this, x, y, size, setting, color);
	this.type=type;	//1=definite, 2=indefinite
	this.begin=begin;
	this.func=func;
	this.variable=variable;
	this.end=end;

	this.setPlace=function(){
		this.begin.x=this.x+this.size/2;
		this.begin.y=this.y+11*this.size/8;
		this.begin.size=this.size/2;
		this.begin.setting=this.setting;		
		this.begin.color=this.color;
		this.end.x=this.x+this.size/2;
		this.end.y=this.y-3*this.size/32;
		this.end.size=this.size/2;
		this.end.setting=this.setting;
		this.end.color=this.color;
		this.func.x=this.x+3*this.size/2;
		this.func.y=this.y+this.size/2;
		this.func.size=this.size;
		this.func.setting=this.setting;
		this.func.color=this.color;
		this.variable.y=this.y+this.size/2;
		this.variable.size=this.size;
		this.variable.setting=this.setting;
		this.variable.color=this.color;
	}//end setPlace()

	this.image=function(){
		if(this.type==1){
			this.setPlace();
			this.hor=this.size/2;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontSize2=this.ver/2+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			this.font2=this.fontSize2+" "+this.fontFamily;
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			this.func.image();
			this.end.image();
			this.begin.image();
			this.variable.x=this.func.u+2*this.hor;
			this.variable.image();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("(",this.x+2*this.hor,this.y+11*this.ver/8)
			sketch.fillText(")",this.func.u,this.y+11*this.ver/8);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("d",this.func.u+this.hor,this.y+3*this.ver/2);
			sketch.stroke();
			sketch.closePath();
				//bottom curve
			sketch.beginPath();
			sketch.arc(this.x+this.hor/4,this.y+7*this.ver/4,this.hor/4,0,4);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
				//top curve
			sketch.beginPath();
			sketch.arc(this.x+this.hor/4,this.y+this.ver/4,this.hor/4,3.4,7.14);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.moveTo(this.x+this.hor/2,this.y+7*this.ver/4);
			sketch.lineTo(this.x,this.y+7*this.ver/32);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			this.u=this.func.u+3.5*this.hor;
			if((this.y+2*this.ver)>this.func.v){
				this.v=this.y+2*this.ver;
			}
			else{
				this.v=this.func.v;
			}
			this.m=(this.v-this.y)/2;
		}//end type 1
		else{
			this.setPlace();
			this.hor=this.size/2;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontSize2=this.ver/2+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			this.font2=this.fontSize2+" "+this.fontFamily;
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			this.func.x=this.x+2*this.hor;
			this.func.image();
			this.variable.x=this.func.u+2*this.hor;
			this.variable.image();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("(",this.x+this.hor,this.y+11*this.ver/8)
			sketch.fillText(")",this.func.u,this.y+11*this.ver/8);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("d",this.func.u+this.hor,this.y+3*this.ver/2);
			sketch.stroke();
			sketch.closePath();
				//bottom curve
			sketch.beginPath();
			sketch.arc(this.x+this.hor/4,this.y+7*this.ver/4,this.hor/4,0,4);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
				//top curve
			sketch.beginPath();
			sketch.arc(this.x+this.hor/4,this.y+this.ver/4,this.hor/4,3.4,7.14);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.moveTo(this.x+this.hor/2,this.y+7*this.ver/4);
			sketch.lineTo(this.x,this.y+7*this.ver/32);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			this.u=this.func.u+3.5*this.hor;
			if((this.y+2*this.ver)>this.func.v){
				this.v=this.y+2*this.ver;
			}
			else{
				this.v=this.func.v;
			}
			this.m=(this.v-this.y)/2;
		}//end type 2
	}//end image()
}//end Integral











function FunctionNotation(x, y, size, setting, func, vari, color){
	Symbol.call(this, x, y, size, setting, color);
	this.func=func;
	this.vari=vari;

	this.setPlace=function(){
		this.func.x=this.x;
		this.func.y=this.y;
		this.func.size=this.size;
		this.func.setting=this.setting
		this.func.color=this.color;
		this.vari.y=this.y+this.size/16;
		this.vari.size=this.size;
		this.vari.setting=this.setting;
		this.vari.color=this.color;
	}

	this.image=function(){
		this.setPlace();
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver+"px";
		this.fontSize2=this.ver/2+"px";
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize1+" "+this.fontFamily;
		this.font2=this.fontSize2+" "+this.fontFamily;
		this.func.image();
		this.vari.x=this.func.u+0.5*this.hor;
		this.vari.image();
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.font=this.font1;
		sketch.fillStyle=this.color;
		sketch.fillText("(",this.func.u,this.y+this.ver)
		sketch.fillText(")",this.vari.u,this.y+this.ver);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.vari.u+this.hor;
		if((this.y+1.25*this.ver)>this.vari.v){
			this.v=this.y+1.25*this.ver;
		}
		else{
			this.v=this.vari.v;
		}
		this.m=(this.v-this.y)/2;
	}//end image()
}//end FunctionNotation








function Logarithm(x, y, size, setting, base, number, type, color){
	Symbol.call(this, x, y, size, setting, color);
	this.type=type;							//type 1 is log of some base, type 2 is natural logarithm
	this.base=base;
	this.number=number;

	this.setPlace=function(){
		this.base.x=this.x+3*this.size/2;
		this.base.y=this.y+5*this.size/8;
		this.base.size=5*this.size/8;
		this.base.setting=this.setting;
		this.base.color=this.color;
		this.number.x=this.x+2.5*this.size;
		this.number.y=this.y;
		this.number.size=this.size;
		this.number.setting=this.setting;
		this.number.color=this.color;
	}//end setPlace()

	this.image=function(){
		if(this.type==1){
			this.setPlace();
			this.base.image();
			this.number.image();
			this.hor=this.size*0.75;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontSize2=this.ver/2+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			this.font2=this.fontSize2+" "+this.fontFamily;
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("(",this.base.u,this.y+this.ver)
			sketch.fillText(")",this.number.u,this.y+this.ver);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("log",this.x,this.y+this.ver);
			sketch.stroke();
			sketch.closePath();
			this.u=this.number.u+this.hor;
			if(((this.y+1.2*this.ver)>this.number.v)&&((this.y+1.2*this.ver)>this.base.v)){
				this.v=this.y+1.2*this.ver;
			}
			else{
				if(this.number.v>this.base.v){
					this.v=this.number.v;
				}
				else{
					this.v=this.base.v;
				}
			}
			this.m=(this.v-this.y)/2;
		}//end type 1
		else{
			this.setPlace();
			this.hor=this.size*0.75;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontSize2=this.ver/2+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			this.font2=this.fontSize2+" "+this.fontFamily;
			this.number.x=this.x+1.8*this.hor;
			this.number.image();
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("(",this.x+1.2*this.hor,this.y+this.ver)
			sketch.fillText(")",this.number.u,this.y+this.ver);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("ln",this.x,this.y+this.ver);
			sketch.stroke();
			sketch.closePath();
			this.u=this.number.u+this.hor;
			if((this.y+1.3*this.ver)>this.base.v){
				this.v=this.y+1.3*this.ver;
			}
			else{
				this.v=this.base.v;
			}
			this.m=(this.v-this.y)/2;
		}//end type 2
	}//end image()
}//end Logarithm









/////////////////////////////////////////////  TRIG AND HYPERBOLIC FUNCTIONS  /////////////////////////////////////////////////

	//parent to the trig functions
function TrigonometricFunction(x, y, size, setting, angle, superscript, type, color){
	Symbol.call(this, x, y, size, setting, color);
	this.angle = angle;
	this.superscript = superscript;
	this.type = type; 										//type 1 is trig, type 2 is trig to power, 3 is hyperbolic, 4 is hyperbolic to a power 
	this.trigName = "trig";									//override this in child objects
	this.hyperName = "hyper";								//override this in child objects
	
	this.setPlace = function(){
		this.superscript.x = this.x + 1.5 * this.size;
		this.superscript.y = this.y;
		this.superscript.size = this.size / 2;
		this.superscript.setting = this.setting;
		this.superscript.color = this.color;
		this.angle.x = this.x + this.size;
		this.angle.y = this.y;
		this.angle.size = this.size;
		this.angle.setting = this.setting;
		this.angle.color = this.color;
	}
	
	this.image = function(){
		if(this.type == 1){
			this.setPlace();
			this.hor = this.size / 2;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontSize2 = this.ver / 2 + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			this.font2 = this.fontSize2 + " " + this.fontFamily;
			this.angle.x = this.x + 3.5 * this.hor;
			this.angle.image();
			if(this.angle.m > this.ver / 2){
				this.m = this.angle.m;
				this.y1 = this.y + (this.angle.m - this.ver / 2);
				this.angle.clear();
				this.angle.image();
			}
			else{
				this.m = this.ver / 2;
				this.angle.y = this.angle.y + (this.ver / 2 - this.angle.m);
				this.y1 = this.y;
				this.angle.clear();
				this.angle.image();
			}
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("(", this.x + 2.5 * this.hor, this.y1 + this.ver)
			sketch.fillText(")", this.angle.u, this.y1 + this.ver);
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText(this.trigName, this.x, this.y1 + this.ver);
			sketch.stroke();
			sketch.closePath();
			this.u = this.angle.u + this.hor;
			if((this.y + 1.2 * this.ver) > this.angle.v){
				this.v = this.y + 1.2 * this.ver;
				this.m = (this.v - this.y) / 2;
			}
			else{
				this.v = this.angle.v;
			}
		}//end type 1
		else if(this.type == 2){
			this.setPlace();
			this.hor = this.size / 2;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontSize2 = this.ver / 2 + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			this.font2 = this.fontSize2 + " " + this.fontFamily;
			this.superscript.image();
			this.superscript.clear();
			this.angle.x = this.superscript.u + this.hor;
			this.angle.image();
			if(this.angle.m > this.ver / 2){
				this.m = this.angle.m;
				this.y1 = this.y + (this.angle.m - this.ver / 2);
				this.angle.clear();
				this.angle.image();
			}
			else{
				this.m = this.ver / 2;
				this.angle.y = this.angle.y + (this.ver / 2 - this.angle.m);
				this.y1 = this.y;
				this.angle.clear();
				this.angle.image();
			}
			this.superscript.y = this.y1;
			this.superscript.image();
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("(", this.superscript.u, this.y1 + this.ver)
			sketch.fillText(")", this.angle.u, this.y1 + this.ver);
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText(this.trigName, this.x, this.y1 + this.ver);
			sketch.stroke();
			sketch.closePath();
			this.u = this.angle.u + this.hor;
			if((this.y + 1.2 * this.ver) > this.angle.v){
				this.v = this.y + 1.2 * this.ver;
				this.m = (this.v - this.y) / 2;
			}
			else{
				this.v = this.angle.v;
			}
		}//end type 2
		else if(this.type == 3){
			this.setPlace();
			this.hor = this.size / 2;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontSize2 = this.ver / 2 + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			this.font2 = this.fontSize2 + " " + this.fontFamily;
			this.angle.x = this.x + 4.5 * this.hor;
			this.angle.image();
			if(this.angle.m > this.ver / 2){
				this.m = this.angle.m;
				this.y1 = this.y + (this.angle.m - this.ver / 2);
				this.angle.clear();
				this.angle.image();
			}
			else{
				this.m = this.ver / 2;
				this.angle.y = this.angle.y + (this.ver / 2 - this.angle.m);
				this.y1 = this.y;
				this.angle.clear();
				this.angle.image();
			}
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("(", this.x + 3.5 * this.hor, this.y1 + this.ver)
			sketch.fillText(")", this.angle.u, this.y1 + this.ver);
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText(this.hyperName, this.x, this.y1 + this.ver);
			sketch.stroke();
			sketch.closePath();
			this.u = this.angle.u + this.hor;
			if((this.y + 1.2 * this.ver) > this.angle.v){
				this.v = this.y + 1.2 * this.ver;
				this.m = (this.v - this.y) / 2;
			}
			else{
				this.v = this.angle.v;
			}
		}//end type 3
		else{
			this.setPlace();
			this.hor = this.size / 2;
			this.ver = this.size;
			this.fontSize1 = this.ver + "px";
			this.fontSize2 = this.ver / 2 + "px";
			this.fontFamily = "Times New Roman";
			this.font1 = this.fontSize1 + " " + this.fontFamily;
			this.font2 = this.fontSize2 + " " + this.fontFamily;
			this.angle.x = this.x + 6.5 * this.hor;
			this.angle.image();
			this.superscript.x = this.x + 4 * this.hor;
			this.superscript.image();
			this.superscript.clear();
			if(this.angle.m > this.ver / 2){
				this.m = this.angle.m;
				this.y1 = this.y + (this.angle.m - this.ver / 2);
				this.angle.clear();
				this.angle.image();
			}
			else{
				this.m = this.ver / 2;
				this.angle.y = this.angle.y + (this.ver / 2 - this.angle.m);
				this.y1 = this.y;
				this.angle.clear();
				this.angle.image();
			}
			this.superscript.y = this.y1;
			this.superscript.image();
			let scene = document.getElementById(this.setting);
			let sketch = scene.getContext("2d");
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText("(", this.x + 5.5 * this.hor, this.y1 + this.ver)
			sketch.fillText(")", this.angle.u, this.y1 + this.ver);
			sketch.strokeStyle = this.color;
			sketch.stroke();
			sketch.closePath();
			sketch.beginPath();
			sketch.font = this.font1;
			sketch.fillStyle = this.color;
			sketch.fillText(this.hyperName, this.x, this.y1 + this.ver);
			sketch.stroke();
			sketch.closePath();
			this.u = this.angle.u + this.hor;
			if((this.y + 1.2 * this.ver) > this.angle.v){
				this.v = this.y + 1.2 * this.ver;
				this.m = (this.v - this.y) / 2;
			}
			else{
				this.v = this.angle.v;
			}
		}//end type 4
	}//end image()
}//end TrigonometricFunction







function Sine(x, y, size, setting, angle, superscript, type, color){
	TrigonometricFunction.call(this, x, y, size, setting, angle, superscript, type, color);
	this.trigName = "sin";
	this.hyperName = "hsin";
}//end Sine







function Cosine(x, y, size, setting, angle, superscript, type, color){
	TrigonometricFunction.call(this, x, y, size, setting, angle, superscript, type, color);
	this.trigName = "cos";
	this.hyperName = "hcos";
}//end Cosine







function Tangent(x, y, size, setting, angle, superscript, type, color){
	TrigonometricFunction.call(this, x, y, size, setting, angle, superscript, type, color);
	this.trigName = "tan";
	this.hyperName = "htan";
}//end Tangent






function Cosecant(x, y, size, setting, angle, superscript, type, color){
	TrigonometricFunction.call(this, x, y, size, setting, angle, superscript, type, color);
	this.trigName = "csc";
	this.hyperName = "hcsc";
}//end Cosecant








function Secant(x, y, size, setting, angle, superscript, type, color){
	TrigonometricFunction.call(this, x, y, size, setting, angle, superscript, type, color);
	this.trigName = "sec";
	this.hyperName = "hsec";
}//end Secant








function Cotangent(x, y, size, setting, angle, superscript, type, color){
	TrigonometricFunction.call(this, x, y, size, setting, angle, superscript, type, color);
	this.trigName = "cot";
	this.hyperName = "hcot";
}//end Cotangent












/////////////////////////////////////////////  SET SYMBOLS AND OPERATORS  ///////////////////////////////////////////////////

function Intersect(x, y, size, setting, pre, post, color){
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image=function(){
		this.setPlace();
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver+"px";
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize1+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		this.pre.image();
		this.post.x=this.pre.u+2*this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.arc(this.pre.u+0.75*this.hor,this.y1+0.6*this.ver,0.75*this.hor,3.14,6.29);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.pre.u,this.y1+1.1*this.ver);
		sketch.lineTo(this.pre.u,this.y1+0.6*this.ver);
		sketch.moveTo(this.pre.u+1.5*this.hor,this.y1+1.1*this.ver);
		sketch.lineTo(this.pre.u+1.5*this.hor,this.y1+0.6*this.ver);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		if(((this.y+1.2*this.ver)>this.pre.v)&&((this.y+1.2*this.ver)>this.post.v)){
			this.u=this.post.u;
			this.v=this.y+1.2*this.ver;
		}
		else{
			this.setUV();
		}
	}//end image()
}//end Intersect









function Union(x, y, size, setting, pre, post, color){
	BinarySymbol.call(this, x, y, size, setting, pre, post, color);

	this.image=function(){
		this.setPlace();
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver+"px";
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize1+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		this.pre.image();
		this.post.x=this.pre.u+2*this.hor;
		this.post.image();
		this.setM();
		sketch.beginPath();
		sketch.arc(this.pre.u+0.75*this.hor,this.y1+this.ver/2,0.75*this.hor,0,3.14);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.pre.u,this.y1);
		sketch.lineTo(this.pre.u,this.y1+this.ver/2);
		sketch.moveTo(this.pre.u+1.5*this.hor,this.y1);
		sketch.lineTo(this.pre.u+1.5*this.hor,this.y1+this.ver/2);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.post.u;
		if(((this.y+1.2*this.ver)>this.pre.v)&&((this.y+1.2*this.ver)>this.post.v)){
			this.u=this.post.u;
			this.v=this.y+1.2*this.ver;
		}
		else{
			this.setUV();
		}
	}//end image()
}//end Union




function Grouping(x, y, size, setting, func, type, color){
	Symbol.call(this, x, y, size, setting, color);
	this.type = type;
	this.func=func;

	this.setPlace=function(){
		this.func.x=this.x+this.size*0.75;
		this.func.y=this.y;
		this.func.size=this.size;
		this.func.setting=this.setting;
		this.func.color=this.color;
	}//end setPlace()
	
	this.setType = function(){
		switch(this.type){
			case 1:							//parenthesis
				this.opening = "(";
				this.closing = ")";
				break;
			case 2:							//square brackets
				this.opening = "[";
				this.closing = "]";
				break;
			case 3:							//absolute value
				this.opening = "|";
				this.closing = "|";
				break;
			case 4:							//curly braces
				this.opening = "{";
				this.closing = "}";
				break;
			case 5:							//angle brackets
				this.opening = "<";
				this.closing = ">";
				break;
		}
	}//end setType()

	this.image=function(){
		this.setPlace();
		this.setType();
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver+"px";
		this.fontSize2=this.ver/2+"px";
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize1+" "+this.fontFamily;
		this.font2=this.fontSize2+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		this.func.image();
		if(this.func.m>this.ver/2){
			this.m=this.func.m;
			this.y1=this.y+(this.func.m-this.ver/2);
			this.func.clear();
			this.func.image();
		}
		else{
			this.m=this.ver/2;
			this.func.y=this.func.y+(this.ver/2-this.func.m);
			this.y1=this.y;
			this.func.clear();
			this.func.image();
		}
		sketch.beginPath();
		sketch.font=this.font1;
		sketch.fillStyle=this.color;
		sketch.fillText(this.opening,this.x,this.y1+this.ver);
		sketch.fillText(this.closing,this.func.u,this.y1+this.ver);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.func.u+this.hor;
		if(this.func.v>(this.y+1.5*this.ver)){
			this.v=this.func.v;
		}
		else{
			this.v=this.y+1.5*this.ver;
		}
		this.m=(this.v-this.y)/2;
	}//end image()
}//end Grouping










function CommaSeparated(x, y, size, setting, first, second, color){
	Symbol.call(this, x, y, size, setting, color);
	this.first=first;
	this.second=second;

	this.setPlace=function(){
		this.first.x=this.x;
		this.first.y=this.y;
		this.first.size=this.size;
		this.first.setting=this.setting;
		this.first.color=this.color;
		this.second.y=this.y;
		this.second.size=this.size;
		this.second.setting=this.setting;
		this.second.color=this.color;
	}//end setPlace()

	this.image=function(){
			this.setPlace();
			this.hor=this.size*0.75;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			this.first.image();
			this.second.x=this.first.u+this.hor;
			this.second.image();
			if(this.first.m>this.second.m){
				this.m=this.first.m;
				this.second.y=this.second.y+(this.first.m-this.second.m);
				this.y1=this.y+(this.first.m-this.ver/2);
				this.first.clear();
				this.second.clear();
				this.first.image();
				this.second.image();
			}
			else{
				this.m=this.second.m;
				this.first.y=this.first.y+(this.second.m-this.first.m);
				this.y1=this.y+(this.second.m-this.ver/2);
				this.first.clear();
				this.second.clear();
				this.first.image();
				this.second.image();
			}
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText(", ",this.first.u,this.y1+this.ver);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			this.u=this.second.u
			if(((this.y+1.5*this.ver)>this.first.v)&&((this.y+1.5*this.ver)>this.second.v)){
				this.v=this.y+1.5*this.ver;
			}
			else{
				if(this.first.v>this.second.v){
					this.v=this.first.v;
				}
				else{
					this.v=this.second.v;
				}
			}
	}//end image()
}//end CommaSeparated








function That(x, y, size, setting, first, second, color){
		// "given that" or "such that" --the vertical line
	Symbol.call(this, x, y, size, setting, color);
	this.first=first;
	this.second=second;

	this.setPlace=function(){
		this.first.x=this.x;
		this.first.y=this.y;
		this.first.size=this.size;
		this.first.setting=this.setting;
		this.first.color=this.color;
		this.second.y=this.y;
		this.second.size=this.size;
		this.second.setting=this.setting;
		this.second.color=this.color;
	}//end setPlace()

	this.image=function(){
		this.setPlace();
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver+"px";
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize1+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		this.first.image();
		this.second.x=this.first.u+this.hor;
		this.second.image();
		if(this.first.m>this.second.m){
			this.m=this.first.m;
			this.second.y=this.second.y+(this.first.m-this.second.m);
			this.y1=this.y+(this.first.m-this.ver/2);
			this.first.clear();
			this.second.clear();
			this.first.image();
			this.second.image();
		}
		else{
			this.m=this.second.m;
			this.first.y=this.first.y+(this.second.m-this.first.m);
			this.y1=this.y+(this.second.m-this.ver/2);
			this.first.clear();
			this.second.clear();
			this.first.image();
			this.second.image();
		}
		sketch.beginPath();
		sketch.font=this.font1;
		sketch.fillStyle=this.color;
		sketch.fillText(" | ",this.first.u,this.y1+this.ver);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.second.u;
		if(((this.y+1.5*this.ver)>this.first.v)&&((this.y+1.5*this.ver)>this.second.v)){
			this.v=this.y+1.5*this.ver;
		}
		else{
			if(this.first.v>this.second.v){
				this.v=this.first.v;
			}
			else{
				this.v=this.second.v;
			}
		}
	}//end image()
}//end That










function Interval(x, y, size, setting, begin, end, type, color){
	Symbol.call(this, x, y, size, setting, color);
	this.begin = begin;
	this.end = end;
	this.type = type;

	this.setPlace=function(){
		this.begin.x=this.x+this.size*0.75;
		this.begin.y=this.y;
		this.begin.size=this.size;
		this.begin.setting=this.setting;
		this.begin.color=this.color;
		this.end.y=this.y;
		this.end.size=this.size;
		this.end.setting=this.setting;
		this.end.color=this.color;
	}//end setPlace()
	
	this.setType = function(){
		switch(this.type){
			case 1:							//open-open
				this.opening = "(";
				this.closing = ")";
				break;
			case 2:							//close-close
				this.opening = "[";
				this.closing = "]";
				break;
			case 3:							//open-close
				this.opening = "(";
				this.closing = "]";
				break;
			case 4:							//close-open
				this.opening = "[";
				this.closing = ")";
				break;
		}
	}//end setType()

	this.image=function(){
		this.setPlace();
		this.setType();
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver+"px";
		this.fontSize2=this.ver/2+"px";
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize1+" "+this.fontFamily;
		this.font2=this.fontSize2+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		this.begin.image();
		this.end.x=this.begin.u+this.hor;
		this.end.image();
		if(this.begin.m>this.end.m){
			this.m=this.begin.m;
			this.end.y=this.end.y+(this.begin.m-this.end.m);
			this.y1=this.y+(this.begin.m-this.ver/2);
			this.begin.clear();
			this.end.clear();
			this.begin.image();
			this.end.image();
		}
		else{
			this.m=this.end.m;
			this.begin.y=this.begin.y+(this.end.m-this.begin.m);
			this.y1=this.y+(this.end.m-this.ver/2);
			this.begin.clear();
			this.end.clear();
			this.begin.image();
			this.end.image();
		}
		sketch.beginPath();
		sketch.font=this.font1;
		sketch.fillStyle=this.color;
		sketch.fillText(this.opening,this.x,this.y1+this.ver);
		sketch.fillText(", ",this.begin.u,this.y1+this.ver);
		sketch.fillText(this.closing,this.end.u,this.y1+this.ver);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.end.u+this.hor;
		if(((this.y+1.4*this.ver)>this.begin.v)&&((this.y+1.4*this.ver)>this.end.v)){
			this.v=this.y+1.4*this.ver;
		}
		else{
			if(this.begin.v>this.end.v){
				this.v=this.begin.v;
			}
			else{
				this.v=this.end.v;
			}
		}
	}//end image()
}//end Interval









function OrderedPair(x, y, size, setting, first, second, third, type, color){
		//can probably replace this with grouping and commaseparated
	Symbol.call(this, x, y, size, setting, color);
	this.type=type;		// type1=() with 2, type2=<> with 2, type3=() with 3, type4=<> with 3
	this.first=first;
	this.second=second;
	this.third=third;

	this.setPlace=function(){
		this.first.x=this.x+this.size*0.75;
		this.first.y=this.y;
		this.first.size=this.size;
		this.first.setting=this.setting;
		this.first.color=this.color;
		this.second.y=this.y;
		this.second.size=this.size;
		this.second.setting=this.setting;
		this.second.color=this.color;
		this.third.y=this.y;
		this.third.size=this.size;
		this.third.setting=this.setting;
		this.third.color=this.color;
	}//end setPlace()

	this.image=function(){
		if(this.type==1){
			this.setPlace();
			this.hor=this.size*0.75;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontSize2=this.ver/2+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			this.font2=this.fontSize2+" "+this.fontFamily;
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			this.first.image();
			this.second.x=this.first.u+this.hor;
			this.second.image();
			if(this.first.m>this.second.m){
				this.m=this.first.m;
				this.second.y=this.second.y+(this.first.m-this.second.m);
				this.y1=this.y+(this.first.m-this.ver/2);
				this.first.clear();
				this.second.clear();
				this.first.image();
				this.second.image();
			}
			else{
				this.m=this.second.m;
				this.first.y=this.first.y+(this.second.m-this.first.m);
				this.y1=this.y+(this.second.m-this.ver/2);
				this.first.clear();
				this.second.clear();
				this.first.image();
				this.second.image();
			}
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("(",this.x,this.y1+this.ver);
			sketch.fillText(", ",this.first.u,this.y1+this.ver);
			sketch.fillText(")",this.second.u,this.y1+this.ver);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			this.u=this.second.u+this.hor;
			if(((this.y+1.4*this.ver)>this.first.v)&&((this.y+1.4*this.ver)>this.second.v)){
				this.v=this.y+1.5*this.ver;
			}
			else{
				if(this.first.v>this.second.v){
					this.v=this.first.v;
				}
				else{
					this.v=this.second.v;
				}
			}
		}//end type 1
		else if(this.type==2){
			this.setPlace();
			this.hor=this.size*0.75;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontSize2=this.ver/2+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			this.font2=this.fontSize2+" "+this.fontFamily;
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			this.first.image();
			this.second.x=this.first.u+this.hor;
			this.second.image();
			if(this.first.m>this.second.m){
				this.m=this.first.m;
				this.second.y=this.second.y+(this.first.m-this.second.m);
				this.y1=this.y+(this.first.m-this.ver/2);
				this.first.clear();
				this.second.clear();
				this.first.image();
				this.second.image();
			}
			else{
				this.m=this.second.m;
				this.first.y=this.first.y+(this.second.m-this.first.m);
				this.y1=this.y+(this.second.m-this.ver/2);
				this.first.clear();
				this.second.clear();
				this.first.image();
				this.second.image();
			}
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("<",this.x,this.y1+this.ver);
			sketch.fillText(", ",this.first.u,this.y1+this.ver);
			sketch.fillText(">",this.second.u,this.y1+this.ver);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			this.u=this.second.u+this.hor;
			if(((this.y+1.4*this.ver)>this.first.v)&&((this.y+1.4*this.ver)>this.second.v)){
				this.v=this.y+1.5*this.ver;
			}
			else{
				if(this.first.v>this.second.v){
					this.v=this.first.v;
				}
				else{
					this.v=this.second.v;
				}
			}
		}//end type 2
		else if(this.type==3){
			this.setPlace();
			this.hor=this.size*0.75;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontSize2=this.ver/2+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			this.font2=this.fontSize2+" "+this.fontFamily;
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			this.first.image();
			this.second.x=this.first.u+this.hor;
			this.second.image();
			this.third.x=this.second.u+this.hor;
			this.third.image();
			if((this.first.m>this.second.m)&&(this.first.m>this.third.m)){
				if(this.second.m>this.third.m){
					this.m=this.first.m;
					this.second.y=this.second.y+(this.first.m-this.second.m);
					this.third.y=this.third.y+(this.first.m-this.second.m);
					this.y1=this.y+(this.first.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
				else{
					this.m=this.first.m;
					this.third.y=this.third.y+(this.first.m-this.third.m);
					this.second.y=this.second.y+(this.first.m-this.third.m);
					this.y1=this.y+(this.first.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
			}
			else if((this.second.m>this.first.m)&&(this.second.m>this.third.m)){
				if(this.first.m>this.third.m){
					this.m=this.second.m;
					this.first.y=this.first.y+(this.second.m-this.first.m);
					this.third.y=this.third.y+(this.second.m-this.first.m);
					this.y1=this.y+(this.second.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
				else{
					this.m=this.second.m;
					this.third.y=this.third.y+(this.second.m-this.third.m);
					this.second.y=this.second.y+(this.second.m-this.third.m);
					this.y1=this.y+(this.second.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
			}
			else{
				if(this.first.m>this.second.m){
					this.m=this.third.m;
					this.first.y=this.first.y+(this.third.m-this.third.m);
					this.second.y=this.third.y+(this.third.m-this.third.m);
					this.y1=this.y+(this.third.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
				else{
					this.m=this.third.m;
					this.second.y=this.second.y+(this.third.m-this.second.m);
					this.first.y=this.first.y+(this.third.m-this.second.m);
					this.y1=this.y+(this.third.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
			}
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("(",this.x,this.y1+this.ver);
			sketch.fillText(", ",this.first.u,this.y1+this.ver);
			sketch.fillText(", ",this.second.u,this.y1+this.ver);
			sketch.fillText(")",this.third.u,this.y+this.ver);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			this.u=this.third.u+this.hor;
			if(((this.y+1.4*this.ver)>this.first.v)&&((this.y+1.4*this.ver)>this.second.v)&&((this.y+1.4*this.ver)>this.third.v)){
				this.v=this.y+1.5*this.ver;
			}
			else{
				if((this.first.v>this.second.v)&&(this.first.v>this.third.v)){
					this.v=this.first.v;
				}
				else if((this.second.v>this.first.v)&&(this.second.v>this.third.v)){
					this.v=this.second.v;
				}
				else{
					this.v=this.third.v;
				}
			}
		}//end type 3
		else{
			this.setPlace();
			this.hor=this.size*0.75;
			this.ver=this.size;
			this.fontSize1=this.ver+"px";
			this.fontSize2=this.ver/2+"px";
			this.fontFamily="Times New Roman";
			this.font1=this.fontSize1+" "+this.fontFamily;
			this.font2=this.fontSize2+" "+this.fontFamily;
			let scene=document.getElementById(this.setting);
			let sketch=scene.getContext("2d");
			this.first.image();
			this.second.x=this.first.u+this.hor;
			this.second.image();
			this.third.x=this.second.u+this.hor;
			this.third.image();
			if((this.first.m>this.second.m)&&(this.first.m>this.third.m)){
				if(this.second.m>this.third.m){
					this.m=this.first.m;
					this.second.y=this.second.y+(this.first.m-this.second.m);
					this.third.y=this.third.y+(this.first.m-this.second.m);
					this.y1=this.y+(this.first.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
				else{
					this.m=this.first.m;
					this.third.y=this.third.y+(this.first.m-this.third.m);
					this.second.y=this.second.y+(this.first.m-this.third.m);
					this.y1=this.y+(this.first.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
			}
			else if((this.second.m>this.first.m)&&(this.second.m>this.third.m)){
				if(this.first.m>this.third.m){
					this.m=this.second.m;
					this.first.y=this.first.y+(this.second.m-this.first.m);
					this.third.y=this.third.y+(this.second.m-this.first.m);
					this.y1=this.y+(this.second.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
				else{
					this.m=this.second.m;
					this.third.y=this.third.y+(this.second.m-this.third.m);
					this.second.y=this.second.y+(this.second.m-this.third.m);
					this.y1=this.y+(this.second.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
			}
			else{
				if(this.first.m>this.second.m){
					this.m=this.third.m;
					this.first.y=this.first.y+(this.third.m-this.third.m);
					this.second.y=this.third.y+(this.third.m-this.third.m);
					this.y1=this.y+(this.third.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
				else{
					this.m=this.third.m;
					this.second.y=this.second.y+(this.third.m-this.second.m);
					this.first.y=this.first.y+(this.third.m-this.second.m);
					this.y1=this.y+(this.third.m-this.ver/2);
					this.first.clear();
					this.second.clear();
					this.third.clear();
					this.first.image();
					this.second.image();
					this.third.image();
				}
			}
			sketch.beginPath();
			sketch.font=this.font1;
			sketch.fillStyle=this.color;
			sketch.fillText("<",this.x,this.y1+this.ver);
			sketch.fillText(", ",this.first.u,this.y1+this.ver);
			sketch.fillText(", ",this.second.u,this.y1+this.ver);
			sketch.fillText(">",this.third.u,this.y1+this.ver);
			sketch.strokeStyle=this.color;
			sketch.stroke();
			sketch.closePath();
			this.u=this.third.u+this.hor;
			if(((this.y+1.4*this.ver)>this.first.v)&&((this.y+1.4*this.ver)>this.second.v)&&((this.y+1.4*this.ver)>this.third.v)){
				this.v=this.y+1.5*this.ver;
			}
			else{
				if((this.first.v>this.second.v)&&(this.first.v>this.third.v)){
					this.v=this.first.v;
				}
				else if((this.second.v>this.first.v)&&(this.second.v>this.third.v)){
					this.v=this.second.v;
				}
				else{
					this.v=this.third.v;
				}
			}
		}//end type 4
	}//end image()
}//end OrderedPair










////////////////////////////////////////////  DESCRIPTIVE SYMBOLS  //////////////////////////////////////////////////////

function ThereExists(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.moveTo(this.x,this.y);
		sketch.lineTo(this.x+this.hor,this.y);
		sketch.lineTo(this.x+this.hor,this.y+this.ver);
		sketch.lineTo(this.x,this.y+this.ver);
		sketch.moveTo(this.x+this.hor,this.y+this.ver/2);
		sketch.lineTo(this.x+this.hor/3,this.y+this.ver/2);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+this.hor;
		this.v=this.y+this.ver;
		this.a=this.x;
		this.b=this.y;
		this.c=this.u;
		this.d=this.v;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end ThereExists








function Implies(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.moveTo(this.x,this.y+3*this.ver/8);
		sketch.lineTo(this.x+59*this.hor/32,this.y+3*this.ver/8);
		sketch.moveTo(this.x,this.y+5*this.ver/8);
		sketch.lineTo(this.x+59*this.hor/32,this.y+5*this.ver/8);
		sketch.moveTo(this.x+3*this.hor/2,this.y+this.ver/8);
		sketch.lineTo(this.x+2*this.hor,this.y+this.ver/2);
		sketch.lineTo(this.x+3*this.hor/2,this.y+7*this.ver/8);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+2*this.hor;
		this.v=this.y+this.ver;
		this.a=this.x;
		this.b=this.y;
		this.c=this.u;
		this.d=this.v;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end Implies







function IfAndOnlyIf(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.moveTo(this.x+5*this.hor/32,this.y+3*this.ver/8);
		sketch.lineTo(this.x+59*this.hor/32,this.y+3*this.ver/8);
		sketch.moveTo(this.x+5*this.hor/32,this.y+5*this.ver/8);
		sketch.lineTo(this.x+59*this.hor/32,this.y+5*this.ver/8);
		sketch.moveTo(this.x+3*this.hor/2,this.y+this.ver/8);
		sketch.lineTo(this.x+2*this.hor,this.y+this.ver/2);
		sketch.lineTo(this.x+3*this.hor/2,this.y+7*this.ver/8);
		sketch.moveTo(this.x+this.hor/2,this.y+this.ver/8);
		sketch.lineTo(this.x,this.y+this.ver/2);
		sketch.lineTo(this.x+this.hor/2,this.y+7*this.ver/8);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+2*this.hor;
		this.v=this.y+this.ver;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end IfAndOnlyIf








function Therefore(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let counter=0;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		counter=0;
		while(counter<=this.hor/8){
			sketch.arc(this.x+this.hor/2,this.y+this.ver/3,counter,0,6.29);
			counter=counter+1;
		}
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		counter=0;
		while(counter<=this.hor/8){
			sketch.arc(this.x,this.y+this.ver,counter,0,6.29);
			counter=counter+1;
		}
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		counter=0;
		while(counter<=this.hor/8){
			sketch.arc(this.x+this.hor,this.y+this.ver,counter,0,6.29);
			counter=counter+1;
		}
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+this.hor;
		this.v=this.y+this.ver;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end Therefore







function Because(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let counter=0;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		counter=0;
		while(counter<=this.hor/8){
			sketch.arc(this.x+this.hor/2,this.y+2*this.ver/3,counter,0,6.29);
			counter=counter+1;
		}
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		counter=0;
		while(counter<=this.hor/8){
			sketch.arc(this.x,this.y,counter,0,6.29);
			counter=counter+1;
		}
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		counter=0;
		while(counter<=this.hor/8){
			sketch.arc(this.x+this.hor,this.y,counter,0,6.29);
			counter=counter+1;
		}
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+this.hor;
		this.v=this.y+this.ver;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end Because










function ElementOf(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);
	
	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.arc(this.x+this.hor/2,this.y+this.ver/2,this.hor/2,1.57,4.74);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.x+this.hor/2,this.y+this.ver/8);
		sketch.lineTo(this.x+3*this.hor/2,this.y+this.ver/8);
		sketch.moveTo(this.x,this.y+this.ver/2);
		sketch.lineTo(this.x+3*this.hor/2,this.y+this.ver/2);
		sketch.moveTo(this.x+this.hor/2,this.y+7*this.ver/8);
		sketch.lineTo(this.x+3*this.hor/2,this.y+7*this.ver/8);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+1.5*this.hor;
		this.v=this.y+this.ver;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end ElementOf









function NotElementOf(x, y, size, setting, color){
		//can probably combine this with ElementOf
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.arc(this.x+this.hor/2,this.y+this.ver/2,this.hor/2,1.57,4.74);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.x+this.hor/2,this.y+this.ver/8);
		sketch.lineTo(this.x+3*this.hor/2,this.y+this.ver/8);
		sketch.moveTo(this.x,this.y+this.ver/2);
		sketch.lineTo(this.x+3*this.hor/2,this.y+this.ver/2);
		sketch.moveTo(this.x+this.hor/2,this.y+7*this.ver/8);
		sketch.lineTo(this.x+3*this.hor/2,this.y+7*this.ver/8);
		sketch.moveTo(this.x+0.25*this.hor,this.y+this.ver);
		sketch.lineTo(this.x+1.25*this.hor,this.y);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+1.5*this.hor;
		this.v=this.y+this.ver;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end NotElementOf








function Subset(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.arc(this.x+this.hor/2,this.y+this.ver/3,this.ver/3,1.57,4.7);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.x+this.hor/2,this.y);
		sketch.lineTo(this.x+1.5*this.hor,this.y);
		sketch.moveTo(this.x+this.hor/2,this.y+2*this.ver/3);
		sketch.lineTo(this.x+1.5*this.hor,this.y+2*this.ver/3);
		sketch.moveTo(this.x,this.y+this.ver);
		sketch.lineTo(this.x+1.5*this.hor,this.y+this.ver);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+1.5*this.hor;
		this.v=this.y+this.ver;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end Subset








function NotSubset(x, y, size, setting, color){
		//can probably combine this with Subset
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.arc(this.x+this.hor/2,this.y+this.ver/3,this.ver/3,1.57,4.7);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(this.x+this.hor/2,this.y);
		sketch.lineTo(this.x+1.5*this.hor,this.y);
		sketch.moveTo(this.x+this.hor/2,this.y+2*this.ver/3);
		sketch.lineTo(this.x+1.5*this.hor,this.y+2*this.ver/3);
		sketch.moveTo(this.x,this.y+this.ver);
		sketch.lineTo(this.x+1.5*this.hor,this.y+this.ver);
		sketch.moveTo(this.x+0.25*this.hor,this.y+1.2*this.ver);
		sketch.lineTo(this.x+1.25*this.hor,this.y-0.2*this.ver);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+1.5*this.hor;
		this.v=this.y+1.2*this.ver;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end NotSubset








function ForAll(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.moveTo(this.x,this.y);
		sketch.lineTo(this.x+this.hor/2,this.y+this.ver);
		sketch.lineTo(this.x+this.hor,this.y);
		sketch.moveTo(this.x+this.hor/4,this.y+this.ver/2);
		sketch.lineTo(this.x+3*this.hor/4,this.y+this.ver/2);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+this.hor;
		this.v=this.y+this.ver;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end ForAll








function LogicalOr(x, y, size, setting, color){
		//this should probably be modified into a binary symbol
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.moveTo(this.x,this.y);
		sketch.lineTo(this.x+this.hor/2,this.y+this.ver);
		sketch.lineTo(this.x+this.hor,this.y);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+this.hor;
		this.v=this.y+this.ver;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end LogicalOr







function LogicalAnd(x, y, size, setting, color){
		//this should probably be modified into a binary symbol
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size*0.75;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.moveTo(this.x,this.y+this.ver);
		sketch.lineTo(this.x+this.hor/2,this.y);
		sketch.lineTo(this.x+this.hor,this.y+this.ver);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+this.hor;
		this.v=this.y+this.ver;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end LogicalAnd









function Assumption(x, y, size, setting, color){
	Symbol.call(this, x, y, size, setting, color);

	this.image=function(){
		this.hor=this.size;
		this.ver=this.size;
		this.fontSize1=this.ver/3;
		this.fontFamily="Times New Roman";
		this.font1=this.fontSize+" "+this.fontFamily;
		let scene=document.getElementById(this.setting);
		let sketch=scene.getContext("2d");
		sketch.beginPath();
		sketch.arc(x+this.hor/2,y+this.ver/5,this.hor/4,1.57,5.5);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.arc(x+this.hor/2,y+7*this.ver/10,this.hor/4,4.71,2.2);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		sketch.beginPath();
		sketch.moveTo(x+this.hor/3,y+7*this.ver/18);
		sketch.lineTo(x+this.hor/3,y+11*this.ver/8);
		sketch.strokeStyle=this.color;
		sketch.stroke();
		sketch.closePath();
		this.u=this.x+this.hor;
		this.v=this.y+1.4*this.ver;
		this.m=(this.v-this.y)/2;
	}//end image()
}//end Assumption




		//////////////////////////////////////////////////////////////////////////////////////
		//                                                                                  //
		//     Other Symbols to Draw                                                        //
		//           1.) curly d for partial derivative                                     //
		//           2.) nabla and delta                                                    //
		//           3.) composition                                                        //
		//           4.) ...                                                                //
		//                                                                                  //
		//////////////////////////////////////////////////////////////////////////////////////






