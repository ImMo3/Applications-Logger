const Pagination = ({ usersPerPage, totalUsers, currentPage, paginate }: { usersPerPage: number, totalUsers: number, currentPage: number, paginate: any }) => {
    const pageNumbers = []

    for (let index = 1; index <= Math.ceil(totalUsers / usersPerPage); index++) {
        pageNumbers.push(index)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={`${currentPage === number ? 'page-item active' : 'page-item'}`}>
                        <a onClick={() => paginate(number)} href="#!" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination