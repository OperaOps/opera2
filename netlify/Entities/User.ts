export class User {
  static async me() {
    // Mock user authentication - replace with actual auth logic
    return Promise.resolve({ id: '1', name: 'Demo User' })
  }

  static async loginWithRedirect(redirectUrl: string) {
    // Mock login redirect - replace with actual auth logic
    console.log('Redirecting to login:', redirectUrl)
    return Promise.resolve()
  }
}


