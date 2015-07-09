from api.models import State, Project, BuildingPermit, HousingPermit
import sqlite3
import json


def convert_projects():
    conn = sqlite3.connect('scrape.sqlite')
    c = conn.cursor()
    for row in c.execute('SELECT * FROM scraper'):
        id = row[0]
        score_data = json.loads(row[1])

