__author__ = 'trippshealy'
from bs4 import BeautifulSoup
from urllib import request
import urllib
import re
import pickle
import csv


def pull_score_card(id):
    scores_dict = {}
    leed_url = 'http://www.usgbc.org/?q=projectscorecard/{}'.format(id)
    leed_req = urllib.request.Request(leed_url, headers={'User-Agent': 'Mozilla/5.0'})
    leed_content = urllib.request.urlopen(leed_req).read()
    leed_soup = BeautifulSoup(leed_content)
    sub_ids = leed_soup.find_all( "td", class_="credit-id")
    sub_ids = [sub_ids[i].get_text() for i in range(len(sub_ids))]
    points_objects = leed_soup.find_all( "td", class_="point possible")
    points_achieved = [int(re.split(r"/", points_objects[i].get_text())[0]) for i in range(len(points_objects))]
    points_possible = [int(re.split(r"/", points_objects[i].get_text())[1]) for i in range(len(points_objects))]
    scores_dict[id] = [{sub_ids[i]: (points_achieved[i], points_possible[i])} for i in range(len(sub_ids))]
    return scores_dict

def scraper():
    with open("public_project_ids.csv", encoding='ISO-8859-1') as infile:
        ids = csv.reader(infile)
        scores = []
        for id in ids:
            print(id)
            one_score = pull_score_card(id[0])
            scores.append(one_score)
    with open('public_scores.pickle', 'wb') as handle:
        pickle.dump(scores, handle)



