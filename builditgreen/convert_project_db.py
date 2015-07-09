# from api import Project, ScoreTwoPointOne, Score2009
import sqlite3
import json


def convert_projects():
    conn = sqlite3.connect('scrape_test.sqlite3')
    c = conn.cursor()
    for row in c.execute('SELECT * FROM points_data'):
        id_number = row[0]
        score_list = json.loads(row[1])
        print("ID {}".format(id))
        print("SCORE {}".format(score_list))
        print(score_list[0])
        # project = Project.objects.get(id=id_number)
        score_types = []
        for i in range(len(score_list)):
            for k, v in score_list[i].items():
                score_types.append(v[0])
        print(score_types)
        print(len(score_types))
        # print(score_types)
#        if project.leed_version == "LEED-NC v2009":
#            score = Score2009()
        #     score.SSc1 = score_data[0]
        #     score.SSc2 = score_data[1]
        #     score.SSc3 = score_data[2]
        #     score.SSc4_1 = score_data[3]
        #     score.SSc4_2 = score_data[4]
        #     score.SSc4_3 = score_data[5]
        #     score.SSc4_4 = score_data[6]
        #     score.SSc5_1 = score_data[7]
        #     score.SSc5_2 = score_data[8]
        #     score.SSc6_1 = score_data[9]
        #     score.SSc6_2 = score_data[10]
        #     score.SSc7_1 = score_data[11]
        #     score.SSc7_2 = score_data[12]
        #     score.SSc8 = score_data[13]
        #     score.WEc1 = score_data[14]
        #     score.WEc2 = score_data[15]
        #     score.WEc3 = score_data[16]
        #     score.EAc1 = score_data[17]
        #     score.EAc2 = score_data[18]
        #     score.EAc3 = score_data[19]
        #     score.EAc4 = score_data[20]
        #     score.EAc5 = score_data[21]
        #     score.EAc6 = score_data[22]
        #     score.MRc1_1 = score_data[23]
        #     score.MRc1_2 = score_data[24]
        #     score.MRc2 =  score_data[25]
        #     score.MRc3 = score_data[26]
        #     score.MRc4 = score_data[27]
        #     score.MRc5 = score_data[28]
        #     score.MRc6 = score_data[29]
        #     score.MRc7 = score_data[30]
        #     score.EQc1 = score_data[31]
        #     score.EQc2 = score_data[32]
        #     score.EQc3_1 = score_data[33]
        #     score.EQc3_2 = score_data[34]
        #     score.EQc4_1 = score_data[35]
        #     score.EQc4_2 = score_data[36]
        #     score.EQc4_3 = score_data[37]
        #     score.EQc4_4 = score_data[38]
        #     score.EQc5 = score_data[39]
        #     score.EQc6_1 = score_data[40]
        #     score.EQc6_2 = score_data[41]
        #     score.EQc7_1 = score_data[42]
        #     score.EQc7_2 = score_data[43]
        #     score.EQc8_1 = score_data[44]
        #     score.EQc8_2 = score_data[45]
        #     score.IDc1 = score_data[46]
        #     score.IDc2 = score_data[47]
        #     if len(score_data) > 48:
        #           Extra1 = score_data[48]
        #     if len(score_data) > 49:
        #           Extra2 = score_data[49]
        #     if len(score_data) > 50:
        #           Extra3 = score_data[50]
        #     if len(score_data) > 51:
        #           Extra4 = score_data[51]




        # if project.leed_version == "LEED-NC 2.1":
        #     score = ScoreTwoPointOne()
        #     score.SSc1 = score_data[0]
        #     score.SSc2 = score_data[1]
        #     score.SSc3 = score_data[2]
        #     score.SSc4_1 = score_data[3]
        #     score.SSc4_2 = score_data[4]
        #     score.SSc4_3 = score_data[5]
        #     score.SSc4_4 = score_data[6]
        #     score.SSc5_1 = score_data[7]
        #     score.SSc5_2 = score_data[8]
        #     score.SSc6_1 = score_data[9]
        #     score.SSc6_2 = score_data[10]
        #     score.SSc7_1 = score_data[11]
        #     score.SSc7_2 = score_data[12]
        #     score.SSc8 = score_data[13]
        #     score.WEc1_1 = score_data[14]
        #     score.WEc1_2 = score_data[15]
        #     score.WEc2 = score_data[16]
        #     score.WEc3_1 = score_data[17]
        #     score.WEc3_2 = score_data[18]
        #     score.EAc1 = score_data[19]
        #     score.EAc2_1 = score_data[20]
        #     score.EAc2_2 = score_data[21]
        #     score.EAc2_3 = score_data[22]
        #     score.EAc3 = score_data[23]
        #     score.EAc4 = score_data[24]
        #     score.EAc5 = score_data[25]
        #     score.EAc6 = score_data[26]
        #     score.MRc1_1 = score_data[27]
        #     score.MRc1_2 = score_data[28]
        #     score.MRc1_3 = score_data[29]
        #     score.MRc2_1 = score_data[30]
        #     score.MRc2_2 = score_data[31]
        #     score.MRc3_1 = score_data[32]
        #     score.MRc3_2 = score_data[33]
        #     score.MRc4_1 = score_data[34]
        #     score.MRc4_2 = score_data[35]
        #     score.MRc5_1 = score_data[36]
        #     score.MRc5_2 = score_data[37]
        #     score.MRc6 = score_data[38]
        #     score.MRc7 = score_data[39]
        #     score.EQc1 = score_data[40]
        #     score.EQc2 = score_data[41]
        #     score.EQc3_1 = score_data[42]
        #     score.EQc3_2 = score_data[43]
        #     score.EQc4_1 = score_data[44]
        #     score.EQc4_2 = score_data[45]
        #     score.EQc4_3 = score_data[47]
        #     score.EQc4_4 = score_data[48]
        #     score.EQc5 = score_data[49]
        #     score.EQc6_1 = score_data[46]
        #     score.EQc6_2 = score_data[50]
        #     score.EQc7_1 = score_data[51]
        #     score.EQc7_2 = score_data[52]
        #     score.EQc8_1 = score_data[53]
        #     score.EQc8_2 = score_data[54]
        #     score.IDc1 = score_data[55]
        #     score.IDc2 = score_data[56]



        # if project.leed_version == "LEED-NC 2.2":
        #     score = ScoreTwoPointTwo()
        #     score.SSc1 = score_data[0]
        #     score.SSc2 = score_data[1]
        #     score.SSc3 = score_data[2]
        #     score.SSc4_1 = score_data[3]
        #     score.SSc4_2 = score_data[4]
        #     score.SSc4_3 = score_data[5]
        #     score.SSc4_4 = score_data[6]
        #     score.SSc5_1 = score_data[7]
        #     score.SSc5_2 = score_data[8]
        #     score.SSc6_1 = score_data[9]
        #     score.SSc6_2 = score_data[10]
        #     score.SSc7_1 = score_data[11]
        #     score.SSc7_2 = score_data[12]
        #     score.SSc8 = score_data[13]
        #     score.WEc1_1 = score_data[14]
        #     score.WEc1_2 = score_data[15]
        #     score.WEc2 = score_data[16]
        #     score.WEc3_1 = score_data[17]
        #     score.WEc3_2 = score_data[18]
        #     score.EAc1 = score_data[19]
        #     score.EAc2 = score_data[20]
        #     score.EAc3 = score_data[21]
        #     score.EAc4 = score_data[22]
        #     score.EAc5 = score_data[23]
        #     score.EAc6 = score_data[24]
        #     score.MRc1_1 = score_data[25]
        #     score.MRc1_2 = score_data[26]
        #     score.MRc1_3 = score_data[27]
        #     score.MRc2_1 = score_data[28]
        #     score.MRc2_2 = score_data[29]
        #     score.MRc3_1 = score_data[30]
        #     score.MRc3_2 = score_data[31]
        #     score.MRc4_1 = score_data[32]
        #     score.MRc4_2 = score_data[33]
        #     score.MRc5_1 = score_data[34]
        #     score.MRc5_2 = score_data[34]
        #     score.MRc6 = score_data[36]
        #     score.MRc7 = score_data[37]
        #     score.EQc1 = score_data[38]
        #     score.EQc2 = score_data[39]
        #     score.EQc3_1 = score_data[40]
        #     score.EQc3_2 = score_data[41]
        #     score.EQc4_1 = score_data[42]
        #     score.EQc4_2 = score_data[43]
        #     score.EQc4_3 = score_data[44]
        #     score.EQc4_4 = score_data[45]
        #     score.EQc5 = score_data[46]
        #     score.EQc6_1 = score_data[47]
        #     score.EQc6_2 = score_data[48]
        #     score.EQc7_1 = score_data[49]
        #     score.EQc7_2 = score_data[50]
        #     score.EQc8_1 = score_data[51]
        #     score.EQc8_2 = score_data[52]
        #     score.IDc1 = score_data[53]
        #     score.IDc2 = score_data[54]

if __name__ == "__main__":
    convert_projects()

