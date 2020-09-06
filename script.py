import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from Math_Program.Algorithms_Verification.Algorithms import *
from Math_Program.Algorithms_Verification.Algebra1_Nima import *

class FirebasePlugIn:
	def __init__(self, genList):
		cred = credentials.Certificate(r"C:\Users\nimar\Downloads\math-program-firebase-adminsdk-z8z8v-2219b9386f (1).json")
		firebase_admin.initialize_app(cred)

		self.db = firestore.client()

		self.generatorList = genList

	def addQuestion(self, classNombre, skillNombre, pregunta):
		# Add a new doc in collection 'Class' with ID 'Skill'
		self.db.collection(classNombre).document(skillNombre).set(pregunta)

	def addAlgorithm(self, generator, skillNombre, numeroDePreguntas):
		for i in range(numeroDePreguntas):
			package = generator()
			data = {"number": str(i+1), "problem": package[0], "answer": package[1]}
			self.db.collection(generatorInstance.name).document().set(data)

	def loadToFirebase(self):
		for generator in self.generatorList:
			self.addAlgorithm(generator[0], generator[1], 20)

#genList = [Algorithms.Addition(100, 800), Algorithms.Subtraction(100, 800), Algorithms.MultDivRules(-40, 40), 
#			Algorithms.Multiplication(7, 12), Algorithms.Division(2, 12)]

#genList = [Algebra1_Nima.RationalNumberOperations(-12, 12, "+"), 
#			Algebra1_Nima.Roots(1, 12, 2)]

genList_Algebra1 = [(Addition(-25, 25), "Add Integers (small numbers)"),
					(Addition(-100, 100), "Add Integers (large numbers)"),

					(Subtraction(-25, 25), "Subtract Integers (small numbers)"),
					(Subtraction(-100, 100), "Subtract Integers (large numbers)"),

					(Multiplication(-12, 12), "Multiply Integers (small numbers)"),
					(Multiplication(-25, 25), "Multiply Integers (large numbers)"),

					(Division(-12, 12), "Divide Integers (small numbers)"),
					(Division(-25, 25), "Divide Integers (large numbers)"),

					(OrderOfOperations(-10, 10, 5, rationalNums = False), "Order of Operations with Integers"),
					(OrderOfOperations(0, 10, 5, rationalNums = False), "Order of Operations"),

					(OrderOfOperations(-10, 10, 5, rationalNums = True), "Order of Operations with Rational Numbers"),

					(RationalNumberOperations(-10, 10, "+"), "Add Rational Numbers"),
					(RationalNumberOperations(-10, 10, "-"), "Subtract Rational Numbers"),
					(RationalNumberOperations(-10, 10, "*"), "Multiply Rational Numbers"),
					(RationalNumberOperations(-10, 10, "/"), "Divide Rational Numbers"),

					(Roots(0, 12, 2), "Square Roots"),
					(Roots(0, 10, 3), "Cube Roots"),

					(EquivalentRatio(300), "Equivalent Ratios"),

					(Proportions(), "Proportions"),

					(FindingMidpoints(-50, 50, -50, 50, -50, 50, -50, 50), "Finding the midpoint between two points"),
					(FindingEndpoints(-50, 50, -50, 50, -50, 50, -50, 50), "Finding the endpoint"),
					(FindingDistance(-50, 50, -50, 50, -50, 50, -50, 50), "Finding the distance between two points")]

genList_Algebra2 = [(AddSubComplexNums(self, -25, 25, rationalNums = False), "Adding and Subtracting Complex Numbers")
					(AddSubComplexNums(self, -25, 25, rationalNums = True), "Adding and Subtracting Complex Numbers with Rational Numbers"),

					(FindingComplexConjugate(-12, 12), "Finding the Complex Conjugate"),
					(MultiplyingComplexNums(-12, 12), "Multiplying Complex Numbers"),
					(DivideComplexNums(-12, 12), "Dividing Complex Numbers"),
					(AbsValComplexNums(-12, 12), "Absolute Value of Complex Numbers"),
					(PowersOfI(), "Powers of i"),

					(SolveQuadFormula(), "Solve quadratics using the quadratic formula"),
					(SolveDiscriminant(), "Find the discriminant"),
					(SolveFactoring(), "Solve quadratics by factoring"),
					(FindEqFromRoots(), "Write a quadratic equation from roots")]


genList_PreCalculus = [(RadianDegreeConversion(rad = True, deg = False), "Radian to Degree Conversion"),
						(RadianDegreeConversion(rad = False, deg = True), "Degree to Radian Conversion"),

						(ReferenceAngles(rad = True, deg = False), "Finding Reference Angles in Radians"),
						(ReferenceAngles(rad = False, deg = True), "Finding Reference Angles in Degrees"),

						(CoterminalAngles(rad = True, deg = False), "Finding Coterminal Angles in Radians"),
						(CoterminalAngles(rad = False, deg = true), "Finding Coterminal Angles in Degrees"),

						(UnitCircle_Function(rad = True, deg = False), "Finding ratios of trigonometric functions (in radians)"),
						(UnitCircle_Function(rad = False, deg = True), "Finding ratios of trigonometric functions (in degrees)"),

						(UnitCircle_Inverse(rad = True, deg = False), "Finding inverses of trigonometric functions (in radians)"),
						(UnitCircle_Inverse(rad = False, deg = True), "Finding inverses of trigonometric functions (in degrees)"),						
						]



genList = genList_Algebra1 + genList_Algebra2

questionDump = FirebasePlugIn(genList)
questionDump.loadToFirebase()

