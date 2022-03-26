import { MouseEventHandler } from "react"
import { SortKeys, SortOrder } from "../models/types"

const SortButton = ({ sortOrder, columnKey, sortKey, onClick }: { sortOrder: SortOrder, columnKey: String, sortKey: SortKeys, onClick: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <button onClick={onClick} className={`${sortKey === columnKey && sortOrder === 'desc' ? 'sort-button sort-reverse' : 'sort-button'}`}>
            ⇧
        </button>
    )
}

export default SortButton