import React , {Component} from 'react';
import ReactDom from 'react-dom';
import Notes from './Notes';
import MainNote from './MainNote'; 
import { Button } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { createUserNote, getNotes , updateNote } from './FirebaseServices';
import NodeAddInCard from './NodeAddInCard';

class CreateNote extends Component { 
    constructor (props) {
        super (props) ;
        this.state = {
            showNote : true,
            noteTitle : '',
            takeNote : '',
            notes : null,
            archiveStatus : false,
            pinStatus : false,
            trashStatus : false,
        };
    }

    handleShowNotesClose = () => {
        this.setState ({
            showNote : false,
        })
    }

     handleClickAway = () => {
        this.setState ({
            showNote : true,
        })
            if(!this.state.noteTitle && !this.state.takeNote) {
                console.log( "Empty" )
            }
            else {
                var obj = {
                    pin : this.state.pinStatus,
                    ArchiveStatus : this.state.archiveStatus,
                    dataOfNote : this.state.takeNote,
                    titleOfNote : this.state.noteTitle,
                    trash : this.state.trashStatus, 
                }
                createUserNote(obj)
                this.setState({
                    pinStatus : false,
                    archiveStatus : false,
                    trash : false,
                    takeNote : '',
                    noteTitle : '',
                })
            }    
    }

    handleNoteTitle = (event) => {
        this.setState ({
            noteTitle : event.target.value,
        });
        console.log("Title " + this.state.noteTitle);   
    }

    handleTakeNote = (event) => {
        this.setState ({
            takeNote : event.target.value,
        });
        console.log("Date " + this.state.takeNote);
    }

    handleArchiveStatus = (noteId) => {
        let obj = this.getNodeObj();
        console.log("ArchiveStatus : " + obj.ArchiveStatus)
        obj.ArchiveStatus = true ;
        console.log(" Archive Status : " + obj);
        console.log(" ArObj ")
        updateNote(noteId , obj);

    } 

    handlePinStatus = (noteId) => {
        let obj = this.getNodeObj();
        console.log("Pin Status : "+obj.pin);
        obj.pin = true ;
        updateNote(noteId , obj);
    }

    handleTrashStatus = (noteId) => {
        let obj = this.getNodeObj();
        console.log("Trash Status : "+obj.trash);
        obj.trash = true;
        updateNote(noteId , obj);
    }

    getNodeObj = () => {
        var nodeObj = {
            pin : this.state.pinStatus,
            ArchiveStatus : this.state.archiveStatus,
            //dataOfNote : this.state.takeNote,
            //titleOfNote : this.state.noteTitle,
            trash : this.state.trashStatus, 
        }
        return nodeObj;
    }

    componentDidMount(){
        getNotes((notes)=>{
            this.setState({
                notes:notes
            },()=>{
                console.log("state notes : ",this.state.notes); 
            })
        });
    }
    
    render () {
        return (
            <div>
                    {
                        this.state.showNote == true ?
                        ( 
                            <div onClick = { this.handleShowNotesClose } 
                                className = " mainNote ">
                                    <Notes /> 
                            </div>
                        ) 
                        :
                        <ClickAwayListener 
                            onClickAway = { this.handleClickAway } 
                            >
                                <div className = "mainNote">
                                    <MainNote 
                                            handleClickAway = { this.handleClickAway } 
                                            handleNoteTitle = { this.handleNoteTitle }
                                            handleTakeNote = { this.handleTakeNote }   
                                            NoteTitle = { this.state.noteTitle }
                                            TakeNote = { this.state.takeNote }
                                            pin = { this.state.pinStatus }
                                            trash = { this.state.trashStatus }
                                            ArchiveStatus = { this.state.archiveStatus }
                                    />
                                </div>
                        </ClickAwayListener>
                    }
               
               <div className = 'noteCard'>

                   {    this.state.notes !== null &&
                       Object.getOwnPropertyNames(this.state.notes).map((key, index)=>(
                            <NodeAddInCard 
                                Notes = { this.state.notes[key] }
                                nKey = { key }
                                handleArchiveChange = { this.handleArchiveStatus } 
                                handlePinChange = { this.handlePinStatus }
                                handleTrashChange = { this.handleTrashStatus }
                            />
                       ))
                   }
                   

               </div>
                
            </div>
    );
}
}
export default CreateNote;