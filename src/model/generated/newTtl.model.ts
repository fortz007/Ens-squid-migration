import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Domain} from "./domain.model"

@Entity_()
export class NewTTL {
    constructor(props?: Partial<NewTTL>) {
        Object.assign(this, props)
    }

    /**
     * The unique identifier of the event
     */
    @PrimaryColumn_()
    id!: string

    /**
     * The domain name associated with the event
     */
    @Index_()
    @ManyToOne_(() => Domain, {nullable: true})
    domain!: Domain

    /**
     * The block number at which the event occurred
     */
    @Column_("int4", {nullable: false})
    blockNumber!: number

    /**
     * The transaction hash of the transaction that triggered the event
     */
    @Column_("bytea", {nullable: false})
    transactionID!: Uint8Array

    /**
     * The new TTL value (in seconds) associated with the domain
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    ttl!: bigint
}
