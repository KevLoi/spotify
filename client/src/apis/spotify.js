import axios from 'axios';

export const getUserPlaylist = async () => {
    try{
        const userPlaylists = await axios.get('/api/user_playlists');
        return userPlaylists;
    } catch (error) {
        console.log(error);
    }
}

export const getPlaylist = async (playlist) => {
    try{
        const playlistData = await axios.get('/api/playlist', { params: { id: playlist.id } });
        const playlistTracks = playlistData.data.map(playlist => playlist.track);
        return playlistTracks;
    } catch (error) {
        console.log(error);
    }
}

export const getSearchResults = async (string, type) => {
    try {
        const searchResults = await axios.get('/api/search', {
            params: {
                string: string,
                type: type,
            }
        });

        return searchResults.data;
    } catch (error) {
        console.log(error);
    }
}