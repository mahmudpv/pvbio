interface Attribute {
    value: string;
    trait_type: string;
  }
  
  interface Metadata {
    name: string;
    description: string;
    image: string;
    external_url: string;
    attributes: Attribute[];
  }
  
  interface Media {
    raw: string;
    gateway: string;
  }
  
  interface Id {
    tokenId: string;
    tokenMetadata: {
      tokenType: string;
    };
  }
  
  interface Contract {
    address: string;
  }
  
  interface OwnedNft {
    contract: Contract;
    id: Id;
    title: string;
    description: string;
    tokenUri: Media;
    media: Media[];
    metadata: Metadata;
    timeLastUpdated: string;
  }
  
  interface NftsForOwnerResponse {
    ownedNfts: OwnedNft[];
    totalCount: number;
    blockHash: string;
  }
  