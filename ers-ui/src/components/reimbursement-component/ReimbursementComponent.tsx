import React from 'react'
import { Card, CardBody, CardText, CardFooter, Button } from 'reactstrap'
import { Reimbursement } from '../../models/reimbursement'

interface IReimbursementComponentProps {
    reimbursement: Reimbursement;
}

interface IReimbursementComponentState {
    expanded: boolean
    type: string;
    status: string;
}

export class ReimbursementComponent extends React.Component<IReimbursementComponentProps, IReimbursementComponentState>{

    constructor(props: any) {
        super(props)
        let typeString = ''
        let statusString =''
        switch(this.props.reimbursement.typeId){
            case 1 :{
                typeString = 'Lodging'
                break;
            }
            case 2 :{
                typeString = 'Travel'
                break;
            }
            case 3 :{
                typeString = 'Food'
                break;
            }
            case 4 :{
                typeString = 'Other'
                break;
            }
        }
        switch(this.props.reimbursement.statusId){
            case 1 :{
                statusString = 'Pending'
                break;
            }
            case 2 :{
                statusString = 'Approved'
                break;
            }
            case 3 :{
                statusString = 'Denied'
                break;
            }
        }

        this.state = {
            expanded: false,
            type: typeString,
            status: statusString,
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
                        <CardText>Type: {this.state.type}</CardText>
                        <CardText>Status: {this.state.status}</CardText>
                        <this.LongReimbursement />
                    </CardBody>
                    <CardFooter></CardFooter>
                </Card>
            </div>
        )
    }
}