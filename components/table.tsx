import { useState } from "react"
import { AuditLog, SortKeys, SortOrder } from "../models/types"
import { filterData, sortData } from "../utils/table-helper"
import Pagination from "./pagination"
import SortButton from "./sortButton"
import TableFilters from "./tableFilters"

const Table = ({ headers, slicedData, changedUsers, users }: { headers: any[], slicedData: AuditLog[], changedUsers: AuditLog[], users: AuditLog[] }) => {

    const [sortKey, setSortKey] = useState<SortKeys>('applicationType')
    const [filterValues, setFilterValues] = useState<any>({})
    const [sortOrder, setSortOrder] = useState<SortOrder>('ascn')
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(10)

    // get current indexes
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUsers = indexOfLastUser - usersPerPage

    // change filter, sort and pagination
    changedUsers = filterData({ tableData: changedUsers, filterValues })
    changedUsers = sortData({ tableData: changedUsers, sortKey, reverse: sortOrder === 'desc' })
    slicedData = changedUsers.slice(indexOfFirstUsers, indexOfLastUser);

    // change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    // change sort
    function changeSort(key: SortKeys) {
        setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn')
        setSortKey(key)
    }

    // apply filter
    const submitFilter = (filterValue: any) => {
        setFilterValues(filterValue)
        setCurrentPage(1)
    }

    return (
        <div>
            <TableFilters onClick={submitFilter} />
            <div className='table-responsive'>
                <table className="styled-table" width={'100%'}>
                    <thead>
                        <tr>
                            {headers.map(header => (
                                <th key={header.key}>
                                    {header.lable}
                                    <SortButton
                                        columnKey={header.key}
                                        onClick={() => changeSort(header.key)}
                                        {...{ sortOrder, sortKey }} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {slicedData.map(user => (
                            <tr key={user.logId}>
                                <td>{user.logId}</td>
                                <td>{user.applicationType || '-/-'}</td>
                                <td>{user.applicationId || '-/-'}</td>
                                <td>{user.actionType || '-/-'}</td>
                                <td>-/-</td>
                                <td>{user.creationTimestamp || '-/-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination usersPerPage={usersPerPage} totalUsers={changedUsers.length} currentPage={currentPage} paginate={paginate} />
            </div>
        </div>
    )
}

export default Table