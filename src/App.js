import React from 'react';
import './App.css';


class NewBookForm extends React.Component {
  setStatus(event) {
    this.props.book.read = event.target.value;
    console.log(this.props.book);
  }
  render() {
    return (
      <div className="form-popup" id="myForm">
        <form action="/action_page.php" className="form-container" name = "myForm">
          <h1>Add Book</h1>
      
            <label htmlFor="title"><b>Title</b></label>
            <input type="text" name="title" required value = {this.props.book.title}/>

            <label htmlFor="author"><b>Author</b></label>
            <input type="text" name="author" required value = {this.props.book.author}/>
      
            <label htmlFor="pages"><b>Pages</b></label>
            <input type="number" name="pages" required value = {this.props.book.pages}/>
            
            <div id = 'radio'onChange = {this.setStatus.bind(this)}>
              <b>Have you read it ?</b>
                <label htmlFor="yes">
                  <input type="radio" id="yes" name="read" value="Read"/>
                  Yes
                </label>
                <label htmlFor="no">
                  <input type="radio" id="no" name="read" value="Not Read"/>
                  No
                </label>
            </div>
      
            <button type="button" className="btn">Add Book</button>
            <button type="button" className="btn cancel" onClick = {this.props.closeForm}>Close</button>
        </form>
      </div>
    );
  }
}

NewBookForm.defaultProps = {
  book : {
    title : '',
    author: '',
    pages: 0,
    read: ''
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm : false,
      books : []
    };
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  openForm() {
    this.setState({
      showForm : true
    });
  }
  closeForm() {
    console.log('Trying....');
    this.setState({
      showForm : false
    })
    console.log('Closed...');
  }
  submitForm(book) {
    this.setState({
      books: this.state.books.concat(book)
    });
  }
  render() {
    return (
      <div className="App">
        <header id = 'heading-container'>
              <h1 id = 'heading'>Library</h1>
              <p id = 'heading-caption'>Ultimate Book Repository</p>
        </header>
        <main>
            <div id = 'container'>

            </div>
        </main>
        <button 
          className="open-button" 
          onClick={this.openForm}
          closeForm = {this.closeForm}
          submitForm = {this.submitForm}>Add New Book</button>
        {this.state.showForm ? <NewBookForm displayed = {this.state.showForm} closeForm = {this.closeForm} /> : null}
      </div>
    );
  }
}



export default App;
