import { useEffect, useRef } from 'react'

function useInfiniteScroll({
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}: {
	fetchNextPage: () => void
	hasNextPage: boolean
	isFetchingNextPage: boolean
}) {
	const observerTarget = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage()
				}
			},
			{ threshold: 1.0 },
		)

		if (observerTarget.current) {
			observer.observe(observerTarget.current)
		}

		return () => {
			if (observerTarget.current) {
				observer.unobserve(observerTarget.current)
			}
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage])

	return { observerTarget }
}

export default useInfiniteScroll
