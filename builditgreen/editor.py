
scores_2009_2015_average = scores_2009_2015[average_2009]
scores_2009_2015_possible = scores_2009_2015[possible_2009]
scores_2009_2015_possible = scores_2009_2015_possible.reset_index()
scores_2009_2015_average = scores_2009_2015_average.reset_index()
score_2015_score_and_possible_2009 = pd.concat([scores_2009_2015_average, scores_2009_2015_possible], axis=1)
score_2015_score_and_possible_2009.columns = ['Score 2015 Score ID', 'Score 2015 Average', 'Score 2015 Score Possible Name', 'Score 2015 Score Possible']


scores_2009_2015