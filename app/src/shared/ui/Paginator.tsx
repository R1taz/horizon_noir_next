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
					containerClassName='bg-700 w-[50%] mx-auto rounded-[8px] py-2 flex justify-center items-center gap-2 mt-6'
					pageLinkClassName='text-400'
					activeClassName='!bg-accent !text-[600]'
					previousClassName='font-bold px-3 py-1 text-400 rounded-[8px] hover:bg-accent hover:text-[600]'
					nextClassName='font-bold px-3 py-1 text-accent rounded-[8px] hover:bg-accent hover:text-[600]'
					disabledClassName='!text-[600] pointer-events-none'
					breakClassName='pointer-events-none text-400 px-2'
				/>
			)}
		</>
	)
}
