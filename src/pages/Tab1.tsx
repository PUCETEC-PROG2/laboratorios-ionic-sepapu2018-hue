import React from 'react';
import { IonAlert, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonToast, useIonViewWillEnter, IonText } from '@ionic/react';
import './Tab1.css';
import RepoItem from "../components/RepoItem";
import { Repository } from '../interfaces/Repository';
import { deleteRepository, fetchRepositories, updateRepository } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [selectedRepo, setSelectedRepo] = React.useState<Repository | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
  const [showEditAlert, setShowEditAlert] = React.useState(false);
  const [present] = useIonToast();

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

  const handleEditClick = (repo: Repository) => {
    setSelectedRepo(repo);
    setShowEditAlert(true);
  };

  const handleDeleteClick = (repo: Repository) => {
    setSelectedRepo(repo);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (!selectedRepo) return;
    try {
      await deleteRepository(selectedRepo.owner.login, selectedRepo.name);
      setRepositoryList((prev) => prev.filter((r) => r.id !== selectedRepo.id));
      present({
        message: `🗑️ Repositorio "${selectedRepo.name}" eliminado`,
        duration: 3000,
        color: "success",
        position: "top"
      });
    } catch (error) {
      setErrorMsg("Error al eliminar repositorio: " + error);
    } finally {
      setSelectedRepo(null);
    }
  };

  const confirmEdit = async (newDescription: string) => {
    if (!selectedRepo) return;
    try {
      const updated = await updateRepository(selectedRepo.owner.login, selectedRepo.name, {
        description: newDescription
      });
      setRepositoryList((prev) =>
        prev.map((r) => (r.id === selectedRepo.id ? { ...r, description: updated.description } : r))
      );
      present({
        message: `✏️ Repositorio "${selectedRepo.name}" actualizado`,
        duration: 3000,
        color: "success",
        position: "top"
      });
    } catch (error) {
      setErrorMsg("Error al actualizar repositorio: " + error);
    } finally {
      setSelectedRepo(null);
    }
  };

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
            <RepoItem
              {...repo}
              key={repo.id}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </IonList>

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Eliminar repositorio"
          message={`¿Seguro que deseas eliminar "${selectedRepo?.name}"? Esta acción no se puede deshacer.`}
          buttons={[
            { text: "Cancelar", role: "cancel" },
            { text: "Eliminar", role: "destructive", handler: confirmDelete }
          ]}
        />

        <IonAlert
          isOpen={showEditAlert}
          onDidDismiss={() => setShowEditAlert(false)}
          header="Editar descripción"
          inputs={[
            {
              name: "description",
              type: "textarea",
              placeholder: "Nueva descripción",
              value: selectedRepo?.description
            }
          ]}
          buttons={[
            { text: "Cancelar", role: "cancel" },
            {
              text: "Guardar",
              handler: (data) => confirmEdit(data.description ?? "")
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;