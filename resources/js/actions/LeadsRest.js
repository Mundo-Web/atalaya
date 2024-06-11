import { Fetch, Notify } from "sode-extend-react"

class LeadsRest {
  static paginate = async (params) => {
    const { result } = await Fetch(`/api/leads/paginate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    return result
  }

  static save = async (client) => {
    try {
      const { status, result } = await Fetch('/api/leads', {
        method: 'POST',
        body: JSON.stringify(client)
      })

      if (!status) throw new Error(result?.message || 'Ocurrio un error inesperado')

      Notify.add({
        icon: '/assets/img/logo.svg',
        title: 'Correcto',
        body: result.message,
        type: 'success'
      })
      return true
    } catch (error) {
      Notify.add({
        icon: '/assets/img/logo.svg',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })
      return false
    }
  }

  static status = async ({ id, status }) => {
    try {
      const { status: fetchStatus, result } = await Fetch('/api/leads/status', {
        method: 'PATCH',
        body: JSON.stringify({ id, status })
      })
      if (!fetchStatus) throw new Error(result?.message ?? 'Ocurrio un error inesperado')

      Notify.add({
        icon: '/assets/img/logo.svg',
        title: 'Correcto',
        body: result.message,
        type: 'success'
      })

      return true
    } catch (error) {
      Notify.add({
        icon: '/assets/img/logo.svg',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })

      return false
    }
  }

  static projectStatus = async (project, status) => {
    try {
      const { status: fetchStatus, result } = await Fetch('/api/leads/project-status', {
        method: 'PATCH',
        body: JSON.stringify({ project, status })
      })
      if (!fetchStatus) throw new Error(result?.message ?? 'Ocurrio un error inesperado')

      Notify.add({
        icon: '/assets/img/logo.svg',
        title: 'Correcto',
        body: result.message,
        type: 'success'
      })

      return true
    } catch (error) {
      Notify.add({
        icon: '/assets/img/logo.svg',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })

      return false
    }
  }

  static delete = async (id) => {
    try {
      const { status: fetchStatus, result } = await Fetch(`/api/leads/${id}`, {
        method: 'DELETE'
      })
      if (!fetchStatus) throw new Error(result?.message ?? 'Ocurrio un error inesperado')

      Notify.add({
        icon: '/assets/img/logo.svg',
        title: 'Correcto',
        body: result.message,
        type: 'success'
      })

      return true
    } catch (error) {
      Notify.add({
        icon: '/assets/img/logo.svg',
        title: 'Error',
        body: error.message,
        type: 'danger'
      })

      return false
    }
  }
}

export default LeadsRest