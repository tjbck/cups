import useSWR from 'swr'
import { server } from '../constants'

const fetcher = url => fetch(url).then(r => r.json())

const useRoom = (roomId: string) => {
    const { data, error } = useSWR(`${server}/v1/rooms/${roomId}`, fetcher, { refreshInterval: 1000 })

    return {
        room: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default useRoom