import React from 'react'
import { Card, CardHeader, CardBody, CardText, Button, CardFooter } from 'reactstrap'
import { Role, User } from '../../models/user'
import { Link } from 'react-router-dom'

interface IUserComponentProps {
    user:User;
}

export class UserComponent extends React.PureComponent<IUserComponentProps>{
    render() {
        return (
            <div>
                <Card className="text-left">
                    <CardHeader>UserId: {this.props.user.userId}</CardHeader>
                    <CardBody>
                        <CardText>First Name: {this.props.user.firstName}</CardText>
                        <CardText>Last Name: {this.props.user.lastName}</CardText>
                        <CardText>Email: {this.props.user.email}</CardText>
                        <CardText>Username: {this.props.user.username}</CardText>
                        <CardText>Roles: {this.props.user.roles}</CardText>
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