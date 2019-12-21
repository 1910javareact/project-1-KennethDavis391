import React from 'react'
import { Card, CardHeader, CardBody, CardText, Button, CardFooter } from 'reactstrap'
import { User } from '../../models/user'
import { Link } from 'react-router-dom'

interface IUserComponentProps {
    user:User;
}

export class UserComponent extends React.PureComponent<IUserComponentProps>{
    render() {

        let roles = this.props.user.roles.map((role) => {
            return <li key={'roleId '+ role.roleId}>{role.role}</li>
        })

        return (
            <div>
                <Card className="text-left">
                    <CardHeader>
                        <h2>User</h2>
                        <p>UserId: {this.props.user.userId}</p>
                    </CardHeader>
                    <CardBody>
                        <CardText>First Name: {this.props.user.firstName}</CardText>
                        <CardText>Last Name: {this.props.user.lastName}</CardText>
                        <CardText>Email: {this.props.user.email}</CardText>
                        <CardText>Username: {this.props.user.username}</CardText>
                        <CardText><p>Roles:</p> <ul>{roles}</ul></CardText>
                        <Link to='/login'>
                            <Button>
                                Update User
                            </Button>
                        </Link>
                    </CardBody>
                    <CardFooter></CardFooter>
                </Card>
            </div>
        )
    }
}