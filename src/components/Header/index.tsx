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

interface HeaderProps {
    user: User
}

export default function HeaderComponent({user}: HeaderProps) {
    const [isModalShow, setIsModalShow] = useState(false)
    return (
        <header className={styles.header_container}>
            <LogoIcon/>

            {
                user?.img_path ?
                    <div className={styles.profile_container} onClick={() => setIsModalShow(!isModalShow)}>
                        <Image src={user?.img_path} alt="user profile picture"/>
                    </div>
                    :
                    <div className={styles.profile_container} onClick={() => setIsModalShow(!isModalShow)}>
                        <ProfileWhiteIcon/>
                    </div>
            }
            {
                isModalShow && (
                    <div className={styles.container_profile_menu}>
                        <div className={styles.header_menu}>
                            {
                                user?.img_path ?
                                    <div className={styles.profile_container_mini}>
                                        <Image src={user?.img_path} alt="user profile picture"/>
                                    </div>
                                    :
                                    <div className={styles.profile_container_mini}>
                                        <ProfileWhiteIcon/>
                                    </div>
                            }
                            <div className={styles.header_menu_text}>
                                <p>hfjs</p>
                                <span>dagrs</span>
                            </div>
                        </div>
                        <div className={styles.header_options}>
                            <p className={styles.header_options_title}>Account</p>
                            <button type={'button'}>
                                <ProfileGrayIcon/>
                                <p>Profile settings</p>
                            </button>
                            <button type={'button'}>
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