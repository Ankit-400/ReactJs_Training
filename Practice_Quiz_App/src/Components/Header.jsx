import logoImag from '../assets/quiz-logo.png';

export default function Header() {
    return <header>
        <img src={logoImag} alt="Quiz Logo" />
        <h1>ReactQuiz</h1>
    </header>
}