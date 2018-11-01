from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from datetime import datetime
import sys
import nba_py
import json

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return jsonify({'yo': 'brodiee'})

@app.route('/getgames')
def get_games():
    date = datetime.today()
    scoreboard = nba_py.Scoreboard(date.month,date.day,date.year)
    line_score = scoreboard.line_score()
    game_header = scoreboard.game_header()
 
    games = {}

    current_game = {}

    counter = 0

    for index, team in line_score.iterrows():
        # team 1
        if (counter == 0):
            current_game["TEAM_1_ABBREVIATION"] = team["TEAM_ABBREVIATION"]
            current_game["TEAM_1_WINS_LOSSES"] = team["TEAM_WINS_LOSSES"]
            current_game["TEAM_1_PTS"] = team["PTS"]
            current_game["TEAM_1_ID"] = team["TEAM_ID"]
            current_game["TEAM_1_GAME_SEQUENCE"] = team["GAME_SEQUENCE"]
           

            counter += 1

        # team 2
        else:
            current_game["TEAM_2_ABBREVIATION"] = team["TEAM_ABBREVIATION"]
            current_game["TEAM_2_WINS_LOSSES"] = team["TEAM_WINS_LOSSES"]
            current_game["TEAM_2_PTS"] = team["PTS"]
            current_game["TEAM_2_ID"] = team["TEAM_ID"]
            current_game["TEAM_2_GAME_SEQUENCE"] = team["GAME_SEQUENCE"]
            
            games[team["GAME_SEQUENCE"]] = current_game
            current_game = {}
            counter = 0
    print("hey", file=sys.stderr)
    print(game_header, file=sys.stderr) 
    # print(json.dumps(games), file=sys.stderr)       
         
    return jsonify(json.dumps(games))
 








if __name__ == "__main__":
    # threaded to handle multiple simultaneous calls 
    app.run(port=8080, threaded=True, debug =True)
