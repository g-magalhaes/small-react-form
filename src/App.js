import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddIcon from '@material-ui/icons/Add';
import {Switch, Route, Link} from 'react-router-dom';
import DataList from './DataList';
import TaskForm from './TaskForm';

const drawerWidth = 20;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}%)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: `${drawerWidth}%`,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 0,
    backgroundColor: theme.palette.background.default,
    paddingLeft: `calc(${drawerWidth}% + 4%)`,
    paddingTop: '2%',
    width: '95%',
  },
}));


function App() {
  
  const [open, setOpen] = React.useState(false);
  
  function handleDrawerOpen() {
      setOpen(true);
  }

  function handleDrawerClose() {
      setOpen(false);
  }
  const UpBar = () => {
    const classes = useStyles();
    const theme = useTheme();

    return(
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
  

  const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
  const DrawBar = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
      <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar}>
        
      </div>
      <Divider />
      <List>
        {[ {name:'New Record',endpoint:'/add/'}, {name:'List', endpoint:'/List/'}].map((dict, index) => (
          <ListItem button key={dict.name} component={AdapterLink} to={dict.endpoint}>
            <ListItemIcon>{index % 2 === 0 ? <AddIcon /> : <ListAltIcon />}</ListItemIcon>
            <ListItemText> 
                {dict.name}
            </ListItemText> 
          </ListItem>
        ))}
      </List>
    </Drawer>
    )}
  
  const Main = () =>{
    const classes = useStyles();
    const theme = useTheme();
    
    return(
      <main className={classes.content}>
      <div className={classes.toolbar} />
      
      <Switch>
        {/*<Route exact path='/' component={Home}/>*/}
        <Route path='/list' component={DataList}/>
        <Route path='/add/:id' component={TaskForm} />
        <Route exact path='/add' component={TaskForm}/>
      
      </Switch>
    </main>
     )
  }
  

  return (
    <div className="App">
        <React.Fragment>
          <CssBaseline />
          <UpBar />
          <DrawBar />
          <Main />
        </React.Fragment> 
    </div>
  );
}

export default App;
