import { Web3Button, useAddress, useContract, useContractMetadata, useContractRead } from "@thirdweb-dev/react"
import HeroCard from "../../components/hero-card"
import styles from "../../styles/Home.module.css"
import { TIP_JAR_CONTRACT_ADDRESS } from "../../constants/addresses"
import Link from "next/link"
import { ethers } from "ethers"

export default function TipJarProject() {
    const address = useAddress();

    const {
        contract
    } = useContract(TIP_JAR_CONTRACT_ADDRESS);

    const {
        data: contractMetadata,
        isLoading: contractMetadataLoading
    } = useContractMetadata(contract);

    const {
        data: tipJarBalance,
        isLoading: tipJarBalanceIsLoading
    } = useContractRead(
        contract, 
        "getBalance"
    );

    const {
        data: owner,
        isLoading: ownerIsLoading
    } = useContractRead(
        contract, 
        "owner"
    );

    return (
        <div className={styles.container}>
            <HeroCard
                isLoading={contractMetadataLoading}
                title={contractMetadata?.name!}
                description={contractMetadata?.description!}
                image={contractMetadata?.image!}
            />
            <div className={styles.grid}>
                <div className={styles.componentCard}>
                    <h3>Leave a tip</h3>
                    <p>Tip in MATIC and record it on blockchain</p>
                    <Web3Button
                        contractAddress={TIP_JAR_CONTRACT_ADDRESS}
                        action={(contract) => contract.call(
                            "tip", 
                            [],
                            {
                                value: "1000000000000000"
                            }
                        )}
                    >Tip 0.001 MATIC</Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3>Tip Jar balance</h3>
                    <div>
                        { tipJarBalanceIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Tip Jar Balance: {ethers.utils.formatEther(tipJarBalance)} MATIC</p>
                        )}
                    </div>
                </div>
                <div className={styles.componentCard}>
                    <h3>Withdraw balance</h3>
                    <div>
                        { ownerIsLoading ? (
                            "Loading..."
                        ) : (
                            owner === address ? (
                                <Web3Button
                                    contractAddress={TIP_JAR_CONTRACT_ADDRESS}
                                    action={(contract) => contract.call(
                                        "withdrawnTips"
                                    )}
                                    onSuccess={() => alert("Successfully withdraw tips!!!")}
                                >
                                    Withdraw tips
                                </Web3Button>
                            ) : (
                                "Only the owner can withdraw the balance."
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}