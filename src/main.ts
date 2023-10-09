import { TypeormDatabase } from '@subsquid/typeorm-store'
import { decodeHex } from '@subsquid/evm-processor'
import {Domain, Transfer, NewOwner, NewResolver, NewTTL, WrappedTransfer,NameWrapped, NameUnwrapped, FusesSet, ExpiryExtended, Registration, NameRegistered, NameRenewed, NameTransferred,WrappedDomain, Account,Resolver,AddrChanged, MulticoinAddrChanged,NameChanged,AbiChanged,PubkeyChanged, TextChanged, ContenthashChanged, InterfaceChanged, AuthorisationChanged, VersionChanged} from './model'
import * as RegistryABI from './abi/Registry'
import * as PublicResolverABI from './abi/PublicResolver'
import * as NameWrapperABI from './abi/NameWrapper'
import * as EthRegistrarControllerOldABI from './abi/EthRegistrarControllerOld'
import * as EthRegistrarControllerABI from './abi/EthRegistrarController'
import * as BaseRegistrarABI from './abi/BaseRegistrar'
import * as AuctionRegistrarABI from './abi/AuctionRegistrar'
import { processors } from './processor'
// Create a function to transform and save data for a specific contract
async function processContractLogs(
  processorIndex: number, // Index of the processor in the processors array
  // Name of the entity for this contract
) {
  const processor = processors[processorIndex]
//   const EntityClass = entityToProcessor[entityName]

  processor.run(new TypeormDatabase({ supportHotBlocks: true }), async (ctx) => {
    const domains: Domain[] = []
    const transfers: Transfer[] = []

    let domain = new Domain();
    let resolver = new Resolver();
    
    for (const c of ctx.blocks) {
      for (const e of c.logs) {
        // Check if the log belongs to the contract of interest (processorIndex)
        if (e.topics[0] === RegistryABI.events.Transfer.topic) {
            let {node, owner} = RegistryABI.events.Transfer.decode(e)
            domain.owner = owner
        }
        if (e.topics[0] === RegistryABI.events.NewOwner.topic) {
            let {node, label, owner} = RegistryABI.events.NewOwner.decode(e)
        }
        if (e.topics[0] === RegistryABI.events.NewResolver.topic) {
            let {node, resolver} = RegistryABI.events.NewResolver.decode(e)
        }
        if (e.topics[0] === RegistryABI.events.NewTTL.topic) {
            let {node, ttl} = RegistryABI.events.NewTTL.decode(e)
            domain.ttl = ttl
            
        }
        if (e.topics[0] === PublicResolverABI.events.ABIChanged.topic) {
            let {node, contentType} = PublicResolverABI.events.ABIChanged.decode(e)
        }
        if (e.topics[0] === PublicResolverABI.events.AddrChanged.topic) {
            let {node, a} = PublicResolverABI.events.AddrChanged.decode(e)
        }
        if (e.topics[0] === PublicResolverABI.events.AddressChanged.topic) {
            let {node, coinType, newAddress} = PublicResolverABI.events.AddressChanged.decode(e)
        }
        if (e.topics[0] === PublicResolverABI.events.AuthorisationChanged.topic) {
            let {node, owner, target,isAuthorised} = PublicResolverABI.events.AuthorisationChanged.decode(e)
        }
        if (e.topics[0] === PublicResolverABI.events.ContenthashChanged.topic) {
            let {node, hash} = PublicResolverABI.events.ContenthashChanged.decode(e)
        }
        if (e.topics[0] === PublicResolverABI.events.InterfaceChanged.topic) {
            let {node, interfaceID, implementer } = PublicResolverABI.events.InterfaceChanged.decode(e)
        }
        if (e.topics[0] === PublicResolverABI.events.NameChanged.topic) {
            let {node, name} = PublicResolverABI.events.NameChanged.decode(e)
        }
        if (e.topics[0] === PublicResolverABI.events.PubkeyChanged.topic) {
            let {node, x, y} = PublicResolverABI.events.PubkeyChanged.decode(e)
        }
        if (e.topics[0] === PublicResolverABI.events['TextChanged(bytes32,string,string)'].topic) {
            let {node,indexedKey, key} = PublicResolverABI.events['TextChanged(bytes32,string,string)'].decode(e)
        }
        if (e.topics[0] === PublicResolverABI.events['TextChanged(bytes32,string,string,string)'].topic) {
            let {node, indexedKey, key, value} = PublicResolverABI.events['TextChanged(bytes32,string,string,string)'].decode(e)
        }
        if (e.topics[0] === PublicResolverABI.events.VersionChanged.topic) {
            let {node, newVersion} = PublicResolverABI.events.VersionChanged.decode(e)
        }
        if (e.topics[0] === NameWrapperABI.events.ApprovalForAll.topic) {
            let {account, operator, approved} = NameWrapperABI.events.ApprovalForAll.decode(e)
        }
        if (e.topics[0] === NameWrapperABI.events.ControllerChanged.topic) {
            let {controller, active } = NameWrapperABI.events.ControllerChanged.decode(e)
        }
        if (e.topics[0] === NameWrapperABI.events.ExpiryExtended.topic) {
            let {node, expiry} = NameWrapperABI.events.ExpiryExtended.decode(e)
            domain.expiryDate = expiry
            
        }
        if (e.topics[0] === NameWrapperABI.events.FusesSet.topic) {
            let {node, fuses} = NameWrapperABI.events.FusesSet.decode(e)
        }
        if (e.topics[0] === NameWrapperABI.events.NameUnwrapped.topic) {
            let {node, owner} = NameWrapperABI.events.NameUnwrapped.decode(e)
        }
        if (e.topics[0] === NameWrapperABI.events.NameWrapped.topic) {
            let {node, name, owner} = NameWrapperABI.events.NameWrapped.decode(e)
        }
        if (e.topics[0] === NameWrapperABI.events.OwnershipTransferred.topic) {
            let {previousOwner, newOwner} = NameWrapperABI.events.OwnershipTransferred.decode(e)
        }
        if (e.topics[0] === NameWrapperABI.events.TransferBatch.topic) {
            let {operator, from, to, ids, values} = NameWrapperABI.events.TransferBatch.decode(e)
        }
        if (e.topics[0] === NameWrapperABI.events.TransferSingle.topic) {
            let {operator, to, from, id, value} = NameWrapperABI.events.TransferSingle.decode(e)
            
        }
        if (e.topics[0] === NameWrapperABI.events.URI.topic) {
            let {value, id} = NameWrapperABI.events.URI.decode(e)
        }
        if (e.topics[0] === NameWrapperABI.events.ApprovalForAll.topic) {
            let {account, operator, approved} = NameWrapperABI.events.ApprovalForAll.decode(e)
        }
        if (e.topics[0] === EthRegistrarControllerOldABI.events.NameRegistered.topic) {
            let {name, label, owner, cost, expires} = EthRegistrarControllerOldABI.events.NameRegistered.decode(e)
        }
        if (e.topics[0] === EthRegistrarControllerOldABI.events.NameRenewed.topic) {
            let {name, label, cost, expires} = EthRegistrarControllerOldABI.events.NameRenewed.decode(e)
        }
        if (e.topics[0] === EthRegistrarControllerOldABI.events.NewPriceOracle.topic) {
            let {oracle} = EthRegistrarControllerOldABI.events.NewPriceOracle.decode(e)
        }
        if (e.topics[0] === EthRegistrarControllerOldABI.events.OwnershipTransferred.topic) {
            let {previousOwner, newOwner} = EthRegistrarControllerOldABI.events.OwnershipTransferred.decode(e)
        }
        if (e.topics[0] === EthRegistrarControllerABI.events.NameRegistered.topic) {
            let {name, label, owner, baseCost, premium, expires} = EthRegistrarControllerABI.events.NameRegistered.decode(e)
        }
        if (e.topics[0] === EthRegistrarControllerABI.events.NameRenewed.topic) {
            let {name, label, cost, expires} = EthRegistrarControllerABI.events.NameRenewed.decode(e)
        }
        if (e.topics[0] === EthRegistrarControllerABI.events.OwnershipTransferred.topic) {
            let {previousOwner, newOwner} = EthRegistrarControllerABI.events.OwnershipTransferred.decode(e)
        }
        if (e.topics[0] === BaseRegistrarABI.events.Approval.topic) {
            let {owner, approved, tokenId} = BaseRegistrarABI.events.Approval.decode(e)
        }
        if (e.topics[0] === BaseRegistrarABI.events.ApprovalForAll.topic) {
            let {owner, operator, approved} = BaseRegistrarABI.events.ApprovalForAll.decode(e)
        }
        if (e.topics[0] === BaseRegistrarABI.events.ControllerAdded.topic) {
            let {controller} = BaseRegistrarABI.events.ControllerAdded.decode(e)
        }
        if (e.topics[0] === BaseRegistrarABI.events.NameMigrated.topic) {
            let {id, owner, expires} = BaseRegistrarABI.events.NameMigrated.decode(e)
        }
        if (e.topics[0] === AuctionRegistrarABI.events.AuctionStarted.topic) {
            let {hash, registrationDate} = AuctionRegistrarABI.events.AuctionStarted.decode(e)
        }
        if (e.topics[0] === AuctionRegistrarABI.events.BidRevealed.topic) {
            let {hash, owner, value, status} = AuctionRegistrarABI.events.BidRevealed.decode(e)
        }
        if (e.topics[0] === AuctionRegistrarABI.events.HashInvalidated.topic) {
            let {hash, name, value, registrationDate} = AuctionRegistrarABI.events.HashInvalidated.decode(e)
        }
        if (e.topics[0] === AuctionRegistrarABI.events.NewBid.topic) {
            let {hash, bidder, deposit} = AuctionRegistrarABI.events.NewBid.decode(e)
        }
      }
    }

    // Save entities to the database
    await ctx.store.upsert(domains)
  })
}
// Loop through processors and process logs for each contract
for (let i = 0; i < processors.length; i++) {
  await processContractLogs(i)
}

