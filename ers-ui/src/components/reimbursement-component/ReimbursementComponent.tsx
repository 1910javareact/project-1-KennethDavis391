import React from 'react'
import { Card, CardBody, CardText, CardFooter, Button } from 'reactstrap'
import { Reimbursement } from '../../models/reimbursement'

interface IReimbursementComponentProps {
    reimbursement: Reimbursement;
    type: string;
    status: string;
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
                    <CardText>Description: {this.props.reimbursement.description}</CardText>
                    <CardText>Date Submitted: {this.props.reimbursement.dateSubmitted}</CardText>
                    <CardText>Date Resolved: {this.props.reimbursement.dateResolved}</CardText>
                    <CardText>Resolver: {this.props.reimbursement.resolver}</CardText>
                    <Button outline color="success">Approve </Button>
                    <Button outline color="danger">  Deny  </Button>
                    <CardText className="text-center" onClick={this.expandReimbursement}> ^ </CardText>
                </>
            )
        } else {
            return (<CardText className="text-center" onClick={this.expandReimbursement}> V </CardText>)
        }
    }

    render() {
        return (
            <div>
                <Card className="text-left">
                    <CardBody>
                        <CardText>Author: {this.props.reimbursement.author}</CardText>
                        <CardText>Amount: {this.props.reimbursement.amount}</CardText>
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