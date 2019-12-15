import React from 'react'
import { Card, CardBody, CardText, CardFooter } from 'reactstrap'

interface IReimbursementComponentProps {
    author: number;
    amount: number;
    type: string;
    status: string;
    description: string;
    dateSubmitted: number;
    dateResolved: number;
    resolver: number;
}

interface IReimbursementComponentState {
    expanded: boolean
}

export class ReimbursementComponent extends React.Component<IReimbursementComponentProps, IReimbursementComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    expandReimbursement = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    LongReimbursement = () => {
        if (this.state.expanded) {
            return (
                <>
                    <CardText>Description: {this.props.description}</CardText>
                    <CardText>Date Submitted: {this.props.dateSubmitted}</CardText>
                    <CardText>Date Resolved: {this.props.dateResolved}</CardText>
                    <CardText>Resolver: {this.props.resolver}</CardText>
                </>
            )
        } else {
            return (<CardText>Click for more details</CardText>)
        }
    }

    render() {
        return (
            <div>
                <Card className="text-left" onClick={this.expandReimbursement}>
                    <CardBody>
                        <CardText>Author: {this.props.author}</CardText>
                        <CardText>Amount: {this.props.amount}</CardText>
                        <CardText>Type: {this.props.type}</CardText>
                        <CardText>Status: {this.props.status}</CardText>
                        <this.LongReimbursement />
                    </CardBody>
                    <CardFooter></CardFooter>
                </Card>
            </div>
        )
    }
}