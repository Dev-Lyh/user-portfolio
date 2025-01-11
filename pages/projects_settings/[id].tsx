import React, {useEffect, useState, useRef} from 'react'
import {useRouter} from 'next/router'
import {User} from '@/types/User'
import {Project} from '@/types/Project'
import {auth} from '../../firebaseConfig'
import Header from "@/components/Header";
import Input from "@/components/Input";
import CheckWhiteIcon from "@/assets/CheckWhiteIcon";
import ProfileIcon from "@/assets/ProfileGrayIcon";
import UploadIcon from "@/assets/UploadIcon";
import TrashRedIcon from "@/assets/TrashRedIcon";
import styles from "./projects_settings.module.css"
import Textarea from "@/components/Textarea";
import {userMock} from "@/mocks/userMock";
import {readImageDimensions} from "@/utils/readImageDimensions";
import {uploadProjects} from "@/utils/uploadProjects";
import Image from "next/image"
import PlusPurpleIcon from "@/assets/PlusPurpleIcon";
import ProjectIcon from "@/assets/ProjectIcon";
import {projectMock} from "@/mocks/projectMock";
import PlusWhiteIcon from "@/assets/PlusWhiteIcon";
import TrashGrayIcon from "@/assets/TrashGrayIcon";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsSettings() {
    const [user, setUser] = useState<User>(userMock);
    const [project, setProject] = useState<Project>(projectMock)
    const [projects, setProjects] = useState<null | Project[]>(null)
    const [projectId, setProjectId] = useState("")
    const [error, setError] = useState("");
    const [file, setFile] = useState<File>();
    const [formToEdit, setFormToEdit] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB em bytes

    const router = useRouter();
    const id = router.query.id;

    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click(); // Simula o clique no input
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const _file = event.target.files[0];

            if (_file.size > MAX_FILE_SIZE) {
                setError("The file exceeds the maximum allowed size of 2MB.");
                return;
            }

            const image = await readImageDimensions(_file);

            setFile(_file)
            setPreviewUrl(URL.createObjectURL(_file));

            setError("")
        }
    };

    const handleDeleteImage = () => {
        setFile(undefined);
        setPreviewUrl(null);
    };

    useEffect(() => {
        if (auth.currentUser) {
            fetch(`/api/profile_settings?id=${id}&email=${auth.currentUser.email}`, {
                method: 'GET'
            }).then(res => res.json()).then(json => {
                setUser(json);
                setPreviewUrl(json.img_url)
            }).catch(err => console.error(err));
        }
    }, [id])

    useEffect(() => {
        if (auth.currentUser) {
            fetch(`/api/projects_settings?id=${id}}`, {
                method: 'GET'
            }).then(res => res.json()).then(json => {
                setProjects(json);
            }).catch(err => console.error(err));
        }
    }, [id])

    return (
        <section>
            <Header user={user} id={id}/>
            <section className={styles.general_container}>
                <h1>Projects settings</h1>
                <button className={styles.button_to_add_project} onClick={() => setFormToEdit(!formToEdit)}>
                    <PlusPurpleIcon/>
                    Add project
                </button>
                {
                    formToEdit && <section className={styles.profile_settings_container}>
                        <section className={styles.select_image_container}>
                            <div className={styles.profile_image_container}>
                                {previewUrl ? (
                                    <Image
                                        src={previewUrl}
                                        alt="Profile preview"
                                        className={styles.profile_image}
                                        width={108.5}
                                        height={69}
                                    />
                                ) : (
                                    <ProjectIcon/>
                                )}
                            </div>
                            <span>Image must be PNG or JPEG - max 2MB</span>
                            {
                                error && <span style={{color: "#DD524C", fontWeight: 700}}>{error}</span>
                            }
                            <div className={styles.action_buttons_container}>
                                <button type={"button"} style={{color: "#20293A"}} onClick={handleButtonClick}>
                                    <UploadIcon/>
                                    Upload Image
                                </button>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    name="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    style={{display: "none"}}
                                    onChange={handleFileChange}
                                />

                                <button type={"button"} style={{color: "#DD524C"}} onClick={handleDeleteImage}>
                                    <TrashRedIcon/>
                                    Delete Image
                                </button>
                            </div>
                        </section>
                        <form>
                            <div className={styles.grid_inputs_container}>
                                <div>
                                    <label htmlFor="email_form">Project Name</label>
                                    <Input
                                        type={"email"}
                                        inputValue={project.name}
                                        mode={"NORMAL"}
                                        placeholder={"Enter your project name"}
                                        onChangeValue={(e) => {
                                            setProject((prevState) => ({
                                                ...prevState,
                                                name: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="job_title_form">Demo URL</label>
                                    <Input
                                        type={"text"}
                                        inputValue={project.demo_url}
                                        mode={"NORMAL"}
                                        placeholder={"Enter the demo URL"}
                                        onChangeValue={(e) => {
                                            setProject((prevState) => ({
                                                ...prevState,
                                                demo_url: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="name_form">Repository URL</label>
                                    <Input
                                        type={"text"}
                                        inputValue={project.repository_url}
                                        mode={"NORMAL"}
                                        placeholder={"Enter the repository URL"}
                                        onChangeValue={(e) => {
                                            setProject((prevState) => ({
                                                ...prevState,
                                                repository_url: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.container_bio_textarea}>
                                <label htmlFor="bio_form">Description</label>
                                <Textarea
                                    placeholder={"Enter a short description..."}
                                    onChangeValue={(e) => {
                                        setProject((prevState) => ({
                                            ...prevState,
                                            description: e.target.value,
                                        }));
                                    }}
                                    inputValue={project.description}
                                />
                            </div>
                        </form>
                        <nav>
                            <div className={styles.purple_button_container}>
                                <button type="button" className={`purple_button`}
                                        onClick={() => {
                                            if (!file || !id || typeof id != 'string') {
                                                alert("File is empty!")
                                            } else {
                                                uploadProjects(file, project.name, project.repository_url, project.demo_url, project.description, id)
                                            }
                                        }}>
                                    <TrashGrayIcon/>
                                    Remove
                                </button>
                            </div>
                            <div className={styles.purple_button_container}>
                                <button type="button" className={`purple_button`}
                                        onClick={() => {
                                            alert("File is empty!")
                                        }}>
                                    <PlusWhiteIcon/>
                                    Add
                                </button>
                            </div>
                        </nav>
                    </section>
                }

                {
                    projects?.length > 0 ?
                        projects?.map((project) => (
                            <ProjectCard/>
                        ))
                        :
                        (
                            <p>You no have any project.</p>
                        )
                }

            </section>
        </section>
    )
}