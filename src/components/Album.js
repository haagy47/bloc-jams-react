import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './../components/PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album=> {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      isHovered: false,
      songHovered: album.songs[0]
    };

    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
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

  handleHoverOn(song){
    this.setState({
        isHovered: false
    });
    this.setState({
        songHovered: song
    });
    console.log(this.state.isHovered)
  }

  handleHoverOff(){
    this.setState({
        isHovered: true
    });
    console.log(this.state.isHovered)
  }

  songHover(song, index) {
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
    }
    else {
      return (
        <div className = "song-number">{index + 1}</div>
      )
    }
  }


  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
         <table id="song-list">
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
                      {this.songHover(song, index)}
                    </td>
                    <td className="song-title">{song.title}</td>
                    <td>{song.duration}</td>
                  </tr>
                )
              }
            </tbody>
         </table>
         <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          />
       </section>
    );
  }
}

export default Album;
