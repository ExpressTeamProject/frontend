import { kyInstance } from '@/lib/axiosInstance'
import { useMutation } from '@tanstack/react-query'

function useLoginMutation() {
  return (
    useMutation({
      mutationKey: ['login'],
      mutationFn: async ({ email, password }: { email: string, password: string }) => {
        const response = await kyInstance.post('auth/login', { json: { email, password } })
        return response.body
      }
    })
  )
}

export default useLoginMutation