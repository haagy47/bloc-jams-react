import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section className='library'>
        <Row>
          {
            this.state.albums.map( (album, index) =>
              <Col sm={12} md={6} key={index}>
              <Link to={`/album/${album.slug}`} key={index} >
                <img src={album.albumCover} alt={album.title} />
                <h2>{album.title}</h2>
                <h4>{album.artist}</h4>
                <p>{album.songs.length} songs</p>
              </Link>
              </Col>
            )
          }
        </Row>
      </section>
    );
  }
}

export default Library;
