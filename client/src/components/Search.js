import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getSearchResults } from '../apis/spotify';
import TableData from './Table';


export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = { searchResults: [], searchType: 'type', searchString: '' };
    }

    handleTypeChanged = (e) => {
        this.setState({searchType: e.target.value});
    }

    handleStringChanged = (e) => {
        this.setState({searchString: e.target.value});
    }

    renderSearchResults = () => {
        const { searchType, searchString } = this.state;
        const { createData } = this.props;

        if ( !searchString || !searchType ) {
            this.setState({searchResults: []});
            return;
        }

        try {
            getSearchResults(searchString, searchType).then(response => {
                this.setState({searchResults: createData(response, searchType)});
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { searchType, searchString, searchResults } = this.state;
        const { setPlayerTypeId } = this.props;

        return (
            <div>
                <div className="container playlist-content">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="row">
                                <Select
                                    className="col-md-4 select"
                                    placeholder="Type"
                                    value={searchType}
                                    onChange={this.handleTypeChanged}
                                >
                                    <MenuItem disabled value='type'>Type</MenuItem>
                                    <MenuItem value='artist'>Artist</MenuItem>
                                    <MenuItem value='track'>Track</MenuItem>
                                    {/* <MenuItem value='album'>Album</MenuItem> */}
                                    {/* <MenuItem value='episode'>Episode</MenuItem>
                                    <MenuItem value='playlist'>Playlist</MenuItem>
                                    <MenuItem value='show'>Show</MenuItem> */}
                                </Select>
                                <TextField
                                    className="col-md-8 input"
                                    id="input-with-icon-textfield"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon onClick={this.renderSearchResults} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    placeholder="Search ..."
                                    value={searchString}
                                    onChange={this.handleStringChanged}
                                    onKeyPress={(e) => {
                                        if(e.key === 'Enter') { this.renderSearchResults(); }
                                    }}
                                />
                                
                                <p className="small col-12 text-center search-info">
                                    Select a type, fill the search bar, then click enter or search icon
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="list col-md-12 songList shadow-lg" style={{height: '60vh'}}>
                        {(searchResults.length < 1)
                        ?   <div className="d-flex justify-content-center align-items-center h-100"><h2>Search Spotify</h2></div>
                        :   <TableData 
                                data={searchResults} 
                                type={searchType} 
                                setPlayerTypeId={(type, id) => setPlayerTypeId(type, id)}
                            />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}