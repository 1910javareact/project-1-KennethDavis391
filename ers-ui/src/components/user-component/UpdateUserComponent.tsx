import React, { SyntheticEvent } from 'react'
import { User } from '../../models/user'
import { Form, FormGroup, Label, Col, Input, Button, Alert } from 'reactstrap'
import { ersUpdateUser } from '../../remote/ers-clients/ers-user'

interface IUpdateUserComponentProps {
    user: User
    token: String
}

interface IUpdateUserComponentState {
    user: User
    userChecked: boolean
    financeManagerChecked: boolean
    adminChecked: boolean
    updateComponent: boolean
    validUpdate: boolean
    invalidUpdate: boolean
}

export class UpdateUserComponent extends React.Component<IUpdateUserComponentProps, IUpdateUserComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            user: new User(0, '', '', '', '', '', []),
            userChecked: false,
            financeManagerChecked: false,
            adminChecked: false,
            updateComponent: true,
            validUpdate: false,
            invalidUpdate: false,
        }
    }

    componentDidUpdate() {
        if (this.state.updateComponent) {
            let financeManagerChecked = false
            let adminChecked = false
            let userChecked = false

            for (let role of this.props.user.roles) {
                if (role.roleId === 1) {
                    financeManagerChecked = true
                }
                if (role.roleId === 2) {
                    adminChecked = true
                }
                if (role.roleId === 3) {
                    userChecked = true
                }
            }
            this.setState({
                ...this.state,
                user: this.props.user,
                financeManagerChecked: financeManagerChecked,
                adminChecked: adminChecked,
                userChecked: userChecked,
                updateComponent: false
            })
        }
    }

    updateUsername = (input: any) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                username: input.target.value
            }
        })
    }

    updatePassword = (input: any) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                password: input.target.value
            }
        })
    }

    updateFirstName = (input: any) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                firstName: input.target.value
            }
        })
    }

    updateLastName = (input: any) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                lastName: input.target.value
            }
        })
    }

    updateEmail = (input: any) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                email: input.target.value
            }
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
            user: {
                ...this.state.user,
                roles: []
            }
        })

        if (this.state.userChecked) {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    roles: [{ role: 'User', roleId: 3 }]
                }
            })
        }
        if (this.state.financeManagerChecked) {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    roles: [...this.state.user.roles, { role: 'Finance Manager', roleId: 1 }]
                }
            })
        }
        if (this.state.adminChecked) {
            this.setState({
                ...this.state,
                user: {
                    ...this.state.user,
                    roles: [...this.state.user.roles, { role: 'Admin', roleId: 2 }]
                }
            })
        }
    }

    submitUpdate = async (e: SyntheticEvent) => {
        e.preventDefault()
        if(!this.state.user.username || !this.state.user.password || !this.state.user.email || !this.state.user.firstName || !this.state.user.lastName){
            this.setState({
                ...this.state,
                invalidUpdate: true
            })
            return
        }
        try {
            let u = await ersUpdateUser(this.state.user, this.props.token)
            if (u.status === 200) {
                this.setState({
                    ...this.state,
                    validUpdate: true,
                    invalidUpdate: false
                })
            } else {

            }
        } catch (e) {

        }
    }

    validUpdate = () => {
        return (
            <Alert color="success">
                User Updated
            </Alert>
        )
    }

    invalidUpdate = () => {
        return (
            <Alert color="warning">
                Please Include All Fields
            </Alert>
        )
    }

    render() {
        return (
            <div className='form-div'>
                {this.state.invalidUpdate && this.invalidUpdate()}
                {this.state.validUpdate && this.validUpdate()}
                <Form onSubmit={this.submitUpdate} className='submit-element'>
                    <FormGroup row className='text-input'>
                        <Label for="exampleUsername" sm={2}>Username: </Label>
                        <Col sm={10}>
                            <Input type="text" name="username" id="exampleUsername" placeholder="Username" value={this.state.user.username} onChange={this.updateUsername} />
                        </Col>
                    </FormGroup>
                    <FormGroup row className='text-input'>
                        <Label for="examplePassword" sm={2}>Password: </Label>
                        <Col sm={10}>
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" value={this.state.user.password} onChange={this.updatePassword} />
                        </Col>
                    </FormGroup>
                    <FormGroup row className='text-input'>
                        <Label for="exampleFirstName" sm={2}>FirstName: </Label>
                        <Col sm={10}>
                            <Input type="text" name="firstname" id="exampleFirstName" placeholder="Fist Name" value={this.state.user.firstName} onChange={this.updateFirstName} />
                        </Col>
                    </FormGroup>
                    <FormGroup row className='text-input'>
                        <Label for="exampleLastName" sm={2}>Last Name: </Label>
                        <Col sm={10}>
                            <Input type="text" name="lastname" id="exampleLastName" placeholder="Last Name" value={this.state.user.lastName} onChange={this.updateLastName} />
                        </Col>
                    </FormGroup>
                    <FormGroup row className='text-input'>
                        <Label for="exampleEmail" sm={2}>Email: </Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" value={this.state.user.email} onChange={this.updateEmail} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="checkbox2" sm={2} id="roles-lable">Roles: </Label>
                        <Col sm={{ size: 10 }} className='radio'>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="checkbox1" value="{role: 'User', roleId: 3}" checked={this.state.userChecked} onChange={this.userBoxClicked} />
                                    User
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="checkbox2" value="{role: 'Finance Manager', roleId: 1}" checked={this.state.financeManagerChecked} onChange={this.financeManagerBoxClicked} />
                                    Finance Manager
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="checkbox3" value="{role: 'Admin', roleId: 2}" checked={this.state.adminChecked} onChange={this.adminBoxClicked} />
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