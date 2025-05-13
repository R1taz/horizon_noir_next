import ReactPaginate from 'react-paginate'

interface Props {
	page: number
	portionSize: number
	totalCountPages: number
	changePage: (page: number) => void
}

export const Paginator = ({ page, portionSize, totalCountPages, changePage }: Props) => {
	return (
		<>
			{totalCountPages > 0 && (
				<ReactPaginate
					pageCount={totalCountPages}
					pageRangeDisplayed={portionSize}
					marginPagesDisplayed={1}
					forcePage={page - 1}
					onPageChange={({ selected }) => changePage(selected + 1)}
					breakLabel='...'
					nextLabel='›'
					previousLabel='‹'
					containerClassName='bg-700 w-[25%] mx-auto rounded-[8px] py-2 flex justify-center items-center gap-2 mt-6'
					pageLinkClassName='text-500 font-bold'
					activeLinkClassName='!text-accent font-bold'
					previousClassName={`font-bold px-3 py-1 ${
						page === 1 ? 'text-500' : 'text-accent'
					} rounded-[8px] hover:bg-accent hover:text-700  transition duration-150`}
					nextClassName={`font-bold px-3 py-1 ${
						page === totalCountPages ? 'text-500' : 'text-accent'
					} rounded-[8px] hover:bg-accent hover:text-700 transition duration-150`}
					disabledClassName='text-600 pointer-events-none'
					breakClassName='text-500 px-1'
				/>
			)}
		</>
	)
}
