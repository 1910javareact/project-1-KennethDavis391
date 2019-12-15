import React from 'react'
import { Card, CardHeader, CardBody, CardText, Button, CardFooter } from 'reactstrap'
import { Role } from '../../models/user'
import { Link } from 'react-router-dom'

interface IUserComponentProps {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
}

export class UserComponent extends React.PureComponent<IUserComponentProps>{
    render() {
        return (
            <div>
                <Card className="text-left">
                    <CardHeader>UserId: {this.props.userId}</CardHeader>
                    <CardBody>
                        <CardText>First Name: {this.props.firstName}</CardText>
                        <CardText>Last Name: {this.props.lastName}</CardText>
                        <CardText>Email: {this.props.email}</CardText>
                        <CardText>Username: {this.props.username}</CardText>
                        <CardText>Roles: {this.props.roles}</CardText>
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