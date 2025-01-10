import React, {useEffect, useState, useRef} from 'react'
import {useRouter} from 'next/router'
import {User} from '@/types/User'
import {auth} from '../../firebaseConfig'
import Header from "@/components/Header";
import Input from "@/components/Input";
import CheckWhiteIcon from "@/assets/CheckWhiteIcon";
import ProfileIcon from "@/assets/ProfileGrayIcon";
import UploadIcon from "@/assets/UploadIcon";
import TrashRedIcon from "@/assets/TrashRedIcon";
import styles from "./profile_settings.module.css"
import Textarea from "@/components/Textarea";
import {userMock} from "@/mocks/userMock";
import {readImageDimensions} from "@/utils/readImageDimensions";
import {uploadProfile} from "@/utils/uploadProfile";
import Image from "next/image"

export default function ProfileSettings() {
    const [user, setUser] = useState<User>(userMock);
    const [error, setError] = useState("");
    const [file, setFile] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB em bytes
    const MAX_WIDTH = 256; // Largura máxima
    const MAX_HEIGHT = 256; // Altura máxima

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
            if (image.width > MAX_WIDTH || image.height > MAX_HEIGHT) {
                setError(
                    `Image dimensions exceed what is allowed. Maximum: ${MAX_WIDTH}x${MAX_HEIGHT}px`
                );
                return;
            }

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
            }).catch(err => console.error(err));
        }
    }, [id])

    return (
        <section>
            <Header user={user}/>
            <section className={styles.general_container}>
                <h1>Profile settings</h1>

                <section className={styles.profile_settings_container}>
                    <section className={styles.select_image_container}>
                        <div className={styles.profile_image_container}>
                            {previewUrl ? (
                                <Image
                                    src={!user.img_url ? previewUrl : user.img_url}
                                    alt="Profile preview"
                                    className={styles.profile_image}
                                    width={52}
                                    height={52}
                                />
                            ) : (
                                <ProfileIcon/>
                            )}
                        </div>
                        <span>Image must be 256 x 256px - max 2MB</span>
                        {
                            error && <span style={{color: "#DD524C", fontWeight: 700}}>{error}</span>
                        }
                        <div className={styles.action_buttons_container}>
                            <button type={"button"} style={{color: "#20293A"}} onClick={handleButtonClick}>
                                <UploadIcon/>
                                Upload Profile Image
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
                                <label htmlFor="email_form">Email</label>
                                <Input type={"email"} inputValue={user.email}
                                       mode={"NORMAL"}
                                       disabled={true}
                                       placeholder={"Enter your email"} onChangeValue={() => {
                                }}/>
                            </div>
                            <div>
                                <label htmlFor="job_title_form">Job title</label>
                                <Input
                                    type={"text"}
                                    inputValue={user.job_title}
                                    mode={"NORMAL"}
                                    placeholder={"Enter your job title"}
                                    onChangeValue={(e) => {
                                        setUser((prevState) => ({
                                            ...prevState,
                                            job_title: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="name_form">Name</label>
                                <Input
                                    type={"text"}
                                    inputValue={user.name}
                                    mode={"NORMAL"}
                                    placeholder={"Enter your name"}
                                    onChangeValue={(e) => {
                                        setUser((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.container_bio_textarea}>
                            <label htmlFor="bio_form">Bio</label>
                            <Textarea
                                placeholder={"Enter a short introduction..."}
                                onChangeValue={(e) => {
                                    setUser((prevState) => ({
                                        ...prevState,
                                        bio: e.target.value,
                                    }));
                                }}
                                inputValue={user.bio}
                            />
                        </div>
                    </form>
                    <div className={styles.purple_button_container}>
                        <button type="button" className={`purple_button`}
                                onClick={() => {
                                    if (!file || !id || typeof id != 'string') {
                                        alert("File is empty!")
                                    } else {
                                        uploadProfile(file, user.name, user.bio, user.job_title, id)
                                    }
                                }}>
                            <CheckWhiteIcon/>
                            Save
                        </button>
                    </div>
                </section>
            </section>
        </section>
    )
}