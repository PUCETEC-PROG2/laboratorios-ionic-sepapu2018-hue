import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from "@ionic/react";

import { fetchRepositories } from "../services/GithubService";
import RepoItem from "../components/RepoItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { Repository } from "../interfaces/Repository";

import "./Tab1.css";

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadRepos = async () => {
    setLoading(true);

    const repos = await fetchRepositories();
    setRepositoryList(repos);

    setLoading(false);
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

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repositoryList.map((repo) => (
            <RepoItem key={repo.id} {...repo} />
          ))}
        </IonList>

        {loading && <LoadingSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;