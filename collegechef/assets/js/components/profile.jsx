import React, {useState}  from 'react';
import { connect } from 'react-redux';
import { Container, Button, FormGroup, Form, Label, Input, Alert } from 'reactstrap';
     import { Redirect } from 'react-router';
import { submit_password_change } from '../ajax';

 class Profile extends React.Component {
     constructor(props) {
         super(props);
     }


     changed(data) {
         this.props.dispatch({
             type: 'CHANGE_PASSWORD',
             data: data,
         });
         this.setState({
            password: data,
            confirm_password: data,
        });
     }

     redirect(path) {
         this.setState({
             redirect: path,
         });
     }

     render() {
         let {password, confirm_password, errors, success} = this.props.change_password;

          let msg = null;
          if (errors) {
          msg = <Alert color="danger">{errors}</Alert>;
          } else if (success) {
          msg = <Alert color="success">{success}</Alert>;
          }
      
         return (
             <div>
                    <Container>
                     { msg }
                         <Form>
                             <FormGroup>
                                 <Label htmlFor="password">Password</Label>
                                 <Input type="password" id="password" name="password" onChange={
                                         (ev) => this.changed({password: ev.target.value})}/>
                             </FormGroup>
                             <FormGroup>
                                 <Label htmlFor="confirmed_password">Comfirmed Password</Label>
                                 <Input type="password" id="confirmed_password" name="confirmed_password" onChange={
                                         (ev) => this.changed({confirm_password: ev.target.value})}/>
                             </FormGroup>
                            
                             <Button color="primary" onClick={()=> submit_password_change(this)}>Change</Button>
                         </Form>
                     </Container>
             </div>

        )

     }
 }


 function state2props(state) {
     return state.forms;
 }

 export default connect(state2props)(Profile);
