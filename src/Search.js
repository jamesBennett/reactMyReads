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
                    this.setState({books})
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

                            const matchedBook = this.props.myBooks.find(b => b.id === book.id)
                            if(matchedBook !== undefined) {
                                return(
                                    <li key={matchedBook.id}>
                                        <Book book={matchedBook} onChange={this.updateBookList} />
                                    </li>
                                )
                            } else {
                                return(
                                    <li key={book.id}>
                                        <Book book={book} onChange={this.updateBookList} />
                                    </li>
                                )
                            }
                            
                        }) : null
                    }
                </ol>
                </div>
            </div>
        )
    }
}

export default Search;