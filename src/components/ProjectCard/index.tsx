import {Project} from "@/types/Project"
import Image from "next/image"

interface ProjectCardProps extends Project {
  onClick(): void;
}

export default function ProjectCard({
                                      id,
                                      user_id,
                                      name,
                                      description,
                                      demo_url,
                                      repository_url,
                                      img_url
                                    }: ProjectCardProps) {
  return (
    <div>
      <Image
        src={img_url}
        width={217}
        height={138}
        alt={name}
      />
      <div>
        <strong>{name}</strong>
        <p>{description}</p>
      </div>
    </div>
  )
}