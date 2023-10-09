import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {Registration} from "./registration.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    /**
     * The unique identifier for the account
     */
    @PrimaryColumn_()
    id!: string

    /**
     * The Registrations made by the account
     */
    @OneToMany_(() => Registration, e => e.registrant)
    registrations!: Registration[]
}
