import React, {Component, Fragment} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from "@material-ui/core/styles";
import { playlistTrackColumns, searchTrackColumns, artistColumns } from './TableHeaders';
// import clsx from 'clsx';

const styles = () => ({
    table: {
        '&::-webkit-scrollbar': {
            display: 'none',
        }
    },
    container: {
        overflowY: 'overlay',
        '&::-webkit-scrollbar': {
            display: 'none',
        }
    },
    header: {
        backgroundColor: '#7575FF',
        color: '#f8f8ff',
        maxWidth: '450px',
        fontWeight: 'bold',
    },
    row: {
        backgroundColor: '#7575FF',
        color: '#f8f8ff',
        maxWidth: '450px',
        '&:hover' : {
            backgroundColor: '#a6a6ff',
            cursor: 'pointer'
        }
    },
    cell: {
        color: '#f8f8ff',
    }
});

class TableData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            listType: null,
        }
    }

    componentDidMount() {
        this.setState({data: this.props.data, listType: this.props.type});
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) 
            this.setState({data: this.props.data, listType: this.props.type});
    }

    getColumns = () => {
        const { type } = this.props;

        switch (type) {
            case 'playlistTracks':
                return playlistTrackColumns;
            case 'track':
                return searchTrackColumns;
            case 'artist':
                return artistColumns;
            default: 
                return;
        }
    }

    getHeaderColumns = () => {
        const { classes } = this.props;
        const columns = this.getColumns();

        return (
            <Fragment>
                {columns.map((column) => {
                    return (
                        <TableCell
                        key={column.dataKey}
                        align="left"
                        style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                        classes={{root: classes.header}}
                        >
                            {column.label === 'Image' ? '' : column.label}
                        </TableCell>
                    )
                    
                })}
            </Fragment>
        );
    }

    getTableBody = () => {
        const { classes, type, setPlayerTypeId } = this.props;
        const columns = this.getColumns();

        return (
            <Fragment>
                {this.state.data.map((row) => {
                    return (
                        <TableRow key={row.id} onClick={() => setPlayerTypeId(type, row.id)} classes={{root: classes.row}}>
                        {columns.map((column) => {
                            const value = row[column.dataKey] ? row[column.dataKey].toString() : '';
                            return (
                            <TableCell key={column.dataKey} align="left" classes={{root: classes.cell}}>
                                {value.includes('image') ? <img className="artistProfile" src={value} alt={value} /> : value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                })}
            </Fragment>
        )
    }



    render() {
        const { classes } = this.props;

        return (
            <TableContainer className={classes.container} style={{height: `${window.innerHeight - 100}px`}}>
                <Table stickyHeader aria-label="sticky table" style={{height: `${window.innerHeight - 80}px`}}>
                    <TableHead >
                        <TableRow>
                            {this.getHeaderColumns()}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {this.getTableBody()}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default withStyles(styles)(TableData);