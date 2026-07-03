import { Repository } from "../interfaces/Repository";
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonThumbnail
} from "@ionic/react";

import { pencil, trash } from "ionicons/icons";

interface RepoItemProps extends Repository {
  onEdit?: (repo: Repository) => void;
  onDelete?: (repo: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = (props) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img
            src={props.owner.avatar_url}
            alt={props.name}
          />
        </IonThumbnail>

        <IonLabel>
          <h3>{props.name}</h3>
          <p>{props.description}</p>
          <p>
            <strong>Lenguaje:</strong> {props.language}
          </p>
        </IonLabel>
      </IonItem>

      <IonItemOptions>
        <IonItemOption onClick={() => props.onEdit?.(props)}>
          <IonIcon icon={pencil} slot="icon-only" />
        </IonItemOption>

        <IonItemOption color="danger" onClick={() => props.onDelete?.(props)}>
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;