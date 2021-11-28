type Props = {
    callback: (...args: any[]) => void
}

const StartButton = ({callback}: Props) =>
    <button onClick={callback}>
        Start Game!
    </button>

export default StartButton;