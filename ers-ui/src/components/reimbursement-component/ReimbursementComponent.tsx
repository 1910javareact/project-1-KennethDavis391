import React from 'react'
import { Card, CardBody, CardText, CardFooter, Button } from 'reactstrap'
import { Reimbursement } from '../../models/reimbursement'
import { ersPatchReimbursement } from '../../remote/ers-clients/ers-reimbursement'
import { User } from '../../models/user'

interface IReimbursementComponentProps {
    user: User
    reimbursement: Reimbursement
    token: String
}

interface IReimbursementComponentState {
    reimbursement: Reimbursement
    dateSubmitted: String
    dateResolved: String
    expanded: boolean
    type: string;
    status: string;
}

export class ReimbursementComponent extends React.Component<IReimbursementComponentProps, IReimbursementComponentState>{

    constructor(props: any) {
        super(props)
        let typeString = ''
        let statusString = ''
        switch (this.props.reimbursement.typeId) {
            case 1: {
                typeString = 'Lodging'
                break;
            }
            case 2: {
                typeString = 'Travel'
                break;
            }
            case 3: {
                typeString = 'Food'
                break;
            }
            case 4: {
                typeString = 'Other'
                break;
            }
        }
        switch (this.props.reimbursement.statusId) {
            case 1: {
                statusString = 'Pending'
                break;
            }
            case 2: {
                statusString = 'Approved'
                break;
            }
            case 3: {
                statusString = 'Denied'
                break;
            }
        }

        let dateSubmitted = new Date(this.props.reimbursement.dateSubmitted * 1000)
        let readableDateSubmitted = `${dateSubmitted.getUTCMonth() + 1}/ ${dateSubmitted.getUTCDate()}/ ${dateSubmitted.getUTCFullYear()}`
        let dateResolved = new Date(this.props.reimbursement.dateResolved * 1000)
        let readableDateResolved = `${dateResolved.getUTCMonth() + 1}/ ${dateResolved.getUTCDate()}/ ${dateResolved.getUTCFullYear()}`
        if (readableDateResolved === '1/ 1/ 1970') {
            readableDateResolved = 'Not Resolved'
        }

        this.state = {
            expanded: false,
            reimbursement: this.props.reimbursement,
            dateResolved: readableDateResolved,
            dateSubmitted: readableDateSubmitted,
            type: typeString,
            status: statusString,
        }
    }

    expandReimbursement = () => {
        this.setState({
            ...this.state,
            expanded: !this.state.expanded
        })
    }

    approveReimbursement = async () => {
        try {
            let r = await ersPatchReimbursement(this.props.reimbursement.reimbursementId, 2, this.props.token)
            if (r.status === 201) {
                let dateResolved = new Date(Date.now())
                let readableDateResolved = `${dateResolved.getUTCMonth() + 1}/ ${dateResolved.getUTCDate()}/ ${dateResolved.getUTCFullYear()}`
                this.setState({
                    ...this.state,
                    reimbursement: r.body,
                    dateResolved: readableDateResolved,
                    status: 'Approved'
                })
            } else {

            }

        } catch (e) {

        }
    }

    denyReimbursement = async () => {
        try {
            let r = await ersPatchReimbursement(this.props.reimbursement.reimbursementId, 3, this.props.token)
            if (r.status === 201) {
                let dateResolved = new Date(Date.now())
                let readableDateResolved = `${dateResolved.getUTCMonth() + 1}/ ${dateResolved.getUTCDate()}/ ${dateResolved.getUTCFullYear()}`
                this.setState({
                    ...this.state,
                    reimbursement: r.body,
                    dateResolved: readableDateResolved,
                    status: 'Denied'
                })
            } else {

            }

        } catch (e) {

        }
    }

    LongReimbursement = () => {
        if (this.state.expanded) {
            let submitted = true
            if (this.state.status === 'Pending' && this.props.user.userId !== this.props.reimbursement.author) {
                submitted = false
            }
            for (let role of this.props.user.roles) {
                if (role.roleId === 1) {
                    return (
                        <>
                            <CardText>Description: {this.state.reimbursement.description}</CardText>
                            <CardText>Date Submitted: {this.state.dateSubmitted}</CardText>
                            <CardText>Date Resolved: {this.state.dateResolved}</CardText>
                            <CardText>Resolver: {this.state.reimbursement.resolver}</CardText>
                            <Button outline color="success" onClick={this.approveReimbursement} disabled={submitted}>Approve </Button>
                            <Button outline color="danger" onClick={this.denyReimbursement} disabled={submitted}>  Deny  </Button>
                            <CardText className="text-center" onClick={this.expandReimbursement}> <Button>Display Less</Button> </CardText>
                        </>
                    )
                }
            }
            return (
                <>
                    <CardText>Description: {this.state.reimbursement.description}</CardText>
                    <CardText>Date Submitted: {this.state.dateSubmitted}</CardText>
                    <CardText>Date Resolved: {this.state.dateResolved}</CardText>
                    <CardText>Resolver: {this.state.reimbursement.resolver}</CardText>
                    <CardText className="text-center" onClick={this.expandReimbursement}> <Button>Display Less</Button> </CardText>
                </>
            )

        } else {
            return (<CardText className="text-center" onClick={this.expandReimbursement}> <Button>Display More</Button> </CardText>)
        }
    }

    render() {
        return (
            <div className="center">
                <Card className="text-left card-element">
                    <CardBody>
                        <CardText>Author: {this.state.reimbursement.author}</CardText>
                        <CardText>Amount: {this.state.reimbursement.amount}</CardText>
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