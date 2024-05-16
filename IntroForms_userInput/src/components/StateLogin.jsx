import { useState } from "react";

export default function Login() {

  // ways to handle input fields...

  // 1. Individual state for each field. Individual change handling function
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // 2. One object having key for each field. Generic change handling function
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  })

  const emailIsValid = didEdit.email && !formData.email.includes('@');
  const passwordIsValid = didEdit.password && !(formData.password.length > 5);

  function handleInputChange(field, value) {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));

    setDidEdit(prevState => ({
      ...prevState,
      [field]: false
    }))
  }

  function handleInputBlur(field) {
    setDidEdit(prevState => ({
      ...prevState,
      [field]: true
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(email, password);
    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleInputBlur('email')}
          />
          <div className="control-error">
            {emailIsValid && <p>Please enter valid email address..!!</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            // onChange={(e) => setPassword(e.target.value)}
            onChange={(e) => handleInputChange('password', e.target.value)}
            onBlur={() => handleInputBlur('password')}
          />
          <div className="control-error">
            {passwordIsValid && <p>Please enter valid password..!!</p>}
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
