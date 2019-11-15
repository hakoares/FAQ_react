import React from "react";
import {Card, CardBody, CardText, CardTitle} from "reactstrap";


class QandA extends React.Component {

    constructor(props) {
        super(props);
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);

        this.state = { 
            qId : this.props.qId,
            upId : "up"+this.props.qId,
            downId : "down"+this.props.qId,
            qRated: this.props.qRated,
            clicked: false
        };
        

    }

    incrementCounter () {
        if (this.state.disabled) {
            return;
        }
        this.setState({disabled: true});

        this.setState({
            qRated: this.state.qRated + 1
        });
        
        var url = "api/q/up/" + this.state.qId;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data.toString());
                document.getElementById(this.state.upId).classList.add('disabled');
                document.getElementById(this.state.downId).classList.add('disabled');

            });
    }

    decrementCounter () {
        if (this.state.disabled) {
            return;
        }
        this.setState({disabled: true});

        this.setState({
            qRated: this.state.qRated - 1
        });

        var url = "api/q/down/" + this.state.qId;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data.toString());
                document.getElementById(this.state.upId).classList.add('disabled');
                document.getElementById(this.state.downId).classList.add('disabled');

            });
    }
    
    render () {
        return (
        <Card className="my-3">
            <CardBody>
                <CardTitle className="h5">{this.props.question}</CardTitle>
                
                <CardText>{this.props.answer}</CardText>
                
                <hr className="my-4"/>

                <div className="btn-group" role="group">
                    <button id={this.state.upId} type="button"  onClick={this.incrementCounter} className="btn btn-outline-dark">👍🏼</button>
                    <button id={this.state.downId} type="button" onClick={this.decrementCounter} className="btn btn-outline-dark">👎🏼</button>
                </div>
                
                <p className="text-muted mt-1"><small>{this.state.qRated} synes dette var nyttig</small></p>
            </CardBody>
        </Card>
        )
    }
}

export default QandA;



