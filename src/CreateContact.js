import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

class CreateContact extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true });
    if(this.props.onCreateContact) {
      this.props.onCreateContact(values);
    }
  }
  render() {
    return (
      <div>
        <Link
          className='close-create-contact'
          to='/'
        >关闭</Link>
        <form
          className='create-contact-form'
          onSubmit={this.handleSubmit}
        >
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className='create-contact-details'>
            <input type='text' name='name' placeholder='姓名'/>
            <input type='text' name='email' placeholder='邮箱'/>
            <button>增加联系人</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateContact;