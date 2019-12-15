import React, { SyntheticEvent } from 'react'
import { Role } from '../../models/user'
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap'

interface IUpdateUserComponentProps{
    userId: number
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    roles: Role[]
}

interface IUpdateUserComponentState{
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    roles: Role[]
    userChecked: boolean
    financeManagerChecked: boolean
    adminChecked: boolean
}

export class UpdateUserComponent extends React.Component<IUpdateUserComponentProps, IUpdateUserComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            username: this.props.username,
            password: '',
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            roles: [],//this.props.roles,
            userChecked: false,
            financeManagerChecked: false,
            adminChecked: false,
        }
        for(let role of this.state.roles){
            if(role.roleId === 1){
                this.state = {
                    ...this.state,
                    financeManagerChecked: true,
                }
            }
            if(role.roleId === 2){
                this.state = {
                    ...this.state,
                    adminChecked: true,
                }
            }
            if(role.roleId === 3){
                this.state = {
                    ...this.state,
                    userChecked: true,
                }
            }
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

    updateFirstName = (input: any) => {
        this.setState({
            ...this.state,
            firstName: input.target.value
        })
    }

    updateLastName = (input: any) => {
        this.setState({
            ...this.state,
            lastName: input.target.value
        })
    }

    updateEmail = (input: any) => {
        this.setState({
            ...this.state,
            email: input.target.value
        })
    }

    userBoxClicked = async () => {
        await this.setState({
            ...this.state,
            userChecked: !this.state.userChecked
        })
        this.updateRoles()
    }

    financeManagerBoxClicked = async () => {
        await this.setState({
            ...this.state,
            financeManagerChecked: !this.state.financeManagerChecked
        })
        this.updateRoles()
    }

    adminBoxClicked = async () => {
        await this.setState({
            ...this.state,
            adminChecked: !this.state.adminChecked
        })
        this.updateRoles()
    }

    updateRoles = () => {        
        this.setState({
            ...this.state,
            roles: []
        })

        if(this.state.userChecked){
            this.setState({
                ...this.state,
                roles: [{role: 'User', roleId: 3}]
            })
        }
        if(this.state.financeManagerChecked){
            this.setState({
                ...this.state,
                roles: [...this.state.roles, {role: 'Finance Manager', roleId: 1}]
            })
        }
        if(this.state.adminChecked){
            this.setState({
                ...this.state,
                roles: [...this.state.roles, {role: 'Admin', roleId: 2}]
            })
        }
    }

    submitUpdate = async (e: SyntheticEvent) => {
        e.preventDefault()
        //this.props.updateUser(this.state.username, this.state.password, this.state.firstName, this.state.lastName, this.state.email, this.state.roles)
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.submitUpdate}>
                    <FormGroup row>
                        <Label for="exampleUsername" sm={2}>Username: </Label>
                        <Col sm={10}>
                            <Input type="text" name="username" id="exampleUsername" placeholder="Username" value={this.state.username} onChange={this.updateUsername}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={2}>Password: </Label>
                        <Col sm={10}>
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" value={this.state.password} onChange={this.updatePassword}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleFirstName" sm={2}>FirstName: </Label>
                        <Col sm={10}>
                            <Input type="text" name="firstname" id="exampleFirstName" placeholder="Fist Name" value={this.state.firstName} onChange={this.updateFirstName}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleLastName" sm={2}>Last Name: </Label>
                        <Col sm={10}>
                            <Input type="text" name="lastname" id="exampleLastName" placeholder="Last Name" value={this.state.lastName} onChange={this.updateLastName}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email: </Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" value={this.state.email} onChange={this.updateEmail}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="checkbox2" sm={2}>Roles: </Label>
                        <Col sm={{ size: 10 }}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="checkbox1" value="{role: 'User', roleId: 3}" defaultChecked={this.state.userChecked} onChange={this.userBoxClicked}/>
                                    User
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="checkbox2" value="{role: 'Finance Manager', roleId: 1}" checked={this.state.financeManagerChecked} onChange={this.financeManagerBoxClicked}/>
                                    Finance Manager
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="checkbox3" value="{role: 'Admin', roleId: 2}" checked={this.state.adminChecked} onChange={this.adminBoxClicked}/>
                                    Admin
                                </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}