import { useState, useEffect } from 'react';

import CardList from './Components/Card-list/card-list.component';
import SearchBox from './Components/Search-box/search-box.component';
import './App.css';

const App = () =>{

  const [searchField, setsearchField] = useState('');
  
  const [monsters, setMonsters] = useState ([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=>response.json())
    .then((users)=>setMonsters(users));
  },[]);

  useEffect(()=>{
    const newFilteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  },[monsters, searchField])
    

  const onSearchChange = (event)=>{
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setsearchField (searchFieldString);
    };
  
    

    
  
  return (
    <div className='App'>
      <h1 className="app-title">Monsters Rolodex</h1>

      <SearchBox 
                 className = 'monsters-search-box'
                 onChangeHandler = {onSearchChange} 
                 placeholder = 'search monsters'
      />

      
    <CardList monsters={filteredMonsters}/>
      </div>

  )
}

/* class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
     };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((Response)=>Response.json())
    .then((users)=>
    this.setState(()=>{
        return {monsters: users};
      })
      );
  }

onSearchChange = (event)=>{
  
const searchField = event.target.value.toLocaleLowerCase();
this.setState(()=>{
  return {searchField};
});
}

  render () {

    const {monsters, searchField} = this.state;
    const {onSearchChange} = this;
    const filteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
    <div className='App'>
      <h1 className="app-title">Monsters Rolodex</h1>

      <SearchBox 
                 className = 'monsters-search-box'
                 onChangeHandler = {onSearchChange} 
                 placeholder = 'search monsters'
                 />
      
    <CardList monsters={filteredMonsters}/>
      </div>
    );
  } 
}
 */
export default App;
