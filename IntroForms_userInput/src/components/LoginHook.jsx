import { useInput } from "../hooks/useInput";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";

export default function Login() {

  const {
    value: email,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: password,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError
  } = useInput('', (value) => hasMinLength(value, 6));

  function handleSubmit(e) {
    e.preventDefault();
    if (emailHasError || passwordHasError) return;

    console.log(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={email}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          error={emailHasError && 'Please enter a valid email!!'}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={password}
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          error={passwordHasError && 'Please enter a valid password!!'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
