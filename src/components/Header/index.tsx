import {useState} from 'react'
import styles from "./header.module.css"
import LogoIcon from "@/assets/LogoIcon";
import {User} from "@/types/User"
import Image from 'next/image'
import ProfileWhiteIcon from "@/assets/ProfileWhiteIcon";
import ProfileGrayIcon from "@/assets/ProfileGrayIcon";
import ProjectIcon from "@/assets/ProjectIcon";
import MyPortfolioIcon from "@/assets/MyPortfolioIcon";
import LinkIcon from "@/assets/LinkIcon";
import LogoutIcon from "@/assets/LogoutIcon";
import {useRouter} from "next/router"

interface HeaderProps {
    id: string;
    user: User
}

export default function HeaderComponent({id, user}: HeaderProps) {
    const [isModalShow, setIsModalShow] = useState(false)

    const router = useRouter();

    return (
        <header className={styles.header_container}>
            <LogoIcon/>

            {
                user?.img_url ?
                    <div className={styles.profile_container} onClick={() => setIsModalShow(!isModalShow)}>
                        <Image src={user?.img_url} alt="user profile picture" width={40} height={40}
                               style={{borderRadius: 20}}/>
                    </div>
                    :
                    <div className={styles.profile_container}
                         onClick={() => setIsModalShow(!isModalShow)}>
                        <ProfileWhiteIcon/>
                    </div>
            }
            {
                isModalShow && (
                    <div className={styles.container_profile_menu}>
                        <div className={styles.header_menu}>
                            {
                                user?.img_url ?
                                    <div className={styles.profile_container_mini}>
                                        <Image src={user?.img_url} alt="user profile picture" width={32} height={32}
                                               style={{borderRadius: 16}}/>
                                    </div>
                                    :
                                    <div className={styles.profile_container_mini}>
                                        <ProfileWhiteIcon/>
                                    </div>
                            }
                            <div className={styles.header_menu_text}>
                                <p>{user.name}</p>
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <div className={styles.header_options}>
                            <p className={styles.header_options_title}>Account</p>
                            <button type={'button'} onClick={() => router.push(`/profile_settings/${id}`)}>
                                <ProfileGrayIcon/>
                                <p>Profile settings</p>
                            </button>
                            <button type={'button'} onClick={() => router.push(`/projects_settings/${id}`)}>
                                <ProjectIcon/>
                                <p>Projects settings</p>
                            </button>
                            <button type={'button'}>
                                <MyPortfolioIcon/>
                                <p>My Portfolio</p>
                                <LinkIcon/>
                            </button>
                        </div>
                        <div className={styles.logout_profile_menu}>
                            <button type={'button'}>
                                <LogoutIcon/>
                                <p>Log out</p>
                            </button>
                        </div>
                    </div>
                )
            }
        </header>
    )
}