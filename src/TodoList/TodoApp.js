import './TodoApp.css';
import React from 'react';
import TodoItems from './TodoItems';
import {library} from '@fortawesome/fontawesome-svg-core';
import{faTrash} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
library.add(faTrash)

// function App() {
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <h1>Hello World</h1>
//     //   </header>
//     // </div>
//     <h1>Hello World</h1>
//   );
// }
class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      allItems:JSON.parse(localStorage.getItem('allItems'))||[],
      items:JSON.parse(localStorage.getItem('items'))||[],
      isFiltered:false,
      currentItem:{
        text:'',
        key:'',
        checked: false
      }
    }
    this.handleInput=this.handleInput.bind(this);
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.setUpdate=this.setUpdate.bind(this);
    this.filterCompleted=this.filterCompleted.bind(this);
    this.checkboxToggle = this.checkboxToggle.bind(this);

  }
  checkboxToggle(key) {
    const items=this.state.allItems;
    const allItems = this.state.allItems;
    items.map(item =>{
      if(item.key===key){
        if(item.checked===true){
          item.checked=false;
        }
        else{
          item.checked=true
        }
      }
      this.setState({
        allItems:allItems,
        items:items
      },localStorage.setItem('allItems', JSON.stringify(this.state.allItems)))
      })
}
  setUpdate(text,key,checked){
    const items =this.state.items;
    const allItems=this.state.allItems;
    allItems.map(item =>{
      if(item.key===key){
        item.text=text;
        item.checked=checked
      }
      this.setState({
        items:items
      },localStorage.setItem('allItems', JSON.stringify(this.state.allItems)))
    })
  }
  
  filterCompleted(){
    console.log(this.state.isFiltered)
    if(this.state.isFiltered===false){

      const filteredItems =this.state.allItems.filter(item =>
        item.checked===true);
        this.setState({
          items: filteredItems,
          isFiltered:true
        },localStorage.setItem('allItems', JSON.stringify(this.state.allItems)))
    }
    else{
        
        this.setState({
          items: this.state.allItems,
          isFiltered:false
        },localStorage.setItem('allItems', JSON.stringify(this.state.allItems)))
    }
  }
  deleteItem(key){
    const filteredItems =this.state.allItems.filter(item =>
      item.key!==key);
    const filteredFItems =this.state.items.filter(item =>
      item.key!==key);
      this.setState({
        allItems: filteredItems,
        items:filteredFItems
      },localStorage.setItem('allItems', JSON.stringify(this.state.allItems)))
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text:e.target.value,
        key:Date.now(),
        checked:false
      },
      isFiltered:false
    },localStorage.setItem('allItems', JSON.stringify(this.state.allItems)))
  }
  addItem(e){
    e.preventDefault();
    const newItem =this.state.currentItem;
    //console.log(newItem);
    if(newItem.text !==""){
      const newitems =[...this.state.allItems, newItem];
      this.setState({
        items: newitems,
        allItems:newitems,
        currentItem:{
          text:'',
          key:'',
          checked:false
        },
        isFiltered:false
      },localStorage.setItem('allItems', JSON.stringify(this.state.allItems)))
      
      }
      console.log(JSON.stringify(this.state.allItems))
    }


  render(){
    return(
      
      <div className="outterBox">
        <h2>ToDo List:</h2>
        <div className="Addbox">
            <header>
            <form id="todo-form" onSubmit={this.addItem}>
              <input type="text" placeholder="Add your task here." 
              value={this.state.currentItem.text} onChange={this.handleInput}
              >
              </input>
              <button type="submit">Add</button>
            </form>
            <form id="filterTask" action="filterTask">
              <label>
                <input type="checkbox" onChange={ e => this.filterCompleted()}/>
                <span>Show completed task</span>
              </label>
            </form>
            </header>

            {/* <input id="cb" type="checkbox" ></input>  */}

        </div>
        <div className="TodoApp"> 
          <header>
            <TodoItems items={this.state.items}
            checkboxToggle = {this.checkboxToggle}
            deleteItem = {this.deleteItem}
            setUpdate = {this.setUpdate}>
            </TodoItems>
            
          </header>
        </div>
      </div>
    )
    
  }
}

const mapStateToProps = (state) => {
  return {
    allItems: state.allItems
  }
}

export default  connect(mapStateToProps)(TodoApp);
