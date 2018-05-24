import React, { Component } from 'react';
import albumData from './../data/albums';

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
      statusPlay: album.songs[0],
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
      this.setState({ statusPlay: song })
    }
  }

  handleIconClass(e, song){
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong){
      //e.target.className = "ion-md-play"
    } else {
      //e.target.className= "ion-md-pause"
    }
  }

  handleIconChange(index, song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong){
      //return ''
    } else {
      //return index + 1
    }
  }

  handleHoverEnter(e, song) {

    //const isSameSong = this.state.currentSong === song;
    //if (this.state.isPlaying && isSameSong){
        //return (
          //<div className = "ion-md-play"></div>
        //)
    //}
  }

  handleHoverLeave(e, song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      //e.target.className= ""
    } else {
      //e.target.className = ''
    }
  }

  showPause(song, index) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong){
        return(
          <div className = "ion-md-pause"></div>
      )
    }
  }

  showPlay(song, index) {
    const isSameSong = this.state.currentSong === song;
    if (!this.state.isPlaying && isSameSong){
        return (
          <div className = "ion-md-play"></div>
        )
    } else {
        //return (
          //<div className = "song-number">{index + 1}</div>
      //)
    }
  }

  showSongNumber(song, index) {
    const isSameSong = this.state.currentSong === song;
    if (!this.state.isPlaying && !isSameSong){
        return(
          <div className = "song-number">{index + 1}</div>
      )
    }
  }

  showSongNumberTwo(song, index) {
    const isSameSong = this.state.statusPlay === song;
    if (this.state.isPlaying && !isSameSong){
        return(
          <div className = "song-number">{index + 1}</div>
      )
    }
  }


  //songHover(song) {
  //  if (this.state.isHovered) {
    //  return (
      //  <div className = "ion-md-play"></div>
  //  )
  //  }
  //}


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
                  <tr className="song" key={index} onClick={() => this.handleSongClick(song)}>
                    <td onMouseEnter={() => this.handleHoverOn(song)} onMouseLeave={this.handleHoverOff}>
                      {/*this.songHover(song, index)*/}
                      {this.showPause(song, index)}
                      {this.showPlay(song, index)}
                      {this.showSongNumber(song, index)}
                      {this.showSongNumberTwo(song, index)}
                    </td>
                    <td className="song-title">{song.title}</td>
                    <td>{song.duration}</td>
                  </tr>
                )
              }
            </tbody>
         </table>
       </section>
    );
  }
}

export default Album;
