import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class PostQuestion extends React.Component {

    constructor(props) {
        super(props);
        
        this.post = this.post.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.update = this.forceUpdate.bind(this);
        
        this.modalToggle = this.modalToggle.bind(this);
        
        this.state = {
            allCat: [],
            loadingC: true,
            category: 0,
            text: "",
            errorCat: "",
            errorText: "",
            show: false
        };
        
    }
    
    componentDidMount() {
        fetch('api/cat')
            .then(response => response.json())
            .then(data => {
                this.setState({ allCat: data, loadingC: false });
            });
    }

    post() {
        
        
        var check = true;

        if(this.state.category === 0) {
            this.setState({errorCat: "Velg kategori."});
            check = false;

        } else {
            this.setState({errorCat: ""});
        }

        if(this.state.text === "") {
            this.setState({errorText: "Skriv et spørsmål."});
            check = false;
        } else {
            this.setState({errorText: ""});
        }
        
        if(check === true) {
            var url = "api/q/post";
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: this.state.text,
                    category: {
                        id: this.state.category
                    },

                })
            });

            this.props.handler();
            this.setState({category: 0, text: ""});
            this.modalToggle();
        }
    }

    handleCategoryChange(event) {
        this.setState({category: event.target.value});
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }
    
    modalToggle() {
        this.setState({show: !this.state.show}, function () {
            console.log(this.state.show);
        });
    }
    
    render () {

        return (
         <div className="d-inline">
             <button id="0" className="btn btn-outline-dark" onClick={this.modalToggle} >Send inn spørsmål</button>

             <Modal isOpen={this.state.show} toggle={this.modalToggle} >
                 <ModalHeader toggle={this.modalToggle}>Send inn spørsmål</ModalHeader>
                 <ModalBody>
                     <Form>
                         <FormGroup>
                             <Label for="exampleSelect">Kategori</Label>
                             <FormText color="danger">{this.state.errorCat}</FormText>
                             <Input value={this.state.category} onChange={this.handleCategoryChange} type="select" name="select" id="exampleSelect">
                                 <option value={0} disabled>Velg kategori</option>
                                 { this.state.allCat.map( cat => {
                                     return(
                                         <option key={cat.id} value={cat.id}>{cat.name}</option>
                                     )
                                 })}
                             </Input>
                         </FormGroup>
                         <FormGroup>
                             <Label for="exampleText">Hva lurer du på?</Label>
                             <FormText color="danger">{this.state.errorText}</FormText>
                             <Input value={this.state.text} onChange={this.handleTextChange} type="textarea" name="text" id="exampleText" />
                         </FormGroup>
                     </Form>                 
                 </ModalBody>
                 <ModalFooter>
                     <Button color="danger" onClick={this.post}>Send inn</Button>{' '}
                     <Button color="none" className="btn btn-outline-dark" onClick={this.modalToggle}>Avbryt</Button>
                 </ModalFooter>
             </Modal>
         </div>   
        )
    }
    
    
    
    
    }
export default PostQuestion;