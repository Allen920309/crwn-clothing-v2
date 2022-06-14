const Person = (props) => {
    return React.createElement('div',{},[
        React.createElement('h1', {}, props.name),
        React.createElement('p',{}, props.occupation),
    ]);

};
const App = () =>{
    return React.createElement('div', {}, [
        React.createElement('h1', {class:'title'}, 'React is rendered'),
        React.createElement(Person, {name: 'Yihua', occupation: 'instructor'}, null),
        React.createElement(Person, {name: 'Andrei', occupation: 'Lead instructor'}, null),
        React.createElement(Person, {name: 'Emily', occupation: 'teacher'}, null),
    ]);
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));