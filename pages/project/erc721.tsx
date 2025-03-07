import { ThirdwebNftMedia, Web3Button, useAddress, useClaimedNFTSupply, useContract, useContractMetadata, useOwnedNFTs, useTokenBalance, useTotalCount } from "@thirdweb-dev/react"
import HeroCard from "../../components/hero-card"
import styles from "../../styles/Home.module.css"
import { ERC721_CONTRACT_ADDRESS } from "../../constants/addresses"
import Link from "next/link"

export default function ERC721Project() {
    const address = useAddress();

    const {
        contract
    } = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop");

    const {
        data: contractMetadata,
        isLoading: contractMetadataLoading
    } = useContractMetadata(contract);

    const {
        data: totalSupply,
        isLoading: totalSupplyIsLoading
    } = useTotalCount(contract);

    const {
        data: totalClaimedSupply,
        isLoading: totalClaimedSupplyIsLoading
    } = useClaimedNFTSupply(contract);

    const {
        data: ownedNFTs,
        isLoading: ownedNFTsIsLoading
    } = useOwnedNFTs(contract, address);

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
                    <h3>Claim ERC721</h3>
                    <p>Claim an ERC721 NFT for free</p>
                    <Web3Button
                        contractAddress={ERC721_CONTRACT_ADDRESS}
                        action={(contract) => contract.erc721.claim(1)}
                        onSuccess={() => alert("NFT was claimed!")}
                    >Claim NFTs</Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3>Contract Stats</h3>
                    <p>
                        {totalSupplyIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Total Supply: {totalSupply?.toNumber()}</p>
                        )}
                    </p>
                    <p>
                        {totalClaimedSupplyIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Total Claimed: {totalClaimedSupply?.toNumber()}</p>
                        )}
                    </p>
                </div>
                <div className={styles.componentCard}>
                    <h3>Your NFTs</h3>
                    <p>
                        {ownedNFTsIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Total Owned: {ownedNFTs?.length}</p>
                        )}
                    </p>
                </div>
                <div className={styles.container}>
                    <h2>My NFTs:</h2>
                    <div className={styles.grid} style={{justifyContent: "flex-start"}}>
                        {ownedNFTsIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            ownedNFTs?.map((nft) => (
                                <div
                                    className={styles.card}
                                    key={nft.metadata.id}
                                >
                                    <ThirdwebNftMedia
                                        metadata={nft.metadata}
                                    />
                                    <div className={styles.cardText}>
                                        <h2>{nft.metadata.name}</h2>
                                    </div>
                                    <Link href="/project/staking">
                                        <button
                                            className={styles.matchButton}
                                            style={{
                                                width: "100%",
                                                borderRadius: "0 0 10px 10px"
                                            }}
                                        >Stake NFT</button>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}