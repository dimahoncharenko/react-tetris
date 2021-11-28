import Cell from "./Cell"

type Props = {
    isGameOver?: boolean
    display: string
}

const Display = ({ isGameOver = false, display }: Props) =>
    <div> 
        {display}
    </div>

export default Display;