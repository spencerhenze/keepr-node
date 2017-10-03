const actions = {
    create: 'Create',
    update: 'Update',
    remove: 'Remove',
    find: 'Find',
    findAll: 'Find All'
  }
  
  const models = {
    vault: {
      name: 'Vault',
      endpoint: 'vaults',
    //   useCustomRoutes: true
    },
    keep: {
      name: 'Keep',
      endpoint: 'keeps',
    //   useCustomRoutes: true
    },
    // task: {
    //   name: 'Task',
    //   endpoint: 'tasks',
    //   useCustomRoutes: true
    // },
    // comment: {
    //   name: 'Comment',
    //   endpoint: 'comments'
    // },
    user: {
      name: 'User',
      endpoint: 'users',
      preventDefaultApi: true,
      useCustomRoutes: true
    }
  }
  
  
  module.exports = {
    actions,
    models
  }