import React, { SyntheticEvent } from 'react'
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap'

interface ISubmitReimbursementComponentProps {
    author: number
    //some function
}

interface ISubmitReimbursementComponentState {
    amount: number;
    type: number;
    description: string;
}

export class SubmitReimbursementComponent extends React.Component<ISubmitReimbursementComponentProps, ISubmitReimbursementComponentState>{

    constructor(props:any){
        super(props)
        this.state={
            amount: 0,
            type: 0,
            description: '',
        }
    }

    updateAmount = (input:any) => {
        this.setState({
            ...this.state,
            amount: input.target.value
        })
    }

    updateDescription = (input:any) => {
        this.setState({
            ...this.state,
            description: input.target.value
        })
    }

    updateType = (input:any) =>{
        this.setState({
            ...this.state,
            type: input.target.value
        })
        
    }

    submitReimbursement = (e:SyntheticEvent) =>{
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.submitReimbursement}>
                    <FormGroup row>
                        <Label for="exampleAmount" sm={2}>Amount: $</Label>
                        <Col sm={10}>
                            <Input type="number" name="amount" id="exampleAmount" placeholder="Amount" value={this.state.amount} onChange={this.updateAmount}/>
                        </Col>
                    </FormGroup>
                    <FormGroup tag="fieldset" row>
                        <legend className="col-form-label col-sm-2">Type</legend>
                        <Col sm={10}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio2" value="1" onChange={this.updateType}/>
                                    Lodging
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio2" value="2" onChange={this.updateType}/>
                                    Travel
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio2" value="3" onChange={this.updateType}/>
                                    Food
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio2" value="4" onChange={this.updateType}/>
                                    Other
                                </Label>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleDescription" sm={2}>Description:</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="description" id="exampleDescription" value={this.state.description} onChange={this.updateDescription}/>
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