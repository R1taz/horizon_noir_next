import BreadCrumbs from '@/app/src/shared/ui/BreadCrumbs'
import Cars from '@/app/src/widgets/cars/Cars'
import Filters from '@/app/src/widgets/filters/Filters'

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
