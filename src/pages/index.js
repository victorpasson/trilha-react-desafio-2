import { useState } from 'react';

// services
import { api } from '../services/api';

// images
import gitLogo from '../assets/github.png'

// styles
import { Container } from './styles';

// components
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import Button from '../components/Button';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`);

    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id);

      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return;
      }
      return;
    }
    alert('Repositório não encontrado');
  }

  const handleRemoveRepo = (id) => {
    setRepos(prev => prev.filter(repo => repo.id !== id));
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt='Logo'/>
      <Input value={currentRepo} onChange={(event) => { setCurrentRepo(event.target.value) }}/>
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => (
        <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>
      ))}
    </Container>
  );
}

export default App;
