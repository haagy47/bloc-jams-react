import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './../components/PlayerBar';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album=> {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 0.8,
      isPlaying: false,
      isHovered: false,
      songHovered: album.songs[0],
    };

    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;

    this.formatTime = this.formatTime.bind(this);
  }

  componentDidMount() {
    this.eventListeners = {
       timeupdate: e => {
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       },
       volumeupdate: e => {
         this.setState({ currentVolume: this.audioElement.currentVolume });
       },
     };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
  }

  componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
   }

  play() {
      this.audioElement.play();
      this.setState({ isPlaying: true });
  }

  pause() {
      this.audioElement.pause();
      this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  selectSong(song) {
    this.setState({ songSelected: true });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick(song) {
    this.setState({ songHovered: song });
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const albumEnd = this.state.album.songs.length - 1;
    const newIndex = Math.min(albumEnd, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleHoverOn(song){
    this.setState({
        isHovered: false
    });
    this.setState({
        songHovered: song
    });
  }

  handleHoverOff(){
    this.setState({
        isHovered: true
    });
  }

  songHover(song, index, album) {
    const isSameSong = this.state.currentSong === song;
    if (!this.state.isHovered && this.state.songHovered === song && !isSameSong) {
      return (
        <div className = "ion-md-play"></div>
      )
    } else if (!this.state.isPlaying && isSameSong) {
      return (
        <div className = "ion-md-play"></div>
      )
    } else if (this.state.isPlaying && isSameSong){
      return(
        <div className = "ion-md-pause"></div>
      )
    } else {
        return (
          <div className = "song-number">{index + 1}</div>
        )
    }
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
   }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.currentVolume = newVolume;
    this.setState({ currentVolume: newVolume });
    this.audioElement.volume = newVolume;
  }

  formatTime(timeSeconds) {
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = Math.floor(timeSeconds - minutes * 60);
    if (isNaN(timeSeconds)) {
      return "-:--";
    } else {
      return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h2 id="album-title">{this.state.album.title}</h2>
            <h3 className="artist">{this.state.album.artist}</h3>
            <p id="release-info">{this.state.album.releaseInfo}</p>
          </div>
        </section>
        <Grid>
          <Row>
            <Col xs={12} md={6} className="song-list-container">
              <table id="song-list" className="col-md-12">
               <colgroup>
                  <col id="song-number-column" />
                  <col id="song-title-column" />
                  <col id="song-duration-column" />
                </colgroup>
                <tbody>
                  {
                    this.state.album.songs.map( (song, index, album) =>
                      <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleHoverOn(song)} onMouseLeave={this.handleHoverOff}>
                        <td>
                          {this.songHover(song, index, album)}
                        </td>
                        <td className="song-title">{song.title}</td>
                        <td>{this.formatTime(song.duration)}</td>
                      </tr>
                    )
                  }
                </tbody>
               </table>
              </Col>
              <Col xs={12} md={6}>
               <PlayerBar
                isPlaying={this.state.isPlaying}
                currentSong={this.state.currentSong}
                currentTime={this.audioElement.currentTime}
                duration={this.audioElement.duration}
                currentVolume={this.state.currentVolume}
                formatTime={(t) => this.formatTime(t)}
                handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                handlePrevClick={() => this.handlePrevClick()}
                handleNextClick={() => this.handleNextClick(this.state.album.songs.song)}
                handleTimeChange={(e) => this.handleTimeChange(e)}
                handleVolumeChange={(e) => this.handleVolumeChange(e)}
                />
              </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

export default Album;
