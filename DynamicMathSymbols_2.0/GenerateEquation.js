

		////////////////////////////////////////////////////////////////
		//            Dynamic Mathematical Notation Symbols           //
		//                           Version 2.0                      //
		//                  Generate Algebra Equations                //
		//                                                            //
		//                          Created By:                       //
		//                    Christopher S. Francis                  //
		//                August 2016 through...                      //
		//                                                            //
		////////////////////////////////////////////////////////////////


		
			/*
			 * Here is  a sample of this project in action. It generates 
			 * various algebra equations with a randomly selected variable.
			 * It returns the correct and three incorrect answers to be used
			 * in what's basically an animated multiple choice thing. As of the
			 * date of this git-hub commit (1 June 2019) the site this goes with
			 * is being tested at studygames.co.nf, the guest account has "guest" for
			 * both the username and password, if you'd like to check it out.
			 */

function pickVariable(){
	let variable="x";
	let letter=Math.floor(Math.random()*26)+1;
	let capital=Math.floor(Math.random()*2);
	
		//determine which letter to use
	switch(letter){
		case 1: (capital==0) ? variable = "a" : variable = "A"; break;
		case 2: (capital==0) ? variable = "b" : variable = "B"; break;
		case 3: (capital==0) ? variable = "c" : variable = "C"; break;
		case 4: (capital==0) ? variable = "d" : variable = "D"; break;
		case 5: (capital==0) ? variable = "e" : variable = "E"; break;
		case 6: (capital==0) ? variable = "f" : variable = "F"; break;
		case 7: (capital==0) ? variable = "g" : variable = "G"; break;
		case 8: (capital==0) ? variable = "h" : variable = "H"; break;
		case 9: (capital==0) ? variable = "i" : variable = "I"; break;
		case 10: (capital==0) ? variable = "j" : variable = "J"; break;
		case 11: (capital==0) ? variable = "k" : variable = "K"; break;
		case 12: (capital==0) ? variable = "l" : variable = "L"; break;
		case 13: (capital==0) ? variable = "m" : variable = "M"; break;
		case 14: (capital==0) ? variable = "n" : variable = "N"; break;
		case 15: (capital==0) ? variable = "o" : variable = "O"; break;
		case 16: (capital==0) ? variable = "p" : variable = "P"; break;
		case 17: (capital==0) ? variable = "q" : variable = "Q"; break;
		case 18: (capital==0) ? variable = "r" : variable = "R"; break;
		case 19: (capital==0) ? variable = "s" : variable = "S"; break;
		case 20: (capital==0) ? variable = "t" : variable = "T"; break;
		case 20: (capital==0) ? variable = "u" : variable = "U"; break;
		case 20: (capital==0) ? variable = "v" : variable = "V"; break;
		case 20: (capital==0) ? variable = "w" : variable = "W"; break;
		case 20: (capital==0) ? variable = "x" : variable = "X"; break;
		case 20: (capital==0) ? variable = "y" : variable = "Y"; break;
		case 20: (capital==0) ? variable = "z" : variable = "Z"; break;
	}
	
		//reject {o,l,e,i}
	if((variable == "o") || (variable == "O") || (variable == "l") || (variable == "e") || (variable == "i") ){
		variable=pickVariable();
		return(variable);
	}
	else{
		return(variable);
	}
}//end pickVariable()





function getSize(direction, setting){
	var scene=document.getElementById(setting);
	if(direction == 1){
		return(this.scene.width);
	}
	else if(direction == 2){
		return(scene.height);
	}
	else if(direction == 3){
		return(scene.width / 2);
	}
	else if(direction == 4){
		return(scene.height / 2);
	}
	else{
		return(0);
	}
}//end getSize()


//////////////////////////////////////////  ALGEBRA EQUATIONS  ////////////////////////////////////////


	  
function AlgebraParent(size, setting, placement, color, variable){
	this.size = size										//size of the text
	this.setting = setting;									//canvas element to draw to
	this.placement = placement;								//type of answer returned
	this.color = color;										//color of the text
	this.variable = variable;								//variable to use in equation
	this.screenMiddle = getSize(3,this.setting);			//alignment on the canvas element
	this.answerSet = new Array();							//correct and alternate answers to be returned
	this.rightAnswer = "";									//answers are strings for the possibly non-math game objects in engine
	
	this.setCoefficient = function(value){
		//let stringValue = "" + value + "";
		if(value < 0)
		{
			let stringValue = "" + (Math.abs(value)) + "";
			let temp=new Term(20, 20, 20, this.setting, stringValue, this.color);
			return new Negation(20, 20, 20, this.setting, temp, 1, this.color);
		}
		else
		{
			let stringValue = "" + value + "";
			return new Term(10,10,this.size,this.setting,stringValue,this.color);
		}
		//return(new Term(20,220,20,this.setting,stringValue,this.color));
	}//end setCoefficient()
	
	this.makeKey = function(){
		if(placement == 0){
				//just the correct answer
			this.answerSet[0] = this.rightAnswer;
		}
		else if(this.placement==1){
				//correct answer, 3 incorrect answers, and marker indicating which slot has correct answer(a, b, c, d)
			this.answerSet = new Options(this.rightAnswer).choices;
		}
	}//end makeKey()
}//end AlgebraParent






function AlgebraType0(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);
		
	this.unknown = new Term(20, 120, 20, this.setting, this.variable, this.color);
	this.A = Math.floor(Math.random() * 100);
	this.B = Math.floor(Math.random() * 100);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);
		
	this.type=Math.floor(Math.random()*2);
	if(this.type==0)
	{
			//variable + constant = constant
				//no  negatives
		if(this.A<=this.B)
		{
			this.left=Math.floor(Math.random()*2);
			if(this.left==0)
			{
				this.adding=new Addition(20,420,20,this.setting,this.unknown,this.a,this.color);
				this.equals=new Same(0,20,this.size,this.setting,this.adding,this.b,this.color);
				this.equals.image();
				this.equals.clear();
				this.midpoint=this.equals.u/2;
				this.equals.x=Math.floor(this.screenMiddle-this.midpoint);
			}
			else
			{
				this.adding=new Addition(20,420,20,this.setting,this.unknown,this.a,this.color);
				this.equals=new Same(0,20,this.size,this.setting,this.b,this.adding,this.color);
				this.equals.image();
				this.equals.clear();
				this.midpoint=this.equals.u/2;
				this.equals.x=Math.floor(this.screenMiddle-this.midpoint);
			}

			this.rightAnswer=this.B-this.A;
		}	
		else
		{
			this.oops=0;
		}
	}
	else
	{
			//variable - constant = constant
				//no negatives
		this.left=Math.floor(Math.random()*2);
		if(this.left==0)
		{
			this.subtracting=new Subtraction(20,420,20,this.setting,this.unknown,this.a,this.color);
			this.equals=new Same(0,20,this.size,this.setting,this.subtracting,this.b,this.color);
			this.equals.image();
			this.equals.clear();
			this.midpoint=this.equals.u/2;
			this.equals.x=Math.floor(this.screenMiddle-this.midpoint);
		}
		else
		{
			this.subtracting=new Subtraction(20,420,20,this.setting,this.unknown,this.a,this.color);
			this.equals=new Same(0,20,this.size,this.setting,this.b,this.subtracting,this.color);
			this.equals.image();
			this.equals.clear();
			this.midpoint=this.equals.u/2;
			this.equals.x=Math.floor(this.screenMiddle-this.midpoint);
		}

		this.rightAnswer=this.B+this.A;
	}
	this.makeKey();
}//end AlgebraType0






function AlgebraType1(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);

		//variable + constant = constant
			//allow negative answers
	this.unknown = new Term(20, 120, 20, this.setting, this.variable, this.color);
	this.A = Math.floor(Math.random() * 100);
	this.B = Math.floor(Math.random() * 100);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);

	if(this.A>=this.B)
	{
		this.left=Math.floor(Math.random()*2);
		if(this.left==0)
		{
			this.adding=new Addition(20,420,20,this.setting,this.unknown,this.a,this.color);
			this.equals=new Same(0,20,this.size,this.setting,this.adding,this.b,this.color);
			this.equals.image();
			this.equals.clear();
			this.midpoint=this.equals.u/2;
			this.equals.x=Math.floor(this.screenMiddle-this.midpoint);
		}
		else
		{
			this.adding=new Addition(20,420,20,this.setting,this.unknown,this.a,this.color);
			this.equals=new Same(0,20,this.size,this.setting,this.b,this.adding,this.color);
			this.equals.image();
			this.equals.clear();
			this.midpoint=this.equals.u/2;
			this.equals.x=Math.floor(this.screenMiddle-this.midpoint);
		}

		this.rightAnswer=this.B-this.A;
	}
	else
	{
		this.oops=0;
	}
	this.makeKey();
}//end AlgebraType1






function AlgebraType2(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);

		//variable - constant = constant
			//with negatives
	
	this.unknown = new Term(20, 20, 20, this.setting, this.variable, this.color);
	this.A = (-1) * Math.floor(Math.random() * 101);
	this.B = 100 - Math.floor(Math.random() * 201);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);

	this.left=Math.floor(Math.random()*2);
	if(this.left==0)
	{
		this.subtracting=new Subtraction(10,10,this.size,this.setting,this.unknown,this.a,this.color);
		this.equals=new Same(0,20,this.size,this.setting,this.subtracting,this.b,this.color);
		this.equals.image();
		this.equals.clear();
		this.midpoint=this.equals.u/2;
		this.equals.x=Math.floor(this.screenMiddle-this.midpoint);
	}
	else
	{
		this.subtracting=new Subtraction(10,10,this.size,this.setting,this.unknown,this.a,this.color);
		this.equals=new Same(0,20,this.size,this.setting,this.b,this.subtracting,this.color);
		this.equals.image();
		this.equals.clear();
		this.midpoint=this.equals.u/2;
		this.equals.x=Math.floor(this.screenMiddle-this.midpoint);
	}

	this.rightAnswer=this.B+this.A;
	this.makeKey();
}//end AlgebraType2






function AlgebraType3(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);

		//constant - variable = constant
	this.unknown = new Term(20, 20, 20, this.setting, this.variable, this.color);
	this.A = 100 - Math.floor(Math.random() * 201);
	this.B = 100 - Math.floor(Math.random() * 201);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);

	this.left=Math.floor(Math.random()*2);
	if(this.left==0)
	{
		this.subtracting=new Subtraction(10,10,this.size,this.setting,this.a,this.unknown,this.color);
		this.equals=new Same(0,20,this.size,this.setting,this.subtracting,this.b,this.color);
		this.equals.image();
		this.equals.clear();
		this.midpoint=this.equals.u/2;
		this.equals.x=Math.floor(this.screenMiddle-this.midpoint);
	}
	else
	{
		this.subtracting=new Subtraction(10,10,this.size,this.setting,this.a,this.unknown,this.color);
		this.equals=new Same(0,20,this.size,this.setting,this.b,this.subtracting,this.color);
		this.equals.image();
		this.equals.clear();
		this.midpoint=this.equals.u/2;
		this.equals.x=Math.floor(this.screenMiddle-this.midpoint);
	}

	this.rightAnswer=(this.B-this.A)/(-1);
	this.makeKey();
}//end AlgebraType3






function AlgebraType4(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);

		//constant * variable + constant = constant
	this.unknown = new Term(20, 20, 20, this.setting, this.variable, this.color);
	this.A = 100 - Math.floor(Math.random() * 201);
	this.B = 100 - Math.floor(Math.random() * 201);
	this.C = 100 - Math.floor(Math.random() * 201);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);
	this.c = this.setCoefficient(this.C);

		//avoid division by zero
	if(this.A == 0){
		this.oops = 0;
	}
	else{
			//make sure the answer is an integer
		if((this.C-this.B) % this.A != 0){
			this.oops=0;
		}
		else{
			this.left=Math.floor(Math.random()*2);
			if(this.A==1)
			{
				this.aX=this.unknown;
			}
			else if(this.A==-1)
			{
				this.aX=new Negation(10,10,this.size,this.setting,this.unknown,1,this.color);
			}
			else
			{
				this.aX=new Multiplication(10,10,this.size,this.setting,this.a,this.unknown,4,this.color);
			}

			if(this.B>0)
			{
				this.axPlusB=new Addition(10,10,this.size,this.setting,this.aX,this.b,this.color);
			}
			else if(this.B<0)
			{
				this.tempB = this.setCoefficient(Math.abs(this.B)); //to avoid +- signs
				this.axPlusB=new Subtraction(10,10,this.size,this.setting,this.aX,this.tempB,this.color);
			}
			else
			{
				this.axPlusB=this.aX;
			}

			if(this.left==0)
			{
				this.equals=new Same(0,20,this.size,this.setting,this.axPlusB,this.c,this.color);
			}
			else
			{
				this.equals=new Same(0,20,this.size,this.setting,this.c,this.axPlusB,this.color);
			}

			this.equals.image();
			this.equals.clear();
			this.midpoint=this.equals.u/2;
			this.equals.x=Math.floor(this.screenMiddle-this.midpoint);

			this.rightAnswer=(this.C-this.B)/this.A;
		}
	}
	this.makeKey();
}//end AlgebraType4






function AlgebraType5(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);
	
		//constant * variable + constant = constant * variable + constant
		//with negatives
	this.unknown = new Term(20, 20, 20, this.setting, this.variable, this.color);
	this.A = 100 - Math.floor(Math.random() * 201);
	this.B = 100 - Math.floor(Math.random() * 201);
	this.C = 100 - Math.floor(Math.random() * 201);
	this.D = 100 - Math.floor(Math.random() * 201);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);
	this.c = this.setCoefficient(this.C);
	this.d = this.setCoefficient(this.D);

	if(((this.A==0)||(this.C==0))||(this.A-this.C==0))
	{
		this.oops=0;
	}
	else
	{

		if((this.D-this.B)%(this.A-this.C)!=0)
		{
			this.oops=0;
		}
		else
		{
			if(this.A==1)
			{
				this.aX=this.unknown;
			}
			else if(this.A==-1)
			{
				this.aX=new Negation(10,10,this.size,this.setting,this.unknown,1,this.color);
			}
			else
			{
				this.aX=new Multiplication(10,10,this.size,this.setting,this.a,this.unknown,4,this.color);
			}

			if(this.C==1)
			{
				this.cX=this.unknown;
			}
			else if(this.C==-1)
			{
				this.cX=new Negation(10,10,this.size,this.setting,this.unknown,1,this.color);
			}
			else
			{
				this.cX=new Multiplication(10,10,this.size,this.setting,this.c,this.unknown,4,this.color);
			}




			
			if(this.B>0)
			{
				this.axPlusB=new Addition(10,10,this.size,this.setting,this.aX,this.b,this.color);
			}
			else if(this.B<0)
			{
				this.tempB = this.setCoefficient(Math.abs(this.B)); //to avoid +- signs
				this.axPlusB=new Subtraction(10,10,this.size,this.setting,this.aX,this.tempB,this.color);
			}
			else
			{
				this.axPlusB=this.aX;
			}

			if(this.D>0)
			{
				this.cxPlusD=new Addition(10,10,this.size,this.setting,this.cX,this.d,this.color);
			}
			else if(this.D<0)
			{
				this.tempD = this.setCoefficient(Math.abs(this.D)); //to avoid +- signs
				this.cxPlusD=new Subtraction(10,10,this.size,this.setting,this.cX,this.tempD,this.color);
			}
			else
			{
				this.cxPlusD=this.cX;
			}

			this.equals=new Same(0,20,this.size,this.setting,this.axPlusB,this.cxPlusD,this.color);
			this.equals.image();
			this.equals.clear();
			this.midpoint=this.equals.u/2;
			this.equals.x=Math.floor(this.screenMiddle-this.midpoint);

			this.rightAnswer=(this.D-this.B)/(this.A-this.C);
		}
	}
	this.makeKey();
}//end AlgebraType5





	
function AlgebraType6(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);

		//variable / constant + constant = constant
	this.unknown = new Term(20, 20, 20, this.setting, this.variable, this.color);
	this.A = 100 - Math.floor(Math.random() * 201);
	this.B = 100 - Math.floor(Math.random() * 201);
	this.C = 100 - Math.floor(Math.random() * 201);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);
	this.c = this.setCoefficient(this.C);

	if((this.A==0)||(this.A==1)||(this.A==-1))
	{
		this.oops=0;
	}
	else
	{
		if(this.A>0)
		{
			this.xOverA=new Division(10,10,this.size,this.setting,this.unknown,this.a,3,this.color);
		}
		else
		{
			this.tempA = this.setCoefficient(Math.abs(this.A)); //to avoid +- signs
			this.xOverNegA=new Division(10,10,this.size,this.setting,this.unknown,this.tempA,3,this.color);
			this.xOverA=new Negation(10,10,this.size,this.setting,this.xOverNegA,1,this.color);
		}

		if(this.B>0)
		{
			this.fracPlusB=new Addition(10,10,this.size,this.setting,this.xOverA,this.b,this.color);
		}
		else if(this.B<0)
		{
			this.tempB = this.setCoefficient(Math.abs(this.B)); //to avoid +- signs
			this.fracPlusB=new Subtraction(10,10,this.size,this.setting,this.xOverA,this.tempB,this.color);
		}
		else
		{
			this.fracPlusB=this.xOverA;
		}

		this.left=Math.floor(Math.random()*2);
		if(this.left==0)
		{
			this.equals=new Same(0,20,this.size,this.setting,this.fracPlusB,this.c,this.color);
		}
		else
		{
			this.equals=new Same(0,20,this.size,this.setting,this.c,this.fracPlusB,this.color);
		}
			this.equals.image();
			this.equals.clear();
			this.midpoint=3*this.equals.u/8;
			this.equals.x=Math.floor(this.screenMiddle-this.midpoint);

		this.rightAnswer=(this.C-this.B)*this.A;
	}
	this.makeKey();
}//end AlgebraType6






function AlgebraType7(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);

		//constant / variable + constant = constant
	this.unknown = new Term(20, 20, 20, this.setting, this.variable, this.color);
	this.A = 100 - Math.floor(Math.random() * 201);
	this.B = 100 - Math.floor(Math.random() * 201);
	this.C = 100 - Math.floor(Math.random() * 201);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);
	this.c = this.setCoefficient(this.C);
	
	if(this.C-this.B==0)
	{
		this.oops=0;
	}
	else
	{
		if(this.A%(this.C-this.B)!=0)
		{
			this.oops=0;
		}
		else
		{

			if(this.A==0)
			{
				this.oops=0
			}
			else
			{
				if(this.A>0)
				{
					this.aOverX=new Division(10,10,this.size,this.setting,this.a,this.unknown,3,this.color);
				}
				else
				{
					this.tempA = this.setCoefficient(Math.abs(this.A)); //to avoid +- signs
					this.negAOverX=new Division(10,10,this.size,this.setting,this.tempA,this.unknown,3,this.color);
					this.aOverX=new Negation(10,10,this.size,this.setting,this.negAOverX,1,this.color);
				}

				if(this.B>0)
				{
					this.fracPlusB=new Addition(10,10,this.size,this.setting,this.aOverX,this.b,this.color);
				}
				else if(this.B<0)
				{
					this.tempB = this.setCoefficient(Math.abs(this.B)); //to avoid +- signs
					this.fracPlusB=new Subtraction(10,10,this.size,this.setting,this.aOverX,this.tempB,this.color);
				}
				else

				{
					this.fracPlusB=this.aOverX;
				}

				var left=Math.floor(Math.random()*2);
				if(left==0)
				{
					this.equals=new Same(0,20,this.size,this.setting,this.fracPlusB,this.c,this.color);
				}
				else
				{
					this.equals=new Same(0,20,this.size,this.setting,this.c,this.fracPlusB,this.color);
				}
				this.equals.image();
				this.equals.clear();
				this.midpoint=this.equals.u/2;
				this.equals.x=Math.floor(this.screenMiddle-this.midpoint);

				this.rightAnswer=this.A/(this.C-this.B);
				if(this.rightAnswer == 0){
					this.oops=0;
				}
			}
		}
	}
	this.makeKey();
}//end AlgebraType7






function AlgebraType8(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);
		//variable/constant + constant = variable/constant + constant
}//end AlgebraType8






function AlgebraType9(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);
		//constant/variable + constant = constant/variable + constant
}//end AlgebraType9






function AlgebraType10(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);

		//constant * (constant * variable + constant) + constant = constant
	this.unknown = new Term(10, 10, this.size, this.setting, this.variable, this.color);
	this.A = 100 - Math.floor(Math.random() * 201);
	this.B = 100 - Math.floor(Math.random() * 201);
	this.C = 100 - Math.floor(Math.random() * 201);
	this.D = 100 - Math.floor(Math.random() * 201);
	this.E = 100 - Math.floor(Math.random() * 201);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);
	this.c = this.setCoefficient(this.C);
	this.d = this.setCoefficient(this.D);
	this.e = this.setCoefficient(this.E);

	if(this.A*this.B==0)
	{
		this.oops=0;
	}
	else
	{
		if((this.E-this.A*this.C-this.D)%(this.A*this.B)!=0)
		{
			this.oops=0;
		}
		else
		{
			if(this.B==1)
			{
				this.bX=this.unknown;
			}
			else if(this.B==-1)
			{
				this.bX=new Negation(10,10,this.size,this.setting,this.unknown,1,this.color);
			}
			else
			{
				this.bX=new Multiplication(10,10,this.size,this.setting,this.b,this.unknown,4,this.color);
			}


			if(this.C>0)
			{
				this.bxPlusC=new Addition(10,10,this.size,this.setting,this.bX,this.c,this.color);
			}
			else if(this.C<0)
			{
				this.tempC = this.setCoefficient(Math.abs(this.C)); //to avoid +- signs
				this.bxPlusC=new Subtraction(10,10,this.size,this.setting,this.bX,this.tempC,this.color);
			}
			else
			{
				this.bxPlusC=this.bX;
			}

			this.temp=new Grouping(10,10,this.size,this.setting,this.bxPlusC,1,this.color);

			if(this.A==1)
			{
				this.aX=this.temp;
			}
			else if(this.A==-1)
			{
				this.aX=new Negation(10,10,this.size,this.setting,this.temp,1,this.color);
			}
			else
			{
				this.aX=new Multiplication(10,10,this.size,this.setting,this.a,this.temp,4,this.color);
			}

			if(this.D>0)
			{
				this.axPlusB=new Addition(10,10,this.size,this.setting,this.aX,this.d,this.color);
			}
			else if(this.D<0)
			{
				this.tempD = this.setCoefficient(Math.abs(this.D)); //to avoid +- signs
				this.axPlusB=new Subtraction(10,10,this.size,this.setting,this.aX,this.tempD,this.color);
			}
			else
			{
				this.axPlusB=this.aX;
			}

			this.left=Math.floor(Math.random()*2);
			if(this.left==0)
			{
				this.equals=new Same(0,20,this.size,this.setting,this.axPlusB,this.e,this.color);
			}
			else
			{
				this.equals=new Same(0,20,this.size,this.setting,this.e,this.axPlusB,this.color);
			}
			this.equals.image();
			this.equals.clear();
			this.midpoint=this.equals.u/2;
			this.equals.x=Math.floor(this.screenMiddle-this.midpoint);

			this.rightAnswer=(this.E-this.A*this.C-this.D)/(this.A*this.B);
		}
	}
	this.makeKey();
}//end AlgebraType10






function AlgebraType11(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);

		//constant * (constant * variable + constant) + constant * (constant * variable + constant ) = constant
	this.unknown = new Term(20, 20, 20, this.setting, this.variable, this.color);
	this.A = 100 - Math.floor(Math.random() * 201);
	this.B = 100 - Math.floor(Math.random() * 201);
	this.C = 100 - Math.floor(Math.random() * 201);
	this.D = 100 - Math.floor(Math.random() * 201);
	this.E = 100 - Math.floor(Math.random() * 201);
	this.F = 100 - Math.floor(Math.random() * 201);
	this.G = 100 - Math.floor(Math.random() * 201);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);
	this.c = this.setCoefficient(this.C);
	this.d = this.setCoefficient(this.D);
	this.e = this.setCoefficient(this.E);
	this.f = this.setCoefficient(this.F);
	this.g = this.setCoefficient(this.G);

	if(((this.A*this.B+this.D*this.E)==0)||((this.B==0)||(this.C==0)))
	{
		this.oops=0;
	}
	else
	{
		if((this.G-this.A*this.C-this.D*this.F)%(this.A*this.B+this.D*this.E)!=0)
		{
			this.oops=0;
		}
		else
		{
			if(this.B==1)
			{
				this.bX=this.unknown;
			}
			else if(this.B==-1)
			{
				this.bX=new Negation(10,10,this.size,this.setting,this.unknown,1,this.color);
			}
			else
			{
				this.bX=new Multiplication(10,10,this.size,this.setting,this.b,this.unknown,4,this.color);
			}

			if(this.E==1)
			{
				this.eX=this.unknown;
			}
			else if(this.E==-1)
			{
				this.eX=new Negation(10,10,this.size,this.setting,this.unknown,1,this.color);
			}
			else
			{
				this.eX=new Multiplication(10,10,this.size,this.setting,this.e,this.unknown,4,this.color);
			}

			if(this.C>0)
			{
				this.bxPlusC=new Addition(10,10,this.size,this.setting,this.bX,this.c,this.color);
			}
			else if(this.C<0)
			{
				this.tempC = this.setCoefficient(Math.abs(this.C)); //to avoid +- signs
				this.bxPlusC=new Subtraction(10,10,this.size,this.setting,this.bX,this.tempC,this.color);
			}
			else
			{
				this.bxPlusC=this.bX;
			}

			if(this.F>0)
			{
				this.exPlusF=new Addition(10,10,this.size,this.setting,this.eX,this.f,this.color);
			}
			else if(this.F<0)
			{
				this.tempF = this.setCoefficient(Math.abs(this.F)); //to avoid +- signs
				this.exPlusF=new Subtraction(10,10,this.size,this.setting,this.eX,this.tempF,this.color);
			}
			else
			{
				this.exPlusF=this.eX;
			}

			this.temp1=new Grouping(10,10,this.size,this.setting,this.bxPlusC,1,this.color);
			this.temp2=new Grouping(10,10,this.size,this.setting,this.exPlusF,1,this.color);

			if(this.A==1)
			{
				this.aX=this.temp1;
			}
			else if(this.A==-1)
			{
				this.aX=new Negation(10,10,this.size,this.setting,this.temp1,1,this.color);
			}
			else
			{
				this.aX=new Multiplication(10,10,this.size,this.setting,this.a,this.temp1,4,this.color);
			}

			if(this.D==1)
			{
				this.dX=this.temp2;
			}
			else if(this.D==-1)
			{
				this.dX=this.temp2;
			}
			else
			{
				if(this.D>0)
				{
					this.dX=new Multiplication(10,10,this.size,this.setting,this.d,this.temp2,4,this.color);
				}
				else if(this.D<0)
				{
					this.tempD = this.setCoefficient(Math.abs(this.D)); //to avoid +- signs
					this.dX=new Multiplication(10,10,this.size,this.setting,this.tempD,this.temp2,4,this.color);
				}
			}

			if(this.D>0)
			{
				this.axPlusdx=new Addition(10,10,this.size,this.setting,this.aX,this.dX,this.color);
			}
			else if(this.D<0)
			{
				this.axPlusdx=new Subtraction(10,10,this.size,this.setting,this.aX,this.dX,this.color);
			}
			else
			{
				this.axPlusdx=this.aX;
			}


			this.left=Math.floor(Math.random()*2);
			if(this.left==0)
			{
				this.equals=new Same(0,20,this.size,this.setting,this.axPlusdx,this.g,this.color);
			}
			else
			{
				this.equals=new Same(0,20,this.size,this.setting,this.g,this.axPlusdx,this.color);
			}
			this.equals.image();
			this.equals.clear();
			this.midpoint=this.equals.u/2;
			this.equals.x=Math.floor(this.screenMiddle-this.midpoint);

			this.rightAnswer=(this.G-this.A*this.C-this.D*this.F)/(this.A*this.B+this.D*this.E);
		}
	}
	this.makeKey();
}//end AlgebraType11






function AlgebraType12(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);

		//constant * (constant * variable + constant) = constant * (constant * variable + constant )
	this.unknown = new Term(20, 20, 20, this.setting, this.variable, this.color);
	this.A = 100 - Math.floor(Math.random() * 201);
	this.B = 100 - Math.floor(Math.random() * 201);
	this.C = 100 - Math.floor(Math.random() * 201);
	this.D = 100 - Math.floor(Math.random() * 201);
	this.E = 100 - Math.floor(Math.random() * 201);
	this.F = 100 - Math.floor(Math.random() * 201);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);
	this.c = this.setCoefficient(this.C);
	this.d = this.setCoefficient(this.D);
	this.e = this.setCoefficient(this.E);
	this.f = this.setCoefficient(this.F);

	if(((this.A*this.B+this.D*this.E)==0)||((this.B==0)||(this.C==0)))
	{
		this.oops=0;
	}
	else
	{
		if((this.D*this.F-this.A*this.C)%(this.A*this.B-this.D*this.E)!=0)
		{
			this.oops=0;
		}
		else
		{
			if(this.B==1)
			{
				this.bX=this.unknown;
			}
			else if(this.B==-1)
			{
				this.bX=new Negation(10,10,this.size,this.setting,this.unknown,1,this.color);
			}
			else
			{
				this.bX=new Multiplication(10,10,this.size,this.setting,this.b,this.unknown,4,this.color);
			}

			if(this.E==1)
			{
				this.eX=this.unknown;
			}
			else if(this.E==-1)
			{
				this.eX=new Negation(10,10,this.size,this.setting,this.unknown,1,this.color);
			}
			else
			{
				this.eX=new Multiplication(10,10,this.size,this.setting,this.e,this.unknown,4,this.color);
			}

			if(this.C>0)
			{
				this.bxPlusC=new Addition(10,10,this.size,this.setting,this.bX,this.c,this.color);
			}
			else if(this.C<0)
			{
				this.tempC = this.setCoefficient(Math.abs(this.C)); //to avoid +- signs
				this.bxPlusC=new Subtraction(10,10,this.size,this.setting,this.bX,this.tempC,this.color);
			}
			else
			{
				this.bxPlusC=this.bX;
			}

			if(this.F>0)
			{
				this.exPlusF=new Addition(10,10,this.size,this.setting,this.eX,this.f,this.color);
			}
			else if(this.F<0)
			{
				this.tempF = this.setCoefficient(Math.abs(this.F)); //to avoid +- signs
				this.exPlusF=new Subtraction(10,10,this.size,this.setting,this.eX,this.tempF,this.color);
			}
			else
			{
				this.exPlusF=this.eX;
			}


			this.temp1=new Grouping(10,10,this.size,this.setting,this.bxPlusC,1,this.color);
			this.temp2=new Grouping(10,10,this.size,this.setting,this.exPlusF,1,this.color);

			if(this.A==1)
			{
				this.aX=this.temp1;
			}
			else if(this.A==-1)
			{
				this.aX=new Negation(10,10,this.size,this.setting,this.temp1,1,this.color);
			}
			else
			{
				this.aX=new Multiplication(10,10,this.size,this.setting,this.a,this.temp1,4,this.color);
			}

			if(this.D==1)
			{
				this.dX=this.temp2;
			}
			else if(this.D==-1)
			{
				this.dX=new Negation(10,10,this.size,this.setting,this.temp2,1,this.color);
			}
			else
			{
				this.dX=new Multiplication(10,10,this.size,this.setting,this.d,this.temp2,4,this.color);
			}

			this.equals=new Same(0,20,this.size,this.setting,this.aX,this.dX,this.color);
			this.equals.image();
			this.equals.clear();
			this.midpoint=this.equals.u/2;
			this.equals.x=Math.floor(this.screenMiddle-this.midpoint);

			this.rightAnswer=(this.D*this.F-this.A*this.C)/(this.A*this.B-this.D*this.E);
		}
	}
	this.makeKey();
}//end AlgebraType12









/////////////////////////////  PROPORTIONS  //////////////////////////////////////////////////////

function Proportion(size, setting, placement, color, variable){
	AlgebraParent.call(this, size, setting, placement, color, variable);

	this.topLeft=false;
	this.topRight=false;
	this.bottomLeft=false;
	this.bottomRight=false;
	
		//grab four random integers between -100 and +100
	this.A = 100 - Math.floor(Math.random() * 201);
	this.B = 100 - Math.floor(Math.random() * 201);
	this.C = 100 - Math.floor(Math.random() * 201);
	this.D = 100 - Math.floor(Math.random() * 201);
	this.a = this.setCoefficient(this.A);
	this.b = this.setCoefficient(this.B);
	this.c = this.setCoefficient(this.C);
	this.d = this.setCoefficient(this.D);
	
		//disregard any proportions with zeros in them
	if((this.A == 0) || (this.B == 0) || (this.C == 0) || (this.D == 0)){
			this.oops=0;
	}
	
		//pick a spot for the variable and swap out the number there
	this.spot=Math.floor(Math.random()*4);
	switch(this.spot){
		case 0:
			this.topLeft = true;
			this.A = this.variable;
			this.a = new Term(20, 20, 20, this.setting, this.A, this.color);
				//make sure it's an integer
			if(this.B * this.C % this.D != 0){ 
				this.oops = 0;
			}
			else{
				this.rightAnswer = this.B* this.C / this.D;
			}
			break;
		case 1:
			this.topRight = true;
			this.C = this.variable;
			this.c = new Term(20, 20, 20, this.setting, this.C, this.color);
				//make sure it's an integer
			if(this.a * this.d % this.b != 0){
				this.oops = 0;
			}
			else{
				this.rightAnswer = this.a * this.d / this.b;
			}
			break;
		case 2:
			this.bottomLeft = true;
			this.B = this.variable;
			this.b = new Term(20, 20, 20, this.setting, this.B, this.color);
				//make sure it's an integer
			if(this.a * this.d % this.c != 0){
				this.oops = 0;
			}
			else{
				this.rightAnswer = this.a * this.d / this.c;
			}
			break;
		case 3:
			this.bottomRight=true;
			this.D = this.variable;
			this.d = new Term(20, 20, 20, this.setting, this.D, this.color);
				//make sure answer is an integer
			if(this.b * this.c % this.a != 0){
				this.oops=0;
			}
			else{
				this.rightAnswer = this.b * this.c / this.a;
			}
			break;
	}
	
	let scene = document.getElementById(this.setting);
	this.left=new Fraction(0, 0, this.size, this.setting, this.a, this.b, "white");
	this.right=new Fraction(0, 0, this.size, this.setting, this.c, this.d, "white");
	this.equals=new Same(scene.width/6, scene.height/4, this.size, this.setting, this.left, this.right, "white");
	this.equals.image();
	
	this.makeKey();
}//end Proportion







////////////////////////////  ALTERNATE ANSWERS  /////////////////////////////////////////////////////////
	
function Options(rightAnswer){
	this.rightAnswer = rightAnswer;
	this.choices = new Array(5);
	
	this.wrongAnswer = function(spread){
			// pick a number and make sure it doesn't match the right answer
			//then find a good range for it to fit problem
		this.wrong = 100 - Math.floor(Math.random() * 201);
		if(this.wrong != this.rightAnswer){
			return(this.wrong * spread);
		}
		else{
			return(this.wrongAnswer(spread));
		}
	}//end wrongAnswer()
	
	this.fillInChoices = function(){
			//set a good range for the answers (maybe add a random amount to these)
		let range = 1;
		if((Math.abs(this.rightAnswer) >= 200) && (Math.abs(this.rightAnswer) < 300)){
			range = 2;
		}
		else if((Math.abs(this.rightAnswer) >= 300) && (Math.abs(this.rightAnswer) < 500)){
			range = 4;
		}
		else if((Math.abs(this.rightAnswer) >= 500) && (Math.abs(this.rightAnswer) < 900)){
			range = 9;
		}
		else if((Math.abs(this.rightAnswer) >= 900) && (Math.abs(this.rightAnswer) < 1800)){
			range = 18;
		}
		else if((Math.abs(this.rightAnswer) >= 1800) && (Math.abs(this.rightAnswer) < 4000)){
			range = 43;
		}
		else if((Math.abs(this.rightAnswer) >= 4000) && (Math.abs(this.rightAnswer) < 10000)){
			range = 117;
		}
		else if(Math.abs(this.rightAnswer) >= 10000){
			range = 297;
		}
		
			//fill array with wrong answers
		for(let i = 0; i < this.choices.length; i++){
			this.choices[i] = this.wrongAnswer(range);
		}
		
			//plug in the correct answer
		this.rightOption=Math.floor(Math.random()*4);
		this.choices[this.rightOption] = this.rightAnswer;
			//mark which slot has the correct answer
		switch(this.rightOption){
			case 0: this.choices[4] = "a"; break;
			case 1: this.choices[4] = "b"; break;
			case 2: this.choices[4] = "c"; break;
			case 3: this.choices[4] = "d"; break;
		}
	}//end fillInChoices()
	
		//make this a return the array then set the choices in caller
	this.fillInChoices();	
}//end Options

