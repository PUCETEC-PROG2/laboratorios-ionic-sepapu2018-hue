import React from 'react';
import {
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonTextarea,
  IonButton,
  IonText,
  IonToggle,
  IonItem,
  IonLabel,
  useIonToast
} from '@ionic/react';
import './Tab2.css';
import { createRepository } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const [repoName, setRepoName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [present] = useIonToast();

  const nameIsValid = repoName.trim().length >= 1 && /^[a-zA-Z0-9_.-]+$/.test(repoName.trim());

  const handleSubmit = async () => {
    if (!nameIsValid) return;

    setLoading(true);
    setErrorMsg("");

    try {
      await createRepository(repoName.trim(), description.trim(), isPrivate);
      present({
        message: `✅ Repositorio "${repoName}" creado exitosamente`,
        duration: 3000,
        color: "success",
        position: "top"
      });
      setRepoName("");
      setDescription("");
      setIsPrivate(false);
    } catch (error) {
      const msg = (error as any)?.response?.data?.message || "Error al crear el repositorio";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            placeholder="Ingrese el nombre del repositorio"
            value={repoName}
            onIonInput={(e) => setRepoName(e.detail.value ?? "")}
          />
          {repoName && !nameIsValid && (
            <IonText color="danger">
              <p className="ion-no-margin ion-padding-start">
                Solo letras, números, guiones y puntos. Sin espacios.
              </p>
            </IonText>
          )}

          <IonTextarea
            className="form-field"
            label="Descripción"
            labelPlacement="floating"
            placeholder="Ingrese la descripción del repositorio"
            rows={6}
            value={description}
            onIonInput={(e) => setDescription(e.detail.value ?? "")}
          />

          <IonItem lines="none" className="form-field">
            <IonLabel>Repositorio privado</IonLabel>
            <IonToggle
              checked={isPrivate}
              onIonChange={(e) => setIsPrivate(e.detail.checked)}
              slot="end"
            />
          </IonItem>

          {errorMsg && (
            <IonText color="danger">
              <p className="ion-padding-start">{errorMsg}</p>
            </IonText>
          )}

          {loading && <LoadingSpinner />}

          <IonButton
            className="form-field"
            expand="block"
            color="primary"
            disabled={!nameIsValid || loading}
            onClick={handleSubmit}
          >
            {loading ? "Guardando..." : "Guardar"}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;