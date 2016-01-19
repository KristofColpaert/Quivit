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
            image: 'images/gameTemp.jpg',
            imageUrl : gameStore.getImageUrl(),
            teamHomeClass : '',
            teamHomeValid : true,
            teamAwayClass : '',
            teamAwayValid : true,
            gameDateClass : 'input error',
            gameDateValid : false,
            gameTimeClass : 'input error',
            gameTimeValid : false,
            estimoteLocationClass : '',
            estimoteLocationValid : true,
            gameImgClass : 'input error',
            gameImgValid : false
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
    
    _checkTextInput: function(event) {
        var value = event.target.value;
        var id = event.target.id;

        switch(id) {
            case 'teamHome':
                if(value && value !== '') {
                    this.setState({
                        teamHomeClass : '',
                        teamHomeValid : true
                    });
                }
                else {
                    this.setState({
                        teamHomeClass : 'input error',
                        teamHomeValid : false
                    });
                }
                break;

            case 'teamAway':
                if(value && value !== '') {
                    this.setState({
                        teamAwayClass : '',
                        teamAwayValid : true
                    });
                }
                else {
                    this.setState({
                        teamAwayClass : 'input error',
                        teamAwayValid : false
                    });
                }
                break;

            case 'gameDate':
                if(value && value !== '' && value.match(/^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/)){
                    this.setState({
                        gameDateClass : '',
                        gameDateValid : true,
                    });
                }
                else {
                    this.setState({
                        gameDateClass : 'input error',
                        gameDateValid : false
                    });
                }
                break;

            case 'gameTime':
                if(value && value !== '' && value.match(/^[0-9]{2}[:][0-9]{2}$/)) {
                    this.setState({
                        gameTimeClass : '',
                        gameTimeValid : true,
                    });
                }
                else {
                    this.setState({
                        gameTimeClass : 'input error',
                        gameTimeValid : false
                    });
                }
                break;

            case 'estimoteLocationId':
                if(value && value !== '') {
                    this.setState({
                        estimoteLocationClass : '',
                        estimoteLocationValid : true
                    });
                }
                else {
                    this.setState({
                        estimoteLocationClass : 'input error',
                        estimoteLocationValid : false
                    });
                }
                break;
        }
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

            //Upload image
            var formData = new FormData();
            formData.append('image', img.files[0], 'game.jpg');
            gameActions.uploadImageRequest(formData);

            this.setState({
                gameImgClass : '',
                gameImgValid : true
            });
        }

        else {
            this.setState({
                gameImgClass : 'input error',
                gameImgValid : false
            });
        }
    },

    _onChange : function() {
        if(gameStore.isGameSaved()) {
            this.history.replaceState(null, '/admin/games');
            gameActions.falsifyIsGameSaved();
        }

        else {
            this.setState({
                teams : teamStore.getAllTeams(),
                estimoteLocations : estimoteLocationStore.getAllEstimoteLocations(),
                image: 'images/gameTemp.jpg',
                imageUrl : gameStore.getImageUrl()
            });
        }
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
            tempMonth = '0' + (tempGameDate.getMonth() + 1);
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
                image: self.state.imageUrl,
                estimoteLocationId : self.refs.estimoteLocationId.value,
                isGameFinished : self.refs.isGameFinished.value
            };

            gameActions.saveGameRequest(newGame);

        };

        reader.readAsDataURL(image.files[0]);
    },

    render : function() {
        var submitButton = null;
        if(gameStore.isImageUrlSet() && this.state.teamHomeValid && this.state.teamAwayValid && this.state.gameDateValid
            && this.state.gameTimeValid && this.state.estimoteLocationValid && this.state.gameImgValid) {
            submitButton = <button className="btn primary" type="submit">Add game</button>;
        }
        else {
            submitButton = <button className="btn primary" type="submit" disabled>Add game</button>
        }

        return(
            <section>
                <h2>New Game</h2>
                <form onSubmit={this.submitHandler} className="new game">
                    <section className="col50 left">
                        <label htmlFor="teamHome">Home team</label>
                        <select id="teamHome" ref="teamHome" className={this.state.teamHomeClass} onChange={this._checkTextInput}>
                            {this.state.teams.map(function(team) {
                                return <option value={team._id} key={team._id}>{team.name}</option>
                            })}
                        </select>

                        <label htmlFor="gameDate">Game date</label>
                        <input
                            name="gameDate"
                            id="gameDate"
                            type="date"
                            ref="gameDate"
                            className={this.state.gameDateClass}
                            onChange={this._checkTextInput} />

                        <label htmlFor="gameTime">Game time</label>
                        <input id="gameTime" type="time" ref="gameTime" className={this.state.gameTimeClass} onChange={this._checkTextInput} />

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
                        <select id="teamAway" ref="teamAway" className={this.state.teamAwayClass} onChange={this._checkTextInput}>
                            {this.state.teams.map(function(team) {
                                return <option value={team._id} key={team._id}>{team.name}</option>
                            })}
                        </select>


                        <label htmlFor="gameImg">Game Image</label>
                        <input id="gameImg" onChange={this._handleImage} className={this.state.gameImgClass} ref="gameImg" type="file" accept="image/*" />

                        <img className="gameImg preview" ref="preview" src={ this.state.image } />
                        <p>Best 284 x 189.</p>

                    </section>
                    <div className="clearfix"></div>
                    {submitButton}
                </form>
            </section>
        );
    }
});

module.exports = NewGame;