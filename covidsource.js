const locationSource = require('./locations')

module.exports.CovidSources = class CovidSources{
  async loadAll(){
    return new Promise((resolve, reject) => {
      let loadingPromiseMap = locationSource.locations.map(async location => await location.getData())

      Promise.all(loadingPromiseMap).then(values => {
        resolve(values)
      })
    })
  }
}

