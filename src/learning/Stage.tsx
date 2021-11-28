import Cell from "./Cell"

type Props = {
    stage: any[][]
}

const Stage = ({ stage }: Props) =>
    <div>
        {stage.map(row => row.map((cell, index) => <Cell type={cell[0]} key={index}/>))}
    </div>

export default Stage;