import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from Math_Program.Algorithms_Verification import Algebra1_Nima

class FirebasePlugIn:
	def __init__(self, genList):
		cred = credentials.Certificate(r"C:\Users\nimar\Downloads\math-program-firebase-adminsdk-z8z8v-2219b9386f (1).json")
		firebase_admin.initialize_app(cred)

		self.db = firestore.client()

		self.generatorList = genList

	def addQuestion(self, classNombre, skillNombre, pregunta):
		# Add a new doc in collection 'Class' with ID 'Skill'
		self.db.collection(classNombre).document(skillNombre).set(pregunta)

	def addAlgorithm(self, generatorInstance, numeroDePreguntas):
		for i in range(numeroDePreguntas):
			package = generatorInstance()
			data = {"number": str(i+1), "problem": package[0], "answer": package[1]}
			self.db.collection(generatorInstance.name).document().set(data)

	def loadToFirebase(self):
		for generator in self.generatorList:
			self.addAlgorithm(generator, 20)

#genList = [Algorithms.Addition(100, 800), Algorithms.Subtraction(100, 800), Algorithms.MultDivRules(-40, 40), 
#			Algorithms.Multiplication(7, 12), Algorithms.Division(2, 12)]

genList = [Algebra1_Nima.RationalNumberOperations(-12, 12, "+"), 
			Algebra1_Nima.Roots(1, 12, 2)]

questionDump = FirebasePlugIn(genList)
questionDump.loadToFirebase()

