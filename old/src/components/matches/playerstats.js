import React from 'react';
import moment from 'moment';

class PlayerStats extends React.Component {

  render() {

    var participantData, participantIdentityData, index;
    this.props.match.participantIdentities.forEach(function (element) {
      if (element.player.accountId == this.props.data.player.accountId) {
        index = element.participantId - 1;
        participantData = this.props.match.participants[index];
        participantIdentityData = element.player;
      }
    }, this);
    
    var cs = (participantData.stats.totalMinionsKilled + participantData.stats.neutralMinionsKilled)
    var csPerMin = (cs / (this.props.match.gameDuration / 60)).toFixed(1);

    var totalKills = 0;
    this.props.match.participants.forEach(function (element, i) {
      if (index < 5 && i < 5)
        totalKills += element.stats.kills;
      else if (index >= 5 && i >= 5)
        totalKills += element.stats.kills;
    })
    var kills = participantData.stats.kills;
    var assists = participantData.stats.assists;
    var deaths = participantData.stats.deaths;
    var kp = ((kills / totalKills) * 100).toFixed(0);
    var kda = ((kills + assists) / deaths).toFixed(2);
    
    var championName = this.props.data.champions.keys[participantData.championId];

    var spell1, spell2;
    for (var prop in this.props.data.summoners.data) {

      if (this.props.data.summoners.data[prop].id == participantData.spell1Id) {
        spell1 = prop;
      } else if (this.props.data.summoners.data[prop].id == participantData.spell2Id) {
        spell2 = prop;
      }
    }

    return (
      <div className="column playerstats is-3">
        <div className="columns ">
          <div className="column">
            <figure className="image is-48x48 champion-img">
              {championName != null ? <img src={`http://ddragon.leagueoflegends.com/cdn/${this.props.data.versions[0]}/img/champion/${championName}.png`} /> : null}
            </figure>
            <div>
              <figure className="image is-32x32 summoner-img">
                {spell1 != null ? <img src={`http://ddragon.leagueoflegends.com/cdn/${this.props.data.versions[0]}/img/spell/${spell1}.png`} /> : null}
              </figure>
              <figure className="image is-32x32 summoner-img">
                {spell2 != null ? <img src={`http://ddragon.leagueoflegends.com/cdn/${this.props.data.versions[0]}/img/spell/${spell2}.png`} /> : null}
              </figure>
            </div>
          </div>
          <div className="column">
            <p>{kills}/{deaths}/{assists}</p>
            <p><strong>KDA:</strong>{kda}</p>
            <p><strong>CS:</strong>{cs}({csPerMin})</p>
            <p><strong>KP:</strong>{kp}%</p>
          </div>
        </div>

      </div>
    );
  }
};
export default PlayerStats;
