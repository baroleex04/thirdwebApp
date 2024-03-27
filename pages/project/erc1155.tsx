import { OZ_DEFENDER_FORWARDER_ADDRESS, ThirdwebNftMedia, Web3Button, useAddress, useClaimedNFTSupply, useContract, useContractMetadata, useOwnedNFTs, useTokenBalance, useTotalCirculatingSupply, useTotalCount } from "@thirdweb-dev/react"
import HeroCard from "../../components/hero-card"
import styles from "../../styles/Home.module.css"
import { ERC1155_CONTRACT_ADDRESS } from "../../constants/addresses"
import Link from "next/link"

export default function ERC1155Project() {
    const address = useAddress();

    const {
        contract
    } = useContract(ERC1155_CONTRACT_ADDRESS, "edition-drop");

    const {
        data: contractMetadata,
        isLoading: contractMetadataLoading
    } = useContractMetadata(contract);

    const {
        data: contractNFTsSupply,
        isLoading: contractNFTsSupplyIsLoading
    } = useTotalCount(contract);

    const {
        data: totalCirculatingSupply,
        isLoading: totalCirculatingSupplyIsLoading
    } = useTotalCirculatingSupply(contract, 0);

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
                    <h3>Claim ERC1155</h3>
                    <p>Claim an ERC1155 NFT for 10 ERC20 tokens</p>
                    <Web3Button
                        contractAddress={ERC1155_CONTRACT_ADDRESS}
                        action={(contract) => contract.erc1155.claim(0, 1)}
                        onSuccess={() => alert("NFT was claimed!")}
                    >Claim NFTs</Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3>Contract Stats</h3>
                    <p>
                        {contractNFTsSupplyIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Total NFTs: {contractNFTsSupply?.toNumber()}</p>
                        )}
                    </p>
                    <p>
                        {totalCirculatingSupplyIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Total Circulating Supply TokenID 0: {totalCirculatingSupply?.toNumber()}</p>
                        )}
                    </p>
                </div>
                <div className={styles.componentCard}>
                    <h3>Your NFTs</h3>
                    <p>
                        {ownedNFTsIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Owned NFTs: {ownedNFTs?.map((nft) => (
                                <p key={nft.metadata.id}>TokenID#{nft.metadata.id} Owned: {nft.quantityOwned}</p>
                            ))}</p> 
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}