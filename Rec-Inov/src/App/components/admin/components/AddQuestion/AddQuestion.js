import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import '../../../../assets/styles/addQuestion.css';
import addQuestion from './AddQuestionUtil';

function AddQuestionModal(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Add Question</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Type:</Form.Label>
                        <Form.Control name="Branch" as="select">
                            <option value="QCM" defaultValue>QCM</option>
                            <option value="TF">TrueFalse</option>
                            <option value="FF">Freeform</option>
                            
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Question:</Form.Label>
                        <Form.Control name="Question" type="text" placeholder="Enter Question" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Options:</Form.Label>
                        <Form.Control name="Option1" className="options" type="text" placeholder="Enter Option 1" />
                        <Form.Control name="Option2" className="options" type="text" placeholder="Enter Option 2" />
                        <Form.Control name="Option3" className="options" type="text" placeholder="Enter Option 3" />
                        <Form.Control name="Option4" className="options" type="text" placeholder="Enter Option 4" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Answer:</Form.Label>
                        <Form.Control name="Answer" as="select">
                            <option value="1" defaultValue>Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="btn btn-outline-success" onClick={props.onSubmit} >
                        Add Question
                    </Button>
                    <span className="register-message" style={props.messagestyle}>
                        {props.errormessage}
                    </span>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

class AddQuestion extends Component {
    state = {
        Question: '',
        Option1: '',
        Option2: '',
        Option3: '',
        Option4: '',
        Answer: '1',
        Branch: 'QCM',
        questionModalErrorMessage: '',
        messageStyle: {
            display: 'none'
        }
    }

    handleQuestions = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({
            [name]: val
        })
    }

    showErrorMessage = () => {
        this.setState({
          messageStyle: {
            display: ''
          }
        })
      }

    showError = (errorMessage) => {
        this.setState({
          questionModalErrorMessage: errorMessage
        })
        this.showErrorMessage();
      }

    addQuestion = () => {
        if (this.state.Question === '') {
            this.showError("Enter Question");
        }
        else if (this.state.Option1 === '') {
            this.showError("Enter Option 1");
        }
        else if (this.state.Option2 === '') {
            this.showError("Enter Option 2");
        }
        else if (this.state.Option3 === '') {
            this.showError("Enter Option 3");
        }
        else if (this.state.Option4 === '') {
            this.showError("Enter Option 4");
        }
        else {
            this.setState(this.props.hideAddQuestionModal)
            addQuestion({
                Question: this.state.Question,
                CorrectAnswerNo: this.state.Answer,
                Options: [this.state.Option1, this.state.Option2, this.state.Option3, this.state.Option4],
                Type: this.state.Type
            })
        }
    }

    render() {
        return (
            <AddQuestionModal
                show={this.props.addQuestionModalState}
                onHide={() => {
                    this.setState(this.props.hideAddQuestionModal);
                    this.setState({
                        Answer: '1', Type: 'QCM'
                    })
                }}
                onChange={this.handleQuestions}
                onSubmit={() => {
                    this.setState(this.addQuestion()); 
                    this.setState({
                        Answer: '1', Type: 'QCM'
                    })
                }}
                errormessage={this.state.questionModalErrorMessage}
                messagestyle={this.state.messageStyle}
            />
        )
    }
}

export default AddQuestion;