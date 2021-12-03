class AuthorizationService {
  verifyPermissions(resource, user) {
    if (resource.user_id !== user.id) {
      throw new Error()
    }
  }
}

module.exports = new AuthorizationService();
