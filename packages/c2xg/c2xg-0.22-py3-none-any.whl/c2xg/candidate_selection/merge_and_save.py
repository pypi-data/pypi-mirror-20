#-------------------------------------------------------------------------------------------#
def merge_and_save(grammar_type, fold_results, Parameters, Grammar, input_files = None):
	
	from candidate_extraction.read_candidates import read_candidates 
	from candidate_selection.save_idioms import save_idioms
	from candidate_selection.save_constituents import save_constituents
	from candidate_selection.save_constructions import save_constructions
	from candidate_selection.write_grammar_debug import write_grammar_debug
	from candidate_selection.horizontal_pruning import horizontal_pruning

	#First, Average MDL scores and return merged grammar#
	mdl_dict = {}
	grammar_dict = {}

	counter = 0
		
	for fold_file in fold_results:
		
		counter += 1
		current_grammar, current_mdl = read_candidates(fold_file)
			
		mdl_dict[counter] = current_mdl
		grammar_dict[counter] = current_grammar
			
	mdl_list = list(mdl_dict.values())
	average_mdl = sum(mdl_list) / len(mdl_list)
		
	final_grammar = set(grammar_dict[1].tolist())
		
	for key in grammar_dict:
		
		final_grammar = final_grammar.union(set(grammar_dict[key].tolist()))
		
	final_grammar = [eval(x) for x in final_grammar]
	final_grammar = horizontal_pruning(final_grammar)
			
	#Print final merged results#	
	print("\tCross-fold MDL for " + str(grammar_type) + ": " + str(average_mdl))
	print("\tLength of merged grammar: " + str(len(final_grammar)))
	
	write_grammar_debug(final_grammar, "Full." + str(grammar_type), Grammar, Parameters)
	
	#Now save the final grammar#
	print("")
	print("Saving final grammar: " + str(grammar_type))
	
	if grammar_type == "Idiom":
		Grammar = save_idioms(final_grammar, Parameters, Grammar)
		Grammar.Type = "Idiom"
		
	elif grammar_type == "Constituent":
		Grammar = save_constituents(final_grammar, Parameters, Grammar)
		Grammar.Type = "Constituent"
		
	elif grammar_type == "Construction":
		Grammar = save_constructions(final_grammar, Parameters, Grammar)
		Grammar.Type = "Construction"
		
	#Delete fold result files if necessary#
	if Parameters.Delete_Temp == True:
				
		print("\tDeleting temp files.")
		from process_input.check_data_files import check_data_files
			
		if input_files != None:
			fold_results += [x.replace("Temp/","Temp/Candidates/") + ".Candidates." + type + "s" for x in input_files]
			
		if Parameters.Run_Tagger == True:
			fold_results += input_files
			
		for file in fold_results:
			check_data_files(file)
				
	return Grammar
#--------------------------------------------------------------------------------------------#