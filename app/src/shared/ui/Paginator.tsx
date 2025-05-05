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
					containerClassName='bg-secondaryBg w-[50%] mx-auto rounded-[8px] py-2 flex justify-center items-center gap-2 mt-6'
					pageLinkClassName='text-primary'
					activeClassName='!bg-accentBg !text-[#535353]'
					previousClassName='font-bold px-3 py-1 text-primary rounded-[8px] hover:bg-accentBg hover:text-[#535353]'
					nextClassName='font-bold px-3 py-1 text-accent rounded-[8px] hover:bg-accentBg hover:text-[#535353]'
					disabledClassName='!text-[#535353] pointer-events-none'
					breakClassName='pointer-events-none text-primary px-2'
				/>
			)}
		</>
	)
}
