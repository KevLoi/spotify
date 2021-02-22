const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5001;

let spot = {
    client_id: '882ada13468046fe9083901eee8d6f15',
    client_secret: 'de65ff5269734e82bc7cbb7faff961d3',
    redirect_uri: 'http://localhost:5001/api/callback',
    access_token: null,
    refresh_token: null,
    userId: null, 
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/start', (req, res) => {
    spot.client_site = req.body.client_site;
    res.send('Got client site!');
});

app.get('/api/login', (req, res) => {
    let scopes = 'user-read-private user-read-email playlist-read-private';

    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + spot.client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(spot.redirect_uri));
});

app.get('/api/callback', async (req, res) => {
    const { code } = req.query;

    if (code) {
        const url = 'https://accounts.spotify.com/api/token';

        const data = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'http://localhost:5001/api/callback',
        }

        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Authorization': "Basic " + (Buffer.from(`${spot.client_id}` + ":" + `${spot.client_secret}`).toString("base64"))
        };

        await axios({
            method: 'post',
            url,
            params: data,
            headers,
        }).then(response => {
            spot.access_token = response.data.access_token;
            spot.refresh_token = response.data.refresh_token;
            
            res.redirect(`${spot.client_site}/app`);
        });
    }
});

app.get('/api/user', async (req, res) => {
    try {
        const spotify = await axios.create({
            baseURL: 'https://api.spotify.com/v1',
            headers: {
                Authorization: `Bearer ${spot.access_token}`,
            }
        });

        const user = await spotify.get('/me').then(response => {
            spot.userId = response.data.id;
            return response.data;
        }).catch();

        console.log('spot =', spot);
        res.status(200).send(user);
    } catch (err) {
        console.log('error =', err.response);
        res.status(err.response.status).send(err);
    }
});

app.get('/api/user_playlists', async (req, res) => {
    try{
        const spotify = await axios.create({
            baseURL: 'https://api.spotify.com/v1',
            headers: {
                Authorization: `Bearer ${spot.access_token}`,
            }
        });

        const playlists = await spotify.get('/me/playlists').then(response => {
            return response.data.items;
        });

        res.status(200).send(playlists);
    } catch (err) {
        console.log('error =', err);
    }
});

app.get('/api/playlist', async (req, res) => {

    console.log("playlist id =", req.query.id);

    try{
        const spotify = await axios.create({
            baseURL: 'https://api.spotify.com/v1',
            headers: {
                Authorization: `Bearer ${spot.access_token}`,
            }
        });

        const playlistData = await spotify.get(`/playlists/${req.query.id}/tracks`, {
            params: {
                limit: 50,
            }
        }).then(response => response.data.items);
        
        res.status(200).send(playlistData);
    } catch (err) {
        console.log('error =', err);
    }
});

app.get('/api/search', async (req, res) => {
    try{
        const spotify = await axios.create({
            baseURL: 'https://api.spotify.com/v1',
            headers: {
                Authorization: `Bearer ${spot.access_token}`,
            }
        });

        const searchResults = await spotify.get(`/search`, {
            params: {
                q: req.query.string,
                type: req.query.type,
                limit: 50
            }
        }).then(response => {
            console.log('response.data =', response.data);
            // songs: response.data.tracks.items
            // albums: response.data.album.items
            // artists: response.data.artists.items
            switch (req.query.type) {
                case 'artist':
                    return response.data.artists.items;
                    break;
                case 'track':
                    return response.data.tracks.items;
                    break;
                default: 
                    return null; 
            }
        });
        
        res.status(200).send(searchResults);
    } catch (err) {
        console.log('error =', err);
    }
});


app.listen(port, () => console.log(`Listening on port ${port}`));