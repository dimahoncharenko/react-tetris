import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";

import { createStage } from "./gameHelpers";

const Tetris = () => {
    return (
        <div>
            <Stage stage={createStage()}/>
            <aside>
                <Display display={`Score: `}/>
                <Display display={`Rows: `}/>
                <Display display={`Level: `}/>
            </aside>
            <StartButton callback={() => {}}/>
        </div>
    );  
};

export default Tetris;