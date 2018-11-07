from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from datetime import datetime
import sys
import nba_py
from nba_py.constants import CURRENT_SEASON
from nba_py.constants import TEAMS
from nba_py import constants
from nba_py import game
from nba_py import player
from nba_py import team
from nba_py import league
from nba_py import draftcombine
import json
import math

from team_constants import TEAM_IMG

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return jsonify({'yo': 'brodiee'})

@app.route('/leagueleaders')
def league_leaders():
    leaders = league.Leaders()
    return leaders.results().to_json(orient='records')


@app.route('/getgames')
def get_games():
    date = datetime.today()
    scoreboard = nba_py.Scoreboard(date.month,date.day,date.year)
    line_score = scoreboard.line_score()
    game_header = scoreboard.game_header()
    
    # lt = league.Leaders()
    
    # str = lt.results().sort_values(by="PTS", ascending=False).to_string()
    # # str = game_header.sort_values(by="GAME_SEQUENCE").to_string()
    # f = open("demofile.txt", "w")
    # f.write(str)   
 
    games = {}

    current_game = {}

    counter = 0

    for index, team in line_score.iterrows():
        # team 1
        if (counter == 0):
            current_game["TEAM_1_ABBREVIATION"] = team["TEAM_ABBREVIATION"]
            current_game["TEAM_1_WINS_LOSSES"] = team["TEAM_WINS_LOSSES"]
            # current_game["TEAM_1_PTS"] = team["PTS"]
            current_game["TEAM_1_ID"] = team["TEAM_ID"]
            current_game["TEAM_1_GAME_SEQUENCE"] = team["GAME_SEQUENCE"]
            current_game["TEAM_1_IMG"] = TEAM_IMG[team["TEAM_ABBREVIATION"]]["img"]

            if (team["PTS"] is None or math.isnan(team["PTS"])):
                current_game["TEAM_1_PTS"] = None 
            else:
                current_game["TEAM_1_PTS"] = team["PTS"]
            # print(type(team["PTS"]), file=sys.stderr) 

            counter += 1

        # team 2
        else:
            current_game["TEAM_2_ABBREVIATION"] = team["TEAM_ABBREVIATION"]
            current_game["TEAM_2_WINS_LOSSES"] = team["TEAM_WINS_LOSSES"]
            # current_game["TEAM_2_PTS"] = team["PTS"]
            current_game["TEAM_2_ID"] = team["TEAM_ID"]
            current_game["TEAM_2_GAME_SEQUENCE"] = team["GAME_SEQUENCE"]
            current_game["TEAM_2_IMG"] = TEAM_IMG[team["TEAM_ABBREVIATION"]]["img"]

            if (team["PTS"] is None or math.isnan(team["PTS"])):
                current_game["TEAM_2_PTS"] = None 
            else:
                current_game["TEAM_2_PTS"] = team["PTS"]
            # print(type(team["PTS"]), file=sys.stderr) 
            
            games[team["GAME_SEQUENCE"]] = current_game
            current_game = {}
            counter = 0
    # print("hey", file=sys.stderr)
    # print(game_header, file=sys.stderr) 
    # print(json.dumps(games), file=sys.stderr)       
         
    return jsonify(json.dumps(games))
 








if __name__ == "__main__":
    # threaded to handle multiple simultaneous calls 
    app.run(port=8080, threaded=True, debug =True)
