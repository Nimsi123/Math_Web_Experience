import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from Math_Program.Algorithms_Verification import Algebra1_A_to_C

class FirebasePlugIn:
	def __init__(self):
		cred = credentials.Certificate(r"C:\Users\nimar\Downloads\math-program-firebase-adminsdk-z8z8v-2219b9386f (1).json")
		firebase_admin.initialize_app(cred)

		self.db = firestore.client()

	def addQuestion(self, classNombre, skillNombre, pregunta):
		# Add a new doc in collection 'Class' with ID 'Skill'
		self.db.collection(classNombre).document(skillNombre).set(pregunta)

	def addAlgorithm(self, generatorInstance, skillNombre, numeroDePreguntas):
		for i in range(numeroDePreguntas):
			package = generatorInstance()
			data = {"number": str(i+1), "problem": package[0], "answer": package[1]}
			#self.db.collection(skillNombre).document(str(i+1)).set(data)
			self.db.collection(skillNombre).document().set(data)

#genList = [Algorithms.Addition(100, 800), Algorithms.Subtraction(100, 800), Algorithms.MultDivRules(-40, 40), 
#			Algorithms.Multiplication(7, 12), Algorithms.Division(2, 12)]

genList = [Algebra1_A_to_C.RationalNumberOperations(-12, 12, "+")]

questionDump = FirebasePlugIn()
questionDump.addAlgorithm(genList[0], genList[0].name, 10)

