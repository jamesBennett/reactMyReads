import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends React.Component {
    state = {
        books: []
    }

    doSearch = (search) => {
        if(search.target.value !== '') {
            BooksAPI.search(search.target.value).then((books) => {
                if ( books.error ) {
                    this.setState({books: []})
                }else {
                    const searchResults = books.map(book => {
                        const match = this.props.myBooks.find(myBook => myBook.id === book.id);
                        if(match) {
                            book.shelf = match.shelf
                        }
                        return book;
                    })
                    this.setState({books: searchResults})
                }
            });
        } else {
            this.setState({books: []})
        }
    }

    updateBookList = (book, activeShelf) => {
        this.props.updateBookList(book, activeShelf);
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/" >Close </Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={search => this.doSearch(search)}/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    { 
                        this.state.books.length ? this.state.books.map(book => {
                            
                            //Some books are missing an imageLink
                            if(book.imageLinks === undefined){
                                book.imageLinks = ''
                            } 

                            return(
                                <li key={book.id}>
                                    <Book book={book} onChange={this.updateBookList} />
                                </li>
                            )
                            
                        }) : null
                    }
                </ol>
                </div>
            </div>
        )
    }
}

export default Search;