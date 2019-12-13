import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

export class LoginComponent extends React.Component<any, any>{

    //onMount 
    constructor(props: any) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    updateUsername = (input: any) => {
        this.setState({
            ...this.state,
            username: input.target.value
        })
    }

    updatePassword = (input: any) => {
        this.setState({
            ...this.state,
            password: input.target.value
        })
    }



    render() {
        return (
            <div id="login-div">
                <Form>
                    <FormGroup>
                        <Label for="exampleUsername">Username</Label>
                        <Input
                            type="text"
                            name="Username"
                            id="exampleUsername"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.updateUsername}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.updatePassword}
                        />
                    </FormGroup>
                    <Button color="primary">primary</Button>
                </Form>
            </div>
        )
    }


}