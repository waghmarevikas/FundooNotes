import React , {Component} from 'react';
import ReactDom from 'react-dom';
import Notes from './Notes';
import MainNote from './MainNote';
import CreateNote from './CreateNote';
import NodeAddInCard from './NodeAddInCard';
import Paper from '@material-ui/core/Paper';

class ArchiveNote extends Component {
    constructor (props){
        super(props);
        this.state = {
          notes : false,
        }

    }
    render () {
        return (
            <div>
                {
                    this.state.notes == false ?
                    (
                        <div>
                                <NodeAddInCard 

                                />
                        </div>
                    ):null
                }

                
            </div>
        );
    }
}

export default ArchiveNote;