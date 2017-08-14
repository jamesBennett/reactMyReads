import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


class bookShelf extends React.Component {
    static PropTypes = {
        title: PropTypes.string,
        books: PropTypes.array,
        updateShelf: PropTypes.func
    }

    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {this.props.books.map(book => (
                                <Book key={book.id} book={book} onChange={this.props.updateBookList} />
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default bookShelf