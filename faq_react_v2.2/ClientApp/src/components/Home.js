import React, { Component } from 'react';
import QandA from "./QandA";
import PostQuestion from "./PostQuestion";

export class Home extends Component {
  static displayName = Home.name;
  
    constructor (props) {
        super(props);
        this.loadQuestionsByCat = this.loadQuestionsByCat.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.fetchQuestions = this.fetchQuestions.bind(this);
        this.handler = this.handler.bind(this)
        this.renderAllQuestion = this.renderAllQuestions.bind(this);
        Home.renderAllCategories = Home.renderAllCategories.bind(this);

            this.state = {
                allQuestions: [],
                allCategories: [],
                loadingQ: true,
                loadingC: true,
                questionsToLoad: 0
            };
        
        this.fetchCategories();
        this.fetchQuestions();

        
    }
    
    componentDidMount() {

    }

    handler() {
        
        this.loadQuestionsByCat(this.state.questionsToLoad)
        this.renderAllQuestions(this.state.allQuestions);
        
        this.forceUpdate();
    }
    
    fetchCategories() {
        fetch('api/cat')
            .then(response => response.json())
            .then(data => {
                this.setState({ allCategories: data, loadingC: false });
            });
    }
    
    fetchQuestions() {
        fetch('api/all')
            .then(response => response.json())
            .then(data => {
                this.setState({ allQuestions: data, loadingQ: false });
            });
    }

    loadQuestionsByCat (id) {
        this.setState({questionsToLoad: id, allQuestions: []}, function () {
            
            var url = "";
            if(id === 0) {
                url = "api/all";
            } else {
                url ="api/cat/"+id;
            }

            for(var i in this.state.allCategories) {
                i++;
                var active = "text-muted";
                if(id === 0) {
                    document.getElementById(0).classList.add(active);
                    document.getElementById(i).classList.remove(active);
                } else {
                    document.getElementById(id).classList.add(active);
                    document.getElementById(0).classList.remove(active);
                    if(id !== i) {
                        document.getElementById(i).classList.remove(active);
                    }
                }
            }

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.setState({ allQuestions: data, loadingQ: false }, function () {
                        
                    });
                    
                });
        });
        
        
    }

    
    renderAllQuestions (allQuestions) {
        if(allQuestions.length === 0) {
            return (
                <div className="text-center mt-5">
                    <p className="text-muted">Fant ingen spørsmål...</p>
                </div>
            )
        } else {
            return allQuestions.map(cat =>
                <div className="mb-5">
                    <h3>{cat.catName}</h3>
                    {cat.questions.map(q => {
                        if (q.answer === null) {
                            return(
                            <QandA
                                qId={q.id}
                                question={q.text}
                                qRated={q.votes}
                                answer={<i>Mangler svar</i>}
                            />
                            )
                        } else {
                            return (
                            <QandA
                                qId={q.id}
                                question={q.text}
                                qRated={q.votes}
                                aId={q.answer.id}
                                answer={ q.answer.text }
                            />
                            )
                        }
                    })}
                </div>
            )
        }
    }
    
    static renderAllCategories (allCat) {
        return(
               <div>
                   <div className="card-body text-center">
                       <h5 className="card-title">Velg kategori</h5>
                       <button id="0" className="btn text-muted" onClick={() => this.loadQuestionsByCat(0)} >Alle</button>

                       {allCat.map( cat =>
                           <button key={cat.id} id={cat.id} className="btn" onClick={() => this.loadQuestionsByCat(cat.id)} >{cat.name}</button>
                       )}
           
                   </div>
               </div>
        )
    }
    
    
    render () {

            let contents = this.state.loadingQ
                ? <p><em>Laster...</em></p>
                : this.renderAllQuestions(this.state.allQuestions);

            let category = this.state.loadingC
                ? <p><em>Laster...</em></p>
                : Home.renderAllCategories(this.state.allCategories);

        
        return (
            <div className="mb-5">
                <h1 className="text-center display-1 mt-5">FAQ</h1>
                <PostQuestion handler={this.handler} />
                {category}
                {contents}
            </div>
        );
    }
}
