import logo from '../assets/logo.png';
// import "./Header.css"
import classes from "./Header.module.css"
import { styled } from 'styled-components'

// Rename the any.css file to any.module.css
// Import it as ...import anyName from "./any.module.css";
// There are styles added in any.module.css file for some perticuler classes. Now these styles are reusable.
// anyName.className can be used as variable name for applying that style to the classname attr of any tag.

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 20px;
  font-size: 25px;
  margin: 5px 0;
  border: 1px solid black;
`;

const StyleP = styled.p`
  margin: 0 auito;
  font-size: 20px;
  letter-spacing: 3px;
  font-weight: 500;
  color: ${(props) => {
    console.log(props)
    return Boolean(props.$success == "true") ? 'green' : 'red'
  }};
`

export default function Header() {
  return (
    <header className="mt-48 font-semibold">
      <img src={logo} alt="A canvas" className='w-44' />
      <h1>ReactArt</h1>
      <p className={classes.paraStyle}>A community of artists and art-lovers.</p>
      {/* class="_paraStyle_1faeb_55", this kind of unique classname will be assigned to p tag where we have reused the style */}
      {/* This type of weird name of class is generated by build tool automatically. */}
      {/* <p style={{ color: 'grey', transform: 'scale(2)' }}>A community of artists and art-lovers.</p> */}

      <p className="paraStyle">Trying this...</p>
      {/* Although we have used .paraStyle class but the css is not applied to this paragraph. So this is how we can reuse that classname too without applying css. */}

      {/* Example of styled components */}
      <CenteredDiv>
        This div is centered using styled components.
      </CenteredDiv>

      <CenteredDiv>
        This is another div, centered using styled components - same reused style component.
      </CenteredDiv>

      {/* After all styled components are also components, so we can also pass props to that component */}

      <StyleP $success="true">This paragraph is styled with styled comp...Success</StyleP>
      <StyleP $success="false">This paragraph is styled with styled comp...Danger</StyleP>

      {/* We have to take care that our props name must not clash with the any built-in attribute name. */}
      {/* To avoid this we can start name of our prop property with $, which still be considered as valid name */}
      {/* Although not using $ will endup giving warning in react dev tools. */}

    </header>
  );
}