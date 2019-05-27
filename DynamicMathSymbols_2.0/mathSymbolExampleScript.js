

		////////////////////////////////////////////////////////////////
		//            Dynamic Mathematical Notation Symbols           //
		//                                                            //
		//                          Created By:                       //
		//                    Christopher S. Francis                  //
		//                August 2016 through...                      //
		//                                                            //
		////////////////////////////////////////////////////////////////






function start(){


			//Terms for examples
	var negOne=new Term(0,0,20,'canvas0',"-1","white");
	var zero=new Term(0,0,20,'canvas0',"0","white");
	var two=new Term(20,0,20,'canvas0',"2","white");
	var three=new Term(2000,0,20,'canvas0',"3","white");
	var four=new Term(0,0,20,'canvas0',"4","white");
	var five=new Term(0,0,20,'canvas0',"5","white");
	var seven=new Term(0,0,20,'canvas0',"7","white");
	var nine=new Term(0,0,20,'canvas0',"9","white");
	var a=new Term(0,0,20,'canvas0',"a","white");
	var b=new Term(0,0,20,'canvas0',"b","white");
	var c=new Term(0,0,20,'canvas0',"c","white");
	var f=new Term(0,0,20,'canvas0',"f","white");
	var i=new Term(0,0,20,'canvas0',"i","white");
	var m=new Term(0,0,20,'canvas0',"m","white");
	var n=new Term(0,0,20,'canvas0',"n","white");
	var w=new Term(0,0,20,'canvas0',"w","white");
	var capF=new Term(0,0,20,'canvas0',"F","white");
	var capP=new Term(0,0,20,'canvas0',"P","white");
	var x=new Term(0,0,20,'canvas0',"x","white");
	var x2=new Term(0,0,20,'canvas0',"x","white");
	var y=new Term(0,0,20,'canvas0',"y","white");
	var z=new Term(0,0,20,'canvas0',"z","white");
	var sevenX=new Multiplication(0,0,20,'canvas0',seven,x,4,"white")
	var xSqrd=new Superscript(0,0,20,'canvas0',x,two,"white");
	var aCommaB=new CommaSeparated(2000,0,20,'canvas0',a,b,"white");
	var aBandC=new CommaSeparated(2000,0,20,'canvas0',aCommaB,c,"white");



			//Fraction example
	var twoSevenths=new Fraction(12,12,20,'canvas0',two,seven,"white");
	twoSevenths.image();
	//twoSevenths.border();

	
			//square Root example
	var rootTwo=new Root(102,12,20,'canvas0',two,"white");
	rootTwo.image();
	//rootTwo.border();
	var rootTwoSevenths=new Root(170,12,20,'canvas0',twoSevenths,"white");
	rootTwoSevenths.image();
	//rootTwoSevenths.border();



			//expression example (Same thing for +,-, =, >, <)
	var plus=new Addition(121,76,20,'canvas0',sevenX,three,"white");
	plus.image();
	//plus.border();
	var minus=new Subtraction(220,76,20,'canvas0',sevenX,three,"white");
	minus.image();
	//minus.border();
	var lessThan=new Less(310,76,20,'canvas0',sevenX,three,"white");
	lessThan.image();
	//lessThan.border();
	var lsEq=new LessOrEqual(420,76,20,'canvas0',sevenX,three,"white");
	lsEq.image();
	//lsEq.border();
	var notEqual=new NotSame(531,76,20,'canvas0',sevenX,three,"white");
	notEqual.image();
	//notEqual.border();
	var equals=new Same(250,12,20,'canvas0',sevenX,three,"white");
	equals.image();
	//equals.border();
	var greaterThan=new Greater(370,12,20,'canvas0',sevenX,three,"white");
	greaterThan.image();
	//greaterThan.border();
	var grEq=new GreaterOrEqual(460,12,20,'canvas0',sevenX,three,"white");
	grEq.image();
	//grEq.border();


			//function notation example
	var fOfX=new FunctionNotation(550,12,20,'canvas0',f,x,"white");
	fOfX.image();
	//fOfX.border();


			//Factorial example
	var fiveFact=new Factorial(42,76,20,'canvas0',five,"white");
	fiveFact.image();
	//fiveFact.border();

			//Complex number example
	var imagineThree=new Complex(21,465,20,'canvas0',three,seven,1,"white");
	imagineThree.image();
	//imagineThree.border();
	imagineThree.type=2;
	imagineThree.x=134;
	imagineThree.image();
	//imagineThree.border();

			//approximately equal example
	var bApprxFive=new ApproximatelySame(502,135,20,'canvas0',b,five,"white");
	bApprxFive.image();
	//bApprxFive.border();

			//Integral example
	var areaUnder=new Integral(405,465,20,'canvas0',two,nine,minus,x2,1,"white");
	areaUnder.image();
	//areaUnder.border();
	areaUnder.x=561;
	areaUnder.y=465;
	areaUnder.type=2;
	areaUnder.image();
	//areaUnder.border();


			//Vector example
	var vectorA=new Vector(598,135,20,'canvas0',capF,"white");
	vectorA.image();
	//vectorA.border();


			//congruency example
	var aConB=new Congruent(432,185,20,'canvas0',a,b,"white");
	aConB.image();
	//aConB.border();

			//Division example
	var threeDivideByFour=new Division(32,134,20,'canvas0',three,four,2,"white");
	threeDivideByFour.image();
	//threeDivideByFour.border();
	threeDivideByFour.type=1;
	threeDivideByFour.x=155;
	threeDivideByFour.image();
	//threeDivideByFour.border();
	threeDivideByFour.type=3;
	threeDivideByFour.x=296;
	threeDivideByFour.image();
	//threeDivideByFour.border();

			//Multiplication example
	var nineA=new Multiplication(23,185,20,'canvas0',nine,a,1,"white");
	nineA.image();
	//nineA.border();
	nineA.x=121;
	nineA.type=2;
	nineA.image();
	//nineA.border();
	nineA.x=234;
	nineA.type=3;
	nineA.image();
	//nineA.border();
	nineA.x=345;
	nineA.type=4;
	nineA.image();
	//nineA.border();


			//Subscript example
	var aThree=new Subscript(387,134,20,'canvas0',a,three,"white");
	aThree.image();
	//aThree.border();

			//Superscript example
	var aSquared=new Superscript(443,135,20,'canvas0',a,two,"white");
	aSquared.image();
	//aSquared.border();

			//equivilancy example
	var sameThingAs=new Equivalent(543,185,20,'canvas0',b,x,"white");
	sameThingAs.image();
	//sameThingAs.border();

			//Proportional example
	var related=new Proportional(18,232,20,'canvas0',x,a,"white");
	related.image();
	//related.border();

			//Negation example
	var negative=new Negation(51,12,20,'canvas0',twoSevenths,1,"white");
	negative.image();
	//negative.border();

	var isnt=new Negation(291,592,20,'canvas0',fOfX,2,"white");
	isnt.image();
	//isnt.border();

			//Summation example
	var addUp=new Summation(321,465,20,'canvas0',zero,n,xSqrd,"white");
	addUp.image();
	//addUp.border();
	//addUp.clear();


			//Logarithm example
	var logOfSeven=new Logarithm(134,232,20,'canvas0',two,seven,1,"white");
	logOfSeven.image();
	//logOfSeven.border();
	logOfSeven.x=256;
	logOfSeven.type=2;
	logOfSeven.image();
	//logOfSeven.border();

			//trigonometric and hyperbolic example
	var sinOfA=new Sine(345,232,20,'canvas0',a,negOne,1,"white");
	sinOfA.image();
	//sinOfA.border();
	var cosOfA=new Cosine(420,232,20,'canvas0',a,negOne,2,"white");
	cosOfA.image();
	//cosOfA.border();
	var tanOfA=new Tangent(531,232,20,'canvas0',a,negOne,3,"white");
	tanOfA.image();
	//tanOfA.border();
	var secOfA=new Secant(23,275,20,'canvas0',a,negOne,4,"white");
	secOfA.image();
	//secOfA.border();
	var cscOfA=new Cosecant(139,275,20,'canvas0',a,negOne,2,"white");
	cscOfA.superscript=two;
	cscOfA.image();
	//cscOfA.border();
	var cotOfA=new Cotangent(231,275,20,'canvas0',a,negOne,4,"white");
	cotOfA.superscript=three;
	cotOfA.image();
	//cotOfA.border();



			//Limit examples
	var limOfx=new Limit(395,275,20,'canvas0',nine,x2,xSqrd,1,"white");
	limOfx.image();
	//limOfx.border();
	limOfx.x=480;
	limOfx.type=2;
	limOfx.image();
	//limOfx.border();
	limOfx.x=570;
	limOfx.type=3;
	limOfx.image();
	//limOfx.border();


		//other symbol examples
			//InfinitySymbol
	var infSign=new InfinitySymbol(340,275,20,'canvas0',1,"white");
	infSign.image();
	//infSign.border();
	var negInfSign=new InfinitySymbol(245,321,20,'canvas0',2,"white");
	negInfSign.image();
	//negInfSign.border();

			//"That" example
	var aGivenTHATb=new That(20,20,20,'canvas0',a,b,"white");
	var aGivenB=new FunctionNotation(520,420,20,'canvas0',capP,aGivenTHATb,"white");
	aGivenB.image();
	//aGivenB.border();

			//Union
	var aOrB=new Union(12,321,20,'canvas0',a,b,"white");
	aOrB.image();
	//aOrB.border();

			//Intersect
	var aAndB=new Intersect(103,321,20,'canvas0',a,b,"white");
	aAndB.image();
	//aAndB.border();

			//Bar example
	var xBar=new Bar(201,321,20,'canvas0',x,"white");
	xBar.image();
	//xBar.border();

			//Hat example
	var iHat=new Hat(223,465,20,'canvas0',i,"white");
	iHat.image();
	//iHat.border();

			//Therefore example
	var leading=new Therefore(229,537,20,'canvas0',"white");
	leading.image();
	//leading.border();

			//Because example
	var dueTo=new Because(278,537,20,'canvas0',"white");
	dueTo.image();
	//dueTo.border();

			//Implies example
	var implying=new Implies(67,537,20,'canvas0',"white");
	implying.image();
	//implying.border();

			//if and only if example
	var restriction=new IfAndOnlyIf(134,537,20,'canvas0',"white");
	restriction.image();
	//restriction.border();

			//null set example
	var nothing=new NullSet(267,465,20,'canvas0',"white");
	nothing.image();
	//nothing.border();

			//Subset example
	var partOf=new Subset(435,537,20,'canvas0',"white");
	partOf.image();
	//partOf.border();

			//not a Subset example
	var notPart=new NotSubset(490,537,20,'canvas0',"white");
	notPart.image();
	//notPart.border();

			//there exists example
	var itIs=new ThereExists(12,537,20,'canvas0',"white");
	itIs.image();
	//itIs.border();

			//an element of example
	var belongsTo=new ElementOf(333,537,20,'canvas0',"white");
	belongsTo.image();
	//belongsTo.border();

			//not an element of example
	var doesntBelong=new NotElementOf(390,537,20,'canvas0',"white");
	doesntBelong.image();
	//doesntBelong.border();

			//for all example
	var everything=new ForAll(530,537,20,'canvas0',"white");
	everything.image();
	//everything.border();

			//logical or example
	var either=new LogicalOr(202,592,20,'canvas0',"white");
	either.image();
	//either.border();

			//logical and example
	var both=new LogicalAnd(245,592,20,'canvas0',"white");
	both.image();
	//both.border();

			//number set examples
	var real=new RealNumbers(14,592,20,'canvas0',"white");
	real.image();
	//real.border();

	var natural=new NaturalNumbers(42,592,20,'canvas0',"white");
	natural.image();
	//natural.border();

	var wholeNumber=new Integers(80,592,20,'canvas0',"white");
	wholeNumber.image();
	//wholeNumber.border();

	var rationals=new RationalNumbers(118,592,20,'canvas0',"white");
	rationals.image();
	//rationals.border();

	var imagine=new ComplexNumbers(156,592,20,'canvas0',"white");
	imagine.image();
	//imagine.border();

	var universe=new SampleSpace(366,592,20,'canvas0',"white");
	universe.image();
	//universe.border();

	var suppose=new Assumption(402,592,20,'canvas0',"white");
	suppose.image();
	//suppose.border();


			//groupings
	var addGroup=new Grouping(321,321,20,'canvas0',plus,1,"white");
	addGroup.image();
	//addGroup.border();
	addGroup.type = 2;
	addGroup.x=421;
	addGroup.image();
	//addGroup.border();
	addGroup.type = 3;
	addGroup.x=532;
	addGroup.image();
	//addGroup.border();
	var someSet=new Grouping(14,375,20,'canvas0',aBandC,4,"white");
	someSet.image();
	//someSet.border();
	var someVector = new Grouping(376, 420, 20, 'canvas0', aBandC, 5, "white");
	someVector.image();
	//someVector.border();

			//Interval examples
	var someDomain=new Interval(137,375,20,'canvas0',negInfSign,infSign,1,"white");
	someDomain.image();
	//someDomain.border();
	someDomain.x=289;
	someDomain.end=a;
	someDomain.type=3;
	someDomain.image();
	//someDomain.border();
	someDomain.x=412;
	someDomain.end=b;
	someDomain.begin=a;
	someDomain.type=2;
	someDomain.image();
	//someDomain.border();
	someDomain.x=512;
	someDomain.end=infSign;
	someDomain.begin=b;
	someDomain.type=4;
	someDomain.image();
	//someDomain.border();

}//end start()
