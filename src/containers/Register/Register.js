import React from "react";


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }
  
  
  render() {
    const { onFieldChange, onUserSubmit } = this.props;
    
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <div className="measure pa4 black-80">
          <fieldset id='sign_up' className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                    onChange={onFieldChange('name')}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={onFieldChange('email')}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={onFieldChange('password')}
                  />
                </div>
              </div>
          </fieldset>
          <div className="">
            <input
              onClick={onUserSubmit('post', 'register', 'application/json')}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value='Register' />
          </div>
        </div>
      </article>
    )
  }
}

export default Register;