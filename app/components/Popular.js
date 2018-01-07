import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api.js';
import Loading from './Loading';

function SelectLanguage ({ selectedLanguage, onSelect }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'PHP', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      { languages.map((el) => (
          <li
            style={el === selectedLanguage ? { color: 'red'} : null}
            onClick={() => onSelect(el)}
            key={el}>
              {el}
          </li>
        ))}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

function RepoGrid ({repos}) {
  return (
    <ul className="popular-list">
      {repos.map(({ name, owner, html_url, stargazers_count }, index) => (
          <li key={name} className="popular-item">
            <div className="popular-rank">#{index+1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={owner.avatar_url}
                  alt={"Avatar for " + owner.login} />
              </li>
              <li><a href={html_url}>{name}</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        ))}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: null
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage =  async (lang) => {
    this.setState(() => ({
        selectedLanguage: lang,
        repos: null
    }));

    const repos = await fetchPopularRepos(lang);
    this.setState(() => ({ repos }));

  }
  render() {
    const { selectedLanguage, repos } = this.state;
    return (
      <div className='container'>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}/>
        {!repos ?
          <Loading text='Downloading' speed={10}/> :
          <RepoGrid repos={repos} />
        }

      </div>
    )
  }
}

export default Popular;
