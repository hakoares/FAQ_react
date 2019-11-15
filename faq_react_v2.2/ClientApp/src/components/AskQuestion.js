import React, { Component } from 'react';
import PostQuestion from "./PostQuestion";

export class AskQuestion extends Component {
    static displayName = AskQuestion.name;

    
    
    constructor(props) {
        
        super(props);
        this.handler = this.handler.bind(this);
    }
    
    handler() {
        
    }
    
    
    render() {
        return(
            <div>
                <PostQuestion handler={this.handler}/>
            </div>
        );
    }


}