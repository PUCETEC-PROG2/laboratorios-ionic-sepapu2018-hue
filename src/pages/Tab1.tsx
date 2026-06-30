import React from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonText } from '@ionic/react';
import './Tab1.css';
import RepoItem from "../components/RepoItem";
import { Repository } from '../interfaces/Repository';
import { fetchRepositories } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const loadRepos = async () => {
    setLoading(true);
    try {
      const reposData = await fetchRepositories();
      setRepositoryList(reposData);
    } catch (error) {
      console.error("Error al cargar repositorios", error);
      setErrorMsg("Error al cargar repositorios: " + error);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading && <LoadingSpinner />}

        {errorMsg !== "" && (
          <IonText color="danger">
            <p>{errorMsg}</p>
          </IonText>
        )}

        <IonList>
          {repositoryList.map((repo) => (
            <RepoItem {...repo} key={repo.id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;