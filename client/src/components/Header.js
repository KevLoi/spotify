import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import Avatar from '@material-ui/core/Avatar';
// import spotify from '../../apis/spotify';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";

const styles = {
    root: {
        textDecoration: 'none'
    }
}


class Header extends React.Component {

    render() {
        const { user } = this.props;
        const { images, display_name, country, email } = user;

        if (!images)
            return null;

        return (
            <div className="container">
                <div className="d-flex flex-row header-content align-items-center justify-content-around shadow-lg">
                    <img id="profileImg" src={images[0].url} alt="..." />
                    <div className="flex-grow-1 user-info">
                        <p className="display-1 display-name">{display_name}</p>
                        <div className="flex-row">
                            <h6>Email: {email}</h6>
                            <h6>Country: {country}</h6>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Header);