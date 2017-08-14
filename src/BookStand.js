import React from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './bookShelf'

class BookStand extends React.Component {


    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf 
                title="Currently Reading" 
                shelf="currentlyReading" 
                books={this.props.books.filter(books => books.shelf === 'currentlyReading')} 
                updateBookList={this.props.updateBookList}
              />
              <BookShelf 
                title="Want to Read" 
                shelf="wantToRead" 
                books={this.props.books.filter(books => books.shelf === 'wantToRead')} 
                updateBookList={this.props.updateBookList}
              />
              <BookShelf 
                title="read" 
                shelf="read" 
                books={this.props.books.filter(books => books.shelf === 'read')} 
                updateBookList={this.props.updateBookList}
              />
            </div>
            <div className="open-search">
              <Link to="/search" />
            </div>
          </div>
        )
    }
}

export default BookStand