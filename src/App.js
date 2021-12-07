import React from 'react';
import { Form, Button, Card } from "react-bootstrap";
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io"

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {

  state = {
    allBooks: [],
    addedBookName: ""
  };

  currID = 0;
  books = [];


  setNewBook = () => {

    if (this.state.addedBookName.trim() !== "") {
      let newBook = {
        id: this.currID,
        name: this.state.addedBookName.trim(),
        likes: 0,
        dislikes: 0,
        totPop: 0
      };
  
      this.currID += 1
  
      this.setState({allBooks: [...this.state.allBooks, newBook], addedBookName: ""}, () => {console.log("SUCCESSFULLY UPDATED");});      
    } else {
      alert("Please Enter a Book Title")
    }

  };


  addComments = (id, stat) => {

    this.state.allBooks.forEach(bk => {

      if (bk.id === id) {

        if (stat) {
          bk.likes += 1
        } else {
          bk.dislikes += 1
        }

        bk.totPop = bk.likes - bk.dislikes
      }
    });

    this.setState(this.state, this.sortState())
  }


  sortState = () => {
    var current = this.state.allBooks;

    current = current.sort((a,b) => a.totPop >= b.totPop);
    current = current.reverse();

    this.setState({allBooks: current}, this.addCards());
  }


  addCards = () => {

    this.books = [];
    for (let i = 0; i < this.state.allBooks.length; i++) {
      this.books.push(
        <div className='bookList' id={this.state.allBooks[i].id}>
          <Card className='card'>
            <Card.Body className='cardBody'>
              <Card.Text className='cardName' id={'cardName' + this.state.allBooks[i].id}><b>{this.state.allBooks[i].name}</b></Card.Text>
              <Card.Text className='likeNum' id={'likeNum' + this.state.allBooks[i].id}>{this.state.allBooks[i].likes}</Card.Text>
              <Button variant="success" size='sm' className='cardBtn' id={'likeBtn' + this.state.allBooks[i].id} onClick={() => this.addComments(this.state.allBooks[i].id, true)}><IoIosArrowUp/></Button>
              <Card.Text className='dislikeNum' id={'dislikeNum' + this.state.allBooks[i].id} >{this.state.allBooks[i].dislikes}</Card.Text>
              <Button variant="danger" size='sm' className='cardBtn' id={'dislikeBtn' + this.state.allBooks[i].id} onClick={() => this.addComments(this.state.allBooks[i].id, false)}><IoIosArrowDown/></Button>
            </Card.Body>
          </Card>
        </div>
      );
    }
  }


  render() {

    this.addCards();

    return (
      <div className="App">
        <div className='container'>
          <div className='inputArea'>
            <Form.Group className="addBook">
              <Form.Control
                className="txtBookTitle"
                placeholder="Book Title..."
                value={this.state.addedBookName}
                onChange={e => this.setState({ addedBookName: e.target.value})}
                type="text"
              />
              <Button
                className="btnAddBook"
                variant="danger"
                onClick={this.setNewBook}
              >
                Add Book
              </Button>
            </Form.Group>
          </div>
          <div className='cardBookList'>
            {this.books}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
