import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Domain} from "./domain.model"

@Entity_()
export class WrappedDomain {
    constructor(props?: Partial<WrappedDomain>) {
        Object.assign(this, props)
    }

    /**
     * unique identifier for each instance of the WrappedDomain entity
     */
    @PrimaryColumn_()
    id!: string

    /**
     * The domain that is wrapped by this WrappedDomain
     */
    @Index_()
    @ManyToOne_(() => Domain, {nullable: true})
    domain!: Domain

    /**
     * The expiry date of the wrapped domain
     */
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    expiryDate!: bigint

    /**
     * The number of fuses remaining on the wrapped domain
     */
    @Column_("int4", {nullable: false})
    fuses!: number

    /**
     * The account that owns this WrappedDomain
     */
    @Column_("text", {nullable: false})
    owner!: string

    /**
     * The name of the wrapped domain
     */
    @Column_("text", {nullable: true})
    name!: string | undefined | null
}
