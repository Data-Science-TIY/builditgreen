from api.models import State, Project, BuildingPermit, HousingPermit
import csv
import time
from datetime import datetime
from datetime import date

states = {
        'AK': 'Alaska',
        'AL': 'Alabama',
        'AR': 'Arkansas',
        'AS': 'American Samoa',
        'AZ': 'Arizona',
        'CA': 'California',
        'CO': 'Colorado',
        'CT': 'Connecticut',
        'DC': 'District of Columbia',
        'DE': 'Delaware',
        'FL': 'Florida',
        'GA': 'Georgia',
        'GU': 'Guam',
        'HI': 'Hawaii',
        'IA': 'Iowa',
        'ID': 'Idaho',
        'IL': 'Illinois',
        'IN': 'Indiana',
        'KS': 'Kansas',
        'KY': 'Kentucky',
        'LA': 'Louisiana',
        'MA': 'Massachusetts',
        'MD': 'Maryland',
        'ME': 'Maine',
        'MI': 'Michigan',
        'MN': 'Minnesota',
        'MO': 'Missouri',
        'MP': 'Northern Mariana Islands',
        'MS': 'Mississippi',
        'MT': 'Montana',
        'NC': 'North Carolina',
        'ND': 'North Dakota',
        'NE': 'Nebraska',
        'NH': 'New Hampshire',
        'NJ': 'New Jersey',
        'NM': 'New Mexico',
        'NV': 'Nevada',
        'NY': 'New York',
        'OH': 'Ohio',
        'OK': 'Oklahoma',
        'OR': 'Oregon',
        'PA': 'Pennsylvania',
        'PR': 'Puerto Rico',
        'RI': 'Rhode Island',
        'SC': 'South Carolina',
        'SD': 'South Dakota',
        'TN': 'Tennessee',
        'TX': 'Texas',
        'UT': 'Utah',
        'VA': 'Virginia',
        'VI': 'Virgin Islands',
        'VT': 'Vermont',
        'WA': 'Washington',
        'WI': 'Wisconsin',
        'WV': 'West Virginia',
        'WY': 'Wyoming'
}

states_list = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "PR", "VI",
            "MP", "GU", "AS"]


def fix_time(time_string):
    if time_string == "":
        return None
    else:
        strp_time = time.strptime(time_string, '%m/%d/%y')
        return date.fromtimestamp(time.mktime(strp_time))


def make_states():
    for abbrev, state_name in states.items():
        state = State()
        state.abbreviation = abbrev
        state.name = state_name
        state.save()





def make_projects():
    #takes bad csv and converts to usable models
    with open("PublicLEEDProjectDirectory.csv", encoding='ISO-8859-1') as infile:
        reader = csv.reader(infile)
        for row in reader:
            if row[5] in states_list:
                project = Project()
                project.id = row[0]
                project.is_confidential = row[1]
                project.name = row[2]
                project.street = row[3]
                project.city = row[4]
                project.state_id = State.objects.get(abbreviation = row[5])
                project.zip_code = row[6]
                project.country = row[7]
                project.leed_version = row[8]
                if (row[9] != "") and (row[9] != " "):
                    project.points_achieved = int(float(row[9]))
                project.certification_level = row[10]
                project.certification_date = fix_time(row[11].split(" ")[0])
                project.owner_types = row[13]
                if (row[14] != "") and (row[15] != " "):
                    project.gross_square_foot = int(float(row[14]))
                if (row[15] != "") and (row[15] != " "):
                    project.total_property_area = int(float(row[15]))
                project.project_types = row[16].split(",")[0]
                project.registration_date = fix_time(row[18].split(" ")[0])
                project.save()
                print(project.name)


col_headers = ["", "AL", "AL", "AK", "AK", "AZ", "AZ","AR", "AR", "CA", "CA", "CO", "CO", "CT", "CT" ,"DE", "DE",
               "DC", "DC", "FL", "FL", "GA", "GA", "HI", "HI", "ID", "ID", "IL", "IL", "IN", "IN", "IA", "IA", "KS",
               "KS", "KY", "KY", "LA", "LA", "ME", "ME", "MD", "MD", "MA", "MA", "MI", "MI", "MN", "MN", "MS", "MS",
               "MO", "MO", "MT", "MT", "NE", "NE", "NV", "NV", "NH", "NH", "NJ", "NJ", "NM", "NM", "NY", "NY", "NC",
               "NC", "ND", "ND", "OH", "OH", "OK", "OK", "OR", "OR", "PA", "PA", "PR", "PR", "RI", "RI", "SC", "SC",
               "SD", "SD", "TN", "TN", "TX", "TX", "UT", "UT", "VT", "VT", "VA", "VA", "VI", "VI", "WA", "WA", "WV",
               "WV", "WI", "WI", "WY", "WY"]

def make_state_building_permits():
    with open("states_building_permits.csv") as infile:
        reader = csv.reader(infile)
        for row in reader:
            for i in len(row):
                if i == 0:
                    print(row[0])

                elif i % 2 != 0:
                    building_permit = BuildingPermit()
                    building_permit.state_id = State.objects.get(abbreviation = col_headers[i])
                    building_permit.year = row[0]
                    building_permit.total = row[i]

                else:
                    housing_permit = HousingPermit()
                    housing_permit.state_id = State.objects.get(abbreviation = col_headers[i])
                    housing_permit.year = row[0]
                    housing_permit.total = row[i]


