'use strict';

var React = require('react'),
    History = require('react-router').History,
    gameActions = require('../../../actions/gameActions.js'),
    gameStore = require('../../../stores/gameStore.js'),
    teamActions = require('../../../actions/teamActions.js'),
    teamStore = require('../../../stores/teamStore.js'),
    estimoteLocationActions = require('../../../actions/estimoteLocationActions.js'),
    estimoteLocationStore = require('../../../stores/estimoteLocationStore.js');

var NewGame = React.createClass({
    mixins: [History],

    getInitialState : function() {
        return({
            teams : teamStore.getAllTeams(),
            estimoteLocations : estimoteLocationStore.getAllEstimoteLocations(),
            image: 'images/gameTemp.jpg'
        });
    },

    componentWillMount : function() {
        teamStore.addChangeListener(this._onChange);
        gameStore.addChangeListener(this._onChange);
        estimoteLocationStore.addChangeListener(this._onChange);
    },

    componentDidMount : function() {
        teamActions.getTeamsRequest();
        estimoteLocationActions.getEstimoteLocationsRequest();
    },

    componentWillUnmount : function() {
        teamStore.removeChangeListener(this._onChange);
        gameStore.removeChangeListener(this._onChange);
        estimoteLocationStore.removeChangeListener(this._onChange);
    },

    _handleImage: function() {
        var img = this.refs.gameImg,
            preview = this.refs.preview;
        if (img.files && img.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                preview.src = this.result;
            };

            reader.readAsDataURL(img.files[0]);
        }
    },

    _onChange : function() {
        if(gameStore.isGameSaved()) {
            this.history.replaceState(null, '/admin/games');
            gameActions.falsifyIsGameSaved();
        }

        this.setState({
            teams: teamStore.getAllTeams(),
            estimoteLocations : estimoteLocationStore.getAllEstimoteLocations()
        });
    },

    submitHandler : function(event) {
        event.preventDefault();
        var self = this;

        var tempGameDate = new Date(this.refs.gameDate.value);
        var tempDate = '00';
        var tempMonth = '00';

        if(tempGameDate.getDate() < 10) {
            tempDate = '0' + tempGameDate.getDate();
        }

        else {
            tempDate = tempGameDate.getDate();
        }

        if((tempGameDate.getMonth() + 1) < 10) {
            tempMonth = '0' + (tempGameDate.getMonth + 1);
        }

        else {
            tempMonth = (tempGameDate.getMonth() + 1);
        }

        tempGameDate = '' + tempGameDate.getFullYear() + tempMonth + tempDate;

        var tempGameTime = this.refs.gameTime.value;
        var tempGameTime = tempGameTime.replace(':', '');
        
        var image = this.refs.gameImg;
        var reader = new FileReader();

        reader.onload = function (e) {

            var newGame = {
                teamHomeId : self.refs.teamHome.value,
                teamAwayId : self.refs.teamAway.value,
                gameDate : tempGameDate,
                gameTime : tempGameTime,
                image: this.result,
                estimoteLocationId : self.refs.estimoteLocationId.value,
                isGameFinished : self.refs.isGameFinished.value
            };

            gameActions.saveGameRequest(newGame);

        };

        reader.readAsDataURL(image.files[0]);

        
    },

    render : function() {
        return(
            <section>
                <h2>New Game</h2>
                <form onSubmit={this.submitHandler} className="new game">
                    <section className="col50 left">
                        <label htmlFor="teamHome">Home team</label>
                        <select id="teamHome" ref="teamHome">
                            {this.state.teams.map(function(team) {
                                return <option value={team._id} key={team._id}>{team.name}</option>
                            })}
                        </select>

                        <label htmlFor="gameDate">Game date</label>
                        <input id="gameDate" type="date" ref="gameDate"/>

                        <label htmlFor="gameTime">Game time</label>
                        <input id="gameTime" type="time" ref="gameTime"/>

                        <label htmlFor="estimoteLocationId">Estimote Location ID</label>
                        <select id="estimoteLocationId" ref="estimoteLocationId">
                            {this.state.estimoteLocations.map(function(estimoteLocation) {
                                return <option value={estimoteLocation.estimoteLocationId} key={estimoteLocation._id}>{estimoteLocation.estimoteLocationId}</option>
                            })}
                        </select>

                        <label htmlFor="isGameFinished">Is game finished?</label>
                        <input id="isGameFinished" type="checkbox" ref="isGameFinished"/>

                    </section>

                    <section className="col50 right">
                        <label htmlFor="teamAway">Away team</label>
                        <select id="teamAway" ref="teamAway">
                            {this.state.teams.map(function(team) {
                                return <option value={team._id} key={team._id}>{team.name}</option>
                            })}
                        </select>

                        <label htmlFor="gameImg">Game Image</label>
                        <input id="gameImg" onChange={ this._handleImage } ref="gameImg" type="file" accept="image/*" />

                        <img className="gameImg preview" ref="preview" src={ this.state.image } />
                        <p>Best 284 x 189.</p>

                    </section>
                    <div className="clearfix"></div>
                    <input className="btn primary" type="submit" value="Add Game" />
                </form>
            </section>
        );
    }
});

module.exports = NewGame;