import { Fetch } from "sode-extend-react"

class DashboardRest {
  static revenue = async (range) => {
    const { result } = await Fetch(`/api/dashboard/${range}`)
    return result?.data ?? []
  }
}

export default DashboardRest