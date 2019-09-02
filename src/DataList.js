import React, {Component} from 'react'
import { makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'
import api from './api';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      padding: theme.spacing(3, 3)
    },
    table: {
      minWidth: 650,
      width: '80%',
    },
  }));
  
const TableHeader = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <TableHead>
        <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Done</TableCell>
            <TableCell align="right">uri</TableCell>
            <TableCell align="right"></TableCell>
            
        </TableRow>
        </TableHead>
    )
}

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const TableRows = props => {

    const classes = useStyles();
    const theme = useTheme();
    const rows = props.data.map((row, index) => {
        return(
            <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
             
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.done}</TableCell>
                <TableCell align="right">{row.uri}</TableCell>
                <TableCell align="right">
                <Button variant="contained" size="medium" component={AdapterLink} to={"/add/"+row.id}>
                    Edit
                </Button>
                </TableCell>
            </TableRow>
        );
    });

    return (
        <TableBody>
            {rows}
        </TableBody>
    )
}

const GenTable = props => {

    const theme = useTheme();
    const classes = useStyles();
    const {data} = props
    
    return (
        <Paper className={classes.root}>
            <Typography variant="h4" gutterBottom>
                Tasks
            </Typography>
            <Table>
                <TableHeader />
                <TableRows data={data} />
            </Table> 
        </Paper>    
    )   
}

class DataList extends Component {
    constructor(props) {
        super(props);
        
        //console.log('bla ' + bla.json);

        let dat1 = [
            this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            this.createData('Eclair', 262, 16.0, 24, 6.0),
            this.createData('Cupcake', 305, 3.7, 67, 4.3),
            this.createData('Gingerbread', 356, 16.0, 49, 3.9),
        ];
        
        this.state = {
            data: [],
            dat1: dat1,
        };
        
        (new api()).get().then(json => this.setState({data: json.tasks}, console.log(this.state.data))).catch();
        
    };
    
    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    };


    render(){
        const {data} = this.state
        return(
            <GenTable data={data}/>
        )
    }
}


export default DataList