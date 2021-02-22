import React from 'react';
import axios from 'axios';
// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

export default class Logout extends React.Component {

    onSignIn = async () => {
        window.location.href = "http://localhost:5001/api/login";
        await axios.post('/api/start', {client_site: window.location.origin});
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="row align-items-center justify-content-center h-100vh">
                        <div className="col-10">
                            <div className="row">
                                <div className="col-12 d-flex">
                                    <button className="signInBtn mx-auto" onClick={() => this.onSignIn()}><FontAwesomeIcon icon={faSpotify} /> Sign in to Spotify</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}