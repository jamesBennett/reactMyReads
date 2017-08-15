import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import BookShelf from './BookStand'
import './App.css'

class BooksApp extends React.Component {
  
  state = {
    books: []
  } 

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({books})
      });
  }

  updateBookList = (book, activeShelf) => {
    BooksAPI.update(book, activeShelf).then(() => {
        book.shelf = activeShelf
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
    });
  }

  render() {
    if(this.state.books.length === 0){
      return null
    }else {
      return (
        <div className="app">
          <Route exact path="/" render={() => (
            <BookShelf books={this.state.books} updateBookList={this.updateBookList} />
          )} />
          <Route path="/search" render={() => (
            <Search myBooks={this.state.books} updateBookList={this.updateBookList} />
          )} />
        </div>
      )
    }
  }
}

export default BooksApp
