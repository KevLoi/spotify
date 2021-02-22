import React, {Component} from 'react';
// import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from "@material-ui/core/styles";
import { AutoSizer, Column, Table } from 'react-virtualized';
import clsx from 'clsx';

const styles = () => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
      // '& .ReactVirtualized__Table__headerRow': {
      //   flip: false,
      // },
      '&:focus': {
        outline: 'none'
      },
      '& div': {
        maxWidth: '1500px'
      }
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: 'white',
      },
    },
    tableCell: {
      flex: 1,
      color: '#f8f8ff',
      whiteSpace: 'nowrap', 
      textOverflow: 'ellipsis'
    },
    noClick: {
      cursor: 'initial',
    },
  });
  

class MuiVirtualizedTable extends React.PureComponent {

    static defaultProps = {
      headerHeight: 48,
      rowHeight: 48,
      listHeight: window.innerHeight - 100,
    };
  
    getRowClassName = ({ index }) => {
      const { classes, onRowClick } = this.props;
  
      return clsx(classes.tableRow, classes.flexContainer, {
        [classes.tableRowHover]: index !== -1 && onRowClick != null,
      });
    };
  
    cellRenderer = ({ cellData, columnIndex }) => {
      const { columns, classes, rowHeight } = this.props;
      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
          variant="body"
          style={{ height: rowHeight }}
          align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
        >
          {cellData}
        </TableCell>
      );
    };
  
    headerRenderer = ({ label }) => {
      const { headerHeight, columns, classes } = this.props;
  
      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
          variant="head"
          style={{ height: headerHeight, fontWeight: 'bold' }}
        >
          <span>{label}</span>
        </TableCell>
      );
    };
  
    render() {
      const { classes, columns, rowHeight, headerHeight, listHeight, ...tableProps } = this.props;
      return (
        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              height={listHeight}
              width={width}
              rowHeight={rowHeight}
              headerHeight={headerHeight}
              className={classes.table}
              {...tableProps}
              rowClassName={this.getRowClassName}
            >
              {columns.map(({ dataKey, ...other }, index) => {
                return (
                  <Column
                    key={dataKey}
                    headerRenderer={(headerProps) =>
                      this.headerRenderer({
                        ...headerProps,
                        columnIndex: index,
                      })
                    }
                    className={clsx(classes.flexContainer, classes.tableCell, classes.noClick)}
                    cellRenderer={this.cellRenderer}
                    dataKey={dataKey}
                    {...other}
                  />
                );
              })}
            </Table>
          )}
        </AutoSizer>
      );
    }
  }

// MuiVirtualizedTable.propTypes = {
//     classes: PropTypes.object.isRequired,
//     columns: PropTypes.arrayOf(
//         PropTypes.shape({
//         dataKey: PropTypes.string.isRequired,
//         label: PropTypes.string.isRequired,
//         numeric: PropTypes.bool,
//         width: PropTypes.number.isRequired,
//         }),
//     ).isRequired,
//     headerHeight: PropTypes.number,
//     onRowClick: PropTypes.func,
//     rowHeight: PropTypes.number,
// };
  
const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

export default class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            trackData: []
        }
    }

    componentDidMount() {
        this.setState({tracks: this.props.tracks}, this.getTrackData);
    }

    componentDidUpdate(prevProps) {
        if (this.props.tracks !== prevProps.tracks) 
            this.setState({tracks: this.props.tracks}, this.getTrackData);
    }

    getTrackData = () => {
        const tracks = this.props.tracks;

        const tracksArray = tracks.map(trackData => {
            const { added_at, track } = trackData;
            const { album, artists, name } = track;
            const artistNames = artists.map(a => a.name).join(', ');

            let obj = {
                name: name,
                album: album.name,
                added_at: added_at,
                artists: artistNames,
            }

            return obj;
        });

        this.setState({trackData: tracksArray});
    }



    render() {
        const { trackData } = this.state;

        return (
                <VirtualizedTable
                    rowCount={trackData.length}
                    rowGetter={({ index }) => trackData[index]}
                    columns={[
                        {
                            width: 270,
                            label: 'Name',
                            dataKey: 'name',
                        },
                        {
                            width: 270,
                            label: 'Artists',
                            dataKey: 'artists',
                        },
                        {
                            width: 270,
                            label: 'Album',
                            dataKey: 'album',
                        },
                        {
                            width: 270,
                            label: 'Added On',
                            dataKey: 'added_at',
                        },
                    ]}
                />
        );
    }
}