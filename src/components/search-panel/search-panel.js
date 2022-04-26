import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  // функция обновления состояния state в стоке поиска (это другая функция не из app.js)
  onUpdateSearch = (e) => {
    const term = e.target.value;
    this.setState({term});
    // запускаем функцию onUpdateSearch (из app.js) для передачи данных на верх в app.js
    this.props.onUpdateSearch(term);
  }

 render() {
  return (
    <input 
      type="text" 
      className="form-control seacrh-input"
      placeholder="Найти сотрудника"
      value={this.state.term}
      //отслеживаем изменения onUpdateSearch (не из app.js)
      onChange={this.onUpdateSearch}/>
  );
 }
}

export default SearchPanel;