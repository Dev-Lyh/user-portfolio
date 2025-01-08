import {useEffect, useState} from 'react'
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

export default function ProfileSettings() {
    const [user, setUser] = useState<User>();

    const router = useRouter();
    const id = router.query.id;

    useEffect(() => {
        if (auth.currentUser) {
            fetch(`/api/profile_settings?id=${id}&email=${auth.currentUser.email}`, {
                method: 'GET'
            }).then(res => res.json()).then(json => setUser(json)).catch(err => console.error(err));
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
                            <ProfileIcon/>
                        </div>
                        <span>Image must be 256 x 256px - max 2MB</span>
                        <div className={styles.action_buttons_container}>
                            <button type={"button"} style={{color: "#20293A"}}>
                                <UploadIcon/>
                                Upload Profile Image
                            </button>
                            <button type={"button"} style={{color: "#DD524C"}}>
                                <TrashRedIcon/>
                                Delete Image
                            </button>
                        </div>
                    </section>
                    <form>
                        <div className={styles.grid_inputs_container}>
                            <div>
                                <label htmlFor="email_form">Email</label>
                                <Input type={"email"} inputValue={user?.email || ""} mode={"NORMAL"}
                                       placeholder={"Enter your email"} onChangeValue={() => {
                                }}/>
                            </div>
                            <div>
                                <label htmlFor="job_title_form">Job title</label>
                                <Input type={"text"} inputValue={user?.job_title || ""} mode={"NORMAL"}
                                       placeholder={"Enter your job title"} onChangeValue={() => {
                                }}/>
                            </div>
                            <div>
                                <label htmlFor="name_form">Name</label>
                                <Input type={"text"} inputValue={user?.name || ""} mode={"NORMAL"}
                                       placeholder={"Enter your name"} onChangeValue={() => {
                                }}/>
                            </div>
                        </div>
                        <div className={styles.container_bio_textarea}>
                            <label htmlFor="bio_form">Bio</label>
                            <Textarea placeholder={"Enter a short introduction..."}/>
                        </div>
                    </form>
                    <div className={styles.purple_button_container}>
                        <button type="button" className={`purple_button`}>
                            <CheckWhiteIcon/>
                            Save
                        </button>
                    </div>
                </section>
            </section>
        </section>
    )
}