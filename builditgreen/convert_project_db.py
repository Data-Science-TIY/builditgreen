from api.models import Project, ScoreTwoPointOne, Score2009, ScoreTwoPointTwo
import sqlite3
import json
from django.core.exceptions import ObjectDoesNotExist


def convert_projects():
    conn = sqlite3.connect('scrape.sqlite3')
    c = conn.cursor()
    for row in c.execute('SELECT * FROM points_data'):
        id_number = row[0]
        score_list = json.loads(row[1])
        print("ID {}".format(id_number))
        print("SCORE {}".format(score_list))
        try:
            current_project = Project.objects.get(id=id_number)
            if len(score_list) > 0:
                score_data = []
                for i in range(len(score_list)):
                    for k, v in score_list[i].items():
                        score_data.append(v[0])
                print(score_data)
                print(len(score_data))
                if current_project.leed_version == "LEED-NC v2009":
                    score = Score2009()
                    score.project = current_project
                    score.ssc1 = score_data[0]
                    score.ssc2 = score_data[1]
                    score.ssc3 = score_data[2]
                    score.ssc4_1 = score_data[3]
                    score.ssc4_2 = score_data[4]
                    score.ssc4_3 = score_data[5]
                    score.ssc4_4 = score_data[6]
                    score.ssc5_1 = score_data[7]
                    score.ssc5_2 = score_data[8]
                    score.ssc6_1 = score_data[9]
                    score.ssc6_2 = score_data[10]
                    score.ssc7_1 = score_data[11]
                    score.ssc7_2 = score_data[12]
                    score.ssc8 = score_data[13]
                    score.wec1 = score_data[14]
                    score.wec2 = score_data[15]
                    score.wec3 = score_data[16]
                    score.eac1 = score_data[17]
                    score.eac2 = score_data[18]
                    score.eac3 = score_data[19]
                    score.eac4 = score_data[20]
                    score.eac5 = score_data[21]
                    score.eac6 = score_data[22]
                    score.mrc1_1 = score_data[23]
                    score.mrc1_2 = score_data[24]
                    score.mrc2 =  score_data[25]
                    score.mrc3 = score_data[26]
                    score.mrc4 = score_data[27]
                    score.mrc5 = score_data[28]
                    score.mrc6 = score_data[29]
                    score.mrc7 = score_data[30]
                    score.eqc1 = score_data[31]
                    score.eqc2 = score_data[32]
                    score.eqc3_1 = score_data[33]
                    score.eqc3_2 = score_data[34]
                    score.eqc4_1 = score_data[35]
                    score.eqc4_2 = score_data[36]
                    score.eqc4_3 = score_data[37]
                    score.eqc4_4 = score_data[38]
                    score.eqc5 = score_data[39]
                    score.eqc6_1 = score_data[40]
                    score.eqc6_2 = score_data[41]
                    score.eqc7_1 = score_data[42]
                    score.eqc7_2 = score_data[43]
                    score.eqc8_1 = score_data[44]
                    score.eqc8_2 = score_data[45]
                    score.idc1 = score_data[46]
                    score.idc2 = score_data[47]
                    if len(score_data) > 48:
                          score.extra1 = score_data[48]
                    if len(score_data) > 49:
                          score.extra2 = score_data[49]
                    if len(score_data) > 50:
                          score.extra3 = score_data[50]
                    if len(score_data) > 51:
                          score.extra4 = score_data[51]
                    score.save()

                elif current_project.leed_version == "LEED-NC 2.1":
                    score = ScoreTwoPointOne()
                    score.project = current_project
                    score.ssc1 = score_data[0]
                    score.ssc2 = score_data[1]
                    score.ssc3 = score_data[2]
                    score.ssc4_1 = score_data[3]
                    score.ssc4_2 = score_data[4]
                    score.ssc4_3 = score_data[5]
                    score.ssc4_4 = score_data[6]
                    score.ssc5_1 = score_data[7]
                    score.ssc5_2 = score_data[8]
                    score.ssc6_1 = score_data[9]
                    score.ssc6_2 = score_data[10]
                    score.ssc7_1 = score_data[11]
                    score.ssc7_2 = score_data[12]
                    score.ssc8 = score_data[13]
                    score.wec1_1 = score_data[14]
                    score.wec1_2 = score_data[15]
                    score.wec2 = score_data[16]
                    score.wec3_1 = score_data[17]
                    score.wec3_2 = score_data[18]
                    score.eac1 = score_data[19]
                    score.eac2_1 = score_data[20]
                    score.eac2_2 = score_data[21]
                    score.eac2_3 = score_data[22]
                    score.eac3 = score_data[23]
                    score.eac4 = score_data[24]
                    score.eac5 = score_data[25]
                    score.eac6 = score_data[26]
                    score.mrc1_1 = score_data[27]
                    score.mrc1_2 = score_data[28]
                    score.mrc1_3 = score_data[29]
                    score.mrc2_1 = score_data[30]
                    score.mrc2_2 = score_data[31]
                    score.mrc3_1 = score_data[32]
                    score.mrc3_2 = score_data[33]
                    score.mrc4_1 = score_data[34]
                    score.mrc4_2 = score_data[35]
                    score.mrc5_1 = score_data[36]
                    score.mrc5_2 = score_data[37]
                    score.mrc6 = score_data[38]
                    score.mrc7 = score_data[39]
                    score.eqc1 = score_data[40]
                    score.eqc2 = score_data[41]
                    score.eqc3_1 = score_data[42]
                    score.eqc3_2 = score_data[43]
                    score.eqc4_1 = score_data[44]
                    score.eqc4_2 = score_data[45]
                    score.eqc4_3 = score_data[47]
                    score.eqc4_4 = score_data[48]
                    score.eqc5 = score_data[49]
                    score.eqc6_1 = score_data[46]
                    score.eqc6_2 = score_data[50]
                    score.eqc7_1 = score_data[51]
                    score.eqc7_2 = score_data[52]
                    score.eqc8_1 = score_data[53]
                    score.eqc8_2 = score_data[54]
                    score.idc1 = score_data[55]
                    score.idc2 = score_data[56]
                    score.save()

                elif current_project.leed_version == "LEED-NC 2.2":
                    score = ScoreTwoPointTwo()
                    score.project = current_project
                    score.ssc1 = score_data[0]
                    score.ssc2 = score_data[1]
                    score.ssc3 = score_data[2]
                    score.ssc4_1 = score_data[3]
                    score.ssc4_2 = score_data[4]
                    score.ssc4_3 = score_data[5]
                    score.ssc4_4 = score_data[6]
                    score.ssc5_1 = score_data[7]
                    score.ssc5_2 = score_data[8]
                    score.ssc6_1 = score_data[9]
                    score.ssc6_2 = score_data[10]
                    score.ssc7_1 = score_data[11]
                    score.ssc7_2 = score_data[12]
                    score.ssc8 = score_data[13]
                    score.wec1_1 = score_data[14]
                    score.wec1_2 = score_data[15]
                    score.wec2 = score_data[16]
                    score.wec3_1 = score_data[17]
                    score.wec3_2 = score_data[18]
                    score.eac1 = score_data[19]
                    score.eac2 = score_data[20]
                    score.eac3 = score_data[21]
                    score.eac4 = score_data[22]
                    score.eac5 = score_data[23]
                    score.eac6 = score_data[24]
                    score.mrc1_1 = score_data[25]
                    score.mrc1_2 = score_data[26]
                    score.mrc1_3 = score_data[27]
                    score.mrc2_1 = score_data[28]
                    score.mrc2_2 = score_data[29]
                    score.mrc3_1 = score_data[30]
                    score.mrc3_2 = score_data[31]
                    score.mrc4_1 = score_data[32]
                    score.mrc4_2 = score_data[33]
                    score.mrc5_1 = score_data[34]
                    score.mrc5_2 = score_data[34]
                    score.mrc6 = score_data[36]
                    score.mrc7 = score_data[37]
                    score.eqc1 = score_data[38]
                    score.eqc2 = score_data[39]
                    score.eqc3_1 = score_data[40]
                    score.eqc3_2 = score_data[41]
                    score.eqc4_1 = score_data[42]
                    score.eqc4_2 = score_data[43]
                    score.eqc4_3 = score_data[44]
                    score.eqc4_4 = score_data[45]
                    score.eqc5 = score_data[46]
                    score.eqc6_1 = score_data[47]
                    score.eqc6_2 = score_data[48]
                    score.eqc7_1 = score_data[49]
                    score.eqc7_2 = score_data[50]
                    score.eqc8_1 = score_data[51]
                    score.eqc8_2 = score_data[52]
                    score.idc1 = score_data[53]
                    score.idc2 = score_data[54]
                    score.save()
        except ObjectDoesNotExist:
            print("ID: {} not in db".format(id_number))

