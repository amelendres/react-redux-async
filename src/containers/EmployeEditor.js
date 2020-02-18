import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addEmploye, updateEmploye } from '../actions/api'
import { Redirect } from 'react-router-dom'
//import Row from '../components/Row'

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';


const positions = [{value: 'IT Manager',label: 'IT Manager'},
                    {value: 'Product Manager',label: 'Product Manager'},
                    {value: 'Developer',label: 'Developer'},
                    {value: 'Comercial',label: 'Comercial'},
                    {value: 'Marketing Assistant',label: 'Marketing Assistant'},
                  ]

const offices = [{value: 'Barcelona Office',label: 'Barcelona Office'},
                  {value: 'Paris',label: 'Paris'},
                  {value: 'London',label: 'London'},
                ]

 
  const styles = {
    root: {
      '& .MuiFormControl-root': {
        margin: 20,
        width: 250,
      }, 
      '& .MuiTextField-root': {
      },
      '& input[type=file]':{
        display: 'none',
      }
    },
  }


class EmployeEditor extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        _id: '',
        firstname: 'Your Name',
        lastname: 'Your Lastname',
        email: 'maibox@google.com',
        position: 'IT Manager',
        office: 'Paris',
        salary: 2000,
        weeklyWorkHours: 40,
        picture: null,
        _etag: null,

        isLoading: true,
        redirectTo: null
    }

  }

  componentDidMount(){
    const { id } = this.props.match.params
    const employe = this.findEmploye(id);
    if(employe != undefined){
        Object.keys(employe).forEach((key)=> this.setState({ [key]:   employe[key] })
        );
    }
    this.setState({ isLoading : false })
  }

  findEmploye = id => {
    return this.props.employes.find((item) => item._id === id)
  }
  
  handleChange = name => event => {
    ('picture' == name) ? 
      this.setState({ [name] : event.target.files})
      : this.setState({ [name] : event.target.value})
  }


  submitForm = ev => {
    ev.preventDefault();

    const employe = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      position: this.state.position,
      office: this.state.office,
      salary: this.state.salary,
      weeklyWorkHours: this.state.weeklyWorkHours,
    };

    if(null != this.state.picture){
      employe.picture = this.state.picture[0];
    }

    if(this.state._id === ''){
      this.props.addEmploye(employe)
    }else{
      employe._id = this.state._id 
      employe._etag = this.state._etag

      this.props.updateEmploye(employe);
    }
      
  }; 

  render() {
    const {classes} = this.props
    const { isLoading, redirectTo } = this.state
    const employe = this.state

    if (this.props.redirectTo) {
      return <Redirect to={this.props.redirectTo} />;
    }

    return  isLoading ? ( <div>loading...</div> ) :
    (
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField required id="firstname" label="Name" defaultValue={this.state.firstname} type="search" onChange={this.handleChange('firstname')} />
          <TextField required id="lastname" label="Last Name" defaultValue={employe.lastname} type="search" onChange={this.handleChange('lastname')} />
          <TextField id="email" label="Email" defaultValue={employe.email} type="search" onChange={this.handleChange('email')} />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="position" >Position</InputLabel>
          <Select
            native
            value={employe.position}
            onChange={this.handleChange('position')}
            inputProps={{
              name: 'position',
              id: 'position',
            }}
          >
            <option value=""/>
            {positions.map( (position, index) => 
              <option key={index} value={position.value}>{position.label}</option>
              )}  
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="office">Office</InputLabel>
          <Select
            native
            value={employe.office}
            onChange={this.handleChange('office')}
            inputProps={{
              name: 'office',
              id: 'office',
            }}
          >
            <option value="" />
            {offices.map( (office,index) => 
              <option key={index} value={office.value}>{office.label}</option>
              )}  
          </Select>
        </FormControl>

          <TextField
            label="Salary"
            id="salary"
            defaultValue={employe.salary}
            onChange={this.handleChange('salary')}
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              endAdornment: <InputAdornment position="end">EUR</InputAdornment>,
            }}
          />
          <TextField
            label="Weekly work hours"
            id="weeklyWorkHours"
            onChange={this.handleChange('weeklyWorkHours')}
            defaultValue={employe.weeklyWorkHours}
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              endAdornment: <InputAdornment position="end">Hrs</InputAdornment>,
            }}
          />

          <input accept="image/*" className={classes.input} id="picture" type="file" onChange={this.handleChange('picture')}
 />
          <label htmlFor="picture">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          
        </div>

        <Button 
        /* type="submit" */
        onClick={this.submitForm}
        variant="contained" 
        color="primary">
          Save
        </Button>
              
      </form>
    )
  }
}

EmployeEditor.propTypes = {
  //employe: PropTypes.instanceOf(Row.propTypes.employe).isRequired,
}

const mapStateToProps = state => ({
  employes: state.workman.employes || [],
  redirectTo: state.workman.redirectTo || false
})

const mapDispatchToProps = dispatch => ({
  addEmploye: employe => dispatch(bindActionCreators(addEmploye(employe), dispatch)),
  updateEmploye: employe => dispatch(bindActionCreators(updateEmploye(employe), dispatch))

})
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EmployeEditor))
