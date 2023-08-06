#---------------------------------------------------------------------------------------------#
#FUNCTION: process_pairwise_feature_vector ---------------------------------------------------#
#INPUT: Single candidate, expanded data files, number of total units -------------------------#
#OUTPUT: List of features for current candidate ----------------------------------------------#
#---------------------------------------------------------------------------------------------#
def process_pairwise_feature_vector(candidate_info_list, pairwise_dictionary, freq_weighted):
	
	import pandas as pd
	from association_measures.create_pairwise_single import create_pairwise_single
	from association_measures.create_pairwise_multiple import create_pairwise_multiple
	
	candidate_id = candidate_info_list[0]
	candidate_length = candidate_info_list[1]
	candidate_frequency = candidate_info_list[2]
	
	if candidate_length == 2:
		vector_list = create_pairwise_single(candidate_id, candidate_frequency, pairwise_dictionary, freq_weighted)
	
	elif candidate_length > 2:
		vector_list = create_pairwise_multiple(candidate_id, candidate_frequency, pairwise_dictionary, freq_weighted)
		
	return vector_list
#---------------------------------------------------------------------------------------------#
#---------------------------------------------------------------------------------------------#