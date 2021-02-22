import React from 'react';
import classNames from 'classnames';


export default class Options extends React.Component {

    constructor(props) {
        super(props);
        console.log('props =', props);

        this.state = {
            mouseOverSearch: false,
            mouseOverPlaylist: false,
        }
    }

    render() {

        return (
            <div className="container options">
                <div className="d-flex justify-content-around">
                    <button 
                        onMouseOver={() => this.setState({mouseOverSearch: true})}
                        onMouseOut={() => {this.setState({mouseOverSearch: false})}}
                        onClick={() => {this.props.setOption('search')}}
                        className={classNames("optionsBtns searchBtn shadow flex-grow-1 text-center shadow-sm", {'shadow-lg': this.state.mouseOverSearch, 'active shadow-lg': this.props.currOption === 'search'})}
                    >
                        Search
                    </button>
                    <button 
                        onMouseOver={() => this.setState({mouseOverPlaylist: true})}
                        onMouseOut={() => {this.setState({mouseOverPlaylist: false})}}
                        onClick={() => {this.props.setOption('playlist')}}
                        className={classNames("optionsBtns playlistBtn shadow flex-grow-1 text-center shadow-sm", {'shadow-lg': this.state.mouseOverPlaylist, 'active shadow-lg': this.props.currOption === 'playlist'})}
                    >
                        Playlist
                    </button>
                </div>
            </div>
        );
    }
}