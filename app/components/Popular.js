var React = require('react');

class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang) {
    this.setState(function(){
      return {
        selectedLanguage: lang
      }
    })
  }
  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
      <div className='container'>
        <ul className='languages'>
          { languages.map(function(el){
            return (
              <li
                style={el === this.state.selectedLanguage ? { color: 'red'} : null}
                onClick={this.updateLanguage.bind(null, el)}
                key={el}>
                  {el}
              </li>
            )
          }, this)}
        </ul>
      </div>
    )
  }
}

module.exports = Popular;
