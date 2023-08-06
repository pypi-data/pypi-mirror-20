#----------------------------------------------------------------------------------#
#Train and save word2vec model using GenSim ---------------------------------------#
#----------------------------------------------------------------------------------#
def train_models(input_directory, output_file, workers, sg, size, min_count, hs, negative, iter):

	import gensim
	import os
	import pickle
	
	print("Starting to train word2vec model.")

	sentences = MySentences(input_directory)
	
	model = gensim.models.Word2Vec(sentences, 
									hashfxn=hash32, 
									workers=workers,
									sg=sg,
									size=size,
									min_count=min_count,
									hs=hs,
									negative=negative,
									iter=iter
									)

	print("Finished training word2vec model.")
	
	#Save clusters#
	if os.path.isfile(output_file):
		os.remove(output_file)
		
	with open(output_file, 'wb') as f:
		pickle.dump(model, f)
	
	return
#----------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------#

#----------------------------------------------------------------------------------#
# Fixes integeter length for interfacing Python and C -----------------------------#
#----------------------------------------------------------------------------------#				
def hash32(value):
	return hash(value) & 0xffffffff
#----------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------#

#----------------------------------------------------------------------------------#
#Creates iterator for sending to word2vec model, based on GenSim example ----------#
#----------------------------------------------------------------------------------#
import os

class MySentences(object):

	def __init__(self, dirname):
		self.dirname = dirname
		
	def __iter__(self):
	
		import codecs
		from functions_annotate.tokenize_line import tokenize_line
		
		for fname in os.listdir(self.dirname):
			for line in codecs.open(os.path.join(self.dirname, fname), encoding = "utf-8"):
				
				line = tokenize_line(line)
				
				#Some lines have only one item#
				try:
					line = line.lower()
					line = line.split(" ")
					
					if len(line) > 1:
						yield line
					
				except:
					
					null_counter = 0
#----------------------------------------------------------------------------------#
#----------------------------------------------------------------------------------#