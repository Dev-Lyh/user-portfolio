import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {User} from '@/types/User'
import {auth} from '../../firebaseConfig'

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
            {id}
        </section>
    )
}