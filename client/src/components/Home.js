import React from 'react';
import axios from 'axios';
import Header from './Header';
import Options from './Options';
import Content from './Content';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ForwardIcon from '@material-ui/icons/Forward';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {result: [], currOption: 'null', loginError: false};
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = async () => {
        await axios.get('/api/user').then(response => {
            this.setState({result: response.data});
            this.setState({loginError: false});
        }).catch(err => {
            console.log('hello error =', err);
            this.setState({loginError: true});
        });
    }

    setOption = (option) => {
        this.setState({currOption: option});
    }

    render() {
        const { result, currOption, loginError } = this.state;

        return (
            <div className="container-fluid">
                <Dialog
                    open={loginError}
                    close={!loginError}
                >
                    <DialogTitle>{"Something went wrong ..."}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please click the arrow to login to Spotify
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/" onClick={() => this.setState({loginError: false})}>
                            <ForwardIcon fontSize="large" style={{color: '#7575FF'}} />
                        </Link>
                    </DialogActions>
                </Dialog>
                <Header user={result} />
                <Options setOption={(option) => this.setOption(option)} currOption={currOption} />
                <Content selectedOption={currOption} />
            </div>
        );
    }
}