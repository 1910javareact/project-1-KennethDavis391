import React, { SyntheticEvent } from 'react'
import { Form, FormGroup, Label, Col, Input, Button, Alert } from 'reactstrap'
import { User } from '../../models/user'
import { ersSubmitReimbursement } from '../../remote/ers-clients/ers-reimbursement'
import { Redirect } from 'react-router'

interface ISubmitReimbursementComponentProps {
    user: User
    token: String
}

interface ISubmitReimbursementComponentState {
    amount: number;
    type: number;
    description: string;
    submitted: boolean
    invalidSubmit: boolean
}

export class SubmitReimbursementComponent extends React.Component<ISubmitReimbursementComponentProps, ISubmitReimbursementComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            amount: 0,
            type: 0,
            description: '',
            submitted: false,
            invalidSubmit: false
        }
    }

    updateAmount = (input: any) => {
        this.setState({
            ...this.state,
            amount: input.target.value
        })
    }

    updateDescription = (input: any) => {
        this.setState({
            ...this.state,
            description: input.target.value
        })
    }

    updateType = (input: any) => {
        this.setState({
            ...this.state,
            type: input.target.value
        })

    }

    submitReimbursement = async (e: SyntheticEvent) => {
        e.preventDefault()
        try {
            let r = await ersSubmitReimbursement(this.props.user.userId, this.state.amount, this.state.type, this.state.description, this.props.token)
            if (r.status === 201) {
                this.setState({
                    ...this.state,
                    submitted: true,
                    invalidSubmit: false
                })
            }
        } catch (e) {
            this.setState({
                ...this.state,
                invalidSubmit: true
            })
        }
    }

    invalidSubmit = () => {
        return (
            <Alert color="warning">
                Please Include All Fields.
            </Alert>
        )
    }

    validSubmit = () => {
        return (
            <Alert color="success">
                Reimbursement Submitted
            </Alert>
        )
    }

    render() {
        return (
            this.props.token ?
                <div className="form-div">
                    {this.state.invalidSubmit && this.invalidSubmit()}
                    {this.state.submitted && this.validSubmit()}
                    <Form onSubmit={this.submitReimbursement} className='submit-element'>
                        <FormGroup row className='text-input'>
                            <Label for="exampleAmount" sm={2} className='form-label'>Amount: $</Label>
                            <Col sm={10}>
                                <Input type="number" name="amount" id="exampleAmount" placeholder="Amount" value={this.state.amount} onChange={this.updateAmount} />
                            </Col>
                        </FormGroup>
                        <FormGroup tag="fieldset" row className='radio'>
                            <legend className="col-form-label col-sm-2">Type</legend>
                            <Col sm={10}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio2" value="1" onChange={this.updateType} />
                                        Lodging
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio2" value="2" onChange={this.updateType} />
                                        Travel
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio2" value="3" onChange={this.updateType} />
                                        Food
                                </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio2" value="4" onChange={this.updateType} />
                                        Other
                                </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row className='text-input'>
                            <Label for="exampleDescription" sm={2} className='form-label'>Description:</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="description" id="exampleDescription" value={this.state.description} onChange={this.updateDescription} />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }}>
                                <Button disabled={this.state.submitted}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                   
                </div>
                :
                <Redirect to='/login' />
        )
    }
}