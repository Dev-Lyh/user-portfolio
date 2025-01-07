import LogoIcon from "@/assets/LogoIcon";

import TitleSubtitle from "@/components/TitleSubtitle";
import Aside from '@/components/Aside';

import styles from '../index.module.css';

export default function EmailVerification() {
    return (
        <section className={styles.sign_container}>
            <Aside/>
            <div className={styles.form_container}>
                <form>
                    <LogoIcon/>
                    <TitleSubtitle title={'Verify your e-mail'}
                                   subtitle={'We send you an e-mail of verification.'}/>
                </form>
            </div>
        </section>
    )
}