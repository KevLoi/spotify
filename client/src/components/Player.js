import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const Player = (props) => {
    const baseURL = 'https://open.spotify.com/embed';
    const type = props.type === 'playlistTracks' ? 'track' : props.type;

    return (
        <div className="spotify-player shadow-lg">
            <div className="d-flex" style={{justifyContent: 'flex-end'}}><CloseIcon className="close-icon" onClick={props.closePlayer} /></div>
            
            <iframe src={`${baseURL}/${type}/${props.id}`} title={type} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media" />
            {/* <iframe src={`${baseURL}/track/0VjIjW4GlUZAMYd2vXMi3b`} title={props.type} width="270" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media" /> */}
        </div>
    );
}

export default Player;