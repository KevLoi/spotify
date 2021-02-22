import React from 'react';
import Playlist from './Playlist';
import Search from './Search';
import Player from './Player';
import TableData from './Table';

export default class Content extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            tableData: [],
            playerType: null,
            playerId: null
        };
    }

    createArtistsArray = (data) => {
        const artistsArray = data.map(artistData => {
            console.log('artistData =', artistData);
            const {images, name, followers, genres, id} = artistData;
            const imageUrl = images.length > 0 ? images[0].url : '';
            const artistGenres = genres.join(', ');
            const { total } = followers;

            let obj = {
                image: imageUrl,
                name: name,
                genres: artistGenres,
                followers: total,
                id: id
            };

            return obj;
        });

        return artistsArray;
    }

    createTracksArray = (data) => {
        const tracksArray = data.map(trackData => {
            const { album, artists, name, id } = trackData;
            const { images } = album;
            const imageUrl = images.length > 0 ? images[0].url : '';
            const artistNames = artists.map(a => a.name).join(', ');

            let obj = {
                image: imageUrl,
                name: name,
                album: album.name,
                artists: artistNames,
                id: id
            }

            return obj;
        });

        return tracksArray;
    }

    createData = (data, type) => {
        if (type === 'artist') return this.createArtistsArray(data);
        return this.createTracksArray(data);
    }

    renderTable = (data, type) => {
        const { currOption } = this.props;

        return (data.length < 1)
            ?   <div className="d-flex justify-content-center align-items-center h-100"><h2>{currOption === 'search' ? 'Search Spotify' : 'Select Playlist'}</h2></div>
            :   <div>
                    <TableData 
                        data={data} 
                        type={type} 
                        setPlayerTypeId={(type, id) => this.setState({playerType: type, playerId: id})}
                    />
                </div>
    }

    render() {
        const { playerType, playerId } = this.state;
        const { selectedOption } = this.props;

        return (
            <div className="container">
                {selectedOption === 'search' && 
                <Search 
                    createData={(data, type) => this.createData(data, type)} 
                    setPlayerTypeId={(type, id) => this.setState({playerType: type, playerId: id})}
                />}
                {selectedOption === 'playlist' && 
                <Playlist 
                    createData={(data, type) => this.createData(data, type)}
                    setPlayerTypeId={(type, id) => this.setState({playerType: type, playerId: id})}
                />}
                {(playerType && playerId) && 
                <Player 
                    type={playerType} 
                    id={playerId} 
                    closePlayer={() => this.setState({playerType: null, playerId: null})} 
                />}
                {/* <Player 
                    type={playerType} 
                    id={playerId} 
                    closePlayer={() => this.setState({playerType: null, playerId: null})} 
                /> */}
            </div>
        );
    }
}