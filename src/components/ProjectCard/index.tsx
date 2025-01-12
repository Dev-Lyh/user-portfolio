import {Project} from "@/types/Project"
import Image from "next/image"
import PencilIcon from "@/assets/PencilIcon";
import styles from "./project_card.module.css"

interface ProjectCardProps {
  id: string;
  project: Project;

  onEdit(id: string, project: Project): void;
}

export default function ProjectCard({
                                      id,
                                      project,
                                      onEdit
                                    }: ProjectCardProps) {
  return (
    <div className={styles.container_project_item}>
      <Image
        src={project.img_url}
        width={217}
        height={138}
        alt={project.name}
        style={{borderRadius: ".8rem"}}
      />
      <div className={styles.container_project_details}>
        <div>
          <strong>{project.name}</strong>
          <p>{project.description}</p>
        </div>
        <button type={"button"} className={`white_button`} onClick={() => onEdit(id, project)}>
          <PencilIcon/>
          Edit
        </button>
      </div>
    </div>
  )
}