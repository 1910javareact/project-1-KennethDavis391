import React, { SyntheticEvent } from 'react'
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap'
//import { User } from '../../models/user'

interface ILoginComponentProps {
    //user: User
    userLogin: (username: string, password: string) => void
}

export class LoginComponent extends React.Component<ILoginComponentProps, any>{

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

    submitLogin = async (e: SyntheticEvent) => {
        e.preventDefault()
        this.props.userLogin(this.state.username, this.state.password)
    }

    render() {
        return (
            <div id="login-div">
                <Form onSubmit={this.submitLogin}>
                    <FormGroup row>
                        <Label for="exampleUsername" sm={2}>Username: </Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                name="Username"
                                id="exampleUsername"
                                placeholder="username"
                                value={this.state.username}
                                onChange={this.updateUsername}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={2}>Password: </Label>
                        <Col sm={10}>
                            <Input
                                type="password"
                                name="Password"
                                id="examplePassword"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.updatePassword}
                            />
                        </Col>
                    </FormGroup>
                    <Button color="primary">Login</Button>
                </Form>
            </div>
        )
    }
}