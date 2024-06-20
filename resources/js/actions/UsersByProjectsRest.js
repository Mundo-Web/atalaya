import { Fetch, Notify } from "sode-extend-react"

class UsersByProjectsRest {
  static getUser = async (relative_id) => {
    const { result } = await Fetch(`/api/users-by-projects/${relative_id}`)
    return result?.data ?? null
  }
}

export default UsersByProjectsRest