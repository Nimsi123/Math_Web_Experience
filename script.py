import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from Math_Program.Algorithms_Verification import Algorithms

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
			data = {"question": package[0], "answer": package[1]}
			self.db.collection(skillNombre).document(str(i+1)).set(data)

genList = [Algorithms.Addition(100, 800), Algorithms.Subtraction(100, 800), Algorithms.MultDivRules(-40, 40), 
			Algorithms.MixedMultDiv(-20, 20), Algorithms.Multiplication(7, 12), Algorithms.Division(2, 12)]

questionDump = FirebasePlugIn()
questionDump.addAlgorithm(genList[0], "Factoring", 20)