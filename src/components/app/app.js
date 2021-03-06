import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
        {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
        {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3}
      ],
      // состояние строки поиска (по умолчанию пустая)
      term: '',
      // фильтры сотрудников
      filter: 'rise'
    }
    this.maxId = 4;

  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name, 
      salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }
    
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }      
    });    

  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({      
      data: data.map(item => {
        if(item.id === id) {
          return {...item, [prop]: !item[prop]}          
        }
        return item;
      })
    }))
  }

  // Функция поиска сотрудников
  searchEmp = (items, term) => {
    //если строка пустая то ничего не делаем (возвращаем весь массив без фильтрации)
    if (term.length === 0) {
      return items;
    }
    // если не пустая фильтруем массив
    return items.filter(item => {
      // метод indexOf() если ничего не находи то возращает (-1)
      // мы вернем все значения массива name если совпадения есть (т.е. > =1)
      return item.name.indexOf(term) > -1
    })
  }

  // Создадим функцию для поднятия состояния term из seacr-panel в app.js
  onUpdateSearch = (term) => {
      // тоже самое что и строка ниже
      // this.setState({term: term});
    this.setState({term});
  }

  //  функция фильтрации по категориям
  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);        
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }
  }
  
    // создадим метод выбора фильтра позьзователем
    onFilterSelect = (filter) => {
      this.setState({filter});
    }

  render() {    
    const {data, term, filter} = this.state;
    //считаем кол-во сотрудников и кол-во сотрубников на повышение
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    // отфильтруем отфильтрованный массив по поисковому запросу массивом для отображения на странице вместо самой data
    // вторым аргументов передадим фильтр из state, который будет отображен на страние
    const visibleData = this.filterPost(this.searchEmp(data, term), filter)



    return (
      <div className="app">
        <AppInfo 
        employees={employees}
        increased={increased}/>

        <div className="search-panel">
          <SearchPanel
          //спускаем call-back функцию вниз для использования внизу
          onUpdateSearch={this.onUpdateSearch}/>
          
          <AppFilter 
          //передадим в комонент appFilter state filter
          filter={filter}
          //передадим в комонент appFilter метод выбора фильтра
          onFilterSelect={this.onFilterSelect}/>
        </div>
        
        <EmployeesList 
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}/>
          
        <EmployeesAddForm 
        onAdd={this.addItem}/>
      </div>
    );
  }

}

export default App;

