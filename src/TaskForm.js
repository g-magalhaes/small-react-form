import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import React, {Component} from 'react'
import { makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import api from './api';
import PropTypes from 'prop-types';

const styles = theme => ({
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
});


class TaskForm extends Component {
    constructor(props) {
        super(props);
        
        this.initialState = {
            taskid: '',
            title: '', 
            description: '', 
            done: false,
            errors: {title:'',description: '', done:''},
            valid: false
        };

        this.state = this.initialState 
    };
   
    componentDidMount = () => {
        let {id} = this.props.match.params;
        console.log('id component '+id);
        //let val = {};
        if(id){    
            (new api()).get('get', {id: id}).then(json => 
                this.setState({
                    title: json.task.title,
                    description: json.task.description,
                    done: json.task.done,
                }, console.log(this.state.title))
            ).catch();
        } else {
    
            this.setState({
                title: this.initialState.title, 
                description: this.initialState.description, 
                done: this.initialState.done,
                errors: this.initialState.errors,
                valid: this.initialState.valid,
           })
        }
    }

    componentDidUpdate = (prevProps) => {
        console.log('Component Update...');
        
        let {id} = this.props.match.params;
        console.log('id update '+id);

        if ((id  !== prevProps.match.params.id) && (!id)){
            this.resetForm();
            console.log('Component Reset...');
        }  
    }


    componentWillUnmount = () => {
        console.log('Exiting Form...');
    }

    handleSubmission = (event) => {
        
        
        const {title, description, checked} = this.state
        const content = {
            title: title,
            description:description, 
            checked:checked,
        };
        
        (new api()).post('post_one',  {content: content}).then(json => console.log(json)).catch( error => alert(error));        
        console.log('added task')
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        //const {formData} = this.state;

        if (name === 'done') {
            const checked = event.target;
            this.setState( {[name]: checked}, () => {console.log(this.state[name])});  
        } else {
            this.setState( {[name]: value}, () => {console.log(this.state[name])});  
        }

        
    };
    
    resetForm = () => {
        this.setState({
            title: this.initialState.title, 
            description: this.initialState.description, 
            done: this.initialState.done,
            errors: this.initialState.errors,
            valid: this.initialState.valid,
       })
    }
        

    render(){
        const {classes} = this.props;
        const id = this.props.match.params.id || '';

        console.log('id render '+this.props.match.params.id);
        //const {formData} = this.state;
        //console.log('title ' + formData.title);
        //const {formData} = this.state
        return(
            <Paper className={classes.root}>
            <Typography variant="h4" gutterBottom>
                Add Task
            </Typography>
            <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="title"
                    name="title"
                    label="Title"
                    fullWidth
                    autoComplete="fname"
                    variant="outlined"
                    onChange={this.handleChange}
                    value={this.state.title}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    multiline
                    rows="4"
                    autoComplete="lname"
                    variant="outlined"
                    value={this.state.description}
                    onChange={this.handleChange}
                />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="primary" name="done" onChange={this.handleChange} checked={this.state.done} value='true' />}
                    label="Done?"
                />
                </Grid>
                <Grid item xs={12} sm={12}>
                <Button variant="contained" color="primary" size="large" onClick={this.handleSubmission}>
                    Add
                </Button>
                </Grid>
            </Grid>
            </React.Fragment>
        </Paper>    
        )
    }
}


TaskForm.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TaskForm);