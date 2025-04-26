import BreadCrumbs from '@/app/components/ui/BreadCrumbs'
import Cars from '@/app/components/Catalog/Cars/Cars'
import Filters from '@/app/components/Catalog/Filters/Filters'

const page = () => {
	return (
		<main>
			<BreadCrumbs />
			<section className='grid grid-cols-[280px_1fr] gap-6'>
				<Filters />
				<Cars />
			</section>
		</main>
	)
}

export default page
