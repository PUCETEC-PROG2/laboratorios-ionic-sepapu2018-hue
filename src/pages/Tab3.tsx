import React from 'react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter
} from '@ionic/react';

import './Tab3.css';
import profilePhoto from '../assets/profile.jpg';
import { GithubUser } from '../interfaces/GithubUser';
import { fetchUserInfo } from '../services/GithubService';

const Tab3: React.FC = () => {
  const [githubUser, setGithubUser] = React.useState<GithubUser | null>(null);
  const [errorMsg, setErrorMsg] = React.useState("");

  useIonViewDidEnter(() => {
    fetchUserInfo()
      .then((user) => setGithubUser(user))
      .catch((error) => setErrorMsg("No se pudo conectar con GitHub: " + error));
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          <IonCard className="card">
            <img
              src={profilePhoto}
              alt="Jose Narvaez"
            />

            <IonCardHeader>
              <IonCardTitle>Jose Narvaez</IonCardTitle>
              <IonCardSubtitle>Estudiante de Desarrollo de Software</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <p>
                Apasionado por la programación y el desarrollo de aplicaciones móviles con Ionic y React.
                Este es mi perfil de GitHub y los repositorios que he creado durante el curso.
              </p>

              {githubUser && (
                <IonText color="medium">
                  <p className="ion-no-margin">Conectado como @{githubUser.login}</p>
                </IonText>
              )}

              {errorMsg && (
                <IonText color="danger">
                  <p className="ion-no-margin">{errorMsg}</p>
                </IonText>
              )}
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;