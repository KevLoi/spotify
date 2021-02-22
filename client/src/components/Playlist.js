import React, { Component } from 'react';
import classNames from 'classnames';
import { getPlaylist, getUserPlaylist } from '../apis/spotify';
import TableData from './Table';

const TABLE_TYPE = 'playlistTracks';

export default class Playlist extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            userPlaylists: [], 
            selectedPlaylistName: null, 
            selectedPlaylist: [] 
        };
    }

    componentDidMount() {
        this.renderPlaylists();
        this.renderPlaylistTracks();
    }

    componentDidUpdate(prevState) {
        if (prevState.selectedPlaylistname !== this.state.selectedPlaylistName)
            this.renderPlaylists();
    }

    handlePlaylistClicked = (playlist) => {
        this.setState({selectedPlaylistName: playlist.name});
        this.renderPlaylistTracks(playlist);
    }

    renderPlaylists = () => {
        getUserPlaylist().then(response => {
            this.setState({
                userPlaylists: response.data.map((playlist, ndx) => {
                    return (
                        <div 
                            className={classNames('playlist', {'active shadow': this.state.selectedPlaylistName === playlist.name})} 
                            key={ndx}
                            onClick={() => this.handlePlaylistClicked(playlist)}
                        >
                            {playlist.name}
                        </div>
                    );
                })
            });
        });
    }

    renderPlaylistTracks = (playlist) => {
        const { createData } = this.props;

        if (!playlist) { 
            this.setState({selectedPlaylist: []}); 
            return; 
        }
            
        try{ 
            getPlaylist(playlist).then(response => {
                this.setState({selectedPlaylist: createData(response, TABLE_TYPE)});
            });
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const { userPlaylists, selectedPlaylist } = this.state;
        const { setPlayerTypeId } = this.props;

        return (
            <div className="container playlist-content">
                <div className="row">
                    <div className="playlists col-md-3" style={{height: `${window.innerHeight - 100}px`}}>
                        <h2 className="playlist-header">
                            Playlists
                        </h2>
                        {userPlaylists}
                    </div>
                    <div className="list col-md-9 songList shadow-lg">
                    {(selectedPlaylist.length < 1)
                    ?   <div className="d-flex justify-content-center align-items-center h-100"><h2>Select Playlist</h2></div>
                    :   <TableData 
                            data={selectedPlaylist} 
                            type={TABLE_TYPE} 
                            setPlayerTypeId={(type, id) => setPlayerTypeId(type, id)}
                        />}
                    </div>
                </div>
            </div>
        );
    }
}