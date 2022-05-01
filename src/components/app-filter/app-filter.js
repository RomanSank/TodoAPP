import './app-filter.css';


const AppFilter = (props) => {
  //создадим кнопки через массив для более удобной работы с ними
  // label - текст кнопки
  const buttonsData = [
    {name: 'all', label: 'Все сотрудники'},
    {name: 'rise', label: 'На повышение'},
    {name: 'moreThen1000', label: 'Все З/П больше 1000$'},
  ];

  // сформируем массив элементов
  const buttons = buttonsData.map(({name, label}) => {
    //проверяем совпадения фильтра с выделенной кнопкой
    const active = props.filter === name;
    //создадим класс активности для изменения css класса
    const clazz = active ? 'btn-light' : 'btn-outline-light';

    return (
      <button 
        className={`btn ${clazz}`}
        type="button"
        key={name}
        //при клике на кнопку имя фильртра передадим на верх
        onClick={() => props.onFilterSelect(name)}>
          {label}
      </button>
    )
  })

  return (
    <div className="btn-group">      
      {buttons}
    </div>
  );
}


export default AppFilter;