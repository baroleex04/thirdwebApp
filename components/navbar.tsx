import Link from "next/link";
import styles from "../styles/Home.module.css";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link href="/">
                <p
                    className={styles.gradientText1}
                    style={{
                        cursor: "pointer",
                        fontSize: '1.2 rem',
                        fontWeight: 'bold'
                    }}>
                    Bao Le's portfolio
                </p>
            </Link>
            <ConnectWallet
                btnTitle="Sign In"
                modalTitle="Select sign in method"
                detailsBtn={() => {
                    return <button>Profile</button>;
                }}
            />
        </div>
    )
};