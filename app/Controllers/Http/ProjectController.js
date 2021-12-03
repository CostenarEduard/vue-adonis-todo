'use strict'

const Project = use('App/Models/Project')
const AuthorizationService = use('App/Services/AuthorizationService')

class ProjectController {
  async index({ auth }) {
    const user = await auth.getUser()
    return await user.project().fetch()
  }

  async create({ auth, request }) {
    const user = await auth.getUser()
    const { title } = request.all()
    const project = new Project()
    project.fill({
      title,
    })
    await user.project().save(project)
    return project
  }

  async destroy({ auth, request, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id)
    AuthorizationService.verifyPermissions(project, user)
    await project.delete()
    return project

  }
}

module.exports = ProjectController
