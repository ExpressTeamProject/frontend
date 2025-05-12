
import { kyInstance } from '@/lib/kyInstance'
import { User } from '@/models/User';
import useLoginStore from '@/store/useLoginStore'
import { useMutation } from '@tanstack/react-query'

function useLoginMutation() {
  const { setToken, setUser } = useLoginStore();
  return (
    useMutation({
      mutationKey: ['login'],
      mutationFn: async ({ email, password }: { email: string, password: string }) => {
        const response = await kyInstance.post('auth/login', { json: { email, password } })
        return await response.json() as { token: string, user: User }
      }, onSuccess: (data) => { console.log(data); setToken(data.token); setUser(data.user) }
    })
  )
}

export default useLoginMutation