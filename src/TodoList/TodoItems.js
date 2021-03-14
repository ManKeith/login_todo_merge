import React from 'react';
import './TodoItems.css';
import Checkbox from '@material-ui/core/Checkbox';
import {FontAwesomeIcon, FontAwesomeicon} from '@fortawesome/react-fontawesome';
function TodoItems(props){
    const items =props.items;
    const todoItems = items.map(item=>{
       
        return <div className="list" key={item.key}>
                    <div> 
                        {/* <p>
                            <Checkbox  onChange={
                                (e)=>{
                                    props.checkboxToggle(item.key)
                                    //console.log(item.text+" "+item.checked)
                                }
                                } />
                        </p> */}
                        <form id="checkTask" action="checkTask">
                            <label>
                                <input type="checkbox" onChange={ (e)=>{props.checkboxToggle(item.key)}}/>
                                <span></span>
                                <input type="text"
                                    id={item.key}
                                    value={item.text}
                                    // checked={item.checked}
                                    onChange={
                                        (e)=>{
                                            props.setUpdate(e.target.value, item.key,item.checked)
                                        }
                                }/>
                                
                            </label>
                            <span>
                            <FontAwesomeIcon className="faicons" icon='trash'
                            onClick={() => props.deleteItem(item.key)
                            }/>
                        </span>
                        </form>
                        
                        
                        
                    </div>
                </div>
    })
    return(
    <div>{todoItems}</div>
    )
}
 export default TodoItems;