import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    });
  }

  clearQuery = () => {
    this.setState({
        query: ''
    });
  }

  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;

    let showingContacts;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingContacts = contacts.filter((contact) => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy('name'));

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='搜索联系人'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            to='/create'
            className='add-contact'
          >添加联系人</Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>
              搜索到了所有{contacts.length}个联系人中的{showingContacts.length}个联系人
            </span>
            <button onClick={this.clearQuery}>显示所有联系人</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
              backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => onDeleteContact(contact)} className='contact-remove'>删除</button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts;