import React from 'react';
import './App.css';

const addToStorage = (books) => {
  let booksSON = JSON.stringify(books);
  localStorage.setItem("books",booksSON);
}

const loadFromStorage = () => {
  if(localStorage.books === undefined) {
    addToStorage([]);
  }
  if(localStorage.books !== undefined || localStorage.todos !== []) {
    let booksLoaded = localStorage.getItem("books");
    return (JSON.parse(booksLoaded));    
  }
}

class BookCard extends React.Component {
  render() {
    return (
      <div className = 'book-card'>
        <div className = 'book-detail'>{this.props.book.title}</div>
        <div className = 'book-detail'>{this.props.book.author}</div>
        <div className = 'book-detail'>{this.props.book.pages + ' pages'}</div>
        <div className = 'book-card-tools'>
          {
          this.props.book.status === 'Read' 
          ? <button className = 'read'>Read</button>
          : <button className = 'not-read'>Not Read</button> 
          }
          <button className = 'delete'>Delete</button>
        </div>
      </div>
    );
  }
}

class NewBookForm extends React.Component {

  handleSubmit(event) {
    console.log(this.props.book);
    this.props.submitForm(this.props.book);
    this.props.closeForm();
    // console.log(this.props);
  }

  setStatus(event) {
    this.props.book.status = event.target.value;
    console.log(this.props.book);
  }

  setTitle(event) {
    this.props.book.title = event.target.value;
  }

  setAuthor(event) {
    this.props.book.author = event.target.value;
  }

  setPages(event) {
    this.props.book.pages = event.target.value;
  }

  render() {
    return (
      <div className="form-popup" id="myForm">
        <form action="/action_page.php" className="form-container" name = "myForm">
          <h1>Add Book</h1>
      
            <label htmlFor="title"><b>Title</b></label>
            <input 
              type="text" 
              name="title" 
              required 
              onChange = {this.setTitle.bind(this)}/>

            <label htmlFor="author"><b>Author</b></label>
            <input type="text" name="author" required onChange = {this.setAuthor.bind(this)}/>
      
            <label htmlFor="pages"><b>Pages</b></label>
            <input type="number" name="pages" required onChange = {this.setPages.bind(this)}/>
            
            <div id = 'radio' onChange = {this.setStatus.bind(this)}>
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
      
            <button type="button" className="btn" onClick = {this.handleSubmit.bind(this)}>Add Book</button>
            <button type="button" className="btn cancel" onClick = {this.props.closeForm}>Close</button>
        </form>
      </div>
    );
  }
}

NewBookForm.defaultProps = {
  book : {
    title: '',
    author: '',
    pages: 0,
    status: ''
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
  componentWillMount() {
    this.setState({
      books : loadFromStorage()
    });
  }
  openForm() {
    this.setState({
      showForm : true
    });
    console.log(this.state.books);
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
      books: [...this.state.books,book]
    },() => console.log(this.state.books,addToStorage(this.state.books)));
    console.log(this.state.books);
  }
  render() {
    const bookCards = this.state.books.map(book => <BookCard key = {book.title} book = {book} />)
    console.log(this.state.books);
    return (
      <div className="App">
        <header id = 'heading-container'>
              <h1 id = 'heading'>Library</h1>
              <p id = 'heading-caption'>Ultimate Book Repository</p>
        </header>
        <main>
            <div id = 'container'>
              {
                bookCards
              }
            </div>
        </main>
        <button 
          className="open-button" 
          onClick={this.openForm}>Add New Book</button>
        {this.state.showForm ? <NewBookForm displayed = {this.state.showForm} closeForm = {this.closeForm} submitForm = {this.submitForm} /> : null}
      </div>
    );
  }
}



export default App;
