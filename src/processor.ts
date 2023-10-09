import { EvmBatchProcessor } from '@subsquid/evm-processor'
import { events as EnsRegistryEvents } from './abi/Registry'
import { events as PublicResolverEvents } from './abi/PublicResolver'
import { events as BaseRegistrarEvents } from './abi/BaseRegistrar'
import { events as EthRegistrarControllerOldEvents } from './abi/EthRegistrarControllerOld'
import { events as EthRegistrarControllerEvents } from './abi/EthRegistrarController'
import { events as NameWrapperEvents } from './abi/NameWrapper'
import { lookupArchive } from '@subsquid/archive-registry'

const contracts = [
    {
      contractAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      startBlock: 9380380,
      eventTopics: [
        EnsRegistryEvents.Transfer.topic,
        EnsRegistryEvents.NewOwner.topic,
        EnsRegistryEvents.NewResolver.topic,
        EnsRegistryEvents.NewTTL.topic
      ]
    },
    {
      contractAddress: '0x314159265dd8dbb310642f98f50c066173c1259b',
      startBlock: 3327417,
      eventTopics: [
        EnsRegistryEvents.Transfer.topic,
        EnsRegistryEvents.NewOwner.topic,
        EnsRegistryEvents.NewResolver.topic,
        EnsRegistryEvents.NewTTL.topic,
      ]
    },
    {
      contractAddress: '', // Fill in the Resolver contract address
      startBlock: 0, // Fill in the start block for Resolver
      eventTopics: [
        PublicResolverEvents.ABIChanged.topic,
        PublicResolverEvents.AddrChanged.topic,
        PublicResolverEvents.AddressChanged.topic,
        PublicResolverEvents.AuthorisationChanged.topic,
        PublicResolverEvents.ContenthashChanged.topic,
        PublicResolverEvents.InterfaceChanged.topic,
        PublicResolverEvents.NameChanged.topic,
        PublicResolverEvents.PubkeyChanged.topic,
        PublicResolverEvents['TextChanged(bytes32,string,string)'].topic,
        PublicResolverEvents['TextChanged(bytes32,string,string,string)'].topic,
        PublicResolverEvents.VersionChanged.topic,
      ]
    },
    {
      contractAddress: '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85',
      startBlock: 9380410,
      eventTopics: [
        BaseRegistrarEvents.NameRegistered.topic,
        BaseRegistrarEvents.NameRenewed.topic,
        BaseRegistrarEvents.Transfer.topic,
        BaseRegistrarEvents.Approval.topic,
        BaseRegistrarEvents.ApprovalForAll.topic,
        BaseRegistrarEvents.ControllerAdded.topic,
        BaseRegistrarEvents.ControllerRemoved.topic,
        BaseRegistrarEvents.NameMigrated.topic,
        BaseRegistrarEvents.OwnershipTransferred.topic
      ]
    },
    {
      contractAddress: '0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5',
      startBlock: 9380471,
      eventTopics: [
        EthRegistrarControllerOldEvents.NameRegistered.topic,
        EthRegistrarControllerOldEvents.NameRenewed.topic,
        EthRegistrarControllerOldEvents.NewPriceOracle.topic,
        EthRegistrarControllerOldEvents.OwnershipTransferred.topic
      ]
    },
    {
      contractAddress: '0x253553366Da8546fC250F225fe3d25d0C782303b',
      startBlock: 16925618,
      eventTopics: [
        EthRegistrarControllerEvents.NameRegistered.topic,
        EthRegistrarControllerEvents.NameRenewed.topic,
        EthRegistrarControllerEvents.OwnershipTransferred.topic
      ]
    },
    {
      contractAddress: '0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401',
      startBlock: 16925608,
      eventTopics: [
        NameWrapperEvents.NameWrapped.topic,
        NameWrapperEvents.NameUnwrapped.topic,
        NameWrapperEvents.FusesSet.topic,
        NameWrapperEvents.ExpiryExtended.topic,
        NameWrapperEvents.TransferSingle.topic,
        NameWrapperEvents.TransferBatch.topic,
        NameWrapperEvents.ApprovalForAll.topic,
        NameWrapperEvents.ControllerChanged.topic,
        NameWrapperEvents.URI.topic
      ]
    },
  ]

  export const processors = contracts.map((contract) => {
    return new EvmBatchProcessor()
      .setDataSource({
        archive: lookupArchive('eth-mainnet'),
        chain: 'https://rpc.ankr.com/eth'
      })
      .setBlockRange({ from: contract.startBlock })
      .setFinalityConfirmation(75)
      .addLog({
        address: [contract.contractAddress],
        topic0: contract.eventTopics,
      })
  })