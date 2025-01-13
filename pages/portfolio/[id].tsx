import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {userMock} from "@/mocks/userMock";
import {Project} from "@/types/Project";
import {User} from "@/types/User";
import Image from "next/image";
import Link from "next/link";
import styles from "./portfolio.module.css";

export default function Portfolio() {

  const router = useRouter();
  const [user, setUser] = useState<User>(userMock)
  const [projects, setProjects] = useState<Project[]>()

  const id = router.query.id

  useEffect(() => {
    fetch(`/api/portfolio/${id}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        setUser(json.user);
        setProjects(json.projects)
      }).catch(err => console.error(err))
  }, [id])

  return (
    <section className={styles.portfolio_container}>
      <header>
        {
          user.img_url &&
          <Image alt={"profile picture"} src={user.img_url} height={160} width={160}/>
        }
      </header>
      <div className={styles.container_user_infos}>
        <h1>{user.name}</h1>
        <h2>{user.job_title}</h2>
        <button>{user.email}</button>
      </div>
      <strong>Bio</strong>
      <p>{user.bio}</p>
      <strong>Projects</strong>
      {
        projects?.map((project) => (
          <div key={project.id}>
            {
              project.img_url &&
              <Image alt={`${project.name} project image`} src={project.img_url} height={138} width={217}/>
            }
            <div>
              <strong>{project.name}</strong>
              <p>{project.description}</p>
              <div>
                <Link href={project.demo_url}>Demo URL</Link>
                <Link href={project.repository_url}>Repository URL</Link>
              </div>
            </div>
          </div>
        ))
      }
    </section>
  )
}