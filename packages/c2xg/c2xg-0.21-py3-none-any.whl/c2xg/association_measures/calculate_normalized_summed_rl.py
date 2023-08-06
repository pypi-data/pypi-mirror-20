#---------------------------------------------------------------------------------------------#
#FUNCTION: calculate_normalized_summed_rl ----------------------------------------------------#
#INPUT: DataFrame with pairwise co-occurrence frequencies ------------------------------------#
#OUTPUT: Given Delta-P measure ---------------------------------------------------------------#
#---------------------------------------------------------------------------------------------#
def calculate_normalized_summed_rl(co_occurrence_list, summed_rl, freq_weighted):
	
	length = len(co_occurrence_list)
	normalized_summed_rl = summed_rl / length
	
	return normalized_summed_rl
#---------------------------------------------------------------------------------------------#
#---------------------------------------------------------------------------------------------#