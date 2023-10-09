import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Domain} from "./domain.model"
import {Account} from "./account.model"

@Entity_()
export class Registration {
    constructor(props?: Partial<Registration>) {
        Object.assign(this, props)
    }

    /**
     * The unique identifier of the registration
     */
    @PrimaryColumn_()
    id!: string

    /**
     * The domain name associated with the registration
     */
    @Index_()
    @ManyToOne_(() => Domain, {nullable: true})
    domain!: Domain

    /**
     * The registration date of the domain
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    registrationDate!: bigint

    /**
     * The expiry date of the domain
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    expiryDate!: bigint

    /**
     * The cost associated with the domain registration
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    cost!: bigint | undefined | null

    /**
     * The account that registered the domain
     */
    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    registrant!: Account

    /**
     * The human-readable label name associated with the domain registration
     */
    @Column_("text", {nullable: true})
    labelName!: string | undefined | null
}
